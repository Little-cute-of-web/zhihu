<template>
  <div class="file-upload">
    <button class="btn btn-primary" @click.prevent="triggerUpload">
      <span v-if="fileStatus==='loading'">正在上传</span>
      <span v-else-if="fileStatus==='success'">上传成功</span>
      <span v-else>点击上传</span>
    </button>
    <input type="file" 
    class="file-input d-none" 
    ref="fileInput"
    @change = handleFileChange
     />
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent, ref } from "vue";
type UploadStatus = "ready" | "loading" | "success" | "error";
export default defineComponent({
  props: {
    actions: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const fileInput = ref<null | HTMLInputElement>(null);
    const fileStatus = ref<UploadStatus>("ready");
    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click();
      }
    };
    const handleFileChange = (e:Event)=>{
      const currentTarget = e.target as HTMLInputElement
      // const files = currentTarget.files
      if(currentTarget.files){
        // console.log(files);
        fileStatus.value='loading'
       const files = Array.from(currentTarget.files)
       const formData = new FormData()
       formData.append('files',files[0])
       axios.post(props.actions,formData,{
        headers:{
          'Content-Type':"multipart/form-data"
        }
       }).then(res=>{
        console.log(res);
        fileStatus.value = 'success'
        
       }).catch(e=>{
        console.log(e);
        fileStatus.value = 'error'
        
       }).finally(()=>{
        if(fileInput.value){
          fileInput.value.value=''
        }
       })
      }
    }
    return {
      fileInput,
      triggerUpload,
      fileStatus,
      handleFileChange
    };
  },
});
</script>

<style scoped></style>
