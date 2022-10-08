<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <input type="file" name="file" @change.prevent="handleFileChange">
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题</label>
        <validate-input
          :rules="titleRules"
          v-model="titleVal"
          placeholder="请输入文章标题"
          type="text"
          ref="inputRef"
        ></validate-input>
      </div>
      <div class="mb-3">
        <label class="form-label">文章内容</label>
        <validate-input
          tag="textarea"
          rows="10"
          :rules="contentRules"
          v-model="contentVal"
          placeholder="请输入文章内容"
          type="text"
          ref="inputRef"
        ></validate-input>
      </div>
      <template #submit>
        <button class="btn btn-primary btn-large">创建</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
//导入store
import { GlobalDataProps } from "../store";
import { PostProps } from "../store/index";
//导入组件
import ValidateForm from "../components/ValidateForm.vue";
import ValidateInput, { RulesProps } from "../components/ValidateInput.vue";
import axios from "axios";
export default defineComponent({
  name: "CreatePost",
  components: {
    ValidateForm,
    ValidateInput,
  },
  setup() {
    const router = useRouter();
    const store = useStore<GlobalDataProps>();
    //设置文章标题初始值
    const titleVal = ref("");
    //设置标题验证规则
    const titleRules: RulesProps = [
      {
        type: "required",
        message: "输入的标题不能为空",
      },
    ];
    const contentVal = ref("");
    const contentRules: RulesProps = [
      {
        type: "required",
        message: "输入的内容不能为空",
      },
    ];
    const onFormSubmit = (res: boolean) => {
      if (res) {
        //取出columnId
        const { column } = store.state.user;
        if (column) {
          const newPost: PostProps = {
            id: new Date().getTime(),
            title: titleVal.value,
            content: contentVal.value,
            // column,
            createdAt: new Date().toLocaleString(),
          };
          store.commit("CREATEPOST", newPost);
          router.push({ name: "column", params: { _id: column } });
        }
      }
    };
    const handleFileChange = (e:Event)=>{
      const target = e.target as HTMLInputElement
      const files  =target.files
      // console.log(files);
      if(files){
        const uploadedFile = files[0]
        const formData = new FormData()
        formData.append(uploadedFile.name,uploadedFile)
        axios.post('/upload',formData,{
          headers:{
            'Content-Type':"multipart/form-data"
          }
        }).then(res=>{
          console.log(res);
          
        }).catch(e=>{
          console.log(e);
          
        })

      }
      
    }
    return {
      titleVal,
      titleRules,
      contentVal,
      contentRules,
      onFormSubmit,
      handleFileChange
    };
  },
});
</script>

<style scoped></style>
