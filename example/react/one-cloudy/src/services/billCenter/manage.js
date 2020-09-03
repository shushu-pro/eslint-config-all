import { get, post } from '@/utils/request';

// 大数据局 - 月度账单列表查询
export const queryBigDataMonthBillList = async params =>
  post('/oc/bill/billManage/getBigDataMonthBillList', params);

// 大数据局 - 月度部门账单详情
export const queryBigDataMonthBillDetail = async params =>
  post('/oc/bill/billManage/getBigDataMonthBillDetail', params);

// 大数据局 - 月度部门账单列表查询
export const queryMonthDeptBillList = async params =>
  post('/oc/bill/deptBillInfo/getMonthDeptBillList', params);

// 大数据局 - 月度部门账单列表导出
export const queryMonthDeptBillListExport = async params =>
  post('/oc/bill/deptBillInfo/export', params);

// 大数据局 - 月度部门账单反馈
export const submitBureauFeedback = async params =>
  post('/oc/bill/billManage/bigDataBureauFeedback', params);

// * 账单详情 tab
// 大数据局 - 某一级部门账单详情
export const queryBigDataDeptBillDetail = async params =>
  post('/oc/bill/billManage/getBigDataDeptBillDetail', params);

// 大数据局 - 某一级部门跨项目资源列表
export const queryBigDataDeptMonthProjProdList = async params =>
  post('/oc/bill/billManage/getBigDataDeptMonthProjProdList', params);

// 大数据局 - 某一级部门跨项目资源列表导出
export const queryBigDatadeptMonthProjProdListExport = async params =>
  post('/oc/bill/billManage/bigDataDeptMonthProjProdListExport', params);

// * 项目账单 tab
// 大数据局 - 某一级部门项目列表
export const queryBigDataDeptMonthBillList = async params =>
  post('/oc/bill/billManage/getBigDataDeptMonthBillList', params);

// 大数据局 - 某一级部门项目列表导出
export const queryBigDataDeptMonthBillListExport = async params =>
  post('/oc/bill/billManage/bigDataDeptMonthBillListExport', params);

// * 项目资源 tab
// 大数据局- 项目资源
export const queryBigDataProjectList = async params =>
  post('/oc/bill/projectResource/listByBigData', params);

// 大数据局 - 项目资源导出
export const queryBigDataProjectListExport = async params =>
  post('/oc/bill/projectResource/exportByBigData', params);

// 一级部门 - 月度账单列表
export const queryFirstDeptMonthBillList = async params =>
  post('/oc/bill/deptBillInfo/getFirstDeptMonthBillList', params);

// * 账单详情 tab
// 一级部门 - 账单详情
export const queryDeptBillDetail = async ({ billNo, ocRegion, ocFinanceDepartmentId }) =>
  post('/oc/bill/billManage/getDeptBillDetail', {
    billNo,
    ocRegion,
    ocFinanceDepartmentId,
  });

// 一级部门 - 跨项目资源列表
export const queryDeptMonthProjectList = async params =>
  post('/oc/bill/billManage/getDeptMonthProjProdList', params);

// 一级部门 - 跨项目资源列表导出
export const queryDeptMonthProjectListExport = async params =>
  post('/oc/bill/billManage/deptMonthProjProdListExport', params);

// 一级部门 - 账单反馈
export const submitDeptFeedback = async params => post('/oc/bill/billManage/deptFeedback', params);

// TODO： 暂时未用 一级部门 - 跨项目资源列表 - 变更
export const queryChangeInfo = async params => get('/oc/bill/billManage/getChangeInfo ', params);

// * 项目账单 tab
// 一级部门 - 项目列表
export const queryDeptMonthBillList = async params =>
  post('/oc/bill/billManage/getDeptMonthBillList', params);

// 一级部门  - 项目列表导出
export const queryDeptMonthBillListExport = async ({ billNo }) =>
  post('/oc/bill/billManage/deptMonthBillListExport', { billNo });

// * 项目资源 tab
// 一级部门 - 项目资源
export const queryDeptProjectResource = async params =>
  post('/oc/bill/projectResource/listByDept', params);

// 一级部门 - 项目资源导出
export const queryDeptProjectResourceExport = async params =>
  post('/oc/bill/projectResource/exportByDept', params);

// TODO： 暂时未用 一级部门 - 项目资源 - 变更
export const queryProjectResourceChange = async params =>
  get('/oc/bill/projectResource/resourcechange', params);

// regionId 为DT的regionId
// 查询项目信息
// export const queryInfo = async ({ projectId, regionId }) =>
//   get(`/oc/resmng/ocprojectinfo/dtInfo/${regionId}/${projectId}`);
export const queryInfo = async ({ projectId }) =>
  get(`/oc/resmng/ocprojectinfo/billInfo/info/${projectId}`);