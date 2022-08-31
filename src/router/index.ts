import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
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
    component: () => import(/* webpackChunkName: "product" */ '../views/pages/product/ProductView.vue')
  },
  {
    path: '/process',
    name: 'process',
    component: () => import(/* webpackChunkName: "dataresource" */ '../views/pages/process/ProcessView.vue')
  },
  {
    path: '/drawingfile',
    name: 'drawingfile',
    component: () => import(/* webpackChunkName: "dataresource" */ '../views/pages/drawingfile/DrawingFile.vue')
  },
  {
    path: '/checkinout',
    name: 'checkinout',
    component: () => import(/* webpackChunkName: "dataresource" */ '../views/pages/checkinout/CheckinOut.vue')
  },
  {
    path: '/orderlist',
    name: 'orderlist',
    component: () => import(/* webpackChunkName: "dataresource" */ '../views/pages/orderlist/OrderList.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
