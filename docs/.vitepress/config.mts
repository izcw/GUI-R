import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: './src',
  title: 'GUIElement-PTN 文档',
  description: 'GUI重构',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: '指南', link: '/guide' },
      { text: '组件', link: '/component' },
      { text: '1.0.0', link: '' },
    ],

    sidebar: [
      {
        text: '指南',
        items: [
          { text: '路由', link: '/guide/route' },
          { text: '主题', link: '/guide/theme' },
          { text: '国际化', link: '/guide/i18n' },
        ],
      },
      {
        text: '基础组件',
        items: [
          { text: 'Button 按钮', link: '/component/base/Button' },
          { text: 'Switch 开关', link: '/component/base/Switch' },
          { text: 'Radio 单选框', link: '/component/base' },
          { text: 'Checkbox 多选框', link: '/component/base' },
          { text: 'Input 输入框', link: '/component/base' },
          { text: 'Select 选择器', link: '/component/base' },
          { text: 'Slider 滑块', link: '/component/base' },
          { text: 'Upload 上传器', link: '/component/base' },
        ],
      },
      {
        text: '反馈组件',
        items: [
          { text: 'Alert 提示', link: '/component/dialog/Alert' },
          { text: 'Dialog 对话框', link: '/component/dialog' },
          { text: 'Loading 加载', link: '/component/dialog' },
          { text: 'Tooltip 文字提示', link: '/component/dialog' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
      {
        icon: {
          svg: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16" enable-background="new 0 0 16 16" xml:space="preserve">  <image id="image0" width="16" height="16" x="0" y="0"xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAACTUExURTCoXuDy5+v27+Lz6I3Ppq/dwPn9+/D59Oz38Mvp13rHl/3+/f///6nbvMDkzn7Jm7viykSxbly6gH/Jm/n8+uf17J3Ws6zcv2/Cj/P69pDQqZvVsZrVsaHXtrHewtLs3Mrp1uPz6kuzc+748tbu357WtKbZuqjau6TZuHvImTaqYpLRqvv9/Kvcvd/x5vT69pnUrwUaBYUAAAABYktHRAyBs1FjAAAAB3RJTUUH6QkWAy8t0HhQmQAAAGlJREFUGNNjYCALMDIxs7CysXNwckEFuHl4ePl4QIAfIgBkCQgKCYvw8IhCBMR4xSWAFDsPjyREQEpaRlaOVR6oUAGuBQIUlSACyjw8Kqpq6hqaWgxwAW0Ud+jw8OiiCOjp6xuQ5yUIAABKKgZ40DCI1wAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyNS0wOS0yMlQwMzo0Nzo0NSswMDowMPN3nCMAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjUtMDktMjJUMDM6NDc6NDUrMDA6MDCCKiSfAAAAKHRFWHRkYXRlOnRpbWVzdGFtcAAyMDI1LTA5LTIyVDAzOjQ3OjQ1KzAwOjAw1T8FQAAAAABJRU5ErkJggg==" /></svg>',
        },
        link: 'https://www.putron.com',
      },
    ],
  },
})
