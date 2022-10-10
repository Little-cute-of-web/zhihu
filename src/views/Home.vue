<template>
  <div class="home-page">
    <section class="py-3 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../assets/callout.svg" alt="callout" class="w-50" />
          <h5 class="font-weight-light">随心写作，自由表达</h5>
          <p>
            <a  class="btn btn-primary my-2">开始写文章</a>
          </p>
        </div>
      </div>
    </section>
    <!-- 测试loader -->
    <!-- <uploader actions="/upload" :beforeUpload="beforeUpload" 
    @file-uploaded = "onFileUploaded"
    @file-uploaded-error="onFileUploadedError"
    > -->
    <!-- <h2>点击上传</h2>
    <template #loading>
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </template> -->
    <!-- <template #uploaded="dataProps">
      <img :src="dataProps.uploadedData.data?.url" width="500">
    </template>
  </uploader> -->
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <column-list :list="list"></column-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "vue";
//导入store
import { useStore } from "vuex";
//导入全局数据泛型
import { GlobalDataProps ,ResponseType ,ImageProps} from "../store";
//导入组件
import ColumnList from "../components/ColumnList.vue";
//导入createMessage
import createMessage from "../components/createMessage";
//导入Uploader
// import Uploader from "../components/Uploader.vue";
//导入模拟数据columnList
// import {testData} from "../json/testData";
export default defineComponent({
  name: "Home",
  setup() {
    const store = useStore<GlobalDataProps>();
      onMounted(()=>{
      store.dispatch('fetchColumns')
    })
    const list = computed(() => {
      return store.state.columns;
    });
    const beforeUpload = (file:File)=>{
      const isJPG = file.type==='image/jpeg'
      if(!isJPG){
        const messageJpg = createMessage('上传图片的格式只能是JPEG格式','error')
       setTimeout(()=>{
        messageJpg.destroy()
       },2000)
      }
      return isJPG;
    }
    const onFileUploaded = (rawData:ResponseType<ImageProps>)=>{
      const FileInstance =createMessage(`上传图片ID ${rawData.data._id}`,'success')
      setTimeout(()=>{
        FileInstance.destroy()
       },2000)
    }
    const onFileUploadedError = (rawData:ResponseType<ImageProps>)=>{
      const fileErrorInstance = createMessage(`上传图片ID ${rawData.data}`,'error')
      setTimeout(()=>{
        fileErrorInstance.destroy()
       },2000)
    }
    //以下为测试
    //id >2 的文章
    const bigColumnsLen = computed(()=>{
      return store.getters.bigColumnsLen
    })
    return {
      list,
      bigColumnsLen,
      beforeUpload,
      onFileUploaded,
      onFileUploadedError
    };
  },
  components: {
    ColumnList,
    // Uploader
  },
});
</script>

<style scoped></style>
