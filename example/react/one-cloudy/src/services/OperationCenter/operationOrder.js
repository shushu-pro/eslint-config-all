import { post, get } from '@/utils/request';

// 申请单列表
export const queryOrderList = async params => get('/oc/resmng/list', params);

// 临时资源总数
export const queryReleaseTempCount = async params => get('/oc/resmng/list?page=1&limit=10&tempCount=1', params);

// 详情
export const queryOrderDetail = async params => get('/oc/resmng/detail', params);

// 查询流程
export const queryFlowDetail = async params => get('/oc/resmng/flowDetail', params);

// 用户端-资源反馈信息详情
export const queryFeedbackList = async params => get('/oc/resmng/getFeedbackList', params);

// 审批
export const submitApprove = async params => post('/oc/resmng/approve', params);

// 部门预审
export const TlReview = async params => post('/oc/resmng/tlReview', params);

// 大数据初审
export const bigdata1Approve = async params => post('/oc/resmng/bigdata1approve', params);

// 大数据审批
export const bigdataApprove = async params => post('/oc/resmng/bigdataapprove', params);

// 一级领导审批
export const lead1Approve = async params => post('/oc/resmng/lead1approve', params);

// 二级领导审批
export const lead2Approve = async params => post('/oc/resmng/lead2approve', params);

// 三级领导审批
export const lead3Approve = async params => post('/oc/resmng/lead3approve', params);

// 安全审批
export const safetyapprove = async params => post('/oc/resmng/safetyapprove', params);

// 审核
export const submitReview = async params => post('/oc/resmng/review', params);

// 反馈 (手动点击完成)
export const submitFeekback = async params => post('/oc/resmng/finish', params);

// 变更 TODO 还未联调
export const updateApply = async params => post('/oc/resourcemanage/resourceapply/update', params);

// 申请撤销
export const resourceRevoke = async params => post('/oc/resmng/cancel', params);

// 撤销理由列表
export const queryRevokeOptions = async params => get('/oc/sys/sysdict/options', params);

// 对撤销进行审批
export const resourceRevokeApprove = async params => post('/oc/resmng/cancelReview', params);

// 取消撤销
export const cancelRevoke = async params => post('/oc/resmng/cancelreverse', params);

// 管理端反馈-部门及项目列表
export const queryDeptProject = async params => get('/oc/resfeedback/mngOcDeptProject', params);
// 管理端反馈-dt部门及项目列表
export const queryDtDeptProject = async params => get('/oc/resfeedback/mngDtDeptProject', params);
// 一朵云 - 申请资源列表
export const queryApplyList = async params => get('/oc/resfeedback/mngOcResourceList', params);
// dt实例列表
export const queryResList = async params => get('/oc/resfeedback/mngOcResourceList', params);

// 异地灾备RDS实例列表
export const queryBackUpRecoveryList = async params => get('/oc/cloud/resmng/backupList', params);

// 异地灾备RDS实例列表
export const queryRecoveryList = async params => get('/oc/cloud/resmng/list', params);

// 释放资源接口
export const updateReleaseRes = async params => post('/oc/resmng/updateReleaseRes', params);
