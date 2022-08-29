<template>
  <div class="container">
    <!-- <demo></demo> -->
    <!-- <demo2></demo2> -->
    <global-header :user="user"></global-header>
    <column-list :list="list"></column-list>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
//引入外部bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
//项目组件导入
import ColumnList, { ColumnProps } from "./components/ColumnList.vue";
import GlobalHeader,{UserProps} from './components/GlobalHeader.vue';
const testData: ColumnProps[] = [
  {
    id: 1,
    title: "test1专栏",
    description: "可以更新一下",
    avatar:
      "https://img2.baidu.com/it/u=2560207403,1062715832&fm=253&fmt=auto&app=120&f=JPEG?w=750&h=500",
  },
  {
    id: 12,
    title: "test2专栏",
    description: "可以更新一下2",
    // avatar:
    //   "https://img2.baidu.com/it/u=2560207403,1062715832&fm=253&fmt=auto&app=120&f=JPEG?w=750&h=500",
  },
];
const testUser: UserProps={
  isLogin:true,
  name:'one'
}
//之前练习组件导入
// import Demo from './components/Demo.vue';
// import Demo2 from './components/Demo2.vue';
export default defineComponent({
  name: "App",
  setup() {
    return {
      list: testData,
      user:testUser
    };
  },
  components: {
    ColumnList,
    GlobalHeader
  },
});
</script>

<style lang="less"></style>
