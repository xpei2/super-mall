import Vue from 'vue'
import VueRouter from 'vue-router'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('_vie/home/Home.vue')
  },
  {
    path: '/category',
    component: () => import('_vie/category/Category')
  },
  {
    path: '/cart',
    component: () => import('_vie/cart/Cart')
  },
  {
    path: '/profile',
    component: () => import('_vie/profile/Profile')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
