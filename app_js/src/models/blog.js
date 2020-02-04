import { BlogList, CbcRssList, Blog } from '../services/api';


const Model = {
  namespace: 'blog',
  state: {
    blog: [],
    cbc: [],
    categories:[],
    catch:{},
    blogDetail:{},
  },
  effects: {
    *init(_, { put }) {
      yield put({
        type: 'fetchBlog',
      });
      yield put({
        type: 'fetchCbc',
      });
    },
    *fetchBlog(_, { call, put }) {
      const response = yield call(BlogList);
      yield put({
        type: 'saveBlog',
        payload: {
          blog: Array.isArray(response) ? response : [],
        },
      });
    },
    *fetchBlogById({ payload }, { call, put }) {
      const response = yield call(Blog, payload);
      yield put({
        type: 'saveDetail',
        payload: {
          blogDetail: response[0],
        },
      });
    },
    *fetchCbc(_, { call, put }) {
      const response = yield call(CbcRssList);
      yield put({
        type: 'cbcParse',
        payload: response,
      });
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    saveBlog(state, { payload }) {
      state.catch['blog'] = payload.blog;
      payload.blog.forEach(item=>{
        if (! state.categories.includes(item.category)){
          state.categories.push(item.category);
        }
      });
      return { ...state, ...payload };
    },
    saveDetail(state, { payload }) {
      return { ...state, ...payload };
    },
    cbcParse(state, action) {
      let list = JSON.parse(action.payload.result);
      let news = [];
      list.map(x => {
        let temp = {};
        temp['image'] = x.summary.split("src='")[1];
        temp['image'] = temp['image'].split("'")[0];
        temp['link'] = x['link'];
        temp['title'] = x.title;
        news.push(temp);
      });
      return {
        ...state,
        cbc: news,
      };
    },
    categoryFilter(state,{payload}){
      if(!payload) {
        return{
          ...state,
          blog: state.catch['blog']
        }
      }
      else {
        return {
          ...state,
          blog: state.catch['blog'].filter(x => payload.includes(x.category)),
        };
      }
    },
    clear() {
      return {
        radarData: [],
        blog: [],
        cbc: [],
        categories:[],
        catch:{},
        blogDetail:{}
      };
    },
  },
};
export default Model;
