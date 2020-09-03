import {
  queryOperationsStaffMonthBillList,
  queryOperationsStaffMonthBillDetail,
  queryMonthRegionDeptBillList,
  queryMonthRegionDeptBillExport,
  queryMonthDeptRegionBillList,
  queryDeptMonthProjProdList,
  queryMonthProjectBillExport,

  queryAllProductName,
  queryDeptAllProject,
  queryAllDept,
  queryDeptBillProject,
  submitSend,
  submitAdd,
  submitUpdate,
  submitUpdateDeptProject,
  submitDelete,
  queryOperatorMonthProjectBillExport,
} from '@/services/billCenter/send';
import { goExport } from '@/utils/utils';
import pathToRegexp from 'path-to-regexp';
import { message } from 'antd';


export default {
  namespace: 'billSend',

  state: {
    isSend: false,
  },
  subscriptions: {
    setup({
      dispatch,
      history
    }) {
      history.listen(({
        pathname
      }) => {
        if (pathToRegexp('/manage/bill-center/send(.*)').test(pathname)) {
          dispatch({
            type: 'setter',
            payload: {
              isSend: true,
            },
          });
        } else if (pathToRegexp('/manage/bill-center/statistics(.*)').test(pathname)) {
          dispatch({
            type: 'setter',
            payload: {
              isSend: false,
            },
          });
        }
      });
    }
  },

  effects: {
    * queryOperationsStaffMonthBillList({ payload }, { call, put }) {
      const { resData } = yield call(queryOperationsStaffMonthBillList, { ...payload });
      yield put({
        type: 'setter',
        payload: {
          billList: resData,
        },
      });
    },
    // 账单统计 - 账单详情
    * queryOperationsStaffMonthBillDetail({ payload }, { call, put }) {
      const { resData } = yield call(queryOperationsStaffMonthBillDetail, { ...payload });
      yield put({
        type: 'setter',
        payload: {
          monthBillDeatil: resData,
        },
      });
    },
    // 账单统计 - region 列表
    * queryMonthRegionDeptBillList({ payload }, { call, put }) {
      const { resData } = yield call(queryMonthRegionDeptBillList, { ...payload });
      yield put({
        type: 'setter',
        payload: {
          regionDeptBillList: resData,
        },
      });
    },
    // 账单统计 - region 列表导出
    * queryMonthRegionDeptBillExport({ payload }, { call }) {
      const { resData } = yield call(queryMonthRegionDeptBillExport, { ...payload });
      goExport(resData);
    },
    // 账单发送与编辑 - 列表
    * queryMonthDeptRegionBillList({ payload }, { call, put }) {
      const { resData } = yield call(queryMonthDeptRegionBillList, { ...payload });
      yield put({
        type: 'setter',
        payload: {
          monthDeptRegionBillList: resData,
        },
      });
    },
    // 资源列表
    * queryDeptMonthProjProdList({ payload }, { call, put }) {
      const { resData } = yield call(queryDeptMonthProjProdList, { ...payload });
      yield put({
        type: 'setter',
        payload: {
          projProdList: resData,
        },
      });
    },
    // 资源列表导出
    * queryMonthProjectBillExport({ payload }, { call }) {
      const { resData } = yield call(queryMonthProjectBillExport, { ...payload });
      goExport(resData);
    },
    // 全部资源
    * queryAllProductName({ payload }, { call, put }) {
      const { resData } = yield call(queryAllProductName, { ...payload });
      const list = resData ? resData.map(key => ({
        key,
        value: key,
      })) : [];
      yield put({
        type: 'setter',
        payload: {
          allProductNameList: list,
        },
      });
    },
    // 某部门下所有项目
    * queryDeptAllProject({ payload }, { call, put }) {
      const { resData } = yield call(queryDeptAllProject, { ...payload });
      const list = resData ? resData.map(item => ({
        key: item.dtProjectId,
        value: item.name,
      })) : [];
      yield put({
        type: 'setter',
        payload: {
          deptAllProjectList: list,
        },
      });
    },
    // 所有某月部门项目
    * queryDeptBillProject({ payload }, { call, put }) {
      const { resData } = yield call(queryDeptBillProject, { ...payload });
      yield put({
        type: 'setter',
        payload: {
          deptBillProjectList: resData,
        },
      });
    },
    // 所有部门
    * queryAllDept({ payload }, { call, put }) {
      const { resData } = yield call(queryAllDept, { ...payload });
      const list = resData ? resData.map(item => ({
        key: item.deptId,
        deptId: item.deptId,
        value: item.deptName,
      })) : [];
      yield put({
        type: 'setter',
        payload: {
          allDeptList: list,
        },
      });
    },

    // 账单发送
    * submitSend({ payload }, { call, put }) {
      try {
        yield call(submitSend, { ...payload });
        message.success('发送成功');
        yield put({
          type: 'queryMonthDeptRegionBillList',
          payload: {
            billNo: payload.billNo,
          },
        });
      } catch (e) {
        return e;
      }
    },
    // 新增
    * submitAdd({ payload }, { call, put }) {
      try {
        const data = yield call(submitAdd, { ...payload });
        message.success('添加成功');
        yield put({
          type: 'queryDeptMonthProjProdList',
          payload: {
            billNo: payload.billNo,
            departmentId: payload.departmentId,
          },
        });
        return data;
      } catch (e) {
        return e;
      }
    },
    // 修改
    * submitUpdate({ payload }, { call, put }) {
      try {
        const data = yield call(submitUpdate, { ...payload });
        message.success('修改成功');
        yield put({
          type: 'queryDeptMonthProjProdList',
          payload: {
            billNo: payload.billNo,
            departmentId: payload.oldDepartmentId,
          },
        });
        return data;
      } catch (e) {
        return e;
      }
    },
    // 移动项目
    * submitUpdateDeptProject({ payload }, { call, put }) {
      try {
        const data = yield call(submitUpdateDeptProject, { ...payload });
        message.success('项目移动成功');
        yield put({
          type: 'queryDeptMonthProjProdList',
          payload: {
            billNo: payload.billNo,
            departmentId: payload.oldDepartmentId,
          },
        });
        return data;
      } catch (e) {
        return e;
      }
    },
    // 移动项目
    * submitDelete({ payload }, { call, put }) {
      try {
        const data = yield call(submitDelete, { ...payload });
        message.success('删除成功');
        yield put({
          type: 'queryDeptMonthProjProdList',
          payload: {
            billNo: payload.billNo,
            departmentId: payload.departmentId,
          },
        });
        return data;
      } catch (e) {
        return e;
      }
    },
    // 下载所有的实例信息
    * queryOperatorMonthProjectBillExport({ payload }, { call }) {
      try {
        const data = yield call(queryOperatorMonthProjectBillExport, {
          ...payload
        });
        message.success('请前往右上方下载中心');
        return data;
      } catch (e) {
        return e;
      }
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
