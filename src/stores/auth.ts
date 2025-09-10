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

import { useSystemStore, useUserStore } from '@/stores/index'

const STORAGE_KEY: string = 'Token'
const STORAGE_TYPE: StorageType = 'session'

export const useAuthStore = defineStore('auth', () => {
  const UserStore = useUserStore()
  const systemStore = useSystemStore()

  const accessToken = ref<string>('')
  const refreshToken = ref<string>('')

  const userInfo = ref<Record<string, any>>({})
  const isLogin = computed(() => !!accessToken.value) // 是否登录

  // 从存储中恢复
  const initFromStorage = () => {
    const stored = storage.get(STORAGE_KEY, STORAGE_TYPE) as any
    if (stored) {
      accessToken.value = stored ?? ''
      // accessToken.value = stored.accessToken ?? ''
      // refreshToken.value = stored.refreshToken ?? ''
      // userInfo.value = stored.userInfo ?? {}
    }
  }

  // 保存到存储
  const saveToStorage = () => {
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

  // 登录
  const Login = (payload: { username: string; role: string }) => {
    // 防重复设置Token
    if (accessToken.value && parseMockToken(accessToken.value)) {
      console.warn(
        `[AuthStore] 已登录，不用重新生成Token（当前用户：${payload.username}）（${payload.role}）`,
      )
    } else {
      // 设置Token
      const UserID = String(Date.now()) // 模拟用户 id
      let exptime = Math.floor(Date.now() / 1000) + 30 * 60 //   1分钟后过期（测试用）
      accessToken.value = generateMockToken({
        ID: 'ID' + UserID,
        Name: payload.username,
        Role: payload.role ?? 'user',
        ExpTime: exptime,
      })
    }

    UserStore.saveToStorage()
    systemStore.navigateTo(UserStore.Menus[0].name) // 自动导航至第一个菜单
    saveToStorage()
  }

  // 退出登录
  const Logout = () => {
    accessToken.value = ''
    refreshToken.value = ''
    userInfo.value = {}
    storage.remove(STORAGE_KEY, STORAGE_TYPE)
    storage.remove('UserInfo', STORAGE_TYPE)

    systemStore.navigateTo('Login')
  }

  /** 静默刷新 accessToken（前端自己玩） */
  const refreshAccessToken = () => {
    const payload = parseMockToken(refreshToken.value)
    if (!payload) return Logout()
    accessToken.value = generateMockToken({
      ID: payload.ID,
      Name: userInfo.value.username,
      Role: userInfo.value.role,
    })
    saveToStorage()
  }

  // 初始化
  initFromStorage()

  return {
    accessToken,
    refreshToken,
    userInfo,
    isLogin,
    Login,
    Logout,
    refreshAccessToken,
  }
})
