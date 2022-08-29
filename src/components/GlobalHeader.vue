<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4">
    <a class="navbar-brand" href="#">知乎专栏</a>
    <ul v-if="!user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item">
        <a href="#" class="btn btn-outline-light my-2">登录</a>
        <a href="#" class="btn btn-outline-light my-2">注册</a>
      </li>
      <li class="list-inline-item">And another one.</li>
    </ul>
  </nav>
  div
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
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
});
</script>
<style lang="less" scoped></style>
