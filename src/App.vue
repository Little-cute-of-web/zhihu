<template>
  <div class="container">
    <global-header :user="user"></global-header>
    <!-- <home></home> -->
    <!-- 换成loading组件 -->
    <!-- <h1 v-if = "isLoading">正在加载</h1> -->
    <!-- 测试Message组件 -->
    <message type="error" :message="error.message" v-if="error.status"></message>
    <loader v-if="isLoading" text="正在加载" background="rgba(0,0,0,.8)"></loader>
    <router-link to="/"></router-link>
    <router-link to="/login"></router-link>
    <router-view></router-view>
    <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline">
          <li class="list-inline-item">2020者专栏</li>
          <li class="list-inline-item">课程</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>
  </div>
</template>
<script lang="ts">
  //导入axios
  import axios from "axios";
import { defineComponent, computed, onMounted } from "vue";
//导入store
import { useStore } from "vuex";
//导入全局数据泛型
import { GlobalDataProps } from "./store";
//引入外部bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
//导入header组件
import GlobalHeader from "./components/GlobalHeader.vue";
//导入loading组件
import Loader from "./components/Loader.vue";
//导入home组件
// import Home from "./views/Home.vue";
//输入测试用户
// const testUser: UserProps = {
//   isLogin: false,
//   name: "one",
// };
//导入Message组件
import Message from './components/Message.vue'
export default defineComponent({
  name: "App",
  setup() {
    const store = useStore<GlobalDataProps>();  
    const user = computed(() => {
      return store.state.user;
    });
    const token = computed(()=>store.state.token)
    const error = computed(()=>store.state.error)
    const isLoading = computed(()=>store.state.isLoading)
    //错误信息提示
    // console.log('错误信息状态',error);
    
    // watch(()=>error.value.status,())
    onMounted(()=>{
      console.log(user.value.isLogin);
      if(!user.value.isLogin&&token.value){
        //设置请求头
        axios.defaults.headers.common.Authorization = `Bearer ${token.value}`
        //发送fetchCurrentUser请求  
        store.dispatch('fetchCurrentUser')

      }
    })
    return {
      user,
      isLoading,error
    };
  },
  components: {
    GlobalHeader,
    // Home
    Loader,
    Message
  },
});
</script>

<style lang="less">
// .list-inline{
//   display: flex;
// }
// .list-line-item{
//   flex:1;
// }
</style>
