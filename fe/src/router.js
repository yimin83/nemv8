import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/rooms',
      name: 'rooms',
      component: () => import(/* webpackChunkName: "about" */ './views/rooms.vue')
    },
    {
      path: '/roomsConfig',
      name: 'roomsConfig',
      component: () => import(/* webpackChunkName: "about" */ './views/roomsConfig.vue')
    },
    {
      path: '/ahusConfig',
      name: 'ahus',
      component: () => import(/* webpackChunkName: "about" */ './views/ahus.vue')
    },
    {
      path: '/emsSysConfig',
      name: 'config',
      component: () => import(/* webpackChunkName: "about" */ './views/config.vue')
    },
    {
      path: '/trend',
      name: 'trend',
      component: () => import(/* webpackChunkName: "about" */ './views/trend.vue')
    },
    {
      path: '*',
      name: 'e404',
      component: () => import(/* webpackChunkName: "about" */ './views/e404.vue')
    }
  ]
})
