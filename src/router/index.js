import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Index from '@/blog/Index'
import BackIndex from '@/back/Index'
import BackHome from '@/back/Home'

Vue.use(Router)

const routes = [
  {
    path: '/', name: 'index', component: Index
  },{
    path: '/index', name: 'index', component: Index
  },{
    path: '/back/index', name: 'backIndex', component: BackIndex
  },{
    path: '/back/home', name: 'backHome', component: BackHome
  }]

let router = new Router({
  mode: 'history',
  base: '/duck/',
  routes
})

export default router
