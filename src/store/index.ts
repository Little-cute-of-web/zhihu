
import axios from 'axios';
import { createStore } from 'vuex'

//导入数据
import { testPosts, PostProps } from "../json/testData";
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
  _id:number;
  title:string;
  avatar?:ImageProps;
  description: string;
}

export interface GlobalDataProps {
  columns: ColumnProps[],
  posts: PostProps[],
  user: UserProps
}
export default createStore<GlobalDataProps>({
  state:{
    columns:[],
    posts: testPosts,
    // user:{isLogin:false},
    user: { isLogin: true,name:'one',columnId:1 }
  },
  getters: {
    bigColumnsLen(state) {
      return state.columns.filter(c => c._id > 2).length
    },
    getColumnsById: (state) => (id: number) => {
      const res = state.columns.find(item => {
        return item._id === id
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
