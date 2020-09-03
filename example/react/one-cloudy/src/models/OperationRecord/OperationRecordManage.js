import * as OperationRecordManage from '@/services/OperationRecord/OperationRecordManage';

export default {
  namespace: 'OperationRecordManage',
  state: {},
  subscriptions: {},

  effects: {
    * instanceListCommon({ payload, callback }, { call }) {
      const data = yield call(OperationRecordManage.instanceListCommon, { ...payload });
      callback && callback(data);
      return data;
    },
    * instanceSave({ payload, callback }, { call }) {
      const data = yield call(OperationRecordManage.instanceSave, { ...payload });
      callback && callback(data);
      return data;
    },
    * nDtInstanceDetail({ payload, callback }, { call }) {
      const data = yield call(OperationRecordManage.nDtInstanceDetail, { ...payload });
      callback && callback(data);
      return data;
    },
    * instanceDelete({ payload, callback }, { call }) {
      const data = yield call(OperationRecordManage.instanceDelete, { ...payload });
      callback && callback(data);
      return data;
    },
  },

  reducers: {
    setter(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
