import * as newBillStatistics from '@/services/billCenter/newBillStatistics';

    
  export default {
    namespace: 'newBillStatistics',
    state: {
    },
    subscriptions: {
    },
  
    effects: {
      *getDepartmentBillStatistics({ payload,callback }, { call }) {
        const data = yield call(newBillStatistics.getDepartmentBillStatistics, { ...payload });
        callback && callback(data);
      },

      *getProjectBillStatistics({ payload,callback }, { call }) {
        const data = yield call(newBillStatistics.getProjectBillStatistics, { ...payload });
        callback && callback(data);
      },

      *getInstanceBillStatistics({ payload,callback }, { call }) {
        const data = yield call(newBillStatistics.getInstanceBillStatistics, { ...payload });
        callback && callback(data);
      },

      *getBillStatistics({ payload,callback }, { call }) {
        const data = yield call(newBillStatistics.getBillStatistics, { ...payload });
        callback && callback(data);
      },

      *getDepartmentBillStatisticsExport({ payload,callback }, { call }) {
        const data = yield call(newBillStatistics.getDepartmentBillStatisticsExport, { ...payload });
        callback && callback(data);
      },

      *getProjectBillStatisticsExport({ payload,callback }, { call }) {
        const data = yield call(newBillStatistics.getProjectBillStatisticsExport, { ...payload });
        callback && callback(data);
      },

      *getInstanceBillStatisticsExport({ payload,callback }, { call }) {
        const data = yield call(newBillStatistics.getInstanceBillStatisticsExport, { ...payload });
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
