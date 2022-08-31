import { createStore } from 'vuex'

//导入数据
import { testData,testPosts,ColumnProps,PostProps } from "../json/testData";
interface UserProps { 
  isLogin:boolean,
  name?:string,
  id?:number
}
export interface GlobalDataProps {
  columns:ColumnProps[],
  posts:PostProps[],
  user:UserProps
}
export default createStore<GlobalDataProps>({
  state: {
    columns:testData,
    posts:testPosts,
    user:{isLogin:false}
  },
  getters: {
  },
  mutations: {
    login(state){
      state.user = {...state.user,isLogin:true,name:'one'}
    }
  },
  actions: {
  },
  modules: {
  }
})
