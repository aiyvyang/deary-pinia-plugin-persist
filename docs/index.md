# Getting started

## Install

`npm i @deary/pinia-plugin-persist`

## Setup

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

## Typescript definitions

Add the `@deary/pinia-plugin-persist` types definition file to your tsconfig file.

```json
{
  "compilerOptions": {
    "types": ["@deary/pinia-plugin-persist"]
  }
}
```
