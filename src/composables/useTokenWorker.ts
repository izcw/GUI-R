import { useAuthStore } from '@/stores/index'
import Worker from '@/workers/tokenMonitor.worker?worker'

let worker: Worker | null = null

export function startTokenWorker() {
  const authStore = useAuthStore()

  const run = (tk: string) => {
    if (worker) {
      console.log('[Token-Worker主线程] 销毁旧 Worker')
      worker.terminate()
    }
    if (!tk) {
      console.log('[Token-Worker主线程] 无 token，不启动 Worker')
      return
    }

    console.log('[Token-Worker主线程] 创建新 Worker，传入 Token=' + tk.slice(-20) + '...')
    worker = new Worker()
    worker.onmessage = ({ data }) => {
      if (data === 'expire') {
        console.log('[Token-Worker主线程] 收到 Worker 过期通知，执行 logout')
        authStore.Logout()
      }
    }
    worker.postMessage({ token: tk })
  }

  // 首次启动
  run(authStore.accessToken)

  // token 变化时重启
  authStore.$subscribe((_, state) => {
    console.log('[Token-Worker主线程] token 变化，重新启动 Worker')
    run(state.accessToken)
  })
}
