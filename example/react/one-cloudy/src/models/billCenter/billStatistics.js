import {
  queryMonthProjectBillList,
  queryOperatorMonthProjectBillExport,
} from '@/services/billCenter/statistics';
import { queryAllProductName } from '@/services/billCenter/send';
import { message } from 'antd';

export default {
  namespace: 'billStatistics',
  state: {
    statisticsData: {},
    allProductNameList: [],
  },
  subscriptions: {},
  effects: {
    *queryMonthProjectBillList({ payload }, { call, put }) {
      const { resData } = yield call(queryMonthProjectBillList, {
        ...payload,
      });
      yield put({
        type: 'setter',
        payload: {
          statisticsData: resData,
        },
      });
    },
    // 下载所有的实例信息
    *queryOperatorMonthProjectBillExport({ payload }, { call }) {
      try {
        const data = yield call(queryOperatorMonthProjectBillExport, {
          ...payload,
        });
        message.success('请前往右上方下载中心');
        return data;
      } catch (e) {
        return e;
      }
    },
    // 下载所有的实例信息
    *queryAllProductName({ payload }, { call, put }) {
      try {
        const { resData } = yield call(queryAllProductName, {
          ...payload,
        });
        yield put({
          type: 'setter',
          payload: {
            allProductNameList: resData.map(key => ({
              value: key,
              text: key,
            })),
          },
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
};
