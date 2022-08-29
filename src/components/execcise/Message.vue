<template>
 <div class='message'>
  <!-- <h1>{{text}}</h1> -->
  <h1>{{user.name}}</h1>
  <h1>{{user.age}}</h1>
  <!-- <button @click="onChange">发送数据</button> -->
  <button @click="changeName">查看username</button>
 </div>
</template>

<script lang='ts' setup>
  import {defineProps,defineEmits} from 'vue';
  interface UserAccount {
    name: string;
    age:number;
  }
  //定义事件
  interface IEvents {
    (e:'changeName',name:string):void;
  }
  const props = defineProps<{user: UserAccount}>(
    // text:String
    //不行
    // user: UserAccount
  )
  // const emit = defineEmits(['showText','changeName'])
  //interface 定以后defineEmit写法
  const emit = defineEmits<IEvents>()
  // const onChange = ()=>{
  //   // emit('showText',props.text)
  //   emit('showText',props.user.name)
  // }
  const changeName =()=>{
    emit('changeName',props.user.name)
  }
</script>
<style lang='less' scoped>
</style>