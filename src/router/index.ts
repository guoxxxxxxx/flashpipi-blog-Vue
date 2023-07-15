import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/components/home/Home.vue')
    },
    {
      name: 'article',
      path: '/article',
      component: () => import("@/components/article/Article.vue")
    },
    {
      path: '/archive',
      component: () => import("@/components/archive/Archive.vue")
    },
    {
      path: '/category',
      component: () => import("@/components/category/Category.vue")
    },
    {
      name: 'categoryDetail',
      path: '/categoryDetail',
      component: () => import("@/components/category/CategoryDetail.vue")
    },
    {
      path: '/collection',
      component: ()=> import("@/components/collection/Collection.vue")
    },
    {
      name: 'collectionDetail',
      path: '/collectionDetail',
      component: ()=> import("@/components/collection/CollectionDetail.vue")
    },
    {
      name: "manage",
      path: "/manage",
      component: ()=> import("@/components/manage/Manage.vue")
    },
    {
      name: "change",
      path: "/change",
      component: ()=> import("@/components/change/Change.vue")
    },
    {
      name: "upload",
      path: "/upload",
      component: ()=> import("@/components/change/Upload.vue")
    }
  ]
})

export default router
