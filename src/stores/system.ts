import { defineStore } from 'pinia'
import { ref, computed, type Component } from 'vue'
import type { SystemConfig, StorageType, LayoutType, PageName } from '@/types/system'
import { systemConfig } from '@/router/index.ts'
import { storage } from '@/utils/storage'
import { defineAsyncComponent } from 'vue'
import { parseMockToken } from '@/utils/token-mock'
import { useAuthStore } from '@/stores/index'

const STORAGE_KEY = 'System' // 存储的键名
const STORAGE_TYPE: StorageType = 'session' // 存储类型
const MAX_HISTORY_LENGTH = 20 // 最大历史记录长度

// 路由守卫类型定义
type NavigationGuard = (to: PageName, from: PageName) => boolean | void | Promise<boolean | void>
type AfterNavigationHook = (to: PageName, from: PageName) => void

export const useSystemStore = defineStore('system', () => {
  const config = ref<SystemConfig>(systemConfig)
  const isDark = ref(systemConfig.Theme === 'dark') // 从配置文件中读取主题

  // 路由守卫相关状态
  const navigationGuards = ref<NavigationGuard[]>([]) // 全局前置守卫
  const afterNavigationHooks = ref<AfterNavigationHook[]>([]) // 全局后置守卫
  const isNavigating = ref(false) // 是否正在导航中

  // 导航历史相关状态
  const navigationHistory = ref<PageName[]>([]) // 导航历史记录（最多保存 20 条历史记录，仅在导航到新页面时添加历史记录）
  const currentHistoryIndex = ref(-1) // 当前历史记录索引

  // 从存储中恢复
  const initFromStorage = () => {
    const stored = storage.get(STORAGE_KEY, STORAGE_TYPE)
    if (stored) {
      config.value = { ...config.value, ...stored }
      isDark.value = stored.Theme === 'dark' // 优先使用存储中的主题设置

      // 恢复历史记录
      if (stored.navigationHistory && stored.currentHistoryIndex !== undefined) {
        navigationHistory.value = stored.navigationHistory
        currentHistoryIndex.value = stored.currentHistoryIndex
      }
    } else {
      isDark.value = systemConfig.Theme === 'dark' // 如果没有存储数据，使用配置文件中的主题
    }

    // 初始化历史记录
    if (navigationHistory.value.length === 0) {
      navigationHistory.value = [config.value.currentPage]
      currentHistoryIndex.value = 0
    }

    navigateTo(config.value.currentPage, true) // 默认页面
  }

  // 保存到存储
  const saveToStorage = () => {
    const { currentLayout, currentPage } = config.value
    storage.set(
      STORAGE_KEY,
      {
        Theme: isDark.value ? 'dark' : 'light',
        currentLayout: currentLayout, // 保存当前布局
        currentPage: currentPage, // 保存当前页面
        navigationHistory: navigationHistory.value,
        currentHistoryIndex: currentHistoryIndex.value,
      },
      STORAGE_TYPE,
    )
  }

  // 使用 computed 和 defineAsyncComponent 来动态获取当前的布局组件
  const currentLayoutComp = computed(() => {
    const layout = config.value.Menus.find(
      (item) => item.layout.key === config.value.currentLayout,
    )?.layout
    return layout
      ? defineAsyncComponent(layout.comp as () => Promise<{ default: any }>)
      : navigateTo('404')
  })

  // 使用 computed 和 defineAsyncComponent 来动态获取当前的页面组件
  const currentPageComp = computed(() => {
    const page = config.value.Menus.find((item) => item.name === config.value.currentPage)
    return page
      ? defineAsyncComponent(page.comp as () => Promise<{ default: any }>)
      : navigateTo('404')
  })

  // 添加全局前置守卫
  const addNavigationGuard = (guard: NavigationGuard) => {
    navigationGuards.value.push(guard)
  }

  // 添加全局后置守卫
  const addAfterNavigationHook = (hook: AfterNavigationHook) => {
    afterNavigationHooks.value.push(hook)
  }

  // 路由跳转页面 - 添加路由守卫逻辑
  const navigateTo = async (pageKey: PageName, isInitial = false) => {
    if (isNavigating.value) return // 防止重复导航

    isNavigating.value = true
    const fromPage = config.value.currentPage

    try {
      // 执行全局前置守卫
      for (const guard of navigationGuards.value) {
        const result = await guard(pageKey, fromPage)
        if (result === false) {
          console.warn(`[路由守卫] 导航到 ${pageKey} 被守卫阻止`)
          return
        }
      }

      // 执行内置前置守卫
      if (!beforeRouteEnter(pageKey, fromPage)) {
        console.warn(`[路由守卫] 导航到 ${pageKey} 被内置守卫阻止`)
        return
      }

      const page = config.value.Menus.find((p) => p.name === pageKey)
      if (page) {
        config.value.currentPage = page.name
        config.value.currentLayout = page.layout.key

        // 更新历史记录（如果不是初始导航）
        if (!isInitial) {
          updateNavigationHistory(pageKey)
        }

        saveToStorage()

        // 执行全局后置守卫
        for (const hook of afterNavigationHooks.value) {
          hook(pageKey, fromPage)
        }

        // 执行内置后置守卫
        afterRouteEnter(pageKey, fromPage)

        console.log(`[路由守卫] 成功导航到: ${pageKey}`)
      }
    } catch (error) {
      console.error(`[路由守卫] 导航到 ${pageKey} 时出错:`, error)
      navigateTo('404')
    } finally {
      isNavigating.value = false
    }
  }

  // 更新导航历史记录
  const updateNavigationHistory = (pageKey: PageName) => {
    // 如果当前页面与历史记录中的当前页面相同，则不添加新记录
    if (navigationHistory.value[currentHistoryIndex.value] === pageKey) {
      return
    }

    // 如果当前不是历史记录的最后一项，则删除之后的所有记录
    if (currentHistoryIndex.value < navigationHistory.value.length - 1) {
      navigationHistory.value = navigationHistory.value.slice(0, currentHistoryIndex.value + 1)
    }

    // 添加新记录
    navigationHistory.value.push(pageKey)
    currentHistoryIndex.value = navigationHistory.value.length - 1

    // 限制历史记录长度
    if (navigationHistory.value.length > MAX_HISTORY_LENGTH) {
      navigationHistory.value.shift() // 移除最旧的记录
      currentHistoryIndex.value = navigationHistory.value.length - 1
    }
  }

  // 后退导航
  const navigateBack = () => {
    if (currentHistoryIndex.value > 0) {
      currentHistoryIndex.value--
      const targetPage = navigationHistory.value[currentHistoryIndex.value]
      navigateTo(targetPage, true) // 使用历史记录导航
    }
  }

  // 前进导航
  const navigateForward = () => {
    if (currentHistoryIndex.value < navigationHistory.value.length - 1) {
      currentHistoryIndex.value++
      const targetPage = navigationHistory.value[currentHistoryIndex.value]
      navigateTo(targetPage, true) // 使用历史记录导航
    }
  }

  // 内置前置守卫 - 导航前检查
  const beforeRouteEnter = (toPage: PageName, fromPage: PageName): boolean => {
    // 检查页面是否存在
    const targetPage = config.value.Menus.find((p) => p.name === toPage)
    if (!targetPage) {
      console.error(`[路由守卫] 找不到页面: ${toPage}`)
      navigateTo('404')
      return false
    }

    // 检查用户是否登录（这里简化处理，实际应检查token）
    const isLoggedIn = config.value.currentPage !== 'Login'

    // 登录页不需要权限检查
    if (toPage === 'Login') return true

    // 检查页面权限
    if (targetPage.permission && !targetPage.permission.includes('guest')) {
      if (!isLoggedIn) {
        console.warn(`[路由守卫] 无权限访问 ${toPage}, 需要登录`)
        navigateTo('Login')
        return false
      }
    }

    return true
  }

  // 内置后置守卫 - 导航完成后处理
  const afterRouteEnter = (toPage: PageName, fromPage: PageName) => {
    // 这里可以添加导航完成后的处理逻辑
    // 例如：页面切换动画、埋点统计等
    console.log(`[路由守卫] 从 ${fromPage} 导航到 ${toPage}`)
  }

  // 切换主题
  const toggleTheme = () => {
    isDark.value = !isDark.value
    config.value.Theme = isDark.value ? 'dark' : 'light'
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

  // 添加默认内置守卫
  addNavigationGuard(beforeRouteEnter)

  return {
    // 状态
    config,
    isDark,
    navigationHistory,
    currentHistoryIndex,

    // 计算属性
    currentLayoutComp,
    currentPageComp,

    // 导航状态计算属性
    canGoBack: computed(() => currentHistoryIndex.value > 0),
    canGoForward: computed(() => currentHistoryIndex.value < navigationHistory.value.length - 1),

    // 动作
    navigateTo,
    navigateBack,
    navigateForward,
    toggleTheme,
    saveToStorage,

    // 路由守卫相关
    addNavigationGuard,
    addAfterNavigationHook,
  }
})
