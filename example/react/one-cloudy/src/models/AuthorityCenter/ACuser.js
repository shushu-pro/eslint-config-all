import * as ACuser from '@/services/AuthorityCenter/ACuser';

export default {
  namespace: 'ACuser',
  state: {
    userInfo: {}
  },
  subscriptions: {
  },

  effects: {
    * addUser({ payload, callback }, { call }) {
      const data = yield call(ACuser.addUser, { ...payload });
      callback && callback(data);
    },

    * updateUserInfo({ payload, callback }, { call }) {
      const data = yield call(ACuser.updateUserInfo, { ...payload });
      callback && callback(data);
    },

    * uploadUserImage({ payload, callback }, { call }) {
      const data = yield call(ACuser.uploadUserImage, { ...payload });
      callback && callback(data);
    },

    * updateUserStatus({ payload, callback }, { call }) {
      const data = yield call(ACuser.updateUserStatus, { ...payload });
      callback && callback(data);
    },

    * getUserList({ payload, callback }, { call }) {
      const data = yield call(ACuser.getUserList, { ...payload });
      callback && callback(data);
    },

    * deleteUser({ payload, callback }, { call }) {
      const data = yield call(ACuser.deleteUser, { ...payload });
      callback && callback(data);
    },

    * getDtRegion({ payload, callback }, { call }) {
      const data = yield call(ACuser.getDtRegion, { ...payload });
      callback && callback(data);
    },

    * createSysMapping({ payload, callback }, { call }) {
      const data = yield call(ACuser.createSysMapping, { ...payload });
      callback && callback(data);
    },

    * createDtUserByOcInfo({ payload, callback }, { call }) {
      const data = yield call(ACuser.createDtUserByOcInfo, { ...payload });
      callback && callback(data);
    },

    * getDtUserList({ payload, callback }, { call }) {
      const data = yield call(ACuser.getDtUserList, { ...payload });
      callback && callback(data);
    },

    * getProjectByUserId({ payload, callback }, { call }) {
      const data = yield call(ACuser.getProjectByUserId, { ...payload });
      callback && callback(data);
    },

    * getUserById({ payload, callback }, { call }) {
      const data = yield call(ACuser.getUserById, { ...payload });
      callback && callback(data);
    },

    * addUserProject({ payload, callback }, { call }) {
      const data = yield call(ACuser.addUserProject, { ...payload });
      callback && callback(data);
    },

    * getProjectList({ payload, callback }, { call }) {
      const data = yield call(ACuser.getProjectList, { ...payload });
      callback && callback(data);
    },

    * removeUserProject({ payload, callback }, { call }) {
      const data = yield call(ACuser.removeUserProject, { ...payload });
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
