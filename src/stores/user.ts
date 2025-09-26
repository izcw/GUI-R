import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { StorageType } from '@/types/system'
import type { SystemRouter, MenuItem } from '@/types/router'
import { storage } from '@/utils/storage'
import type { PermissionRole, UserMenuPerms } from '@/types/auth'
import { SystemRouterData } from '@/router/index.ts'
import {
  generateMockToken,
  generateMockRefreshToken,
  parseMockToken,
  type MockPayload,
} from '@/utils/token-mock'
import { useAuthStore } from '@/stores/index'

const STORAGE_KEY = 'UserInfo' // 存储的键名
const STORAGE_TYPE: StorageType = 'session' // 存储类型

export const useUserStore = defineStore('user', () => {
  const config = ref<SystemRouter>(SystemRouterData)
  const Menus = computed(() => config.value.Menus) // 源始菜单

  const UserPermissionRole: PermissionRole = 'admin' // 可以是 'user', 'admin', 'guest'
  const UserMenuPermissions = ref<UserMenuPerms>(['1', '1', '0', '1', '0', '1', '1', '1', '1']) // 用户菜单权限
  const UserMenus = ref<MenuItem[]>() // 用户菜单

  // 从存储中恢复
  const initFromStorage = () => {
    const stored = storage.get(STORAGE_KEY, STORAGE_TYPE)
    if (stored) {
      UserMenus.value = stored.Menus
    }
  }

  // 保存到存储
  const saveToStorage = () => {
    const authStore = useAuthStore()
    let AnalyzeUsers = parseMockToken(authStore.accessToken)
    console.log('解析token', AnalyzeUsers)

    setMenus()
    // 明确检查存储类型
    storage.set(
      STORAGE_KEY,
      {
        Menus: UserMenus.value,
        ...AnalyzeUsers,
        Perms: {
          Input: ['1', '1', '0', '1', '1', '0'],
          Output: ['1', '1'],
        },
      },
      STORAGE_TYPE,
    )
  }

  // 设置当前用户菜单
  const setMenus = () => {
    let filterPermsIndex = Menus.value.filter((item, i) => item.permsIndex !== undefined) // 筛选出有权限索引的菜单
    UserMenus.value = filterPermsIndex.filter(
      (item, i) =>
        UserMenuPermissions.value[i] === '1' &&
        (item.permission?.includes(UserPermissionRole) ?? true),
    )
  } // 只显示未隐藏且符合权限的菜单

  // 初始化
  initFromStorage()

  return {
    saveToStorage,
    UserPermissionRole,
    UserMenuPermissions,
    UserMenus,
    Menus,
    setMenus,
  }
})
