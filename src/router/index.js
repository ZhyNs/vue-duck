import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Index from '@/blog/Index'
import BackIndex from '@/back/Index'

Vue.use(Router)

const routes = [
  {
    path: '/', name: 'index', component: Index
  },{
    path: '/index', name: 'index', component: Index
  },{
    path: '/back/index', name: 'backIndex', component: BackIndex
  }]

export default new Router({
  mode: 'history',
  base: '/duck',
  routes
})
