import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const Home = ()=>import('../views/Home.vue');
const Login = ()=>import('../views/Login.vue')
const ColumnDetail  =()=>import('../views/ColumnDetail.vue')
const routes: Array<RouteRecordRaw> = [
  {
    path:'/',
    name:'home',
    component:Home,
    children:[]
  },
  // {
  //   path:'/home',
  //   name:'home',
  //   component:Home,
  // },
  {
    path:'/login',
    name:'login',
    component:Login,
  },{
    path:'/column/:id',
    name:'column',
    component:ColumnDetail
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
