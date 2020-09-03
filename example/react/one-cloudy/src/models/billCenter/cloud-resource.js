// 云资源管理
import {
  queryDownloadFiles,
  queryUploadFiles,
  deleteUploadFiles,
  uploadFile
} from '@/services/billCenter/cloud-resource';
import { message } from 'antd';
// import { message } from 'antd';

export default {
  namespace: 'cloudResource',
  state: {
    downloadFiles: {
      pagination: {},
      dataSource: []
    },
    uploadFiles: {
      pagination: {},
      dataSource: []
    },
  },
  subscriptions: {},
  effects: {
    * queryDownloadFiles({ payload }, { call, put }) {
      const { resData } = yield call(queryDownloadFiles, {
        ...payload,
      });
      yield put({
        type: 'setter',
        payload: {
          downloadFiles: {
            pagination: resData,
            dataSource: resData.list
          },
        },
      });
    },

    * queryUploadFiles({ payload }, { call, put }) {
      const { resData } = yield call(queryUploadFiles, {
        ...payload,
      });
      yield put({
        type: 'setter',
        payload: {
          uploadFiles: {
            pagination: resData,
            dataSource: resData.list
          },
        },
      });
    },

    * deleteUploadFiles({ payload, callback }, { call }) {
      const { resData } = yield call(deleteUploadFiles, {
        deptBillFileId: payload,
      });

      message.info(resData);
      callback && callback();
    },

    * uploadFile({ payload }, { call }) {
      const { resData } = yield call(uploadFile, {
        file: payload,
      });
      message.info(resData);
    }

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
