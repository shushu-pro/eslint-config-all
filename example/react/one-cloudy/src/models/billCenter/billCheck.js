import {
  getDeptSummaryBillPageList,
  getDeptBillByRegion,
  getDeptBillByProductName,
  checkRegionBill,
  unCheckRegionBill,
  sendRegionBill,
  getDeptMonthProdList,
  queryRegionBillStatus,
  getAllProductName,
  getDeptBillListByRegionExport,
  getDeptBillByProductNameExport,
  getDeptBillListExport,
  getDeptBillProjectRegions,
} from '@/services/billCenter/check';
import {
  submitAdd,
  submitUpdate,
  submitUpdateDeptProject,
  submitDelete,
} from '@/services/billCenter/send';
import { goExport } from '@/utils/utils';
import { message } from 'antd';

export default {
  namespace: 'billCheck',
  state: {
    deptSummaryBillPageList: {},
    deptBillListByRegion: {},
    deptBillListByProductName: {},
    checkRegionBill: {},
    unCheckRegionBill: {},
    sendRegionBill: {},
  },
  subscriptions: {},
  effects: {
    * getDeptSummaryBillPageList({ payload }, { call, put }) {
      const { resData } = yield call(getDeptSummaryBillPageList, {
        ...payload,
      });
      yield put({
        type: 'setter',
        payload: {
          deptSummaryBillPageList: resData,
        },
      });
    },
    * getDeptBillByRegion({ payload, callback }, { call }) {
      const date = yield call(getDeptBillByRegion, {
        ...payload,
      });
      if (callback && typeof callback === 'function') {
        callback(date);
      }
    },
    * getDeptBillByProductName({ payload, callback }, { call }) {
      const date = yield call(getDeptBillByProductName, {
        ...payload,
      });
      if (callback && typeof callback === 'function') {
        callback(date);
      }
    },

    * queryRegionBillStatus({ payload, callback }, { call }) {
      const date = yield call(queryRegionBillStatus, {
        ...payload,
      });
      if (callback && typeof callback === 'function') {
        callback(date);
      }
    },

    * getDeptMonthProdList({ payload, callback }, { call }) {
      const date = yield call(getDeptMonthProdList, {
        ...payload,
      });
      if (callback && typeof callback === 'function') {
        callback(date);
      }
    },

    * getAllProductName({ payload, callback }, { call }) {
      const date = yield call(getAllProductName, {
        ...payload,
      });
      if (callback && typeof callback === 'function') {
        callback(date);
      }
    },

    * checkRegionBill({ payload, callback }, { call, put }) {
      const date = yield call(checkRegionBill, {
        ...payload,
      });
      if (callback && typeof callback === 'function') {
        callback(date);
      }
      yield put({
        type: 'setter',
        payload: {
          checkRegionBill: date
        },
      });
    },
    * unCheckRegionBill({ payload, callback }, { call, put }) {
      const date = yield call(unCheckRegionBill, {
        ...payload,
      });
      if (callback && typeof callback === 'function') {
        callback(date);
      }
      yield put({
        type: 'setter',
        payload: {
          unCheckRegionBill: date
        },
      });
    },
    * sendRegionBill({ payload, callback }, { call, put }) {
      const date = yield call(sendRegionBill, {
        ...payload,
      });
      if (callback && typeof callback === 'function') {
        callback(date);
      }
      yield put({
        type: 'setter',
        payload: {
          sendRegionBill: date
        },
      });
    },

    * getDeptBillListByRegionExport({ payload }, { call }) {
      const { resData } = yield call(getDeptBillListByRegionExport, { ...payload });
      goExport(resData);
    },

    * getDeptBillByProductNameExport({ payload }, { call }) {
      const { resData } = yield call(getDeptBillByProductNameExport, { ...payload });
      goExport(resData);
    },

    * getDeptBillListExport({ payload }, { call }) {
      const { resData } = yield call(getDeptBillListExport, { ...payload });
      goExport(resData);
    },

    // 新增
    * submitAdd({ payload }, { call }) {
      try {
        const data = yield call(submitAdd, { ...payload });
        message.success('添加成功');

        return data;
      } catch (e) {
        return e;
      }
    },
    // 修改
    * submitUpdate({ payload }, { call }) {
      try {
        const data = yield call(submitUpdate, { ...payload });
        message.success('修改成功');

        return data;
      } catch (e) {
        return e;
      }
    },
    // 移动项目
    * submitUpdateDeptProject({ payload }, { call }) {
      try {
        const data = yield call(submitUpdateDeptProject, { ...payload });
        message.success('项目移动成功');

        return data;
      } catch (e) {
        return e;
      }
    },
    // 删除项目
    * submitDelete({ payload }, { call }) {
      try {
        const data = yield call(submitDelete, { ...payload });
        message.success('删除成功');

        return data;
      } catch (e) {
        return e;
      }
    },

    // 移动项目，查询云区列表及资源使用数
    * queryProjcetInfo({ payload }, { call }) {
      const { resData } = yield call(getDeptBillProjectRegions, { ...payload });
      return resData;
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
