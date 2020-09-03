import {
  queryUsers,
  queryUserList,
  queryProtocol,
  submitProtocol,
  querySysUsers,
  queryDownList,
  delDownList,
} from '@/services/user';
import { setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';
import { message } from 'antd';

export default {
  namespace: 'user',

  state: {
    userInfo: {},
    permsList: [],
    roleList: [],
    // 申请部门
    deptId: '',
    userList: [],
    downData: {},
    subDeptList: [], // 子部门列表
  },

  effects: {
    * querySysUsers({ payload }, { call, select }) {
      const { userId } = yield select(({ user }) => user.userInfo);

      const data = yield call(querySysUsers, { ...payload, userId });

      return data.code === 200 ? data.resData : [];
    },
    * queryUsers({ payload }, { call, put }) {
      try {
        const {
          routes, path, authority, code, redirectUri
        } = payload;
        const data = yield call(queryUsers, {
          code,
          redirectUri,
        });
        if (data.resData) {
          const { resData } = data;
          yield put({
            type: 'setter',
            payload: {
              ...resData,
              unitId: resData.user.orgType,
              userInfo: {
                ...resData.user,
                unitId: resData.user.orgType,
              },
              deptId: resData.user.deptId,
              currentAuthority: resData.roleList,

            },
          });
          if (!payload.noChangeMeun) {
            yield put({
              type: 'setting/getSetting',
            });
            yield put({
              type: 'menu/getMenuData',
              payload: {
                routes,
                path,
                authority,
                menuList: resData.menuList,
              },
            });
          }
        }
        reloadAuthorized();
        return data;
      } catch (e) {
        return e;
      }
    },
    // 查询全部的用户信息
    * queryUserList({ payload }, { call, put, select }) {
      const { userId } = yield select(({ user }) => user.userInfo);
      const { resData } = yield call(queryUserList, {
        userId,
        ...payload,
      });
      yield put({
        type: 'setter',
        payload: {
          userList: resData,
        },
      });
      return resData;
    },

    // 查询协议
    * queryProtocol({ payload }, { call }) {
      const data = yield call(queryProtocol, payload);
      return data;
    },

    // 协议确认
    * submitProtocol({ payload }, { call, put }) {
      try {
        const data = yield call(submitProtocol, payload);
        yield put({
          type: 'queryUsers',
          payload: {
            code: window.sessionStorage.getItem('code') || window.localStorage.getItem('code'),
            redirectUri: `${window.location.origin}/manage`,
            noChangeMeun: true,
          },
        });
        return data;
      } catch (e) {
        return e;
      }
    },
    // 下载中心
    * queryDownList({ payload }, { call, put }) {
      try {
        const { resData } = yield call(queryDownList, { ...payload });
        yield put({
          type: 'setter',
          payload: {
            downData: {
              ...resData,
            },
          },
        });
        return resData;
      } catch (e) {
        return e;
      }
    },
    // 下载中心
    * delDownList({ payload }, { call, put, select }) {
      const { downData } = yield select(({ user }) => user);
      try {
        yield call(delDownList, {
          ...payload,
        });
        message.success('删除成功');
        yield put({
          type: 'queryDownList',
          payload: {
            limit: downData.pageSize,
            page: downData.currPage,
          },
        });
      } catch (e) {
        return e;
      }
    },
  },

  reducers: {
    setter(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        ...payload,
      };
    },
    saveUserInfo(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
