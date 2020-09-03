import * as ACproject from '@/services/AuthorityCenter/ACproject';

export default {
  namespace: 'ACproject',
  state: {
  },
  subscriptions: {
  },

  effects: {
    * deptList({ payload, callback }, { call }) {
      const data = yield call(ACproject.deptList, { ...payload });
      callback && callback(data);
    },

    * match({ payload, callback }, { call }) {
      const data = yield call(ACproject.match, { ...payload });
      callback && callback(data);
    },

    * list({ payload, callback }, { call }) {
      const data = yield call(ACproject.list, { ...payload });
      callback && callback(data);
    },

    * ocprojectinfoList({ payload, callback }, { call }) {
      const data = yield call(ACproject.ocprojectinfoList, { ...payload });
      callback && callback(data);
    },

    * ocprojectinfoSave({ payload, callback }, { call }) {
      const data = yield call(ACproject.ocprojectinfoSave, { ...payload });
      callback && callback(data);
      return data;
    },

    * ocprojectinfoInfo({ payload, callback }, { call }) {
      const data = yield call(ACproject.ocprojectinfoInfo, { ...payload });
      callback && callback(data);
    },

    * ocprojectinfoUpdate({ payload, callback }, { call }) {
      const data = yield call(ACproject.ocprojectinfoUpdate, { ...payload });
      callback && callback(data);
    },

    * ocprojectinfoDelete({ payload, callback }, { call }) {
      const data = yield call(ACproject.ocprojectinfoDelete, { ...payload });
      callback && callback(data);
    },

    * alluserlist({ payload, callback }, { call }) {
      const data = yield call(ACproject.alluserlist, { ...payload });
      callback && callback(data);
    },

    * queryOrderList({ payload, callback }, { call }) {
      const data = yield call(ACproject.queryOrderList, { ...payload });
      callback && callback(data);
    },

    * queryOrderDetail({ payload, callback }, { call }) {
      const data = yield call(ACproject.queryOrderDetail, { ...payload });
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
