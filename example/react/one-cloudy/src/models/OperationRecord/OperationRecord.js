import * as OperationRecord from '@/services/OperationRecord/OperationRecord';

export default {
  namespace: 'OperationRecord',
  state: {},
  subscriptions: {},

  effects: {
    * getOperateList({ payload, callback }, { call }) {
      const data = yield call(OperationRecord.getOperateList, { ...payload });
      callback && callback(data);
      return data;
    },

    * getInstanceChangeInfo({ payload, callback }, { call }) {
      const data = yield call(OperationRecord.getInstanceChangeInfo, { ...payload });
      callback && callback(data);
      return data;
    },

    * getOperateDetail({ payload, callback }, { call }) {
      const data = yield call(OperationRecord.getOperateDetail, { ...payload });
      callback && callback(data);
    },

    * ticketRevert({ payload, callback }, { call }) {
      const data = yield call(OperationRecord.ticketRevert, { ...payload });
      callback && callback(data);
      return data;
    },

    * approve({ payload, callback }, { call }) {
      const data = yield call(OperationRecord.approve, { ...payload });
      callback && callback(data);
    },

    * releaseReview({ payload, callback }, { call }) {
      const data = yield call(OperationRecord.releaseReview, { ...payload });
      callback && callback(data);
    },

    * applyReviewOrApprove({ payload, callback }, { call }) {
      const data = yield call(OperationRecord.applyReviewOrApprove, { ...payload });
      callback && callback(data);
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
