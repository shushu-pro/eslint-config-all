export const QUOTA_TYPE = {
  DISTRIBUTE: 'distribute', // 配额分配
  SUBORDINATE_DEPT: 'subordinateDept', // 下级配额查看
}

// api返回字段映射表
export const API_PARAMS = {
  QUOTA_LIST: 'quotaList',
  PRODUCTNAME: 'productName',
  PRODUCTID: 'productId',
  ACTUAL_PRODUCTID: 'actualProductId',
  DESCRIPTION: 'description', // 配额描述
  SPEC_TYPE_ID: 'specTypeId', // 配额id
  QUOTA_NAME: 'quotaName',
  QUOTA_UNIT: 'quotaUnit', // 单位
  QUOTA_ASSIGN: 'assigned', // 已分配配额
  QUOTA_TOTAL: 'quantity', // 总配额
  QUOTA_USED: 'usedQuota', // 已使用配额
  QUOTA_REMAIN: 'remainQuota', // 剩余配额
  // 配额申请
  APPLY_ID: 'applyId', // 申请单号
  APPLY_TIME: 'applyTime', // 申请时间
  APPROVE_USER_NAME: 'approveUser', // 审批人
  APPROVE_USER_ID: 'approveUserId', // 审批人
  APPLY_STATUS: 'applyStatus', // 状态
  APPROVE_TIME: 'approveTime', // 审批时间
  APPLY_DEPT_NAME: 'applyDeptName', // 申请部门
  APPLY_USER: 'applyUser', // 申请人
  ATTACH_ID: 'attachFileLinks', // 附件id
  ADJUSTED_QUOTA: 'adjustedQuota', // 调整后的配额
  ORIGINAL_QUOTA: 'originalQuota', // 原来的配额
  REFUSE_INFO: 'description', // 审批的原因
  IS_APPROVE: 'isApprove', // 是否是审批单

  SIDX: 'sidx', // 列表排序内容字段 排序字段apply_time,approve_time
  ORDER: 'order', // 列表排序顺序字段 asc：升序,desc:降序
}
