<template>
<form class="validate-form-container">
  <slot name="default"></slot>
  <div class="submit-area" @click.prevent="submitForm">
    <slot name="submit">
      <button type="submit" class="btn btn-primary">提交</button>
    </slot>
  </div>
</form>
</template>

<script lang="ts">
import { defineComponent,onUnmounted } from 'vue'
//定义form-item-event类型
type ValidateFunc = () =>boolean
type Events ={
  'form-item-created':ValidateFunc
}

//导入mitt
import mitt from 'mitt';
//创建事件监听器
export const emitter = mitt<Events>();
export default defineComponent({
  emits:['form-submit'],
  setup (props,context) {
    let funcArr :ValidateFunc[]  = []
    const submitForm = ()=>{
      console.log(funcArr);     
      const result = funcArr.map(func=>func()).every(result=>result)
      context.emit('form-submit',result)
    }
    const callback = (func: ValidateFunc)=>{
      // console.log(test);
      funcArr.push(func)
      
    }
    emitter.on('form-item-created',callback)
    onUnmounted(()=>{
      emitter.off('form-item-created',callback)
      funcArr=[]
    })
    return {
      submitForm,
      // callback
    }
  },
  // mounted(){
  //   // this.$on('item-created',())
  //   emitter.on('form-item-created',callback)
  // }
})
</script>

<style scoped>

</style>