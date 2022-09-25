<template>
<div class="column-detail-page w-75 mx-auto">
  <div class="column-info row mb-4 border-bottom pb-4 align-items-center">
    <div class="col-3 text-center">
      <img :src="column?.avatar.url" :alt="column?.title" class="rounded-circle w-100">
    </div>
    <div class="col-9">
      <h4>{{column?.title}}</h4>
      <p class="text-muted">{{column?.description}}</p>
    </div>
  </div>
  <post-list :list="list"></post-list>
</div>
</template>

<script lang="ts">
import { defineComponent,computed,onMounted} from 'vue'
import { useRoute } from "vue-router";
//导入store
import { useStore } from "vuex";
//导入store数据泛型
import { GlobalDataProps } from "../store";
// import { testData,testPosts } from "../json/testData";
//导入组件
import PostList from "../components/PostList.vue";

export default defineComponent({
  name:'ColumnDetail',
  setup () {
    const store = useStore<GlobalDataProps>()
    const route = useRoute()
    //获取总的columns
    // const columns = computed(()=>{
    //   return store.state.columns
    // })
    //获取所有的postList数据
    // const posts = computed(()=>{
    //   return store.state.posts
    // })
    const currentId = route.params.id

    // const column = columns.value.find(item=>item.id===currentId)
    // const list = posts.value.filter(post=>post.columnId===currentId)
    onMounted(()=>{
      store.dispatch('fetchColumn',currentId)
      store.dispatch('fetchPosts',currentId)
    })
    //使用getters
    const column = computed(() => {
      let res =store.getters.getColumnsById(currentId)
      return res;
    })
    const list = computed(()=>{
      let res = store.getters.getPostsByCid(currentId)
      return res;
    })
    return {
      route,
      column,
      list
    }
  },
  components:{
    PostList
  }
})
</script>

<style scoped>

</style>