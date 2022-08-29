<template>
  <div class="dropdown">
    <!-- <button
      class="btn btn-secondary dropdown-toggle"
      type="button"
      id="dropdownMenuButton"
      data-toggle="dropdown"
      aria-expanded="false"
    >
      Dropdown button
    </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <a class="dropdown-item" href="#">Action</a>
      <a class="dropdown-item" href="#">Another action</a>
      <a class="dropdown-item" href="#">Something else here</a>
    </div> -->
    <a href="#" class="btn btn-outline-light my-2 dropdown-toggle"
    @click.prevent="userToggle"
    >{{title}}</a>
    <div class="dropdown-menu" 
    aria-labelledby="dropdownMenuButton" 
    :class="{active:isShow}"
    >
      <!-- <a class="dropdown-item" href="#">新建文章</a>
      <a class="dropdown-item" href="#">编辑资料</a>
      <a class="dropdown-item" href="#">我的收藏</a> -->
      <!-- 传入自定义模班内容 -->
      <slot></slot>
    </div> 
  </div>
</template>

<script lang="ts">
  import {defineComponent,ref} from 'vue';
  //导入组件

  export default defineComponent({
    name:'DropDown',
    props:{
      title:{
        type:String,
        required:true
      }
    },
    setup(){
      const isShow = ref(false)
      const userToggle = ()=>{
        isShow.value = ! isShow.value;
      }
      return {
        isShow,
        userToggle
      }
    },
    components:{
      
    }
  })
</script>
<style lang="less" scoped>
//  .dropdown >>> .dropdown-menu{
//     width:130px;
//   }
.dropdown-menu.active {
  display:block;
}
</style>
