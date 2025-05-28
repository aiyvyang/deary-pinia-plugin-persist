# Custom storage

By default the storage is set to sessionStorage, but you can specify the storage you want to use for each strategy by setting the `storage` key.

You can then use `sessionStorage`or `localStorage`.

You have to use "window?.". Because localStorage and sessionStorage are undefined on other platforms.

priority:
strategies/storage > H5Storage > defaultStorage(sessionStorage)

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
    H5Storage: window?.localStorage,
    strategies: [
      {
        storage: window?.sessionStorage,
        paths: ['accessToken'],
      },
    ],
  },
})
```
