import {
  fakeChartData,
  queryActivities,
  queryCurrent,
  queryProjectNotice,
} from './../pages/Dashboard/service';
import { BlogList, CbcRssList } from '../services/api';

const Model = {
  namespace: 'blog',
  state: {
    currentUser: undefined,
    projectNotice: [],
    activities: [],
    radarData: [],
    blog: [],
    cbc: [],
  },
  effects: {
    *init(_, { put }) {
      yield put({
        type: 'fetchBlog',
      });
      yield put({
        type: 'fetchCbc',
      });
      yield put({
        type: 'fetchUserCurrent',
      });
      yield put({
        type: 'fetchProjectNotice',
      });
      yield put({
        type: 'fetchActivitiesList',
      });
      yield put({
        type: 'fetchChart',
      });
    },
    *fetchBlog(_, { call, put }) {
      const response = yield call(BlogList);
      yield put({
        type: 'save',
        payload: {
          blog: Array.isArray(response) ? response : [],
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

    *fetchUserCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'save',
        payload: {
          currentUser: response,
        },
      });
    },

    *fetchProjectNotice(_, { call, put }) {
      const response = yield call(queryProjectNotice);
      yield put({
        type: 'save',
        payload: {
          projectNotice: Array.isArray(response) ? response : [],
        },
      });
    },

    *fetchActivitiesList(_, { call, put }) {
      const response = yield call(queryActivities);
      yield put({
        type: 'save',
        payload: {
          activities: Array.isArray(response) ? response : [],
        },
      });
    },

    *fetchChart(_, { call, put }) {
      const { radarData } = yield call(fakeChartData);
      yield put({
        type: 'save',
        payload: {
          radarData,
        },
      });
    },
  },
  reducers: {
    save(state, { payload }) {
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

    clear() {
      return {
        currentUser: undefined,
        projectNotice: [],
        activities: [],
        radarData: [],
        blog: [],
        cbc: [],
      };
    },
  },
};
export default Model;
