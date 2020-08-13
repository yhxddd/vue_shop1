import Vue from 'vue'
import VueRouter from 'vue-router'
/*
import login from '../components/login.vue'
import home from '../components/home.vue'
import welcome from '../components/welcome.vue'
import users from '../components/User/users.vue'
import roles from '../components/Power/roles.vue'
import rights from '../components/Power/rights.vue'
import cates from '../components/Goods/cates.vue'
import params from '../components/Goods/params.vue'
import goodList from '../components/Goods/list.vue'
import add from '../components/Goods/add.vue'
import order from '../components/Order/order.vue'
import report from '../components/Report/report.vue'
*/
const login = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/login.vue')
const home = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/home.vue')
const welcome = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/welcome.vue')
const users = () => import(/* webpackChunkName: "users_rights_roles" */ '../components/User/users.vue')
const rights = () => import(/* webpackChunkName: "users_rights_roles" */ '../components/Power/rights.vue')
const roles = () => import(/* webpackChunkName: "users_rights_roles" */ '../components/Power/roles.vue')
const cates = () => import(/* webpackChunkName: "cates_params" */ '../components/Goods/cates.vue')
const params = () => import(/* webpackChunkName: "cates_params" */ '../components/Goods/params.vue')
const goodList = () => import(/* webpackChunkName: "goodList_add" */ '../components/Goods/list.vue')
const add = () => import(/* webpackChunkName: "goodList_add" */ '../components/Goods/add.vue')
const order = () => import(/* webpackChunkName: "order_report" */ '../components/Order/order.vue')
const report = () => import(/* webpackChunkName: "order_report" */ '../components/Report/report.vue')

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/login',
    component: login
  },
  {
    path: '/home',
    component: home,
    children: [
      { path: '/welcome', component: welcome },
      { path: '/users', component: users },
      { path: '/roles', component: roles },
      { path: '/rights', component: rights },
      { path: '/categories', component: cates },
      { path: '/params', component: params },
      { path: '/goods', component: goodList },
      { path: '/goods/add', component: add },
      { path: '/orders', component: order },
      { path: '/reports', component: report }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
