<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4">
    <a class="navbar-brand" href="#">知乎专栏</a>
    <ul v-if="!user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item">
        <a href="#" class="btn btn-outline-light my-2">登录</a>
      </li>
      <li class="list-inline-item">
        <a href="#" class="btn btn-outline-light my-2">注册</a>
      </li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item">
        <!-- <a href="#" class="btn btn-outline-light my-2">你好，{{ user.name }}</a> -->
        <drop-down :title="`你好，${user.name}`"></drop-down>
      </li>
    </ul>
    
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
//导入组件
import DropDown from './DropDown.vue';
export interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}
export default defineComponent({
  name: "GlobalHeader",
  props: {
    user: {
      type: Object as PropType<UserProps>,
      require: true,
    },
  },
  components:{
    DropDown
  }
});
</script>
<style lang="less" scoped>
  .navbar{
    padding:0 20px;
  }
</style>
