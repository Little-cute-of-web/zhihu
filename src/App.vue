<template>
  <div class="container">
    <global-header :user="user"></global-header>
    <!-- <home></home> -->
    <h1 v-if = "isLoading">正在加载</h1>
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
import { defineComponent, computed } from "vue";
//导入store
import { useStore } from "vuex";
//导入全局数据泛型
import { GlobalDataProps } from "./store";
//引入外部bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
//导入header组件
import GlobalHeader from "./components/GlobalHeader.vue";
//导入home组件
// import Home from "./views/Home.vue";
//输入测试用户
// const testUser: UserProps = {
//   isLogin: false,
//   name: "one",
// };

export default defineComponent({
  name: "App",
  setup() {
    const store = useStore<GlobalDataProps>();
    const user = computed(() => {
      return store.state.user;
    });
    const isLoading = computed(()=>store.state.isLoading)
    return {
      user,
      isLoading
    };
  },
  components: {
    GlobalHeader,
    // Home
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
