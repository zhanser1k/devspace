import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/brief',
      name: 'brief',
      component: () => import('@/views/Brief.vue'),
    },
  ],
})

export default router
