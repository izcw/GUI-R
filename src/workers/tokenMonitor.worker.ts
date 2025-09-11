/// <reference lib="webworker" />
import { parseMockToken } from '@/utils/token-mock'

let timer: number | null = null

self.onmessage = async ({ data }: { data: { token: string } }) => {
  if (timer) clearInterval(timer)

  const check = async () => {
    const p = await parseMockToken(data.token)
    const now = new Date().toLocaleTimeString()
    if (!p) {
      console.log(`[Token-Worker检查 ${now}] 无效或过期 → 通知主线程 expire`)
      self.postMessage('expire')
      if (timer) clearInterval(timer)
    } else {
      console.log(
        `[Token-Worker检查 ${now}] 检查通过，过期时间 ${new Date(p.ExpTime * 1000).toLocaleTimeString()}`,
      )
    }
  }

  await check()
  timer = setInterval(check, 1000)
}
