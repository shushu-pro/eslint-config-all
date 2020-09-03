/**
 * 此目录下用与页面数据存放，不进行服务器接口请求
 */
export default {
  namespace: 'pageData',

  state: {
    isStandard: true, // DataSmart版本选择
    recoveryList: {}, // 异地备份提交的数据
    OSSRecovData: {}, // OSS异地备份修改时页面数据
    updataOSSRecovData: null, // OSS异地备份数据展示方法
    regionId: null, // 配额管理下级配额查看region选区
  },

  effects: {
    // ACS主机数量
    * getDSStantard({ payload }, { put }) {
      yield put({
        type: 'setter',
        payload: {
          isStandard: payload.isStandard,
        },
      });
    },

    // 异地备份提交的数据
    * getRecoveryList({ payload }, { put }) {
      yield put({
        type: 'setter',
        payload: {
          recoveryList: payload.recoveryList,
        },
      });
    },

    // OSS异地备份修改时页面数据
    * getOSSRecovData({ payload }, { put }) {
      yield put({
        type: 'setter',
        payload: {
          OSSRecovData: payload.OSSRecovData,
        },
      });
    },

    // OSS异地备份数据展示方法
    * updataOSSRecovData({ payload }, { put }) {
      yield put({
        type: 'setter',
        payload: {
          updataOSSRecovData: () => {
            payload.updataOSSRecovData();
            setTimeout(() => {
              payload.updataOSSRecovData();
            }, 1);
          }
        },
      });
    },

    // 配额管理下级配额查看中云区选择
    * getRegionId({ payload }, { put }) {
      let regionId;
      if (payload === 1) {
        regionId = 'cloud-public';
      } else if (payload === 2) {
        regionId = 'cloud-private';
      } else if (payload === 3) {
        regionId = 'cloud-industry-pub';
      } else if (payload === 4) {
        regionId = 'cloud-industry-secu';
      }
      yield put({
        type: 'setter',
        payload: {
          regionId,
        },
      });
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
