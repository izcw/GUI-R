// 系统配置相关的类型定义

import type { Component } from 'vue'
import type { PermissionRole } from '@/types/auth'

// 布局配置接口
export interface LayoutConfig {
  name: string // 布局名称
  comp: Component // 对应的 Vue 组件
  key: string // 布局的唯一标识
}

// 页面配置接口
export interface PageConfig {
  name: string // 页面名称
  comp: Component // 对应的 Vue 组件
  key: string // 页面的唯一标识
}

// 菜单项接口
export interface MenuItem {
  name: string // 菜单名称
  key: string // 菜单的唯一标识
  layout: string // 对应的布局 key
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
  theme: ThemeType // 当前使用的主题
  currentLayout: string // 当前使用的布局 key
  currentPage: string // 当前显示的页面 key
  layouts: LayoutConfig[] // 布局配置数组
  pages: PageConfig[] // 页面配置数组
  menus: MenuItem[] // 菜单配置数组
}

// 存储类型
export type StorageType = 'local' | 'session'
