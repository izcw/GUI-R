import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { SystemConfig, StorageType, MenuItem } from '@/types/system'
import { storage } from '@/utils/storage'
import type { PermissionRole, UserMenuPerms } from '@/types/auth'

const STORAGE_KEY = 'Menus' // 存储的键名
const STORAGE_TYPE: StorageType = 'local' // 存储类型

export const useUserStore = defineStore('user', () => {
  const UserPermissionRole: PermissionRole = 'admin' // 可以是 'user', 'admin', 'guest'
  const UserMenuPermissions = ref<UserMenuPerms>(['1', '1', '0', '1', '0', '1', '1', '1', '1']) // 用户菜单权限
  const UserMenus = ref<MenuItem[]>()

  // 从存储中恢复
  const initFromStorage = () => {
    // 明确检查存储类型
    if (STORAGE_TYPE === 'local' || STORAGE_TYPE === 'session') {
      const stored = storage.get(STORAGE_KEY, STORAGE_TYPE)
      if (stored) {
        UserMenus.value = stored.Menus
      }
    }
  }

  // 保存状态到存储
  const saveToStorage = () => {
    // 明确检查存储类型
    if (STORAGE_TYPE === 'local' || STORAGE_TYPE === 'session') {
      storage.set(
        STORAGE_KEY,
        {
          Role: UserPermissionRole, // 角色
          Menus: UserMenus.value, // 菜单
        },
        STORAGE_TYPE,
      )
    }
  }

  // 设置当前用户菜单
  const setMenus = (val: MenuItem[]) => {
    UserMenus.value = val
    saveToStorage()
  }

  // 初始化
  initFromStorage()

  return {
    saveToStorage,
    UserPermissionRole,
    UserMenuPermissions,
    UserMenus,
    setMenus,
  }
})
