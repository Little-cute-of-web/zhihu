// import Message from "./Message.vue";
// export type MessageType = 'success' | 'error' | 'default'
// const createMessage = (message:string,type:MessageType,timeout=2000)=>{
//   const messageInstance = createApp(Message,{
//     message,type
//   })
//   const mountNode = document.createElement('div');
//   document.body.appendChild(mountNode);
//   messageInstance.mount(mountNode);
//   setTimeout(() => {
//     messageInstance.unmount()
//     document.body.removeChild(mountNode)
//   }, timeout);
// }
// export default createMessage;

//通过h函数改造createMessage
// import { h,render } from "vue";
// import Message from "./Message.vue";
// export type MessageType = 'success' | 'error' | 'default'
// const createMessage = (message:string,type:MessageType,timeout=2000
//   )=>{
//     const MessageVnode = h(Message,{
//       message,type
//     })
//     const mountNode = document.createElement('div');
//     document.body.appendChild(mountNode);
//     //挂载
//     render(MessageVnode,mountNode);
//     setTimeout(()=>{
//       //卸载messageVnode
//       render(null,mountNode)
//       document.body.removeChild(mountNode)
//     },timeout)
//   }
//   export default createMessage;

//继续改造，在规定时间内不消失
import { h,render } from "vue";
import Message from "./Message.vue";
export type MessageType = 'success' | 'error' | 'default'
const createMessage = (message:string,type:MessageType,timeout?:number
  )=>{
    const MessageVnode = h(Message,{
      message,type
    })
    const mountNode = document.createElement('div');
    document.body.appendChild(mountNode);
    //挂载
    render(MessageVnode,mountNode);
    //加上销毁的条件
    const destroy = ()=>{
      //卸载messageVnode
      render(null,mountNode)
      document.body.removeChild(mountNode)
    }
    if(timeout){
      setTimeout(()=>{
        //卸载messageVnode
        destroy()
      },timeout)
    }
    return {
      destroy
    }
   
  }
  export default createMessage;