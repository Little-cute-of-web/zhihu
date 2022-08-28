import {ref,onMounted,onUnmounted} from 'vue';
const useKeyPress = (targetKeyCode: string)=>{
  const keyPressed = ref(false)
  const keyDownHandler = (e: KeyboardEvent)=>{
    if(e.key===targetKeyCode){
      keyPressed.value = true;
    }
  }
  const keyUpHandler = (e: KeyboardEvent)=>{
    if(e.key===targetKeyCode){
      keyPressed.value=false;
    }
  }
  onMounted(()=>{
    document.addEventListener('keydown',keyDownHandler);
    document.addEventListener('keyup',keyUpHandler);
  })
  onUnmounted(()=>{
    document.removeEventListener('keydown',keyDownHandler);
    document.removeEventListener('keyup',keyUpHandler)
  })
  return keyPressed
}
export default useKeyPress