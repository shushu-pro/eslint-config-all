import { getSubDeptList } from '@/services/OperationCenter/quotaManage';

export default {
  namespace: 'quotaManage',
  state: {
    refreshQuotaList: () => { }, // 刷新配额列表数据的函数
    subDeptList: null, // 子部门列表
  },
  effects: {
    // 配额管理查看是否包含子部门
    * getSubDeptList({ payload }, { call, put }) {
      const { resData } = yield call(getSubDeptList, { ...payload });
      yield put({
        type: 'setter',
        payload: {
          subDeptList: resData,
        },
      });
    },
  },
  reducers: {
    setter(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  }
};
