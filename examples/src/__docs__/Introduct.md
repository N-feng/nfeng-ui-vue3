# N

## 安装

```bash
# npm
npm install nfeng-ui-vue3 --save

# yarn
yarn add nfeng-ui-vue3 -S
```

## 使用

<n-image />

`src/main.ts`

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import Nfeng from 'nfeng-ui-vue3'

const app = createApp(App)
app.use(Antd)
app.use(Nfeng)

app.mount('#app')
```