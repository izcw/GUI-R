import type { LayoutConfig, PageConfig, MenuItem, SystemConfig } from '@/types/system'
import { markRaw } from 'vue'

// 导入布局组件
import MainLayout from '@/layouts/Layout-Main.vue'
import LeftRightLayout from '@/layouts/Layout-LeftRight.vue'
import BlankLayout from '@/layouts/Layout-Blank.vue'

// 导入页面组件
import Login from '@/views/Login/index.vue'
import Control from '@/views/Control/index.vue'
import Audio from '@/views/Audio/index.vue'
import Configuration from '@/views/Configuration/index.vue'
import CEC from '@/views/CEC/index.vue'
import RS232 from '@/views/RS-232/index.vue'
import Network from '@/views/Network/index.vue'
import Upgrade from '@/views/Upgrade/index.vue'
import Diagnostics from '@/views/Diagnostics/index.vue'
import Admin from '@/views/Admin/index.vue'

// 定义布局常量
const LAYOUT_MAIN = 'Layout-Main'
const LAYOUT_LEFT_RIGHT = 'Layout-LeftRight'
const LAYOUT_BLANK = 'Layout-Blank'
const DEFAULT_LAYOUT = LAYOUT_MAIN // 默认布局

// 定义页面常量
const PAGE_LOGIN = 'Page-Login'
const PAGE_CONTROL = 'Page-Control'
const PAGE_AUDIO = 'Page-Audio'
const PAGE_CONFIGURATION = 'Page-Configuration'
const PAGE_CEC = 'Page-CEC'
const PAGE_RS232 = 'Page-RS232'
const PAGE_NETWORK = 'Page-Network'
const PAGE_UPGRADE = 'Page-Upgrade'
const PAGE_DIAGNOSTICS = 'Page-Diagnostics'
const PAGE_ADMIN = 'Page-Admin'
const DEFAULT_PAGE = PAGE_CONTROL // 默认页面

// 图标基础路径
const ICON_BASE_PATH = '/src/assets/icon/menu/'

// 创建布局配置数组
const layoutConfigs: LayoutConfig[] = [
  { name: '主布局', comp: markRaw(MainLayout), key: LAYOUT_MAIN },
  { name: '左右布局', comp: markRaw(LeftRightLayout), key: LAYOUT_LEFT_RIGHT },
  { name: '空白布局', comp: markRaw(BlankLayout), key: LAYOUT_BLANK },
]

// 创建页面配置数组
const pageConfigs: PageConfig[] = [
  { name: 'Control', comp: markRaw(Control), key: PAGE_CONTROL },
  { name: 'Audio', comp: markRaw(Audio), key: PAGE_AUDIO },
  { name: 'Configuration', comp: markRaw(Configuration), key: PAGE_CONFIGURATION },
  { name: 'CEC', comp: markRaw(CEC), key: PAGE_CEC },
  { name: 'RS232', comp: markRaw(RS232), key: PAGE_RS232 },
  { name: 'Network', comp: markRaw(Network), key: PAGE_NETWORK },
  { name: 'Upgrade', comp: markRaw(Upgrade), key: PAGE_UPGRADE },
  { name: 'Diagnostics', comp: markRaw(Diagnostics), key: PAGE_DIAGNOSTICS },
  { name: 'Admin', comp: markRaw(Admin), key: PAGE_ADMIN },
  { name: 'Login', comp: markRaw(Login), key: PAGE_LOGIN },
]

// 创建菜单配置数组
const menuConfigs: MenuItem[] = [
  {
    name: 'Control',
    key: PAGE_CONTROL,
    layout: DEFAULT_LAYOUT,
    permission: ['admin', 'user', 'guest'],
    hidden: false,
    meta: {
      icon: `${ICON_BASE_PATH}home.svg`,
      icon_active: `${ICON_BASE_PATH}more-active.svg`,
    },
  },
  {
    name: 'Audio',
    key: PAGE_AUDIO,
    layout: DEFAULT_LAYOUT,
    permission: ['admin', 'user', 'guest'],
    meta: {
      icon: `${ICON_BASE_PATH}user.svg`,
      icon_active: `${ICON_BASE_PATH}more-active.svg`,
    },
  },
  {
    name: 'Configuration',
    key: PAGE_CONFIGURATION,
    layout: DEFAULT_LAYOUT,
    permission: ['admin', 'user', 'guest'],
    meta: {
      icon: `${ICON_BASE_PATH}user.svg`,
      icon_active: `${ICON_BASE_PATH}more-active.svg`,
    },
  },
  {
    name: 'CEC',
    key: PAGE_CEC,
    layout: DEFAULT_LAYOUT,
    permission: ['admin', 'user'],
    meta: {
      icon: `${ICON_BASE_PATH}user.svg`,
      icon_active: `${ICON_BASE_PATH}more-active.svg`,
    },
  },
  {
    name: 'RS232',
    key: PAGE_RS232,
    layout: DEFAULT_LAYOUT,
    permission: ['admin', 'user'],
    meta: {
      icon: `${ICON_BASE_PATH}user.svg`,
      icon_active: `${ICON_BASE_PATH}more-active.svg`,
    },
  },
  {
    name: 'Network',
    key: PAGE_NETWORK,
    layout: DEFAULT_LAYOUT,
    permission: ['admin', 'user'],
    meta: {
      icon: `${ICON_BASE_PATH}user.svg`,
      icon_active: `${ICON_BASE_PATH}more-active.svg`,
    },
  },
  {
    name: 'Upgrade',
    key: PAGE_UPGRADE,
    layout: DEFAULT_LAYOUT,
    permission: ['admin', 'user'],
    meta: {
      icon: `${ICON_BASE_PATH}user.svg`,
      icon_active: `${ICON_BASE_PATH}more-active.svg`,
    },
  },
  {
    name: 'Diagnostics',
    key: PAGE_DIAGNOSTICS,
    layout: DEFAULT_LAYOUT,
    permission: ['admin', 'user'],
    meta: {
      icon: `${ICON_BASE_PATH}user.svg`,
      icon_active: `${ICON_BASE_PATH}more-active.svg`,
    },
  },
  {
    name: 'Admin',
    key: PAGE_ADMIN,
    layout: DEFAULT_LAYOUT,
    permission: ['admin', 'user'],
    meta: {
      icon: `${ICON_BASE_PATH}user.svg`,
      icon_active: `${ICON_BASE_PATH}more-active.svg`,
    },
  },
]

// 导出系统配置
export const systemConfig: SystemConfig = {
  theme: 'dark', // 默认主题 dark | light
  currentLayout: DEFAULT_LAYOUT,
  currentPage: DEFAULT_PAGE,
  layouts: layoutConfigs,
  pages: pageConfigs,
  menus: menuConfigs,
}
