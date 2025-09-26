// import type { LayoutConfig, MenuItem, SystemConfig } from '@/types/system'
import type { LayoutConfig, MenuItem, SystemRouter } from '@/types/router'

// 图标基础路径
const ICON_BASE_PATH = '/src/assets/icon/menu/'

// 创建布局配置数组
const Layout_Index: LayoutConfig = {
  key: 'Layout-index',
  comp: () => import('@/layouts/index.vue'),
  describe: '空白布局',
}
const Layout_Main: LayoutConfig = {
  key: 'Layout-Main',
  comp: () => import('@/layouts/Layout-Main.vue'),
  describe: '主布局',
}
const Layout_LeftRight: LayoutConfig = {
  key: 'Layout-LeftRight',
  comp: () => import('@/layouts/Layout-LeftRight.vue'),
  describe: '左右布局',
}

let DefaultLayout: LayoutConfig = Layout_Main // 默认布局

// 创建菜单配置数组
const menuConfigs: MenuItem[] = [
  {
    permsIndex: 0, // 权限索引 ['1', '1', '0', '1', '0', '1', '1', '1', '1']
    name: 'Control',
    comp: () => import('@/views/Control/index.vue'),
    layout: DefaultLayout,
    permission: ['admin', 'user', 'guest'],
    hidden: false,
    meta: {
      icon: `${ICON_BASE_PATH}home.svg`,
      icon_active: `${ICON_BASE_PATH}more-active.svg`,
    },
  },
  {
    permsIndex: 1,
    name: 'Audio',
    comp: () => import('@/views/Audio/index.vue'),
    layout: DefaultLayout,
    permission: ['admin', 'user', 'guest'],
    meta: {
      icon: `${ICON_BASE_PATH}user.svg`,
      icon_active: `${ICON_BASE_PATH}more-active.svg`,
    },
  },
  {
    permsIndex: 2,
    name: 'Configuration',
    comp: () => import('@/views/Configuration/index.vue'),
    layout: DefaultLayout,
    permission: ['admin', 'user', 'guest'],
    meta: {
      icon: `${ICON_BASE_PATH}user.svg`,
      icon_active: `${ICON_BASE_PATH}more-active.svg`,
    },
  },
  {
    permsIndex: 3,
    name: 'CEC',
    comp: () => import('@/views/CEC/index.vue'),
    layout: DefaultLayout,
    permission: ['admin', 'user'],
    meta: {
      icon: `${ICON_BASE_PATH}user.svg`,
      icon_active: `${ICON_BASE_PATH}more-active.svg`,
    },
  },
  {
    permsIndex: 4,
    name: 'RS232',
    comp: () => import('@/views/RS-232/index.vue'),
    layout: DefaultLayout,
    permission: ['admin', 'user'],
    meta: {
      icon: `${ICON_BASE_PATH}user.svg`,
      icon_active: `${ICON_BASE_PATH}more-active.svg`,
    },
  },
  {
    permsIndex: 5,
    name: 'Network',
    comp: () => import('@/views/Network/index.vue'),
    layout: DefaultLayout,
    permission: ['admin', 'user'],
    meta: {
      icon: `${ICON_BASE_PATH}user.svg`,
      icon_active: `${ICON_BASE_PATH}more-active.svg`,
    },
  },
  {
    permsIndex: 6,
    name: 'Upgrade',
    comp: () => import('@/views/Upgrade/index.vue'),
    layout: DefaultLayout,
    permission: ['admin', 'user'],
    meta: {
      icon: `${ICON_BASE_PATH}user.svg`,
      icon_active: `${ICON_BASE_PATH}more-active.svg`,
    },
  },
  {
    permsIndex: 7,
    name: 'Diagnostics',
    comp: () => import('@/views/Diagnostics/index.vue'),
    layout: DefaultLayout,
    permission: ['admin', 'user'],
    meta: {
      icon: `${ICON_BASE_PATH}user.svg`,
      icon_active: `${ICON_BASE_PATH}more-active.svg`,
    },
  },
  {
    permsIndex: 8,
    name: 'Admin',
    comp: () => import('@/views/Admin/index.vue'),
    layout: DefaultLayout,
    permission: ['admin', 'user'],
    meta: {
      icon: `${ICON_BASE_PATH}user.svg`,
      icon_active: `${ICON_BASE_PATH}more-active.svg`,
    },
  },
  {
    name: 'Login',
    comp: () => import('@/views/Login/index.vue'),
    layout: Layout_Index,
    permission: ['admin', 'user', 'guest'],
    meta: {
      icon: `${ICON_BASE_PATH}user.svg`,
      icon_active: `${ICON_BASE_PATH}more-active.svg`,
    },
  },
  {
    name: '404',
    comp: () => import('@/views/Errors/404.vue'),
    layout: Layout_Index,
    permission: ['admin', 'user', 'guest'],
    meta: {
      icon: `${ICON_BASE_PATH}user.svg`,
      icon_active: `${ICON_BASE_PATH}more-active.svg`,
    },
  },
  {
    name: '500',
    comp: () => import('@/views/Errors/500.vue'),
    layout: Layout_Index,
    permission: ['admin', 'user', 'guest'],
    meta: {
      icon: `${ICON_BASE_PATH}user.svg`,
      icon_active: `${ICON_BASE_PATH}more-active.svg`,
    },
  },
]

// 导出系统配置
export const SystemRouterData: SystemRouter = {
  currentLayout: 'Layout-Main', // 默认布局
  currentPage: 'Login', // 默认页面
  Menus: menuConfigs, // 菜单配置
}
