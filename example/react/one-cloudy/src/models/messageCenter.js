import { getMessageList, getMessageDetail } from '@/services/messageCenter';
import { STATUS_MAP_TEXT } from '@/pages/OperationCenter/OperationOrder/contant';

export default {
  namespace: 'messageCenter',
  state: {
    page: 1,
    limit: 10,
    messageList: [],
    messageListSimple: {},
    generatorContent(data) {
      return `${data.userName}${STATUS_MAP_TEXT[data.state]}了资源，申请单号为${data.applyId}。`;
    },
  },
  effects: {
    *getMessageList({ payload = {} }, { put, call, select }) {
      const { getType, ...arg } = payload;
      const page = yield select(({ messageCenter }) => messageCenter.page);
      const limit = yield select(({ messageCenter }) => messageCenter.limit);
      let setParam = '';
      let param = {};
      if (getType === 'simple') {
        setParam = 'messageListSimple';
        param = {
          page: '1',
          limit: '5',
        };
      } else {
        setParam = 'messageList';
        param = {
          page,
          limit,
        };
      }
      const { resData } = yield call(getMessageList, { ...param, ...arg });

      yield put({
        type: 'setter',
        payload: {
          [setParam]: resData,
        },
      });
    },
    *getMessageDetail({ payload }, { call }) {
      return yield call(getMessageDetail, payload);
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
