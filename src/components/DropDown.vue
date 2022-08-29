<template>
  <div class="dropdown" @click="dropdownHandler" ref="dropdownRef">
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
  import {defineComponent,ref,watch} from 'vue';
  //导入组件

  //导入useClickOutside函数
  import useClickOutside from '../hooks/useClickOutside';
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
      const dropdownRef = ref<null | HTMLElement>(null)
      const userToggle = ()=>{
        isShow.value = ! isShow.value;
      }
      //这个只有mounted的时候执行一次。所以需要一直监视这个值的变化watch
      const isClickOutside =  useClickOutside(dropdownRef);
      watch(isClickOutside,()=>{
        isClickOutside.value&&isShow.value?isShow.value= false:null;
      })
      
      // const dropdownHandler = (e: MouseEvent)=>{
      //   console.log(e);
      //   if(dropdownRef.value){
      //     // console.log(dropdownRef.value);
      //     if(!dropdownRef.value.contains(e.target as HTMLElement)&&isShow){
      //       isShow.value= false;
      //     }
          
      //   }
        
      // }
      // onMounted(()=>{
      //   document.addEventListener('click',dropdownHandler)
      // })
      // onUnmounted(()=>{
      //   document.removeEventListener('click',dropdownHandler)
      // })
      return {
        isShow,
        userToggle,
        // dropdownHandler,
        dropdownRef
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
