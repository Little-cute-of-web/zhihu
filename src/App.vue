<template>
  <div class="container">
    <global-header :user="user"></global-header>
    <home></home>
  </div>
</template>
<script lang="ts">
import { defineComponent} from "vue";
//引入外部bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
//导入header组件
import GlobalHeader ,{ UserProps } from "./components/GlobalHeader.vue";
//导入home组件
import Home from "./views/Home.vue";
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
    Home
  },
});
</script>

<style lang="less"></style>
