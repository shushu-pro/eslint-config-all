import {
  queryFeedbackList,
  queryDeptProject,
  queryApplyList,
  queryDtDeptProject,
  queryResList,
} from '@/services/OperationCenter/operationOrder';
import mergePagedTable from '@/components/Common/PagedTable/pagedTable';

export default mergePagedTable(queryFeedbackList)({
  namespace: 'feedback',

  state: {
    // 反馈数据
    feedbackList: [],
  },
  effects: {
    // 反馈信息列表
    * queryFeedbackList({ payload }, { put }) {
      yield put({
        type: 'pagedQuery',
        payload: {
          ...payload,
        },
      });
    },
    // 部门项目列表（管理端）
    * queryDeptProject({ payload }, { call, put }) {
      const { resData } = yield call(queryDeptProject, payload);
      yield put({
        type: 'setter',
        payload: {
          deptProjectList: resData || [],
        },
      });
    },
    // 申请资源列表（管理端）
    * queryApplyList({ payload }, { call }) {
      const data = yield call(queryApplyList, payload);
      return data;
    },

    // dt - 资源实例列表（管理端）
    * queryResList({ payload }, { call }) {
      const data = yield call(queryResList, payload);
      return data;
    },
    // dt- 部门项目列表（管理端）
    * queryDtDeptProject({ payload }, { call, put }) {
      const { resData } = yield call(queryDtDeptProject, payload);
      yield put({
        type: 'setter',
        payload: {
          dtProjectList: resData || [],
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
  },
});
