<template>
  <div class="row">
    <div v-for="item in columnList" :key="item.id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm" style="width: 18rem"> 
        <div class="card-body text-center">
          <img :src="item.avatar" alt="item.title" class="round-circle border border-light w-25 my-3" />
          <h5 class="card-title">{{ item.title }}</h5>
          <p class="card-text text-left">{{ item.description }}</p>
          <a href="#" class="btn btn-outline-primary">进入专栏</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from "@vue/reactivity";
import { defineComponent, PropType } from "vue";
export interface ColumnProps {
  id: number;
  title: string;
  avatar?: string;
  description: string;
}
export default defineComponent({
  name: "ColumnList",
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true,
    },
  },
  setup(props){
    const columnList = computed(()=>{
      return props.list.map(item=>{
        if(!item.avatar){
          item.avatar = require('@/assets/column.jpg')
        }
        return item;
      })
    })
    return {
      columnList
    }
  }
});
</script>
<style lang="less" scoped>
</style>
