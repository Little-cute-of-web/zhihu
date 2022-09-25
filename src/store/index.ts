
import axios from 'axios';
import { createStore } from 'vuex'

//导入数据
// import { testPosts } from "../json/testData";
interface UserProps {
  isLogin: boolean,
  name?: string,
  id?: number,
  columnId?:number
}

interface ImageProps {
  _id?:string;
  url?:string;
  createdAt?:string;
}
export interface ColumnProps {
  _id:string;
  title:string;
  avatar?:ImageProps;
  description: string;
}

export interface PostProps {
  _id:string;
  title:string;
  excerpt?:string;
  content?:string;
  image?:ImageProps;
  createdAt:string;
  column:string;

}
export interface GlobalDataProps {
  columns: ColumnProps[],
  posts: PostProps[],
  user: UserProps
}
export default createStore<GlobalDataProps>({
  state:{
    columns:[],
    posts: [],
    // user:{isLogin:false},
    user: { isLogin: true,name:'one',columnId:1 }
  },
  getters: {
    //用于测试
    // bigColumnsLen(state) {
    //   return state.columns.filter(c => c._id > 2).length
    // },
    getColumnsById: (state) => (id: string) => {
      const res = state.columns.find(item => {
        return item._id === id
      })
      return res;

    },
    getPostsByCid: (state) => 
      (cid: string) => {
        const res = state.posts.filter(post => {
          return post.column === cid
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
    },
    fetchColumn(state,rawData){
      state.columns = [rawData.data]
    },
    fetchPosts(state,rawData){
      state.posts= rawData.data.list
    }
  },
  actions: {
    fetchColumns(context){
      axios.get('/columns').then(res=>{
        context.commit('fetchColumns',res.data)
      })
    },
    fetchColumn({commit},cid){
      axios.get(`/columns/${cid}`).then(res=>{
        commit('fetchColumn',res.data)
      })
    },
    fetchPosts({commit},cid){
      axios.get(`/columns/${cid}/posts`).then(res=>{
        commit('fetchPosts',res.data)
      })
    }
  },
  modules: {
  }
})
