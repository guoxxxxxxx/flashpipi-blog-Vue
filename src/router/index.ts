import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/components/home/Home.vue')
    },
    {
      path: '/article',
      component: () => import("../components/article/Article.vue")
    },
    {
      path: '/archive',
      component: () => import("../components/archive/Archive.vue")
    },
    {
      path: '/category',
      component: () => import("@/components/category/Category.vue")
    }
  ]
})

export default router
