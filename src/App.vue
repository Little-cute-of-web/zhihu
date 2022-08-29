<template>
  <div class="container">
    <!-- <demo></demo> -->
    <!-- <demo2></demo2> -->
    <global-header :user="user"></global-header>
    <form>
      <div class="mb-3">
        <label for="exampleInputEmail1">Email address</label>
        <input
          v-model="emailRef.val"
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          @click="validateEmail"
          
        />
        <div class="form-text" v-if="emailRef.error">
          {{ emailRef.message }}
        </div>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
        />
      </div>
    </form>
    <!-- <column-list :list="list"></column-list> -->
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
//引入外部bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
//项目组件导入
import { ColumnProps } from "./components/ColumnList.vue";
import GlobalHeader, { UserProps } from "./components/GlobalHeader.vue";
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
      emailReg
    };
  },
  components: {
    // ColumnList,
    GlobalHeader,
  },
});
</script>

<style lang="less"></style>
