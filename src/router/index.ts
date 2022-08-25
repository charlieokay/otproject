import { Router, createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'



const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/pages/login/LoginView.vue')
  },
  {
    path: '/product',
    name: 'product',
    component: () => import(/* webpackChunkName: "product" */ '../views/pages/product/ProductGet.vue')
  },
  {
    path: '/dataresource',
    name: 'dataresource',
    component: () => import(/* webpackChunkName: "dataresource" */ '../views/pages/data/DataResource.vue')
  },
  {
    path: '/drawingfile',
    name: 'drawingfile',
    component: () => import(/* webpackChunkName: "dataresource" */ '../views/pages/data/DrawingFile.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') {
//     next();
//   } else {
//     const token = localStorage.getItem('Authorization');
//     if (token === null || token === '') {
//       next('/login');
//     } else {
//       next();
//     }
//   }
// });
export default router
