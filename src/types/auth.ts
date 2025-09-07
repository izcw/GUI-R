// 用户相关类型定义

/**
 * 角色类型
 * 定义系统中可用的用户角色
 */
export type PermissionRole = 'admin' | 'user' | 'guest'

/**
 * 用户菜单权限
 */
export type UserMenuPerms = [
  '0' | '1',
  '0' | '1',
  '0' | '1',
  '0' | '1',
  '0' | '1',
  '0' | '1',
  '0' | '1',
  '0' | '1',
  '0' | '1',
]
