import Vue from 'vue'
import VueRouter from 'vue-router'

// 重写路由push方法,阻止重复点击报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
// 重写路由replace方法,阻止重复点击报错
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err)
}

Vue.use(VueRouter)


// 正常路由加载,会将所有路由的js跟css合并到一个文件
import Home from '_vie/home/Home'
import Category from '_vie/category/Category'
import Cart from '_vie/cart/Cart'
import Profile from '_vie/profile/Profile'
import Detail from '_vie/detail/Detail'
import Collect from '_vie/collect/Collect'

const routes = [{
        path: '*',
        redirect: '/'
    },
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/category',
        name: 'category',
        component: Category
    },
    {
        path: '/cart',
        name: 'cart',
        component: Cart
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile
    },
    {
        path: '/detail/:id',
        name: 'detail',
        component: Detail
    },
    {
        path: '/collect',
        name: 'collect',
        component: Collect
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.NODE_ENV === "production" ? "/super" : "/",
    routes
})
export default router
