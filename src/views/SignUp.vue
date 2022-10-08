<template>
  <div class="container">
    <validate-form @form-submit="formSubmit">
      <div class="mb-3">
        <label class="form-label">Email address</label>
        <validate-input
          autocomplete="userEmail"
          :rules="emailRules"
          v-model="formData.emailVal"
          type="text"
          placeholder="请输入邮箱地址"
          ref="inputRef"
        ></validate-input>
      </div>
      <div class="mb-3">
        <label class="form-label">username</label>
        <validate-input
          autocomplete="username"
          :rules="nameRules"
          v-model="formData.nameVal"
          type="text"
          placeholder="请输入姓名格式"
          ref="inputRef"
        ></validate-input>
      </div>
      <div class="mb-3">
        <label class="form-label">password</label>
        <validate-input
          autocomplete="password"
          :rules="passwordRules"
          v-model="formData.passwordVal"
          type="text"
          placeholder="请输入密码"
          ref="inputRef"
        ></validate-input>
      </div>
      <div class="mb-3">
        <label class="form-label">repeat password</label>
        <validate-input
          autocomplete="password"
          :rules="repeatPasswordRules"
          v-model="formData.repeatPassword"
          type="text"
          placeholder="请再次输入密码"
          ref="inputRef"
        ></validate-input>
      </div>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import ValidateForm from "@/components/ValidateForm.vue";
import ValidateInput, { RulesProps } from "@/components/ValidateInput.vue";
import axios from "axios";
import createMessage from "../components/createMessage";
import router from "@/router";
export default defineComponent({
  setup() {
    const formData = reactive({
      emailVal: "",
      nameVal: "",
      passwordVal: "",
      repeatPassword: "",
    });
    const emailRules: RulesProps = [
      {
        type: "required",
        message: "电子邮箱不能为空",
      },
      {
        type: "email",
        message: "请输入正确格式",
      },
    ];
    const nameRules: RulesProps = [
      {
        type: "required",
        message: "用户名不能为空",
      },
    ];
    const passwordRules: RulesProps = [
      {
        type: "required",
        message: "密码不能为空",
      },
      {
        type: "password",
        message: "包含大小写字母和数字，至少4位~",
      },
    ];
    const repeatPasswordRules: RulesProps = [
      {
        type: "required",
        message: "重复密码不能为空",
      },
      {
        type:"custom",
        validator:()=>{
          return formData.passwordVal===formData.repeatPassword
        },
        message:"两次输入密码不一致~"
      }
    ];
    //触发表单提交按钮
    const formSubmit  = async (res:boolean)=>{
      if(res){
        const payload = {
          email:formData.emailVal,
          nickName:formData.nameVal,
          password :formData.passwordVal,
          
        }
        axios.post('/users',payload).then(data=>{
          const messageInstance = createMessage('注册成功，正在跳转登录页面','success')
          setTimeout(()=>{
            router.push('/login')
            messageInstance.destroy()
          },2000)
        }).catch(e=>{
          console.log(e);
          
        })
      }
    };   
    return {
      formData,
      emailRules,
      nameRules,
      passwordRules,
      repeatPasswordRules,
      formSubmit
    };
  },
  components: { ValidateForm, ValidateInput },
});
</script>

<style scoped></style>
