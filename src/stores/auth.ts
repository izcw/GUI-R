// src/stores/auth.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { StorageType } from '@/types/system'
import { storage } from '@/utils/storage'
import {
  generateMockToken,
  generateMockRefreshToken,
  parseMockToken,
  type MockPayload,
} from '@/utils/token-mock'

import { useSystemStore } from '@/stores/system'

const STORAGE_KEY: string = 'Token'
const STORAGE_TYPE: StorageType = 'local'

export const useAuthStore = defineStore('auth', () => {
  /* ---------- 状态 ---------- */
  const accessToken = ref<string>('')
  const refreshToken = ref<string>('')
  const userInfo = ref<Record<string, any>>({})

  /* ---------- 计算 ---------- */
  const isLogin = computed(() => !!accessToken.value)

  // 从存储加载
  function load() {
    const raw = storage.get(STORAGE_KEY, STORAGE_TYPE) as any
    if (raw) {
      accessToken.value = raw ?? ''
      // accessToken.value = raw.accessToken ?? ''
      // refreshToken.value = raw.refreshToken ?? ''
      // userInfo.value = raw.userInfo ?? {}
    }
  }

  // // 从存储中恢复
  // const initFromStorage = () => {
  //   // 明确检查存储类型
  //   if (STORAGE_TYPE === 'local' || STORAGE_TYPE === 'session') {
  //     const stored = storage.get(STORAGE_KEY, STORAGE_TYPE)
  //     if (stored) {
  //       accessToken.value = stored
  //       console.log('你好', accessToken.value)
  //     }
  //   }
  // }

  /* ---------- 内部工具 ---------- */
  function save() {
    storage.set(
      STORAGE_KEY,
      accessToken.value,

      // {
      //   accessToken: accessToken.value,
      //   refreshToken: refreshToken.value,
      //   userInfo: userInfo.value,
      // },
      STORAGE_TYPE,
    )
  }

  /* ---------- 动作 ---------- */
  function login(payload: { username: string; role: string }) {
    /* --- 防重复登录 --- */
    if (accessToken.value && parseMockToken(accessToken.value)) {
      console.warn(
        `[AuthStore] 已登录，禁止重复登录（当前用户：${payload.username}）（${payload.role}）`,
      )
      return
    }

    // login(username: string, role?: string) { --- IGNORE ---
    const sub = String(Date.now()) // 模拟用户 id
    let exptime = Math.floor(Date.now() / 1000) + 10 // 30 秒后过期（测试用）
    accessToken.value = generateMockToken({
      sub: 'ID' + sub,
      name: payload.username,
      role: payload.role ?? 'user',
      exp: exptime,
    })
    // refreshToken.value = generateMockRefreshToken({ sub })
    // userInfo.value = { username: payload.username, role: payload.role ?? 'user' }

    const expireDate = new Date(exptime).toLocaleString()
    console.log(`[AuthStore] 登录成功！用户：${payload.username}（${payload.role}）`)
    console.log(`[AuthStore] 过期时间：${expireDate}（UTC+8）`)
    save()
  }

  const systemStore = useSystemStore()

  function logout() {
    accessToken.value = ''
    refreshToken.value = ''
    userInfo.value = {}
    storage.remove(STORAGE_KEY, STORAGE_TYPE)

    systemStore.setCurrentPage('Page-Login', 'Layout-Blank')
  }

  /** 静默刷新 accessToken（前端自己玩） */
  function refreshAccessToken() {
    const payload = parseMockToken(refreshToken.value)
    if (!payload) return logout()
    accessToken.value = generateMockToken({
      sub: payload.sub,
      name: userInfo.value.username,
      role: userInfo.value.role,
    })
    save()
  }

  /* ---------- 初始化 ---------- */
  // initFromStorage()
  load()

  return {
    accessToken,
    refreshToken,
    userInfo,
    isLogin,
    login,
    logout,
    refreshAccessToken,
  }
})
