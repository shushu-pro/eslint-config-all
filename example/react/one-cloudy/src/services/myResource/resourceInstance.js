import { get, post } from '@/utils/request';

// 产品列表
export const queryResmngProductGroups = async params => get('/oc/cloud/productGroup/queryResmngProductGroups', params);

// 资源实例列表
export const queryResourceList = async params => post('/oc/cloud/resmng/instanceList', params);

// 非DT资源实例列表
export const queryInstanceListCommon = async params => post('/oc/cloud/resmng/instanceListCommon', params);

// 资源操作提交（单个/批量）
export const ticketApply = async params => post('/oc/cloud/resmng/ticketApply', params);

// 资源操作修改（单个/批量）
export const ticketApplyChange = async params => post('/oc/cloud/resmng/ticketApply_1595934263481', params);

// 资源实例详情
export const queryResourceDetail = async params => get('/oc/cloud/resmng/instanceDetail', params);

// 查询当前部门及其子部门
export const queryCurrentDeptList = async params => get('/oc/uum/deptManage/getOcDeptTree', params);

// 查询部门下的所有项目
export const queryAllProjectlist = async params => get('/oc/resmng/ocprojectinfo/allprojectlist', params);

// 查询实例是否正在操作单中
export const queryInstanceTicketId = async params => post('/oc/cloud/resmng/instanceListTicketId', params);

// 全部规格
export const queryProductSpec = async ({
  productType,
  cloudRegionId,
}) => get(`/oc/cloud/product/queryProductSpec/${productType}/${cloudRegionId}`);
