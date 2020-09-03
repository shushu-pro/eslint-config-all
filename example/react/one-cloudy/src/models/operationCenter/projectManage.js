import {
  queryList,
  queryDeptlist,
  submitProjectData,
  submitApplyAssignor,
  submitUpdate,
  queryInfo,
  submitDelete,
} from '@/services/OperationCenter/projectManage';
import mergePagedTable from '@/components/Common/PagedTable/pagedTable';

const projectManage = mergePagedTable(queryList)({
  namespace: 'projectManage',

  state: {
    // 部门列表
    deptlist: [],
  },
  effects: {
    * queryList({ payload }, { put, select }) {
      const { roleList } = yield select(({ user }) => user);
      const canAction = roleList.indexOf('resourceApply') > -1;
      yield put({
        type: 'pagedQuery',
        payload: {
          ...payload,
        },
      });
      if (canAction) {
        yield put({
          type: 'user/queryUserList',
        });
      }
    },
    * queryDeptlist({ payload }, { call, put }) {
      const { resData } = yield call(queryDeptlist, {
        ...payload,
      });
      yield put({
        type: 'setter',
        payload: {
          deptlist: resData,
        },
      });
    },
    // 提交项目信息
    * submitProjectData({ payload }, { call, select }) {
      const { deptId } = yield select(({ user }) => user);
      const data = yield call(submitProjectData, {
        ...payload,
        deptId,
      });
      return data;
    },
    // 更新
    * submitUpdate({ payload }, { call, select }) {
      const { deptId } = yield select(({ user }) => user);
      const data = yield call(submitUpdate, {
        ...payload,
        deptId,
      });
      return data;
    },
    // 更新指派人
    * submitApplyAssignor({ payload }, { call }) {
      try {
        const res = yield call(submitApplyAssignor, { ...payload });
        return res;
      } catch (e) {
        return e;
      }
    },
    // 查询项目信息
    * queryInfo({ payload }, { call }) {
      try {
        const res = yield call(queryInfo, { ...payload });
        return res.resData;
      } catch (e) {
        return e;
      }
    },
    // 删除
    * submitDelete({ payload }, { call, put }) {
      try {
        yield call(submitDelete, { ...payload });
        yield put({
          type: 'queryList',
        });
      } catch (e) {
        return e;
      }
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
export default projectManage;
