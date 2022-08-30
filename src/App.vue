<template>
  <div class="container">
    <global-header :user="user"></global-header>
    <!-- <home></home> -->
    <router-link to="/home"></router-link>
    <router-link to="/login"></router-link>
    <router-view></router-view>
    <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-line-item">2020者专栏</li>
          <li class="list-line-item">课程</li>
          <li class="list-line-item">文档</li>
          <li class="list-line-item">联系</li>
          <li class="list-line-item">更多</li>
        </ul>
      </small>
    </footer>
  </div>
</template>
<script lang="ts">
import { defineComponent} from "vue";
//引入外部bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
//导入header组件
import GlobalHeader ,{ UserProps } from "./components/GlobalHeader.vue";
//导入home组件
// import Home from "./views/Home.vue";
//输入测试用户
const testUser: UserProps = {
  isLogin: true,
  name: "one",
};
export default defineComponent({
  name: "App",
  setup() {

    return {
      user:testUser
    };
  },
  components: {
    GlobalHeader,
    // Home
  },
});
</script>

<style lang="less"></style>
