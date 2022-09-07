import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const Home = ()=>import('../views/Home.vue');
const Login = ()=>import('../views/Login.vue')
const ColumnDetail  =()=>import('../views/ColumnDetail.vue')
const CreatePost = ()=>import('../views/CreatePost.vue')
//导入store
import store from "../store";
const routes: Array<RouteRecordRaw> = [
  {
    path:'',
    redirect:'/home',
    name:'home',
    component:Home,
    children:[]
  },
  {
    path:'/home',
    name:'home',
    component:Home,
  },
  {
    path:'/login',
    name:'login',
    component:Login,
  },{
    path:'/column/:id',
    name:'column',
    component:ColumnDetail
  },{
    path:'/create',
    name:'create',
    component:CreatePost
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to,from,next)=>{
  if(to.name!=='login'&&!store.state.user.isLogin){
    next({name:'login'})
  }else{
     next()
  }
})
export default router
