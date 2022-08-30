<template>
  <div class="home-page">
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <img src="../assets/callout.svg" alt="callout" class="w-50">
        <h2 class="font-weight-light">随心写作，自由表达</h2>
        <p>
          <a href="#" class="btn btn-primary my-2">开始写文章</a>
        </p>
      </div>
    </section>
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <column-list :list="list"></column-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
//导入组件
import ColumnList from "../components/ColumnList.vue";
//导入模拟数据columnlist
import testData from '../json/testData.json';
export default defineComponent({
  setup () {
    

    return {
      list:testData
    }
  },components:{
    ColumnList
  }
})
</script>

<style scoped>

</style>