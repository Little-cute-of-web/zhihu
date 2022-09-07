<template>
   <div class="container">
    <!-- <global-header :user="user"></global-header> -->
 <validate-form action="" @form-submit="formSubmit">
      <div class="mb-3">
        <label class="form-label">Email address</label>
        <validate-input
          autocomplete="username"
          :rules="emailRules"
          v-model="emailVal"
          type="text"
          placeholder="请输入邮箱地址"
          ref="inputRef"
        ></validate-input>
      </div>
      <div class="mb-3">
        <label for="form-label">Password</label>
        <validate-input
          type="password"
          autocomplete="current-password"
          v-model="passwordVal"
          :rules="passwordRules"
          placeholder="请输入密码"
        ></validate-input>
      </div>
      <template #submit>
        <span class="btn btn-danger">提交</span>
      </template>
    </validate-form>
   </div>
</template>

<script lang="ts">
import { defineComponent ,ref} from 'vue'
import { useRouter } from "vue-router";
//导入store
import { useStore } from "vuex";
//导入全局GlobalDataProps
import { GlobalDataProps } from "../store";
//导入组件
// import GlobalHeader ,{ UserProps } from "../components/GlobalHeader.vue";
import ValidateForm from '../components/ValidateForm.vue';
import ValidateInput ,{ RulesProps } from "../components/ValidateInput.vue";
//导入RulesProps
// import { RulesProps } from '../components/ValidateInput.vue';

export default defineComponent({
  setup () {
    //初始化store
    const store = useStore<GlobalDataProps>()

    //初始化router
    const router = useRouter();
    //email password 初始值
    const emailVal = ref("");
    const passwordVal = ref("");
    const formSubmit = (res: boolean) => {
      // console.log(res);
      //验证通过跳转到首页
     if(res){
      router.push('/')
      store.commit('LOGIN')
     }
    };
    //邮箱验证规则
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
    //密码验证规则
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

    return {
      formSubmit,
      emailRules,
      passwordRules,
      emailVal,
      passwordVal
    }
  },
  components:{
    ValidateForm,
    ValidateInput
  }
})
</script>

<style scoped>

</style>