import { COMPLETIONSTATEMENT_TYPES } from '@babel/types'
import axios from 'axios'
import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

//请求
axios.defaults.baseURL = 'http://apis.imooc.com/api';
axios.interceptors.request.use(config => {
  store.commit('setLoading', true)
  store.commit('setError',{status:false,message:''})
  config.params = { ...config.params, icode: '02A7EB03BD05C575' }
  //其他请求添加到body
  //上传文件，添加到FormData
  if (config.data instanceof FormData) {
    config.data.append('icode', '02A7EB03BD05C575')
  } else {
    //普通的body对象，添加到data
    config.data = { ...config.data, icode: '02A7EB03BD05C575' }
  }
  return config;
})
axios.interceptors.response.use(config => {
  store.commit('setLoading', false)
  return config;
}, e => {
  const { error } = e.response.data
  //设置错误信息
  store.commit('setError', { status: true, message: error })
  //将加载状态设为false
  store.commit('setLoading', false)
  //官网上
  return Promise.reject(error)
})
// axios.get('/columns?',{params:{key:'hello'}}).then(res=>{
//   console.log(res.data);

// })
const app = createApp(App);
// app.provide('currentUser',{name:'one'});
app.use(store).use(router).mount('#app')
