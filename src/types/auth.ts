// 用户相关类型定义

/**
 * 角色类型
 * 定义系统中可用的用户角色
 */
export type PermissionRole = 'admin' | 'user' | 'guest'

/**
 * 用户名类型
 * 定义系统中可用的用户角色
 */
export type UserNameType =
  | 'guest'
  | 'admin'
  | 'user1'
  | 'user2'
  | 'user3'
  | 'user4'
  | 'user5'
  | 'user6'
  | 'user7'
  | 'user8'

// 用户登录数据类型
export type loginData = {
  role: PermissionRole
  username: UserNameType
}

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
