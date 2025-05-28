# Basic usage

By enabling the persist plugin on your store, the whole state will be stored in the uniAppStorage by default.

The store `id` is used as the storage key (to set a custom storage key)

```typescript
// store/use-user-store.ts
import { defineStore } from 'pinia'

export const useUserStore = defineStore('storeUser', {
  state: () => {
    return {
      firstName: 'ayy',
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
    // 开启 expire 后，仅支持内置存储
    // expire: 60 * 60 * 1000 // 1小时有效期
  },
})
```
