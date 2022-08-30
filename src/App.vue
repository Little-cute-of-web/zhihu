<template>
  <div class="container">
    <!-- <demo></demo> -->
    <!-- <demo2></demo2> -->
    <global-header :user="user"></global-header>
    <form action="">
      <div class="mb-3">
        <label class = "form-label">Email address</label>
        <!-- <input
          v-model="emailRef.val"
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          @blur="validateEmail"
          
        /> -->
        <validate-input :rules="emailRules" 
        v-model="emailVal"
        type="text"
        placeholder="请输入邮箱地址"
        ></validate-input>
        <!-- <div class="form-text" v-if="emailRef.error">
          {{ emailRef.message }}
        </div> -->
        <!-- {{emailVal}} -->
      </div>
      <div class="mb-3">
        <label for="form-label">Password</label>
        <!-- <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
        /> -->
        <validate-input v-model="passwordVal" :rules="passwordRules"></validate-input>
      </div>
    </form>
    <!-- <column-list :list="list"></column-list> -->
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive,ref} from "vue";
//引入外部bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
//项目组件导入
import { ColumnProps } from "./components/ColumnList.vue";
import GlobalHeader, { UserProps } from "./components/GlobalHeader.vue";
//输入框组件
import ValidateInput,{ RulesProps } from './components/ValidateInput.vue';
const testData: ColumnProps[] = [
  {
    id: 1,
    title: "test1专栏",
    description: "可以更新一下",
    avatar:
      "https://img2.baidu.com/it/u=2560207403,1062715832&fm=253&fmt=auto&app=120&f=JPEG?w=750&h=500",
  },
  {
    id: 12,
    title: "test2专栏",
    description: "可以更新一下2",
    // avatar:
    //   "https://img2.baidu.com/it/u=2560207403,1062715832&fm=253&fmt=auto&app=120&f=JPEG?w=750&h=500",
  },
];
const testUser: UserProps = {
  isLogin: true,
  name: "one",
};
//首页登录
//之前练习组件导入
// import Demo from './components/Demo.vue';
// import Demo2 from './components/Demo2.vue';
export default defineComponent({
  name: "App",
  setup() {
    //测试: update:modelValue
    const emailVal = ref('one')
    const passwordVal = ref('')
    const emailRules :RulesProps = [
      {
        type:'required',message:'电子邮箱不能为空'
      },{
        type:'email',message:'请输入正确格式'
      }
    ]
    const passwordRules :RulesProps = [
      {
        type:'required',message:'密码不能为空'
      },{
        type:'password',message:'至少8位'
      }
    ]
    //非validateInput组件email的逻辑
    const emailRef = reactive({
      val: "",
      error: false,
      message: "",
    });
    const emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const validateEmail = () => {
      if (emailRef.val === "") {
        emailRef.error = true;
        emailRef.message = "can not be empty";
      }else if(!emailReg.test(emailRef.val)){
        emailRef.error = true;
        emailRef.message = 'should be valid message'
      }
    };
   
    return {
      list: testData,
      user: testUser,
      emailRef,
      validateEmail,
      emailReg,
      emailRules,
      emailVal,
      passwordRules,
      passwordVal
    };
  },
  components: {
    // ColumnList,
    GlobalHeader,
    ValidateInput
  },
});
</script>

<style lang="less"></style>
