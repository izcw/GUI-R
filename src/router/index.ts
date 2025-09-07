import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
      // component: () => import('@/layouts/LayoutResolver.vue'),
      // children: [
      //   {
      //     path: '',
      //     component: () => import('@/views/About/index.vue'),
      //     meta: { layout: 'main' },
      //   },
      //   {
      //     path: '/settings',
      //     component: () => import('@/views/User/index.vue'),
      //     meta: { layout: 'leftRight' },
      //   },
      //   {
      //     path: '/login',
      //     component: () => import('@/views/login/index.vue'),
      //     meta: { layout: 'blank' },
      //   },
      // ],
    },
  ],
})

export default router
