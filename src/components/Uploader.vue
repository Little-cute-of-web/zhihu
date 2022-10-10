<template>
  <div class="file-upload">
    <div class="file-upload-container" @click.prevent="triggerUpload" v-bind="$attrs">
      <slot v-if="fileStatus === 'loading'" name="loading">
        <button class="btn btn-primary" disabled>正在上传...</button>
      </slot>
      <slot v-else-if="fileStatus === 'success'" name="uploaded" :uploadedData="uploadedData">
        <button class="btn btn-primary">上传成功</button>
      </slot>
      <slot v-else name="default">
        <button class="btn btn-primary">点击上传</button>
      </slot>
    </div>
    <input
      type="file"
      class="file-input d-none"
      ref="fileInput"
      @change="handleFileChange"
    />
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent, ref, PropType} from "vue";
type UploadStatus = "ready" | "loading" | "success" | "error";
type CheckFunction = (file: File) => boolean;
export default defineComponent({
  props: {
    actions: {
      type: String,
      required: true,
    },
    beforeUpload: {
      type: Function as PropType<CheckFunction>,
    },
  },
  emits: ["file-uploaded", "file-uploaded-error"],
  inheritAttrs:false,
  setup(props, ctx) {
    const fileInput = ref<null | HTMLInputElement>(null);
    const fileStatus = ref<UploadStatus>("ready");
    const uploadedData = ref();
    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click();
      }
    };
    const handleFileChange = (e: Event) => {
      const currentTarget = e.target as HTMLInputElement;
      // const files = currentTarget.files
      if (currentTarget.files) {
        // console.log(files);
        const files = Array.from(currentTarget.files);
        if (props.beforeUpload) {
          const res = props.beforeUpload(files[0]);
          if (!res) {
            return;
          }
        }
        fileStatus.value = "loading";
        const formData = new FormData();
        formData.append("files", files[0]);
        axios
          .post(props.actions, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            // console.log(res);
            fileStatus.value = "success";
            uploadedData.value= res.data;
            // console.log(uploadedData);           
            ctx.emit("file-uploaded", res.data);          
          })
          .catch((error) => {
            // console.log(e);
            fileStatus.value = "error";
            ctx.emit("file-uploaded-error", { error });
          })
          .finally(() => {
            if (fileInput.value) {
              fileInput.value.value = "";
            }
          });
      }
    };
    return {
      fileInput,
      triggerUpload,
      fileStatus,
      handleFileChange,
      uploadedData
    };
  },
});
</script>

<style scoped>
.create-post-page .file-upload-container {
  height: 200px;
  cursor: pointer;
}
</style>
