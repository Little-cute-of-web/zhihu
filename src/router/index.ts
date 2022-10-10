import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
//导入axios
import axios from "axios"
const Home = () => import('../views/Home.vue')
const Login = () => import('../views/Login.vue')
const Sign = ()=>import('../views/SignUp.vue')
const ColumnDetail = () => import('../views/ColumnDetail.vue')
const CreatePost = () => import('../views/CreatePost.vue')
//导入store
import store from "../store";
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    // redirect:'/home',
    name: 'home',
    component: Home,
    children: []
  },
  // {
  //   path: '/home',
  //   name: 'home',
  //   component: Home,
  // },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { redirectAlreadyLogin: true }
  }, {
    path: '/sign',
    name: 'sign',
    component: Sign,
    // meta: { redirectAlreadyLogin: true }
  },{
    path: '/column/:id',
    name: 'column',
    component: ColumnDetail
  }, {
    path: '/create',
    name: 'create',
    component: CreatePost,
    meta: {
      requiredLogin: true
    }
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  // if (to.meta.requiredLogin && !store.state.user.isLogin) {
  //   next({ name: 'login' })
  // } else if (to.meta.redirectAlreadyLogin && store.state.user.isLogin) {
  //   next('/home')
  // } else {
  //   next()
  // }
  const {user,token}  = store.state;
  const {requiredLogin,redirectAlreadyLogin} = to.meta;
  if(!user.isLogin){
    if(token){
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
      store.dispatch('fetchCurrentUser').then(()=>{
        if(redirectAlreadyLogin){
          next('/')
        }else{
          next()
        }
      }).catch(e=>{
        //此时token不好用，需要把token删去
        console.error(e);
        store.commit('logout')
        // localStorage.removeItem('token')
        next('login')
      })
    }else{
      if(requiredLogin){
        next('login')
      }else{
        next()
      }
    }
  }else if(redirectAlreadyLogin){
    next('/')
  }else{
    next()
  }
})
export default router
