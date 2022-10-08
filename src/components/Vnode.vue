<!-- <template>
<h1>hello my homeland</h1>>
</template> -->

<script lang="ts">
import { defineComponent ,h,ref} from 'vue'

export default defineComponent({
  props:{
    msg:{
      type:String,
      required: true
    }
  },
  setup (props) {
    const count = ref(1)
    // return ()=>{
    //   return h('h1',props.msg+count.value)
    // }
    return ()=>{
      return [h('h1',props.msg),h('div',count.value)]
    }
  }
})
</script>

<style scoped>

</style>