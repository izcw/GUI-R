// vitest.config.ts
import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import type { UserConfig } from 'vite'

// 使用异步方式导入配置
export default defineConfig(async () => {
  const viteConfig = await import('./vite.config').then((m) => m.default)

  return mergeConfig(
    viteConfig as UserConfig,
    defineConfig({
      test: {
        environment: 'jsdom',
        exclude: [...configDefaults.exclude, 'e2e/**'],
        root: fileURLToPath(new URL('./', import.meta.url)),
      },
    }),
  )
})
