import * as ACdepartment from '@/services/AuthorityCenter/ACdepartment';

export default {
  namespace: 'ACdepartment',
  state: {
  },
  subscriptions: {
  },

  effects: {
    * getOcDeptTree({ payload, callback }, { call }) {
      const data = yield call(ACdepartment.getOcDeptTree, { ...payload });
      callback && callback(data);
    },

    * getPlatformIntegrationList({ payload, callback }, { call }) {
      const data = yield call(ACdepartment.getPlatformIntegrationList, { ...payload });
      callback && callback(data);
    },

    * getOcDeptRelatedUserList({ payload, callback }, { call }) {
      const data = yield call(ACdepartment.getOcDeptRelatedUserList, { ...payload });
      callback && callback(data);
    },

    * getDtDeptTree({ payload, callback }, { call }) {
      const data = yield call(ACdepartment.getDtDeptTree, { ...payload });
      callback && callback(data);
    },

    * checkOcDtDeptUnbound({ payload, callback }, { call }) {
      const data = yield call(ACdepartment.checkOcDtDeptUnbound, { ...payload });
      callback && callback(data);
    },

    * getFinanceDepartmentList({ payload, callback }, { call }) {
      const data = yield call(ACdepartment.getFinanceDepartmentList, { ...payload });
      callback && callback(data);
    },

    * saveOcDtDeptRelationFinance({ payload, callback }, { call }) {
      const data = yield call(ACdepartment.saveOcDtDeptRelationFinance, { ...payload });
      callback && callback(data);
    },

    * checkOcDeptIsExists({ payload, callback }, { call }) {
      const data = yield call(ACdepartment.checkOcDeptIsExists, { ...payload });
      callback && callback(data);
    },

    * updateOcDept({ payload, callback }, { call }) {
      const data = yield call(ACdepartment.updateOcDept, { ...payload });
      callback && callback(data);
    },

    * deleteOcDept({ payload, callback }, { call }) {
      const data = yield call(ACdepartment.deleteOcDept, { ...payload });
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
