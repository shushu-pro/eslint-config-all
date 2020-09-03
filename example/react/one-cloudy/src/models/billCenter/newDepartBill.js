import * as newDepartBill from '@/services/billCenter/newDepartBill';
import { message } from 'antd';
  
  
  export default {
    namespace: 'newDepartBill',
    state: {
    },
    subscriptions: {
    },
  
    effects: {
      *listMonthBillSumInfo({ payload,callback }, { call }) {
        const data = yield call(newDepartBill.listMonthBillSumInfo, { ...payload });
        callback && callback(data);
      },

      *listRegions({ payload,callback }, { call }) {
        const data = yield call(newDepartBill.listRegions, { ...payload });
        callback && callback(data);
      },

      *billSumInfo({ payload,callback }, { call }) {
        const data = yield call(newDepartBill.billSumInfo, { ...payload });
        callback && callback(data);
      },

      *listDeptBillSumInfo({ payload,callback }, { call }) {
        const data = yield call(newDepartBill.listDeptBillSumInfo, { ...payload });
        callback && callback(data);
      },

      *listProjectBillSumInfo({ payload,callback }, { call }) {
        const data = yield call(newDepartBill.listProjectBillSumInfo, { ...payload });
        callback && callback(data);
      },

      *listInstance({ payload,callback }, { call }) {
        const data = yield call(newDepartBill.listInstance, { ...payload });
        callback && callback(data);
      },
      
      *listProjectBillSumInfoExport({ payload,callback }, { call }) {
        const data = yield call(newDepartBill.listProjectBillSumInfoExport, { ...payload });
        message.success('正在导出中');
        callback && callback(data);
      },

      *listInstancesExport({ payload ,callback }, { call }) {
        const data = yield call(newDepartBill.listInstancesExport, { ...payload });
        message.success('正在导出中');
        callback && callback(data);
      },

      *queryAllProductName({ payload,callback }, { call }) {
        const data = yield call(newDepartBill.queryAllProductName, { ...payload });
        callback && callback(data);
      },

      *hasDeptBillMenu({ payload,callback }, { call }) {
        const data = yield call(newDepartBill.hasDeptBillMenu, { ...payload });
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
