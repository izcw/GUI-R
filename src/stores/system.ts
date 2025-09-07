import { defineStore } from 'pinia'
import { ref, computed, type Component } from 'vue'
import type { SystemConfig, StorageType } from '@/types/system'
import { systemConfig } from '@/config/system-config'
import { storage } from '@/utils/storage'

const STORAGE_KEY = 'System' // 存储的键名
const STORAGE_TYPE: StorageType = 'local' // 存储类型

export const useSystemStore = defineStore('system', () => {
  // 状态 - 从配置文件中读取初始主题
  const config = ref<SystemConfig>(systemConfig)
  const isDark = ref(systemConfig.theme === 'dark') // 从配置文件中读取主题

  // 从存储中恢复状态
  const initFromStorage = () => {
    // 明确检查存储类型
    if (STORAGE_TYPE === 'local' || STORAGE_TYPE === 'session') {
      const stored = storage.get(STORAGE_KEY, STORAGE_TYPE)
      if (stored) {
        config.value = { ...config.value, ...stored }
        // 优先使用存储中的主题设置
        isDark.value = stored.theme === 'dark'
      } else {
        // 如果没有存储数据，使用配置文件中的主题
        isDark.value = systemConfig.theme === 'dark'
      }
    } else {
      // 如果不使用存储，直接使用配置文件中的主题
      isDark.value = systemConfig.theme === 'dark'
    }
  }

  // 保存状态到存储
  const saveToStorage = () => {
    // 明确检查存储类型
    if (STORAGE_TYPE === 'local' || STORAGE_TYPE === 'session') {
      const { currentLayout, currentPage } = config.value
      storage.set(
        STORAGE_KEY,
        {
          theme: isDark.value ? 'dark' : 'light', // 保存当前主题状态
          Layout: currentLayout,
          Page: currentPage,
        },
        STORAGE_TYPE,
      )
    }
  }

  // 计算属性 - 返回组件引用
  const currentLayoutComp = computed<Component | undefined>(() => {
    return config.value.layouts.find((l) => l.key === config.value.currentLayout)?.comp
  })

  const currentPageComp = computed<Component | undefined>(() => {
    return config.value.pages.find((p) => p.key === config.value.currentPage)?.comp
  })

  const layouts = computed(() => config.value.layouts)
  const pages = computed(() => config.value.pages)
  const menus = computed(() => config.value.menus)

  // 动作
  const setCurrentLayout = (layoutKey: string) => {
    const layout = config.value.layouts.find((l) => l.key === layoutKey)
    if (layout) {
      config.value.currentLayout = layoutKey
      saveToStorage()
    }
  }

  // 设置当前页面和布局
  const setCurrentPage = (pageKey: string, layoutKey: string) => {
    const page = config.value.pages.find((p) => p.key === pageKey)
    if (page) {
      config.value.currentPage = pageKey
      saveToStorage()
    }

    const layout = config.value.layouts.find((p) => p.key === layoutKey)
    if (layout) {
      config.value.currentLayout = layoutKey
      saveToStorage()
    }
  }

  const toggleTheme = () => {
    isDark.value = !isDark.value
    config.value.theme = isDark.value ? 'dark' : 'light'
    document.documentElement.classList.toggle('dark', isDark.value)
    saveToStorage()
  }

  // 初始化主题
  const initTheme = () => {
    document.documentElement.classList.toggle('dark', isDark.value)
  }

  // 初始化
  initFromStorage()
  initTheme()

  return {
    // 状态
    config,
    isDark,

    // 计算属性
    currentLayoutComp,
    currentPageComp,
    layouts,
    pages,
    menus,

    // 动作
    setCurrentLayout,
    setCurrentPage,
    toggleTheme,
    saveToStorage,
  }
})
