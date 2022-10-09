
import axios from 'axios';
import { Commit, createStore } from 'vuex'

//导入数据
// import { testPosts } from "../json/testData";
export interface ResponseType<P = Record<string,unknown>>{
  code:number;
  msg:string;
  data:P
}
export interface UserProps {
  isLogin: boolean,
  avatar?: ImageProps,
  column?: string,
  email?: string,
  nickName?: string,
  _id?: string
}

export interface ImageProps {
  _id?: string;
  url?: string;
  createdAt?: string;
}
export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}

export interface PostProps {
  id: number;
  title: string;
  excerpt?: string;
  content?: string;
  image?: ImageProps;
  createdAt: string;
  column?: string;

}

export interface GlobalErrorProps {
  status: boolean;
  message?: string;
}
export interface GlobalDataProps {
  error: GlobalErrorProps;
  token: string,
  columns: ColumnProps[],
  posts: PostProps[],
  user: UserProps,
  isLoading: boolean
}
const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  //请求结束前为加载   后更为interceptors
  // commit('setLoading',true)
  const { data } = await axios.get(url);
  commit(mutationName, data)
  //请求结束false
  // commit('setLoading',false)
  return data;

}
const postAndCommit = async (url: string, mutationName: string, commit: Commit, payload: any) => {
  const { data } = await axios.post(url, payload);
  commit(mutationName, data)
  return data;
}
export default createStore<GlobalDataProps>({
  state: {
    error: { status: false },
    //从localStorage中token
    token: localStorage.getItem('token') || '',
    columns: [],
    posts: [],
    // user:{isLogin:false},
    // user: { isLogin: true, name: 'one', columnId: 1 },
    user: {
      isLogin: false,
      // name: 'one', columnId: 1 
    },
    isLoading: false
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
    // LOGIN(state) {
    //   state.user = { ...state.user, isLogin: true, name: 'one' }
    // },
    //登录
    LOGIN(state, rawData) {
      const { token } = rawData.data
      state.token = token
      //存到localStorage
      localStorage.setItem('token', token)
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
    },
    //获取当前用户登录的信息
    fetchCurrentUser(state, rawData) {
      state.user = { isLogin: true, ...rawData.data }
    },
    CREATEPOST(state, newPost) {
      state.posts.push(newPost)
    },
    fetchColumns(state, rawData) {
      state.columns = rawData.data.list
    },
    fetchColumn(state, rawData) {
      state.columns = [rawData.data]
    },
    fetchPosts(state, rawData) {
      state.posts = rawData.data.list
    },
    //修改loading
    setLoading(state, status) {
      state.isLoading = status
    },
    //设置错误状态
    setError(state, e: GlobalErrorProps) {
      state.error = e
    }
  },
  actions: {

    fetchColumns({ commit }) {
      //获取首页的专栏卡片内容
      // 对以上请求通过getAndCommit修改
      getAndCommit('/columns', 'fetchColumns', commit)
      //第二次
      // const {data }= await axios.get('/columns')
      // commit('fetchColumns',data)
      // 第一次
      // axios.get('/columns').then(res=>{
      //   context.commit('fetchColumns',res.data)
      // })
    },
    //获取首页专栏的详细信息，post列表
    fetchColumn({ commit }, cid) {
      getAndCommit(`/columns/${cid}`, 'fetchColumn', commit)
      // const {data} = await axios.get(`/columns/${cid}`)
      // commit('fetchColumn',data)
      // axios.get(`/columns/${cid}`).then(res=>{
      //   commit('fetchColumn',res.data)
      // })
    },
    //post详细信息
    fetchPosts({ commit }, cid) {
      getAndCommit(`/columns/${cid}/posts`, 'fetchPosts', commit)
      // const {data} = await axios.get(`/columns/${cid}/posts`)
      // commit('fetchPosts',data)
      // axios.get(`/columns/${cid}/posts`).then(res=>{
      //   commit('fetchPosts',res.data)
      // })
    },
    //用户登录
    LOGIN({ commit }, payload) {
      // console.log(payload);

      return postAndCommit(`/user/login`, 'LOGIN', commit, payload)
    },
    //获取当前用户登录的信息
    fetchCurrentUser({ commit }) {
      return getAndCommit('/user/current', 'fetchCurrentUser', commit)
    },
    //登录和获取用户信息
    loginAndFetch({ dispatch }, loginData) {
      return dispatch('LOGIN', loginData).then(() => {
        return dispatch('fetchCurrentUser')
      })
    }
  },
  modules: {
  }
})
