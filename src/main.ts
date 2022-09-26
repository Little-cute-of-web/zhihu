import axios from 'axios'
import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

//请求
axios.defaults.baseURL = 'http://apis.imooc.com/api';
axios.interceptors.request.use(config=>{
  store.commit('setLoading',true)
  config.params = {...config.params,icode:'02A7EB03BD05C575'}
  //其他请求添加到body
  //上传文件，添加到FormData
  if(config.data instanceof FormData){
    config.data.append('icode','02A7EB03BD05C575')
  }else{
    //普通的body对象，添加到data
    config.data = {...config.data,icode:'02A7EB03BD05C575'}
  }
  return config;
})
axios.interceptors.response.use(config=>{
  store.commit('setLoading',false)
  return config;
})
// axios.get('/columns?',{params:{key:'hello'}}).then(res=>{
//   console.log(res.data);
  
// })
const app =createApp(App);
// app.provide('currentUser',{name:'one'});
app.use(store).use(router).mount('#app')
