import type { StorageType } from '@/types/system'

// 排除 'none' 类型的存储类型
type StorageTypeWithStorage = Exclude<StorageType, 'none'>

export const storage = {
  set(key: string, value: any, type: StorageTypeWithStorage): void {
    const serialized = JSON.stringify(value)
    if (type === 'local') {
      localStorage.setItem(key, serialized)
    } else if (type === 'session') {
      sessionStorage.setItem(key, serialized)
    }
  },

  get(key: string, type: StorageTypeWithStorage): any {
    let stored: string | null = null
    if (type === 'local') {
      stored = localStorage.getItem(key)
    } else if (type === 'session') {
      stored = sessionStorage.getItem(key)
    }

    try {
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  },

  remove(key: string, type: StorageTypeWithStorage): void {
    if (type === 'local') {
      localStorage.removeItem(key)
    } else if (type === 'session') {
      sessionStorage.removeItem(key)
    }
  },

  clear(type: StorageTypeWithStorage): void {
    if (type === 'local') {
      localStorage.clear()
    } else if (type === 'session') {
      sessionStorage.clear()
    }
  },
}
