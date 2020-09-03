import { routerRedux } from 'dva/router';
// import { stringify } from 'qs';
import { fakeAccountLogin, fakeAccountLogout } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import { LOGOUT_URL } from '@/contants';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    // 登录
    *login({ payload }, { call, put }) {
      const data = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'user/saveUserInfo',
        payload: {
          user: data.user,
          permsList: data.permsList,
        },
      });
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: ['resourceApply'],
        },
      });
      reloadAuthorized();
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
          redirect = null;
        }
      }
      yield put(routerRedux.replace(redirect || '/'));
    },

    *logout({ payload }, { call, put }) {
      try {
        yield call(fakeAccountLogout, payload);
        yield put({
          type: 'user/saveUserInfo',
          payload: {
            userInfo: {},
            permsList: [],
            roleList: [],
          },
        });
        window.location.href = LOGOUT_URL;
      } catch (e) {
        return e;
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        ...payload,
      };
    },
  },
};
