<template>
  <div class='setup-sugger'>
   {{hello}}
  </div>
  <button @click="changeBtn">change it</button>
 </template>
 
 <script lang='ts' setup>
   import {ref} from 'vue';
   //组件导入直接使用
   let hello = ref('hello world')
   function changeBtn(){
     hello.value ='keep going on';
   }
 </script>
 <style lang='less' scoped>
 </style>