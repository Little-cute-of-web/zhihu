<template>
  <div
    class="d-flex justify-content-center align-items-center h-100 loading-container"
  >
    <div class="loading-content">
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  export default defineComponent({
    props:{
      text:{
        type:String
      },
      background:{
        type:String
      }
    }
  })
</script>

<style scoped>
  .loading-container{
    background: rgba(255,255,255,.5);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    z-index: 100;
  }
</style>
