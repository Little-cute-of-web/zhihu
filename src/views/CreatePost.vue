<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <!-- 上传文件测试 -->
    <!-- <input type="file" name="file" @change.prevent="handleFileChange"> -->
    <!-- Uploader组件 -->
    <uploader
      actions="/upload"
      :beforeUpload=uploadCheck
      class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4"
      @file-uploaded="handleFileUploaded"
    >
      <h2>点击上传头图</h2>
      <!-- <div class="spinner-border" role="status">
        <span class="sr-only"></span>
      </div> -->
      <template #loading>
        <div class="d-flex">
          <div class="spinner-border" role="status">
            <span class="sr-only"></span>
          </div>
          <h2>正在上传</h2>
        </div>
      </template>
      <template #uploaded="dataProps">
        <img :src="dataProps.uploadedData.data?.url">
      </template>
    </uploader>
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
import { GlobalDataProps ,ResponseType,ImageProps,PostProps} from "../store";
//导入组件
import ValidateForm from "../components/ValidateForm.vue";
import ValidateInput, { RulesProps } from "../components/ValidateInput.vue";
//导入Uploader组件
import Uploader from "../components/Uploader.vue";
// import axios from "axios";
//导入help.ts
import {beforeUploadCheck  } from "../utils/help";
//导入createMessage
import createMessage from "../components/createMessage";
export default defineComponent({
  name: "CreatePost",
  components: {
    ValidateForm,
    ValidateInput,
    Uploader,
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
    let imageId = ''; 
    const handleFileUploaded = (rawData:ResponseType<ImageProps>)=>{   
      if(rawData.data._id){
        imageId =rawData.data._id;
      }
    };
    const onFormSubmit = (res: boolean) => {
      if (res) {
        //取出columnId
        const { column ,_id} = store.state.user;
        if (column) {
          const newPost: PostProps = {
            // _id,
            title: titleVal.value,
            content: contentVal.value,
            column,
            author:_id,
            // createdAt: new Date().toLocaleString(),
          };
          if(imageId){
            newPost.image = imageId
          }
          store.dispatch('createPost',newPost).then(()=>{
            // console.log(res);
            createMessage('发表文章成功，2秒跳转至文章','success',2000)
            setTimeout(() => {
              router.push({ name: "column", params: { id: column } });
            }, 2000);
          })
          // store.commit("CREATEPOST", newPost);
         
        }
      }
    };
    const uploadCheck = (file:File)=>{
      const res = beforeUploadCheck(file,{format:['image/jpeg','image/png'],size:1});
      const {passed,error} = res;
      // debugger;
      if(error==='format'){
       createMessage('上传图片只能是JPG/PNG格式','error',2000)
      }
      if(error==='size'){
        createMessage('上传图片太大','error',2000)
      }
      return passed;
    }
    // const handleFileChange = (e: Event) => {
    //   const target = e.target as HTMLInputElement;
    //   const files = target.files;
    //   // console.log(files);
    //   if (files) {
    //     const uploadedFile = files[0];
    //     const formData = new FormData();
    //     formData.append(uploadedFile.name, uploadedFile);
    //     axios
    //       .post("/upload", formData, {
    //         headers: {
    //           "Content-Type": "multipart/form-data",
    //         },
    //       })
    //       .then((res) => {
    //         console.log(res);
    //       })
    //       .catch((e) => {
    //         console.log(e);
    //       });
    //   }
    // };
    return {
      titleVal,
      titleRules,
      contentVal,
      contentRules,
      onFormSubmit,
      // handleFileChange,
      uploadCheck,
      handleFileUploaded
    };
  },
});
</script>

<style scoped>
/* .create-post-page .file-upload-container {
  height: 200px;
  cursor: pointer;
} */
.create-post-page .file-upload-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
