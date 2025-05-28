import { PiniaPluginContext } from 'pinia'
import { useStorageWithExpiry } from '@deary/utils'

// 基于 uni.getSystemInfoSync 判断当前环境是否为 H5
const isH5 =
  typeof uni !== 'undefined'
    ? ['web', 'h5', undefined].includes(uni?.getSystemInfoSync()?.uniPlatform?.toLocaleLowerCase())
    : true

/**
 * 定义持久化策略（PersistStrategy）
 * @interface PersistStrategy
 */
export interface PersistStrategy {
  /**
   * 存储所用的键，默认为 store.$id
   */
  key?: string
  /**
   * 自定义 Storage 对象（如 sessionStorage 或 localStorage）
   */
  storage?: Storage
  /**
   * 需要持久化的字段路径数组；不指定则持久化整个 state
   */
  paths?: string[]
}

/**
 * 配置持久化插件的选项
 * @interface PersistOptions
 */
export interface PersistOptions {
  /**
   * 是否启用持久化，必填
   */
  enabled: boolean
  /**
   * 持久化存储的过期时间（毫秒），默认不设置过期时间
   *
   * 开启  expire 后，仅支持内置的 localStorage
   */
  expire?: number
  /**
   * 是否使用 detached 选项分离订阅，默认为 false
   */
  detached?: boolean
  /**
   * 是否强制使用自定义 storage，H5 环境下可选
   */
  enforceCustomStorage?: boolean
  /**
   * H5 环境下的默认 Storage 对象（默认为 window.sessionStorage）
   */
  H5Storage?: Storage
  /**
   * 自定义的 PersistStrategy 数组；不存在时使用默认策略
   */
  strategies?: PersistStrategy[]
}

type Store = PiniaPluginContext['store']
type PartialState = Partial<Store['$state']>

declare module 'pinia' {
  // 在 DefineStoreOptionsBase 上扩展 persist 选项
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export interface DefineStoreOptionsBase<S, Store> {
    /**
     * 持久化插件配置，类型为 PersistOptions
     */
    persist?: PersistOptions
  }
}

/**
 * 更新并写入 store 到持久化存储
 * @param {PersistStrategy} strategy - 单一持久化策略
 * @param {Store} store - 当前 Pinia store 实例
 * @param {PersistOptions} [options] - 插件配置选项
 */
const updateStorage = (strategy: PersistStrategy, store: Store, options?: PersistOptions) => {
  const storage = strategy.storage
  const storeKey = strategy.key || store.$id
  // 是否使用自定义 Storage（H5 或 enforceCustomStorage）
  const isCustomStorage = isH5 || options?.enforceCustomStorage

  const setStorage = (k: string, v: unknown) => {
    // 有效期只能使用内置的存储
    if (options?.expire) {
      useStorageWithExpiry({
        key: k,
        value: v,
        expire: options.expire,
        isSave: true,
      })
    } else if (isCustomStorage && storage) {
      storage.setItem(k, JSON.stringify(v))
    } else {
      uni.setStorage({ key: k, data: JSON.stringify(v) })
    }
  }

  if (strategy.paths) {
    // 仅持久化指定字段
    const partialState = strategy.paths.reduce((finalObj, key) => {
      finalObj[key] = store.$state[key]
      return finalObj
    }, {} as PartialState)

    setStorage(storeKey, partialState)
  } else {
    // 持久化整个 state
    setStorage(storeKey, store.$state)
  }
}

/**
 * Pinia 持久化插件主函数
 * @param {PiniaPluginContext} context - Pinia 插件上下文，包含 options 与 store
 */
export default ({ options, store }: PiniaPluginContext): void => {
  // 仅在启用 persist 时执行逻辑
  if (options.persist?.enabled) {

    // 是否使用自定义 Storage（H5 或 enforceCustomStorage）
    const isCustomStorage = isH5 || options.persist?.enforceCustomStorage
    // 默认策略：以 store.$id 作为键，sessionStorage 作为存储
    const defaultStrat: PersistStrategy[] = [
      {
        key: store.$id,
        storage: options.persist?.H5Storage || window?.sessionStorage,
      },
    ]

    // 使用用户自定义策略或默认策略
    const strategies = options.persist?.strategies?.length
      ? options.persist?.strategies
      : defaultStrat

    // 初始化读取已存储状态并恢复
    strategies.forEach((strategy) => {
      const storage = strategy.storage || options.persist?.H5Storage || window?.sessionStorage
      const storeKey = strategy.key || store.$id
      let storageResult: unknown | null

      // 有效期只能使用内置的存储
      if (options.persist?.expire) {
        storageResult = useStorageWithExpiry({ key: storeKey, isSave: false }) as string | null
      } else if (isCustomStorage && storage) {
        try {
          storageResult = JSON.parse(storage.getItem(storeKey) as string)
        } catch (error) {
          console.warn('JSON.parse', error)
          storageResult = null
        }
      } else {
        try {
          storageResult = JSON.parse(uni.getStorageSync(storeKey))
        } catch (error) {
          console.warn('JSON.parse', error)
          storageResult = null
        }
      }

      if (storageResult) {
        store.$patch(storageResult)
        updateStorage(strategy, store, options.persist)
      }
    })

    // 订阅 store 变化并持久化更新
    store.$subscribe(
      () => {
        strategies.forEach((strategy) => {
          updateStorage(strategy, store, options.persist)
        })
      },
      { detached: options.persist?.detached ?? false }
    )
  }
}
