<template>
  <div class="row">
    <div v-for="item in columnList" :key="item._id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm" style="width: 18rem"> 
        <div class="card-body text-center">
          <img :src="item.avatar&&item.avatar.url" alt="item.title" class="round-circle border border-light my-3" />
          <h5 class="card-title">{{ item.title }}</h5>
          <p class="card-text text-left">{{ item.description }}</p>
          <!-- <router-link :to="{name:'column',params:{id:item.id}}" class="btn btn-outline-primary">进入专栏</router-link> -->
          <router-link :to="`/column/${item._id}`" class="btn btn-outline-primary">进入专栏</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from "@vue/reactivity";
import { defineComponent, PropType } from "vue";
import { ColumnProps } from "../store/index";
import {  generateFitUrl } from "../utils/fitUrl";
// export interface ColumnProps {
//   id: number;
//   title: string;
//   avatar?: string;
//   description: string;
// }
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
        // if(!item.avatar){
        //   // item.avatar = require('@/assets/column.jpg')
        //   item.avatar ={
        //     url:require('@/assets/column.jpg')
        //   }
        // }else{
        //   item.avatar.url = item.avatar.url+'?x-oss-process=image/resize,m_fixed,h_100,w_100'
        // }
        generateFitUrl(item,50,50)
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
  .card-body img {
    width: 50px;
    height: 50px;
  }
</style>
