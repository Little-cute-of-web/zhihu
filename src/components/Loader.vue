<template>
  <teleport to="#back">
    <div
      class="d-flex justify-content-center align-items-center h-100 loading-container"
      :style="{ backgroundColor: background || '' }"
    >
      <div class="loading-content">
        <div class="spinner-border text-primary" role="status">
          <!-- <span class="sr-only">{{text || 'loading'}}</span> -->
        </div>
        <p v-if="text" class="text-primary small">{{ text }}</p>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent} from "vue";
import useDOMCreate from "../hooks/useDOMCreate";
export default defineComponent({
  props: {
    text: {
      type: String,
    },
    background: {
      type: String,
    },
  },
  setup() {
    useDOMCreate('back')
    // const node = document.createElement('div')
    // node.id='back';
    // document.body.appendChild(node);
    // onUnmounted(()=>{
    //   document.body.removeChild(node)
    // })
  },
});
</script>

<style scoped>
.loading-container {
  background: rgba(255, 255, 255, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  z-index: 100;
}
</style>
