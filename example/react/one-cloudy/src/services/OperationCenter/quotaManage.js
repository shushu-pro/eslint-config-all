import { post, get } from '@/utils/request';

// 查询本部门配额列表
export const queryDeptQuotaList = async params => get('/oc/onecloud/dept/quota/queryDeptQuotaList', params);

// 查询子部门配额列表
export const querySubDeptQuotaList = async params => get('/oc/onecloud/dept/quota/querySubDeptQuotaList', params);

// 查询子部门树
export const querySubDepts = async params => get('/oc/onecloud/dept/quota/getCurrentOcDeptTree', params);

// 配额分配查询子部门
export const getDistributeCurrentOcDeptTree = async params => get('/oc/onecloud/dept/quota/getDistributeCurrentOcDeptTree', params);

// 查询子部门配额信息
export const querySubQuotaData = async params => get('/oc/onecloud/dept/quota/queryDeptQuotaType', params);

// 下级部门配额调整
export const adjustSubDeptQuota = async params => post('/oc/onecloud/dept/quota/adjustSubDeptQuota', params);

// 查询部门配额是否需要审批
export const getDepartmentSetting = async params => get('/oc/onecloud/dept/quota/getDepartmentSetting', params);

// 部门配额是否审批 --修改
export const modifyDepartmentSetting = async params => post('/oc/onecloud/dept/quota/modifyDepartmentSetting', params);

// 我的配额申请列表
export const getDeptQuotaApplyList = async params => post('/oc/onecloud/dept/quota/getDeptQuotaApplyList', params);

// 我的配额审批列表
export const getMyApproveList = async params => post('/oc/onecloud/dept/quota/getMyApproveList', params);

// 配额申请
export const applyProductQuota = async params => post('/oc/onecloud/dept/quota/applyProductQuota', params);

// 配额审批通过
export const deptQuotaApplyApprovePass = async params => post('/oc/onecloud/dept/quota/deptQuotaApplyApprovePass', params);

// 配额审批驳回
export const deptQuotaApplyApproveReject = async params => post('/oc/onecloud/dept/quota/deptQuotaApplyApproveReject', params);

// 查看配额申请详情展示
export const applyDetail = async params => get('/oc/onecloud/dept/quota/applyDetail', params);

// 查看是否包含子部门
export const getSubDeptList = async params => get('/oc/onecloud/dept/quota/getSubDeptList', params);

// 根据部门ID获取关联财务主体云区列表
export const getFinanceCloudRegionListByDeptId = async params => get('/oc//onecloud/dept/quota/getFinanceCloudRegionListByDeptId', params);
