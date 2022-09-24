
import axios from 'axios';
import { createStore } from 'vuex'

//导入数据
import { testData, testPosts, ColumnProps, PostProps } from "../json/testData";
interface UserProps {
  isLogin: boolean,
  name?: string,
  id?: number,
  columnId?:number
}
export interface GlobalDataProps {
  columns: ColumnProps[],
  posts: PostProps[],
  user: UserProps
}
export default createStore<GlobalDataProps>({
  state: {
    columns: testData,
    posts: testPosts,
    // user:{isLogin:false},
    user: { isLogin: true,name:'one',columnId:1 }
  },
  getters: {
    bigColumnsLen(state) {
      return state.columns.filter(c => c.id > 2).length
    },
    getColumnsById: (state) => (id: number) => {
      const res = state.columns.find(item => {
        return item.id === id
      })
      return res;

    },
    getPostsByCid: (state) => 
      (cid: number) => {
        const res = state.posts.filter(post => {
          return post.columnId === cid
        })
        return res;
      }
      
  },
  mutations: {
    LOGIN(state) {
      state.user = { ...state.user, isLogin: true, name: 'one' }
    },
    CREATEPOST(state,newPost){
      state.posts.push(newPost)
    },
    fetchColumns(state,rawData){
      state.columns = rawData.data.list
    }
  },
  actions: {
    fetchColumns(context){
      axios.get('/columns').then(res=>{
        context.commit('fetchColumns',res.data)
      })
    }
  },
  modules: {
  }
})
