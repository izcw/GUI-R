import '@/styles/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { startTokenWorker } from '@/composables/useTokenWorker'
import { UserActivityMonitor } from '@/config/userActivityMonitor' // 引入用户活动监控模块;
import Message from '@/components/Element-PTN/Dialog/Message.vue' // 引入全局组件

import App from './App.vue'

const app = createApp(App)

app.component('Message', Message) // 全局注册组件

// // 配置用户活动监听器
// const activityMonitor = new UserActivityMonitor({
//   inactiveTimeout: 0.5 * 60 * 1000, // 30分钟超时
//   checkInterval: 5000, // 5秒检查一次
//   logEnabled: true, // 开启日志
//   onTimeout: () => {
//     // 超时处理逻辑
//     console.warn('[活动监听] 会话超时处理')
//     // 这里可以添加跳转登录页、显示提示框等逻辑
//   },
// })

// // 启动监听
// activityMonitor.start()

// // 将监听器挂载到全局属性
// app.config.globalProperties.$activityMonitor = activityMonitor

app.use(createPinia())
app.mount('#app')

startTokenWorker() // ✅ 开启 Worker 监听
