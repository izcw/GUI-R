import { fileURLToPath, URL } from 'node:url'
import { defineConfig, type PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import imagemin from 'vite-plugin-imagemin'
import { visualizer } from 'rollup-plugin-visualizer'

import AutoImport from 'unplugin-auto-import/vite' // 自动导入插件
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers' // Element Plus 解析器

export default defineConfig({
  plugins: [
    vue() as PluginOption,
    vueDevTools() as PluginOption,
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    // 可视化打包分析工具
    // visualizer({
    //   open: true,
    //   filename: 'bundle-stats.html',
    //   gzipSize: true,
    //   brotliSize: true,
    // }) as PluginOption,

    // 图片优化配置
    imagemin({
      gifsicle: { optimizationLevel: 7 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
      pngquant: { quality: [0.8, 0.9] },
      svgo: {
        plugins: [{ name: 'removeViewBox' }, { name: 'removeEmptyAttrs', active: false }],
      },
    }),
  ],
  server: {
    port: 3033,
    host: true,
    open: false,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  build: {
    // 启用更高效的文件输出模式
    reportCompressedSize: false, // 不显示压缩后大小，减少构建输出噪音
    chunkSizeWarningLimit: 1000, // 提高chunk大小警告阈值

    // 内联小于4KB的资源
    assetsInlineLimit: 4096,

    // 启用代码压缩
    minify: 'terser',

    // 详细压缩配置
    terserOptions: {
      compress: {
        // 移除所有console打印
        drop_console: true,
        // 移除所有debugger语句
        drop_debugger: true,
        // 移除未使用的变量和方法
        unused: true,
        // 移除死代码
        dead_code: true,
        // 其他优化选项
        booleans: true, // 优化布尔表达式
        conditionals: true, // 优化条件表达式
        evaluate: true, // 计算常量表达式
        if_return: true, // 优化if-return结构
        join_vars: true, // 合并变量声明
        loops: true, // 优化循环
        reduce_vars: true, // 减少变量使用
        sequences: true, // 合并简单语句
        side_effects: true, // 移除无副作用的代码
        passes: 3, // 多次压缩优化
      },
      format: {
        // 移除所有注释
        comments: false,
      },
      // 其他优化
      mangle: {
        properties: {
          // 混淆私有属性
          regex: /^_/,
        },
      },
      toplevel: true, // 优化顶级作用域
    },

    // Rollup配置
    rollupOptions: {
      output: {
        // 更智能的代码分割
        manualChunks: (id: string) => {
          if (id.includes('node_modules')) {
            // 将大型库单独打包
            if (id.includes('element-plus')) return 'element-plus'
            if (id.includes('vue')) return 'vue'
            if (id.includes('axios')) return 'axios'
            if (id.includes('lodash')) return 'lodash'
            if (id.includes('moment')) return 'moment'
            if (id.includes('echarts')) return 'echarts'

            // 其他依赖打包到vendor
            return 'vendor'
          }

          return 'index'
        },

        // 优化文件名
        entryFileNames: 'static/js/[name]-[hash:8].js',
        chunkFileNames: 'static/js/[name]-[hash:8].js',

        // 生成预加载指令
        generatedCode: {
          preset: 'es5',
          arrowFunctions: false,
        },

        // 资源文件处理
        assetFileNames: (assetInfo: { name?: string }): string => {
          const name = assetInfo.name || ''
          const extType = name.split('.').pop()?.toLowerCase() || ''

          // 处理worker文件
          if (name.includes('.worker') && extType === 'js') {
            return 'static/js/[name]-[hash:8][extname]'
          }

          // CSS文件处理
          if (/css/i.test(extType)) {
            return 'static/css/[name]-[hash:8][extname]'
          }

          // 字体文件处理
          if (/woff|woff2|eot|ttf|otf/i.test(extType)) {
            return 'static/font/[name]-[hash:8][extname]'
          }

          // 图标文件处理
          if (/ico/i.test(extType)) {
            return '[name][extname]'
          }

          // 其他资源处理
          return 'static/assets/[name]-[hash:8][extname]'
        },
      },
    },
  },
})
