import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/Login').default
    },
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/home',
      name: 'home',
      component: require('@/components/home/home').default
    }
  ]
})
