import { createPinia } from 'pinia'
import { type App } from 'vue'

const pinia = createPinia()

export function setupStore(app: App) {
  app.use(pinia)
}

export * from './system'
export * from './user'
export * from './auth'
export default pinia
