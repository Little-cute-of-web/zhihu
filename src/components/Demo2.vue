<template>
  <teleport to="#modal">
    <div id="center" v-if="isShow">
      <h2><slot>this is a modal</slot></h2>
      <button @click="buttonClose">关闭</button>
      <hr>
      <h2 class="china">{{lang}}</h2>
    </div>
  </teleport>
</template>

<script lang="ts">
    import {defineComponent,inject} from 'vue';
    export default defineComponent({
    props:{
      isShow:Boolean
    },
    // emits:{
    //   'close-modal':(payload:any)=>{
    //     return payload.type==='close'
    //   }
    // },
    // setup(props,context){
    //   context.emit('close-modal',{
    //     type:'hello'
    //   })
    // }
    emits:{
      'close-modal':null
    },
    setup(props,context){
      const buttonClose =()=>{
        context.emit('close-modal')
      }
      //拿数据provide    这个会改原始定义的响应式数据
      const lang = inject('lang')
      return {
        buttonClose,
        lang
      }
    }
  })


</script>
<style lang="less" scoped>
#center {
  position: fixed;
  left: 50%;
  top: 50%;
  width: 200px;
  height: 200px;
  border: 2px solid #000;
  background-color: #fff;
  transform: translate(-50%, -50%);
}
.china{
  font-size: 66px;
}
</style>
