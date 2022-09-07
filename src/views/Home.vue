<template>
  <div class="home-page">
    <section class="py-3 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../assets/callout.svg" alt="callout" class="w-50" />
          <h5 class="font-weight-light">随心写作，自由表达</h5>
          <p>
            <a  class="btn btn-primary my-2">开始写文章</a>
          </p>
        </div>
      </div>
    </section>
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <column-list :list="list"></column-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
//导入store
import { useStore } from "vuex";
//导入全局数据泛型
import { GlobalDataProps } from "../store";
//导入组件
import ColumnList from "../components/ColumnList.vue";
//导入模拟数据columnList
// import {testData} from "../json/testData";
export default defineComponent({
  name: "Home",
  setup() {
    const store = useStore<GlobalDataProps>();
    const list = computed(() => {
      return store.state.columns;
    });
    //id >2 的文章
    const bigColumnsLen = computed(()=>{
      return store.getters.bigColumnsLen
    })
    return {
      list,
      bigColumnsLen
    };
  },
  components: {
    ColumnList,
  },
});
</script>

<style scoped></style>
