// import { routerRedux } from 'dva/router';
import _ from 'lodash';
import {
  queryOrderList,
  queryOrderDetail,
  queryFlowDetail,
  submitApprove,
  submitReview,
  submitFeekback,
  // submitProduceData,
  // updateApply,
  resourceRevoke,
  queryRevokeOptions,
  resourceRevokeApprove,
  cancelRevoke,
  safetyapprove,
  TlReview,
  bigdata1Approve,
  bigdataApprove,
  lead1Approve,
  lead2Approve,
  lead3Approve,
  queryRecoveryList,
  updateReleaseRes,
  queryReleaseTempCount,
} from '@/services/OperationCenter/operationOrder';
import {
  smsAuthSend, smsAuthValidate, smsAuth
} from '@/services/OperationCenter/resourceApply';
import mergePagedTable from '@/components/Common/PagedTable/pagedTable';
import {
  SUBMIT_FIELD,
  IDENTIFIED_KEY,
  PRODUCT_FIELDS,
  PRODUCT_TYPE,
} from '@/pages/OperationCenter/ResourceApply/constant';
import api from '@/api';

function tansfromData(resData) {
  const { resourceItems } = resData;
  resData.resourceItems = resourceItems.map(item => {
    const { resourceType, resourceInfo } = item;
    item.resourceInfo.areaId = Number(item.resourceInfo.areaId);
    item.resourceInfo.regionId = Number(item.resourceInfo.regionId);
    if (resourceType === PRODUCT_TYPE.DNS) {
      item.resourceInfo.lanDomainName = eval('(' + item.resourceInfo.lanDomainName + ')');
    }
    const submitList = SUBMIT_FIELD[resourceType];
    // 需要获取相应的表单项id，同时进行赋值
    if (_.isArray(submitList) && _.isArray(item.resourceInfo.specList)) {
      item.resourceInfo.specList.map(items => {
        // 根据规格接口中的identifiedKey来识别唯一值，参考IDENTIFIED_KEY
        const identData = submitList.find(identList => identList.key === items.key);

        identData
          && Object.keys(identData).map(identValue => {
            const hasValue = Object.keys(item.resourceInfo).some(
              key => key === identData[identValue]
            );
            // 详情显示：如果specList外面有值，默认取外面先，若没有值，则需要后端加
            if (hasValue) {
              return false;
            }
            if (identValue !== 'key') {
              item.resourceInfo = {
                ...item.resourceInfo,
                [identData[identValue]]: items[identValue],
              };
            }
          });
      });
    }
    const isECS = resourceType === PRODUCT_TYPE.ECS
      || resourceType === PRODUCT_TYPE.FORTRESSAIRCRAFT
      || resourceType === PRODUCT_TYPE.DBAUDIT;
    /**
     * ACS、ECS、堡垒机、数据库审计
     */
    // 详情显示用
    // dataDiskList为数据盘数据，但后端把数据盘和系统盘的数据都返回，所以需要去除系统盘的数据
    if (_.isArray(item.resourceInfo.dataDiskList)) {
      const { dataDiskList } = item.resourceInfo;
      if (resourceType === PRODUCT_TYPE.ACS) {
        dataDiskList.map(lists => {
          // ACS
          if (lists.diskType === 'sys_master') {
            item.resourceInfo = {
              ...item.resourceInfo,
              [PRODUCT_FIELDS.SYS_MASTER_TYPE]: lists.typeName,
              [PRODUCT_FIELDS.SYS_MASTER_STORAGE]: lists.storageMax,
            };
          }
          if (lists.diskType === 'sys_worker') {
            item.resourceInfo = {
              ...item.resourceInfo,
              [PRODUCT_FIELDS.SYS_WORKER_TYPE]: lists.typeName,
              [PRODUCT_FIELDS.SYS_WORKER_STORAGE]: lists.storageMax,
            };
          }
          if (lists.diskType === 'data') {
            item.resourceInfo = {
              ...item.resourceInfo,
              [PRODUCT_FIELDS.DATA_WORKER_TYPE]: lists.typeName,
              [PRODUCT_FIELDS.DATA_WORKER_STORAGE]: lists.storageMax,
            };
          }
        });
        delete item.resourceInfo.dataDiskList;
      }
      if (isECS) {
        // ecs、堡垒机、数据库审计
        const sysData = item.resourceInfo.dataDiskList.find(items => items.diskType === 'sys');
        item.resourceInfo.dataDiskList = item.resourceInfo.dataDiskList.filter(
          items => items.diskType !== 'sys'
        );
        item.resourceInfo = {
          ...item.resourceInfo,
          systemDiskType: sysData.typeName,
          systemDiskSize: sysData.storageMax,
        };
      }
    }
    // 变更回显用
    if (_.isArray(item.resourceInfo.diskList)) {
      if (resourceType === PRODUCT_TYPE.ACS) {
        const { diskList } = item.resourceInfo;
        diskList.map(lists => {
          // ACS
          if (lists.key === 'sys_master') {
            item.resourceInfo = {
              ...item.resourceInfo,
              [PRODUCT_FIELDS.SYS_MASTER_TYPE_ID]: lists.specTypeGroupId,
            };
          }
          if (lists.key === 'sys_worker') {
            item.resourceInfo = {
              ...item.resourceInfo,
              [PRODUCT_FIELDS.SYS_WORKER_TYPE_ID]: lists.specTypeGroupId,
            };
          }
          if (lists.key === 'data') {
            item.resourceInfo = {
              ...item.resourceInfo,
              [PRODUCT_FIELDS.CHECK_DATA_DISK]: 1,
              [PRODUCT_FIELDS.DATA_WORKER_TYPE_ID]: lists.specTypeGroupId,
            };
          }
        });
      }
      if (isECS) {
        const sysData = item.resourceInfo.diskList.find(
          items => items.key === IDENTIFIED_KEY.SYS_DISK_TYPE
        );
        const diskList = item.resourceInfo.diskList.filter(
          items => items.key === IDENTIFIED_KEY.DATA_DISK_TYPE
        );
        // 设置系统盘的磁盘类型的id
        if (sysData) {
          item.resourceInfo = {
            ...item.resourceInfo,
            [PRODUCT_FIELDS.SYSTEM_DISK_TYPE_ID]: sysData.specTypeGroupId,
          };
        }
        item.resourceInfo.dataDiskList = diskList.map((items, index) => ({
          [PRODUCT_FIELDS.DISK_TYPE_ID]: items.specTypeGroupId,
          [PRODUCT_FIELDS.DISK_TYPE]: item.resourceInfo.dataDiskList[index].typeName,
          [PRODUCT_FIELDS.DISK_STORAGE_MAX]: items.value,
        }));
      }
    }
    // ACS
    if (resourceType === PRODUCT_TYPE.ACS) {
      item.resourceInfo[PRODUCT_FIELDS.CHECK_SNAT_VALUE] = resourceInfo[PRODUCT_FIELDS.CHECK_SNAT] === '1' ? '为专有网络配置SNAT' : '-';
      item.resourceInfo[PRODUCT_FIELDS.CHECK_SLB_VALUE] = resourceInfo[PRODUCT_FIELDS.CHECK_SLB] === '1' ? '用公网SLB暴露API SERVICE' : '-';
      item.resourceInfo[PRODUCT_FIELDS.CHECK_SSH_VALUE] = resourceInfo[PRODUCT_FIELDS.CHECK_SSH] === '1' ? '开发公网SSH登录' : '-';
    }

    return item;
  });
  return resData;
}

export default mergePagedTable(queryOrderList)({
  namespace: 'operationOrder',

  state: {
    currentStatus: '',
    // 详情展示的数据
    detailInfo: {},
    // 流程数据
    flowList: [],
    smsAuthRes: true, // 短信验证结果
    offSiteBackupData: {}, // 异地备份查询列表
    productEditDetail: null, // 当前编辑中的产品详情
  },
  effects: {
    * queryAllDetail({ payload }, { put, call, all }) {
      const [, data1] = yield all([
        yield put({ type: 'queryOrderDetail', payload }),
        yield call(queryFlowDetail, payload),
        // yield put({ type: 'feedback/queryFeedbackList', payload }),
      ]);
      yield put({
        type: 'setter',
        payload: {
          flowList: data1.resData,
        },
      });
      return data1.resData;
    },
    // 查询资源列表
    * queryOrderList({ payload }, { put }) {
      yield put({
        type: 'pagedQuery',
        payload: {
          ...payload,
        },
      });
    },
    // 查询资源列表并且返回数据
    * queryApplyOrderList({ payload }, { call }) {
      const { resData } = yield call(queryOrderList, payload);
      const {
        currPage = 1, pageSize = 10, totalCount = 0, totalPage
      } = resData;
      resData.pagination = {
        current: currPage, pageSize, total: totalCount, totalPage
      };
      return resData;
    },
    * showOrderDetail({ payload }, { call }) {
      const data = yield call(api.getApplyOrderDetail, payload);
      return tansfromData(data);
    },
    // 查询资源详情
    * queryOrderDetail({ payload }, { call, put, select }) {
      const { deptId } = yield select(({ user }) => user.userInfo);
      const resData = yield call(api.getApplyOrderDetail, payload);
      const sfTime = resData.releaseDate || undefined;
      yield put({
        type: 'resourceApply/setter',
        payload: {
          sfTime,
        },
      });
      yield put({
        type: 'setter',
        payload: {
          detailInfo: tansfromData(resData) || {},
        },
      });
      yield put({
        type: 'resourceApply/setter',
        payload: {
          selectedProjectInfo: {
            commonInfo: _.isEmpty(resData && resData.projectDetail)
              ? {
                deptId,
              }
              : resData.projectDetail,
          },
        },
      });
      return resData;
    },

    // 提交审核
    * submitApprove({ payload }, { call }) {
      const data = yield call(submitApprove, payload);
      return data;
    },

    // 部门预审
    * TlReview({ payload }, { call }) {
      const data = yield call(TlReview, payload);
      return data;
    },

    // 临时资源总数
    * queryReleaseTempCount({ payload }, { call }) {
      const data = yield call(queryReleaseTempCount, payload);
      return data;
    },

    // 大数据初审
    * bigdata1Approve({ payload }, { call }) {
      const data = yield call(bigdata1Approve, payload);
      return data;
    },

    // 大数据审批
    * bigdataApprove({ payload }, { call }) {
      const data = yield call(bigdataApprove, payload);
      return data;
    },

    // 一级领导审批
    * lead1Approve({ payload }, { call }) {
      const data = yield call(lead1Approve, payload);
      return data;
    },

    // 二级领导审批
    * lead2Approve({ payload }, { call }) {
      const data = yield call(lead2Approve, payload);
      return data;
    },

    // 三级领导审批
    * lead3Approve({ payload }, { call }) {
      const data = yield call(lead3Approve, payload);
      return data;
    },

    // 提交审批
    * submitReview({ payload }, { call }) {
      const data = yield call(submitReview, payload);
      return data;
    },

    // 提交安全审批
    * safetyapprove({ payload }, { call }) {
      const data = yield call(safetyapprove, payload);
      return data;
    },

    // 撤销理由
    * queryRevokeOptions({ payload }, { call }) {
      const { resData } = yield call(queryRevokeOptions, payload);
      return resData;
    },

    // 提交撤销
    * resourceRevoke({ payload }, { call }) {
      const resData = yield call(resourceRevoke, payload);
      return resData;
    },

    // 撤销审核
    * resourceRevokeApprove({ payload }, { call }) {
      const resData = yield call(resourceRevokeApprove, payload);
      return resData;
    },

    // 取消撤销
    * cancelRevoke({ payload }, { call }) {
      const resData = yield call(cancelRevoke, payload);
      return resData;
    },

    // 变更
    * submitApply({ payload }, { call }) {
      const data = yield call(api.submitApply, payload);
      return data;
    },

    // 短信验证权限开关
    * smsAuth({ payload }, { call }) {
      const { resData } = yield call(smsAuth, payload);
      return Number(resData);
    },

    // 短信验证码请求
    * smsAuthSend({ payload }, { call }) {
      const data = yield call(smsAuthSend, payload);
      return data;
    },

    // 短信验证码请求
    * smsAuthValidate({ payload }, { call }) {
      const data = yield call(smsAuthValidate, payload);
      return data;
    },

    // 完成反馈（手动点击完成）
    * submitFeekback({ payload }, { call }) {
      const data = yield call(submitFeekback, payload);
      return data;
    },

    * queryRecoveryList({ payload }, { call, put }) {
      const { resData } = yield call(queryRecoveryList, payload);
      yield put({
        type: 'setter',
        payload: {
          offSiteBackupData: resData,
        },
      });
      return resData;
    },
    * updateProductEditDetail({ payload }, { put }) {
      yield put({
        type: 'setter',
        payload: {
          productEditDetail: payload
        }
      });
    },
    // 释放资源接口
    * updateReleaseRes({ payload }, { call }) {
      const data = yield call(updateReleaseRes, payload);
      return data;
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
});
