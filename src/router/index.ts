import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const Home = ()=>import('../views/Home.vue');
const Login = ()=>import('../views/Login.vue')
const routes: Array<RouteRecordRaw> = [
  {
    path:'',
    redirect:'/home',
    component:Home,
    children:[]
  },{
    path:'/home',
    component:Home,
  },{
    path:'/login',
    component:Login,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
