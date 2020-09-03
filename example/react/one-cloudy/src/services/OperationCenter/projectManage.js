import { get, post, deleteRes } from '@/utils/request';

// 全部人员列表
export const queryList = async params => get('/oc/resmng/ocprojectinfo/list', params);

// 部门列表
export const queryDeptlist = async params => get('/oc/sys/dept/deptlist', params);

// 创建项目
export const submitProjectData = async params =>
  post('/oc/resmng/ocprojectinfo/save', params);

// 更新指派热门
export const submitApplyAssignor = async data =>
  post('/oc/resmng/applyAssignor', data);

// 更新
export const submitUpdate = async params =>
  post('/oc/resmng/ocprojectinfo/update', params);

// 查询项目信息
export const queryInfo = async ({ projectId }) =>
  get(`/oc/resmng/ocprojectinfo/info/${projectId}`);

// 删除
export const submitDelete = async params =>
  deleteRes('/oc/resmng/ocprojectinfo/delete', params);
