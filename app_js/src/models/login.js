import { stringify } from 'querystring';
import { router } from 'umi';
import { Login } from '@/services/api';
import { getPageQuery } from '@/utils/utils';
const Model = {
  namespace: 'login',
  state: {
    status: undefined,
    message:"",
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(Login, payload);
      console.log(response);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      }); // Login successfully

      if (response.status === 'ok') {
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }

        router.replace(redirect || '/');
      }
    },
    logout() {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note
      localStorage.clear();
      location.reload();
    },
  },
  reducers: {
    changeLoginStatus(state, action) {
      const tokenData=action.payload;
      //console.log(action.payload);
      if(tokenData.code!=='00001'){
        state.status="fail";
        state.message = tokenData.result;
        return{
          ...state,
          code:tokenData.code,
          logStatus:false,
        }
      }
      localStorage.setItem('token',tokenData.token);
      localStorage.setItem('login','true');
      localStorage.setItem('name','claude');
      state.status="true";
      state.message = tokenData.result;
      return {
        ...state,
        code:tokenData.code,
        logStatus:true,
        message:tokenData.result,
      };
    },
  },
};
export default Model;
