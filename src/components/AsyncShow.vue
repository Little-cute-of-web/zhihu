<template>
 <h1>{{res}}</h1>
</template>

<script lang='ts'>
  import {defineComponent} from 'vue';
  export default defineComponent({
    setup(){
      return new Promise((resolve)=>{
        setTimeout(()=>{
          return resolve({
            res:888
          })
        },3000)
      })
    }
  })
</script>
<style lang='less' scoped>
</style>