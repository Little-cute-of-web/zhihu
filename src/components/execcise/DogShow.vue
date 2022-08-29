<template>
 <img :src="res && res.message" alt="">
</template>

<script lang='ts'>
  import axios from 'axios';
  import {defineComponent} from 'vue';
  export default defineComponent({
    async setup(){
      const rawData = await axios.get('https://dog.ceo/api/breeds/image/random');
      console.log(rawData);
      
      return {
        res:rawData.data
      }
    }
  })
</script>
<style lang='less' scoped>
</style>