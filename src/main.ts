import '@/styles/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { startTokenWorker } from '@/composables/useTokenWorker'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

startTokenWorker() // ✅ 开启 Worker 监听
