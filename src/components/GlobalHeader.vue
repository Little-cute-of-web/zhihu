<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4">
    <router-link to="/home" class="navbar-brand">知乎专栏</router-link>
    <ul v-if="!user!.isLogin" class="list-inline mb-0">
      <li class="list-inline-item">
        <router-link to="/login" class="btn btn-outline-light my-2">登录</router-link>
      </li>
      <li class="list-inline-item">
        <router-link to="/login" class="btn btn-outline-light my-2">注册</router-link>
      </li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item">
        <!-- <a href="#" class="btn btn-outline-light my-2">你好，{{ user.name }}</a> -->
        <drop-down :title="`你好，${user!.name}`">
          <dropdown-item><router-link to="/create" class="dropdown-item">新建文章</router-link></dropdown-item>
          <dropdown-item disabled><a class="dropdown-item" href="#">编辑资料</a></dropdown-item>
          <dropdown-item><a class="dropdown-item" href="#">退出登录</a></dropdown-item>
        </drop-down>
      </li>
    </ul>
    
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
//导入组件
import DropDown from './DropDown.vue';
import DropdownItem from './DropdownItem.vue';
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
    DropDown,
    DropdownItem
  }
});
</script>
<style lang="less" scoped>
  .navbar{
    padding:0 20px;
  }
</style>
