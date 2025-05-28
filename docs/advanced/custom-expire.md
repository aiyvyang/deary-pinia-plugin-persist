# Custom storage expire

```typescript
// store/use-user-store.ts

export const useUserStore = defineStore('storeUser', {
  state() {
    return {
      firstName: 'ayy',
      lastName: 'ttk',
      accessToken: 'xxxxxxxxxxxxx',
    }
  },
  persist: {
    enabled: true,
    // 开启 expire 后，仅支持内置存储
    expire: 60 * 60 * 1000 // 1小时有效期
  },
})
```
