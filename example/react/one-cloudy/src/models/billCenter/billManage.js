import {
  // 大数据局 - 列表
  queryBigDataMonthBillList,
  // 大数据局 - 某月详情
  queryBigDataMonthBillDetail,
  queryMonthDeptBillList,
  queryMonthDeptBillListExport,
  submitBureauFeedback,
  // 大数据局 - 某部门 - 账单详情tab
  queryBigDataDeptBillDetail,
  queryBigDataDeptMonthProjProdList,
  queryBigDatadeptMonthProjProdListExport,
  // 大数据局 - 某部门 - 项目账单 tab
  queryBigDataDeptMonthBillList,
  queryBigDataDeptMonthBillListExport,
  // 大数据局 - 某项目 - 项目资源tab
  queryBigDataProjectList,
  queryBigDataProjectListExport,

  // 一级部门 - 列表
  queryFirstDeptMonthBillList,
  // 一级部门 - 某月详情 -账单详情tab
  submitDeptFeedback,
  queryDeptBillDetail,
  queryDeptMonthProjectList,
  queryDeptMonthProjectListExport,
  // 一级部门 - 某月详情 - 项目账单 tab
  queryDeptMonthBillList,
  queryDeptMonthBillListExport,
  // 一级部门 - 某项目 - 项目资源 tab
  queryDeptProjectResource,
  queryDeptProjectResourceExport,
  queryProjectResourceChange,
  queryChangeInfo,
  // 一级部门 & 大数据局 共用
  queryInfo,
} from '@/services/billCenter/manage';
import pathToRegexp from 'path-to-regexp';
import { goExport } from '@/utils/utils';

export default {
  namespace: 'billCenter',

  state: {
    billList: {},
    monthDeptBillList: {},
    deptMonthProjectList: {},
    depProjectList: {},
    projectResource: {},
    projectInfo: {},
    // 是不是大数据
    isBigData: false,
    // 财务主体： 1 省大数据局 2: 省委政法委 3: 阿里 4 数字浙江
    ocFinanceDepartmentId: null,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathToRegexp('/manage/bill-center/list(.*)').test(pathname)) {
          dispatch({
            type: 'setter',
            payload: {
              isBigData: true,
            },
          });
        } else if (pathToRegexp('/manage/bill-center/myBill(.*)').test(pathname)) {
          dispatch({
            type: 'setter',
            payload: {
              isBigData: false,
              ocFinanceDepartmentId: null,
            },
          });
        }
      });
    },
  },
  effects: {
    // 大数据局 - 月度账单列表
    *queryMonthBillList({ payload }, { call, put }) {
      const { resData } = yield call(queryBigDataMonthBillList, { ...payload });
      yield put({
        type: 'setter',
        payload: {
          billList: resData,
        },
      });
    },
    // 大数据局 - 月度账单详情
    *queryBigDataMonthBillDetail({ payload }, { call, put, select }) {
      const { ocFinanceDepartmentId } = yield select(({ billCenter }) => billCenter);
      const { unitId } = payload;
      const { resData } = yield call(
        unitId ? queryBigDataDeptBillDetail : queryBigDataMonthBillDetail,
        {
          ocFinanceDepartmentId,
          ...payload,
        }
      );
      yield put({
        type: 'setter',
        payload: {
          detailData: resData,
        },
      });
    },
    // 大数据局 - 某月一级部门账单列表
    *queryMonthDeptBillList({ payload }, { call, put, select }) {
      const { ocFinanceDepartmentId } = yield select(({ billCenter }) => billCenter);
      const { resData } = yield call(queryMonthDeptBillList, {
        ocFinanceDepartmentId,
        ...payload,
      });
      yield put({
        type: 'setter',
        payload: {
          monthDeptBillList: resData,
        },
      });
    },
    // 大数据局 - 某月一级部门账单列表导出
    *queryMonthDeptBillListExport({ payload }, { call, put, select }) {
      const { ocFinanceDepartmentId } = yield select(({ billCenter }) => billCenter);
      const { resData } = yield call(queryMonthDeptBillListExport, {
        ocFinanceDepartmentId,
        ...payload,
      });
      yield put({
        type: 'setter',
        payload: {
          monthDeptBillUrl: resData,
        },
      });
    },
    // 大数据局 - 月度账单反馈
    *submitBureauFeedback({ payload }, { call, put }) {
      const data = yield call(submitBureauFeedback, { ...payload });
      if (data) {
        yield put({
          type: 'queryMonthDeptBillList',
          payload: {
            billNo: payload.billNo,
          },
        });
        yield put({
          type: 'queryBigDataMonthBillDetail',
          payload: {
            billNo: payload.billNo,
            seqno: payload.seqno,
          },
        });
      }
      return data;
    },

    // 一级部门 - 月度账单列表
    *queryFirstDeptMonthBillList({ payload }, { call, put, select }) {
      const { userId } = yield select(({ user }) => user.userInfo);
      const { resData } = yield call(queryFirstDeptMonthBillList, { ...payload, userId });
      yield put({
        type: 'setter',
        payload: {
          firstDeptMonthBill: resData,
        },
      });
    },
    // 一级部门 - 月度账单账单反馈
    *submitDeptFeedback({ payload }, { call, put }) {
      const data = yield call(submitDeptFeedback, { ...payload });
      if (data) {
        yield put({
          type: 'queryDeptMonthBillList',
          payload: {
            billNo: payload.billNo,
            departmentId: payload.departmentId,
          },
        });
        yield put({
          type: 'queryDeptMonthProjectList',
          payload: {
            billNo: payload.billNo,
            departmentId: payload.departmentId,
          },
        });
        yield put({
          type: 'queryDeptBillDetail',
          payload: {
            billNo: payload.billNo,
            departmentId: payload.departmentId,
          },
        });
      }
      return data;
    },

    // 大数据局 & 一级部门  部门账单详情  入参： departmentId、billNo，一级部门不需要departmentId
    *queryDeptBillDetail({ payload }, { call, put, select }) {
      const { isBigData, ocFinanceDepartmentId } = yield select(({ billCenter }) => billCenter);
      if (isBigData) {
        payload = {
          ...payload,
          ocFinanceDepartmentId,
        };
      }
      const { resData } = yield call(isBigData ? queryBigDataDeptBillDetail : queryDeptBillDetail, {
        ...payload,
      });
      yield put({
        type: 'setter',
        payload: {
          deptBillDetail: resData,
        },
      });
    },
    // 大数据局 & 一级部门  跨项目资源列表  入参： departmentId、billNo，一级部门不需要departmentId
    *queryDeptProjProdList({ payload }, { call, put, select }) {
      const { isBigData, ocFinanceDepartmentId } = yield select(({ billCenter }) => billCenter);
      if (isBigData) {
        payload = {
          ...payload,
          ocFinanceDepartmentId,
        };
      }

      const { resData } = yield call(
        isBigData ? queryBigDataDeptMonthProjProdList : queryDeptMonthProjectList,
        {
          ...payload,
        }
      );
      yield put({
        type: 'setter',
        payload: {
          deptProjProdList: resData,
        },
      });
    },
    // 大数据局 & 一级部门  跨项目资源列表导出  入参： departmentId、billNo，一级部门不需要departmentId
    *queryDeptProjProdListExport({ payload }, { call, select }) {
      const { isBigData } = yield select(({ billCenter }) => billCenter);
      const { resData } = yield call(
        isBigData ? queryBigDatadeptMonthProjProdListExport : queryDeptMonthProjectListExport,
        { ...payload }
      );
      goExport(resData);
      // yield put({
      //   type: 'setter',
      //   payload: {
      //     deptProjProdListUrl: resData,
      //   },
      // });
    },
    // 大数据局 & 一级部门  项目列表  入参： departmentId、billNo，一级部门不需要departmentId
    *queryDeptMonthBillList({ payload }, { call, put, select }) {
      const { isBigData } = yield select(({ billCenter }) => billCenter);
      const { resData } = yield call(
        isBigData ? queryBigDataDeptMonthBillList : queryDeptMonthBillList,
        { ...payload }
      );
      yield put({
        type: 'setter',
        payload: {
          deptProjectList: resData,
        },
      });
    },
    // 大数据局 & 一级部门  项目列表导出  入参： departmentId、billNo，一级部门不需要departmentId
    *queryDeptMonthBillListExport({ payload }, { call, put, select }) {
      const { isBigData } = yield select(({ billCenter }) => billCenter);
      const { resData } = yield call(
        isBigData ? queryBigDataDeptMonthBillListExport : queryDeptMonthBillListExport,
        { ...payload }
      );
      yield put({
        type: 'setter',
        payload: {
          deptProjectListUrl: resData,
        },
      });
    },
    // 大数据局 & 一级部门  项目资源列表  入参： departmentId、billNo、projectId，一级部门不需要departmentId
    *queryProjectList({ payload }, { call, put, select }) {
      const { isBigData } = yield select(({ billCenter }) => billCenter);
      const { resData } = yield call(
        isBigData ? queryBigDataProjectList : queryDeptProjectResource,
        { ...payload }
      );
      yield put({
        type: 'setter',
        payload: {
          projectResource: resData,
        },
      });
    },
    // 大数据局 & 一级部门  项目资源列表导出  入参： departmentId、billNo、projectId，一级部门不需要departmentId
    *queryProjectListExport({ payload }, { call, select }) {
      const { isBigData } = yield select(({ billCenter }) => billCenter);
      const { resData } = yield call(
        isBigData ? queryBigDataProjectListExport : queryDeptProjectResourceExport,
        { ...payload }
      );
      goExport(resData);
      // yield put({
      //   type: 'setter',
      //   payload: {
      //     projectResourceUrl: resData,
      //   },
      // });
    },
    // 一级部门 - 月度账单 - 跨项目资源列表 - 变更查询
    *queryChangeInfo({ payload }, { call, put }) {
      try {
        const data = yield call(queryChangeInfo, { ...payload });
        yield put({
          type: 'setter',
          payload: {
            changeInfoList: data.resData,
          },
        });
        return data;
      } catch (e) {
        return e;
      }
    },
    // 一级部门 - 项目资源 - 变更查询
    *queryProjectResourceChange({ payload }, { call, put }) {
      const { resData } = yield call(queryProjectResourceChange, {
        ...payload,
      });
      yield put({
        type: 'setter',
        payload: {
          projectChangeInfoList: resData,
        },
      });
    },
    // 查询项目信息
    *queryInfo({ payload }, { call }) {
      try {
        const res = yield call(queryInfo, { ...payload });
        return res.resData;
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
};
