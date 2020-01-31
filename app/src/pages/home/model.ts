import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { ActivitiesType, CurrentUser, NoticeType, RadarDataType, Blog, CbcNews } from './data.d';
import { queryActivities, queryCurrent, queryProjectNotice, fakeChartData } from './service';
import { BlogList, CbcList } from '@/services/apis';

export interface ModalState {
  currentUser?: CurrentUser;
  projectNotice: NoticeType[];
  activities: ActivitiesType[];
  radarData: RadarDataType[];
  blog: Blog[];
  cbc: CbcNews[];
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: ModalState) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: ModalState;
  reducers: {
    save: Reducer<ModalState>;
    cbcParse: Reducer<ModalState>;
    clear: Reducer<ModalState>;
  };
  effects: {
    init: Effect;
    fetchCbcList: Effect;
    fetchBlogList: Effect;
    fetchUserCurrent: Effect;
    fetchProjectNotice: Effect;
    fetchActivitiesList: Effect;
    fetchChart: Effect;
  };
}

const Model: ModelType = {
  namespace: 'home',
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
      yield put({ type: 'fetchBlogList' });
      yield put({ type: 'fetchCbcList' });
      yield put({ type: 'fetchUserCurrent' });
      yield put({ type: 'fetchProjectNotice' });
      yield put({ type: 'fetchActivitiesList' });
      yield put({ type: 'fetchChart' });
    },
    *fetchBlogList(_, { call, put }) {
      const response = yield call(BlogList);
      yield put({
        type: 'save',
        payload: {
          blog: Array.isArray(response) ? response : [],
        },
      });
    },
    *fetchCbcList(_, { call, put }) {
      const response = yield call(CbcList);
      yield put({
        type: 'cbcParse',
        payload: {
          cbc: response.result,
        },
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
      return {
        ...state,
        ...payload,
      };
    },
    cbcParse(state, { payload }) {
      const list = JSON.parse(payload.cbc);
      const news: any = [];
      list.each((x: any) => {
        const temp = {
          image: '',
          link: '',
          title: '',
        };
        const src = x.summary.split("src='")[1];
        const ll = src.split("'")[0];
        temp.image = ll;
        temp.link = x.link;
        temp.title = x.title;
        news.push(temp);
      });
      payload = { cbc: news };
      return {
        ...state,
        ...payload,
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
