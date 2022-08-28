<template>
  <h2>
    {{ data.count }}
  </h2>
  <h3>{{ data.double }}</h3>
  <ul>
    <li v-for="item in data.numbers" :key="item">
      <h1>{{ item }}</h1>
    </li>
  </ul>
  <h3>{{ data.person.roleName }}</h3>
  <!-- <h2>{{updateGreeting}}</h2> -->
  <h2>{{ greetings }}</h2>
  <button @click="data.plus">点击加1</button>
  <button @click="updateGreeting">change</button>
  <hr>
  <h1>{{x}}</h1>
  <h1>{{y}}</h1>
  <hr>
  <!-- <h2 v-if="loading">Loading...!</h2> -->
  <!-- <h2 v-if="loaded" ><img :src="result.message" alt=""></h2> -->
  <!-- <h2 v-if="loaded" ><img :src="result[0]?.url" alt=""></h2> -->
  <hr>
  <button @click="showModal">显示对话窗</button>
  <demo2 :isShow="modalIsShow" @close-modal =closeModal></demo2>
  <hr>
  <Suspense>
    <template #default>
      <div>
        <async-show></async-show>
      <dog-show></dog-show>
      </div>
    </template>
    <template #fallback>
      isLoading!!!
    </template>
  </Suspense>
  <hr>
  <!-- 展示error标签 -->
  <p>{{error}}</p>
  <!-- 修改 provide  lang -->
  <button @click="changeLang('ch')">修改中文</button>
  <button @click="changeLang('en')">修改英文</button>
</template>


<script lang="ts" setup>
//引入组件
import Demo2 from './Demo2.vue';
import AsyncShow from './AsyncShow.vue';
import DogShow from './DogShow.vue';
// import {defineComponent} from 'vue';
import useMousePosition from '../hooks/useMousePosition';
// import useURLLoader from '../hooks/useURLLoader';
import {
  ref,
  computed,
  reactive,
  watch,
  toRefs,
  // onMounted,
  onUpdated,
  // onUnmounted,
  onRenderTriggered,
  onRenderTracked,
  onErrorCaptured,
provide
} from "vue";
const error = ref(null)
onErrorCaptured((e:any)=>{
  error.value=e;
return true;
});
onUpdated(() => {
  console.log("修改成功");
});
onRenderTriggered((event) => {
  console.log(event);
});
onRenderTracked(() => {
  console.log("Tracked");
});
interface dataProps {
  count: number;
  double: number;
  plus: () => void;
  numbers: number[];
  person: { roleName?: string };
}
// interface dogResult {
//   message:string;
//   status:string
// }
// interface catResult {
//   id:string;
//   url:string;
//   width:number;
//   height:number;
// }
// let count = ref(0);
// function plus(){
//   count.value++;
// }
// const double = computed(()=>{return count.value**2});
let data: dataProps = reactive({
  count: 0,
  plus: () => {
    data.count++;
  },
  double: computed(() => {
    return data.count ** 2;
  }),
  numbers: [1, 2, 3],
  // arr:[0,1,2,3,4],
  person: {},
});
toRefs(data);
const greetings = ref("");
const updateGreeting = () => {
  greetings.value += "hello world";
};

// watch([greetings,data], () => {
//   document.title = "updated" + greetings.value+data.count;
// });
//不能通过data.count直接传入数组进行修改，只能是getter/effect,ref,reactive
watch([greetings,()=>data.count],()=>{
  document.title = "updated" + greetings.value+data.count;
});
  const {x,y} = useMousePosition();
  //狗请求
  // const {result,loading,loaded} = useURLLoader<dogResult>('https://dog.ceo/api/breeds/image/random');
  // watch(result,()=>{
  //   if(result.value){
  //     console.log(result.value.message);
      
  //   }
  // })
  //猫请求
  // const {result,loading,loaded}= useURLLoader<catResult[]>('https://api.thecatapi.com/v1/images/search?limit=1')
  // watch(result,()=>{
  //   if(result.value){
  //     console.log('value',result.value[0].url);
      
  //   }
  // })
  const modalIsShow = ref(false);
  const showModal = ()=>{
    modalIsShow.value = true;
  }
  const closeModal = ()=>{
    modalIsShow.value=false
  }
  //provide数据传递
  // provide('lang','chinese');

  const lang = ref('en');
  provide('lang',lang);
  const changeLang = (type:string)=>{
    lang.value = type
  }

</script>

<style lang="scss" scoped></style>
