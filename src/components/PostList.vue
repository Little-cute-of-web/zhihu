<template>
  <div class="post-list">
    <article  v-for="post in posts"  
    class="card mb-3 shadow-sm" 
    :key="post?._id">
      <div class="card-body">
        <!-- <h4>{{post.title}}</h4> -->
        <h4><router-link :to="`/posts/${post._id}`">{{post.title}}</router-link></h4>
        <div class="row my-3 align-items-center"> 
          <div v-if="post.image" class="col-4">
            <img :src="post.image.fitUrl" alt="post.title" class="round-lg w-50">
          </div>
          <p :class="{'col-8':post.image}" class="text-muted">{{post.excerpt}}</p>
        </div>
        <span class="text-muted">{{post.createdAt}}</span>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent ,PropType,computed} from 'vue'

//导入PostProps
// import { PostProps } from "../json/testData";
import { PostProps ,ImageProps} from "../store/index";
import {generateFitUrl} from '../utils/fitUrl';
export default defineComponent({
  props:{
    list:{
      required:true,
      type:Array as PropType<PostProps[]>
    }
  },
  setup (props) {
    const posts = computed(()=>{
      return props.list.map(post=>{
        generateFitUrl(post.image as ImageProps,200,110,['m_fill'])
        return post
      })
      
      
    })
    return {
      posts
    }
  }
})
</script>

<style scoped>

</style>