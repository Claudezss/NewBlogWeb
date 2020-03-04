import { DownloadEhentai } from '../../services/api';

const Model = {
  namespace: 'secret',
  state: {
    message: ""
  },
  effects: {
    *downloadEhentai({ payload }, { call, put }) {
      const response = yield call(DownloadEhentai, payload);
      yield put({
        type: 'message',
        payload:  response
      });
    }
  },
  reducers: {
    message(state, { payload }) {
      state.message = payload;
      return { ...state};
    }
  },
};
export default Model;
