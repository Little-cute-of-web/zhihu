<template>
  <div class="validate-input-container pb-3">
    <input class="form-control"
    :class="{'is-invalid':inputRef.error}"
    :value="inputRef.val"
    @blur="validateInput"
    @input="updateValue"
    v-bind="$attrs"
    >
    <span v-if="inputRef.error" class="invalid-feedback">{{inputRef.message}}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent,reactive,PropType,onMounted } from 'vue'
//导入父组件mitt
import {emitter} from './ValidateForm.vue';
//邮箱
const emailReg =  /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
interface RuleProp {
  type:'required' | 'email' | 'password';
  message:string;
}
export type RulesProps = RuleProp[];
//密码
const passwordReg =  /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;
export default defineComponent({
  props:{
    rules: Array as PropType<RulesProps>,
    modelValue:String
  },
  //禁止继承attrs
  inheritAttrs:false,

  setup (props,context) {
    const inputRef  =reactive({
      val:props.modelValue || '',
      error:false,
      message:''

    })
    const validateInput = ()=>{
      if(props.rules){
        const allPassed = props.rules.every(rule=>{
          let passed = true
          inputRef.message  =rule.message
          switch (rule.type) {
            case "required":
              passed =(inputRef.val.trim()!=='')
              break;
            case 'email':
              passed=emailReg.test(inputRef.val)
              break;
            case 'password':
              passed=passwordReg.test(inputRef.val)
              break;
            default:
              break;
          }
          // console.log(passed);
          
          return passed
        })
        inputRef.error  =!allPassed;
        return allPassed;
      }
      return true;
    }
    const updateValue=(e: Event)=>{
      const targetValue = (e.target as HTMLInputElement).value;
      inputRef.val = targetValue;
      context.emit('update:modelValue',targetValue)
    }
    onMounted(()=>{
      // console.log();     
      emitter.emit('form-item-created',validateInput)
    })

    return {
      inputRef,
      validateInput,
      updateValue
    }
  }
})
</script>

<style scoped>

</style>