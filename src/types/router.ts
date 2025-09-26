import type { Component } from 'vue'
import type { PermissionRole } from '@/types/auth'

// 定义布局类型
export type LayoutType = 'Layout-index' | 'Layout-Main' | 'Layout-LeftRight'

// 定义页面类型
export type PageName =
  | 'Login'
  | 'Control'
  | 'Audio'
  | 'Configuration'
  | 'CEC'
  | 'RS232'
  | 'Network'
  | 'Upgrade'
  | 'Diagnostics'
  | 'Admin'
  | '404'
  | '500'

// 布局配置接口
export interface LayoutConfig {
  key: LayoutType // 布局的唯一标识
  comp: Component // 对应的 Vue 组件
  describe: string // 布局描述
}

// 菜单项接口
export interface MenuItem {
  permsIndex?: Number // 菜单项的权限索引
  name: PageName // 菜单名称
  comp: Component // 对应的 Vue 组件
  layout: LayoutConfig // 对应的布局配置
  permission?: PermissionRole[] // 访问权限，可选
  hidden?: boolean // 是否隐藏，可选
  meta?: {
    icon?: string // 图标路径，可选
    icon_active?: string // 激活状态图标路径，可选
  }
  children?: MenuItem[] // 子菜单项，可选
}
// 路由配置接口
export interface SystemRouter {
  currentLayout: LayoutType // 当前使用的布局 key
  currentPage: PageName // 当前显示的页面 key
  Menus: MenuItem[] // 全部菜单配置数组
  Menu?: MenuItem // 当前菜单配置数组
  navigationHistory?: PageName[] // 导航历史记录
  currentHistoryIndex?: number // 当前导航历史记录索引
}
