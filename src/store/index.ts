
import axios from 'axios';
import { Commit, createStore } from 'vuex'

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
  user: UserProps,
  isLoading:boolean
}
const getAndCommit = async (url:string,mutationName:string,commit:Commit )=>{
  //请求结束前为加载
  commit('setLoading',true)
  const {data} = await axios.get(url);
  commit(mutationName,data)
  //请求结束false
  commit('setLoading',false)
}
export default createStore<GlobalDataProps>({
  state:{
    columns:[],
    posts: [],
    // user:{isLogin:false},
    user: { isLogin: true,name:'one',columnId:1 },
    isLoading:false
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
    },
    //修改loading
    setLoading(state,status){
      state.isLoading = status
    }
  },
  actions: {

    async fetchColumns({commit}){
      // 对以上请求通过getAndCommit修改
      getAndCommit('/columns','fetchColumns',commit)
      //第二次
      // const {data }= await axios.get('/columns')
      // commit('fetchColumns',data)
      // 第一次
      // axios.get('/columns').then(res=>{
      //   context.commit('fetchColumns',res.data)
      // })
    },
   async fetchColumn({commit},cid){
    getAndCommit(`/columns/${cid}`,'fetchColumn',commit)
    // const {data} = await axios.get(`/columns/${cid}`)
    // commit('fetchColumn',data)
      // axios.get(`/columns/${cid}`).then(res=>{
      //   commit('fetchColumn',res.data)
      // })
    },
   async fetchPosts({commit},cid){
    getAndCommit(`/columns/${cid}/posts`,'fetchPosts',commit)
    // const {data} = await axios.get(`/columns/${cid}/posts`)
    // commit('fetchPosts',data)
      // axios.get(`/columns/${cid}/posts`).then(res=>{
      //   commit('fetchPosts',res.data)
      // })
    },
  },
  modules: {
  }
})
