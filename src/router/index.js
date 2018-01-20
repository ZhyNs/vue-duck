import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/blog/Index'
import BackIndex from '@/back/Index'
import BackHome from '@/back/Home'
import BackBlog from '@/back/blog/List'
import BackBlogEdit from '@/back/blog/Edit'
import BackSaying from '@/back/saying/List'

Vue.use(Router)

const routes = [
  {
    path: '/', redirect: '/index'
  },{
    path: '/index', name: 'index', component: Index
  },{
    path: '/back', redirect: '/back/index'
  },{
    path: '/back/index', name: 'backIndex', component: BackIndex
  },{
    path: '/back/home', name: 'backHome', component: BackHome
  },{
    path: '/back',
    component: BackHome,
    name: 'back',
    menuShow: true,
    children: [
      { path: 'blog', component: BackBlog, name: 'backBlog' },
      { path: '/back/blog/edit', components: { home_container: BackBlogEdit }, name: 'backBlogEdit' },
      { path: 'saying', component: BackSaying, name: 'backSaying' }
    ]
  }]

let router = new Router({
  mode: 'history',
  base: '/duck/',
  routes
})

export default router
