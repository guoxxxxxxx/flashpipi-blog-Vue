import { createRouter, createWebHistory } from 'vue-router';
import { useStore } from '@/stores';
import { errTips } from '@/utils';
// @ts-ignore
import NProgress from 'nprogress';

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
      component: ()=> import("@/components/change/Upload.vue"),
    },
    {
      name: "error",
      path: "/error",
      component: ()=> import("@/components/others/Error.vue"),
    }
  ]
})

router.beforeEach((to, from, next)=>{
  // 开启顶部跳转动画
  NProgress.start();
  if(to.name == 'upload' || to.name == 'change' || to.name == 'manage'){
    const store = useStore();
    if(store.userInfo.id == 1){
      next();
    }
    else{
      errTips("无权访问！");
      router.replace({name: 'error'});
    }
  }
  else{
    next();
  }
})

router.afterEach(()=>{
  NProgress.done();
})

export default router
