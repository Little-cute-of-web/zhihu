<template>
  <li class="dropdown-option" :class="{ 'is-disabled': disabled }">
      <slot></slot>
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
<style lang="less" scoped>
:slotted(.is-disabled.dropdown-option *) {
  color: #6c757d;
  pointer-events: none;
  background-color: transparent;
}
// .dropdown-item{
//   color:#f00;
// }
</style>
