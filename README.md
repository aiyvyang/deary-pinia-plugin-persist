#  @deary/pinia-plugin-persist

[![NPM version](https://img.shields.io/npm/v/@deary/pinia-plugin-persist?color=a1b858&label=)](https://www.npmjs.com/package/@deary/pinia-plugin-persist)
[![NPM downloads](https://img.shields.io/npm/dm/@deary/pinia-plugin-persist.svg?style=flat)](https://npmjs.com/package/@deary/pinia-plugin-persist)

# 前言

> pinia 作为新一代的状态管理器，更友好的 ts 支持，更轻量的打包体积，更简化的模块管理，无疑会在将来的市场中备受欢迎。

pinia 的优点相比也不用多说了，但也正是由于其处于一个新生的阶段，周边生态还不够完善，在本人搭建项目的过程中便遇到了 pinia 在 uniapp 中数据持久化有效期的问题。

市场上目前也有一些数据持久化的插件，例如 `vuex-persistedstate`，`pinia-plugin-persist`，`pinia-plugin-persist-uni`，是服务于 pinia 和 uniapp 的没有有效期的功能，于是便有了`@deary/pinia-plugin-persist`。相比于`pinia-plugin-persist-uni`增加持久化数据有效期的功能。

# 使用说明

## 安装

`npm i @deary/pinia-plugin-persist`

## 配置

### Vue2

```typescript
import Vue from 'vue'
import vueCompositionApi from '@vue/composition-api'
import { createPinia } from 'pinia'
import piniaPersist from '@deary/pinia-plugin-persist'
import App from './App.vue'

const pinia = createPinia()
pinia.use(piniaPersist)

Vue.use(vueCompositionApi)
Vue.use(pinia)

new Vue({
  pinia,
  render: (h) => h(App),
}).$mount('#app')
```

### Vue3

```typescript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from '@deary/pinia-plugin-persist'

const pinia = createPinia()
pinia.use(piniaPersist)

createApp({}).use(pinia).mount('#app')
```

### Typescript

```json
// tsconfig.json
{
  "compilerOptions": {
    "types": ["@deary/pinia-plugin-persist"]
  }
}
```

## 基本用法

通过在你的 stroe 中配置 persist, 将会通过 uniAppStorage 来持久化存储你的数据.

请配置 id，用于持久化存储时的 key。

```typescript
// store/user.ts
import { defineStore } from 'pinia'

export const useUserStore = defineStore('storeUser', {
  state: () => {
    id: 'user',
    return {
      firstName: 'allen',
      lastName: 'ttk',
      accessToken: 'xxxxxxxxxxxxx',
    }
  },
  actions: {
    setToken(value: string) {
      this.accessToken = value
    },
  },
  persist: {
    enabled: true,
  },
})
```

## 总结

新技术会带给我们更良好的开发体验，但是我们同样应该关注其社区环境，并力所能及的贡献出自己的一份力量。本插件开发的新路历程也是基于目前`pinia`的生态环境中没有专门服务于`uniapp`的`数据持久化`插件。

该项目也是参考了`vuex-persistedstate`，`pinia-plugin-persist`和`pinia-plugin-persist-uni`,保持了使用习惯的同时又简化了使用配置。同时在搭建项目的过程中也接触到了`github-pages`以及`github actions`的配置使用，实现了说明文档自动部署和 npm 自动发包，可谓是收获满满。

## 相关内容

- [CSDN博客](https://deary.blog.csdn.net)
- [说明文档](https://aiyvyang.github.io/deary-pinia-plugin-persist/)

对你有帮助或者喜欢的话请点个 Star。

## 参考

- [vuex-persistedstate](https://github.com/robinvdvleuten/vuex-persistedstate)
- [pinia-plugin-persist](https://github.com/Seb-L/pinia-plugin-persist)
