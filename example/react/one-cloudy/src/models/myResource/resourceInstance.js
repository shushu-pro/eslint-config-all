import * as resourceInstance from '@/services/myResource/resourceInstance';

export default {
  namespace: 'resourceInstance',
  state: {
  },
  subscriptions: {
  },

  effects: {
    * queryResmngProductGroups({ payload, callback }, { call }) {
      const data = yield call(resourceInstance.queryResmngProductGroups, { ...payload });
      callback && callback(data);
    },
    * queryResourceList({ payload, callback }, { call }) {
      const data = yield call(resourceInstance.queryResourceList, { ...payload });
      callback && callback(data);
    },
    * queryInstanceListCommon({ payload, callback }, { call }) {
      const data = yield call(resourceInstance.queryInstanceListCommon, { ...payload });
      callback && callback(data);
    },
    * ticketApply({ payload, callback }, { call }) {
      const data = yield call(resourceInstance.ticketApply, { ...payload });
      callback && callback(data);
    },
    * ticketApplyChange({ payload, callback }, { call }) {
      const data = yield call(resourceInstance.ticketApplyChange, { ...payload });
      callback && callback(data);
    },
    * queryProductSpec({ payload, callback }, { call }) {
      const data = yield call(resourceInstance.queryProductSpec, { ...payload });
      callback && callback(data);
    },
    * queryCurrentDeptList({ payload, callback }, { call }) {
      const data = yield call(resourceInstance.queryCurrentDeptList, { ...payload });
      callback && callback(data);
    },
    * queryAllProjectlist({ payload, callback }, { call }) {
      const data = yield call(resourceInstance.queryAllProjectlist, { ...payload });
      callback && callback(data);
    },
    * queryInstanceTicketId({ payload, callback }, { call }) {
      const data = yield call(resourceInstance.queryInstanceTicketId, { ...payload });
      callback && callback(data);
    },
    * queryResourceDetail({ payload, callback }, { call, put }) {
      const data = yield call(resourceInstance.queryResourceDetail, { ...payload });
      // callback && callback(data);
      yield put({
        type: 'setter',
        payload: {
          resourceDetail: data.resData || {},
        },
      });
      callback && callback(data);
    },
  },

  reducers: {
    setter(state, {
      payload
    }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
