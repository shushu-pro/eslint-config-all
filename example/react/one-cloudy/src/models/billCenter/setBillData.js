
// 设置部门账单-数据共享
export default {
  namespace: 'setBillData',
  state: {
    billStatic: {
      productNum: '', fee: '', mom: '', yoy: '',
    },
  },
  reducers: {
    addbillStatic (state, { payload: { billStatic } }) {
      return { ...state, billStatic }
    },
  },
  effects: {
    * setbillStatic ({ payload }, { put }) {
      yield put({
        type: 'addbillStatic',
        payload,
      })
    },
    * getbillStatic ({ callback }, { select }) {
      const m = yield select((state) => state.setBillData.billStatic)
      callback && callback(m)
    },
  },
  subscriptions: {
  },
}
