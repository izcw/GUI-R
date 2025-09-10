// 系统配置相关的类型定义

import type { Component } from 'vue'
import type { PermissionRole } from '@/types/auth'

// 定义布局类型
export type LayoutType = 'Layout-Main' | 'Layout-LeftRight' | 'Layout-Blank'

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
  describe: string // 布局描述
  comp: Component // 对应的 Vue 组件
  key: LayoutType // 布局的唯一标识
}

// 页面配置接口
export interface PageConfig {
  name: string // 页面名称
  comp: Component // 对应的 Vue 组件
  key: PageName // 页面的唯一标识
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

/**
 * 主题类型
 * 定义系统中可用的主题
 */
export type ThemeType = 'light' | 'dark'

// 系统配置接口
export interface SystemConfig {
  Theme: ThemeType // 当前使用的主题
  currentLayout: LayoutType // 当前使用的布局 key
  currentPage: PageName // 当前显示的页面 key
  // Layouts: LayoutConfig[] // 布局配置数组
  Menus: MenuItem[] // 菜单配置数组
}

// 存储类型
export type StorageType = 'local' | 'session'
