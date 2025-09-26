import { defineStore } from 'pinia'
import { ref } from 'vue'
import { appConfig } from '@/config/appConfig'
import type { StorageType, ThemeType } from '@/types/system'
import { storage } from '@/utils/storage'

const STORAGE_KEY = 'System' // 存储的键名
const STORAGE_TYPE: StorageType = 'session' // 存储类型

export const useSystemStore = defineStore('system', () => {
  const isDark = ref(appConfig.Theme === 'dark') // 从配置文件中读取主题
  console.log('主题----')

  // 从存储中恢复
  const initFromStorage = () => {
    const stored = storage.get(STORAGE_KEY, STORAGE_TYPE)
    if (stored) {
      isDark.value = stored.Theme === 'dark' // 优先使用存储中的主题设置
    } else {
      isDark.value = appConfig.Theme === 'dark' // 如果没有存储数据，使用配置文件中的主题
    }
  }

  // 保存到存储
  const saveToStorage = () => {
    storage.set(
      STORAGE_KEY,
      {
        Theme: isDark.value ? 'dark' : 'light',
      },
      STORAGE_TYPE,
    )
  }

  // 切换主题
  const toggleTheme = () => {
    isDark.value = !isDark.value
    document.documentElement.classList.toggle('dark', isDark.value)
    saveToStorage()
  }

  // 初始化主题
  const initTheme = () => {
    document.documentElement.classList.toggle('dark', isDark.value)
    saveToStorage()
  }

  // 初始化
  initFromStorage()
  initTheme()

  return {
    isDark,
    toggleTheme,
    saveToStorage,
  }
})
