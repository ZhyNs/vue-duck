import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Index from '@/blog/Index'
import BackIndex from '@/back/Index'
import BackHome from '@/back/Home'
import BackSaying from '@/back/saying/List'

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
  },{
    path: '/back/',
    component: BackHome,
    name: '经典语录',
    menuShow: true,
    children: [{
      path: '/back/saying', component: BackSaying, name: '语录列表', menuShow: true
    }]
  }]

let router = new Router({
  mode: 'history',
  base: '/duck/',
  routes
})

export default router
