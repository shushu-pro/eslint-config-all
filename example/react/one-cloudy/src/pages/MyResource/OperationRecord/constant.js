// 操作记录
export const OPERATION_RECORD = {
  title: '操作记录',
  href: '/manage/myresource/operationrecord',
};

export const TYPE_NAME_LIST = {
  recycle: '资源回收',
  reconfig: '升降配',
};

export const STATUS_MAP = {
  COMMITED: 'commited',
  REVIEW_PASS: 'review_pass',
  REVIEW_REFUSE: 'review_refuse',
  APPROVE_PASS: 'approve_pass',
  APPROVE_REFUSE: 'approve_refuse',
  BIGDATA1_APPROVAL_PASS: 'bigdata1_approve_pass',
  BIGDATA1_APPROVAL_REJECT: 'bigdata1_approve_refuse',
  BIGDATA_APPROVAL_PASS: 'bigdata_approve_pass',
  BIGDATA_APPROVAL_REJECT: 'bigdata_approve_refuse',
  LEAD1_APPROVAL_PASS: 'lead1_approve_pass',
  LEAD1_APPROVAL_REJECT: 'lead1_approve_refuse',
  LEAD2_APPROVAL_PASS: 'lead2_approve_pass',
  LEAD2_APPROVAL_REJECT: 'lead2_approve_refuse',
  LEAD3_APPROVAL_PASS: 'lead3_approve_pass',
  LEAD3_APPROVAL_REJECT: 'lead3_approve_refuse',
  SAFETY_APPROVE_PASS: 'safety_approve_pass',
  SAFETY_APPROVE_REFUSE: 'safety_approve_refuse',
  TL_REVIEW_PASS: 'tl_review_pass',
  TL_REVIEW_REFUSE: 'tl_review_refuse',
  REPORTED: 'reported',
  // IN_PRODUCT: 'in_product',
  FINISHED: 'finished',
  // CANCELING: 'canceling',
  // CANCEL_PASS: 'cancel_pass',
  // CANCEL_REFUSE: 'cancel_refuse',
};

// 资源列表状态栏
export const STATUS_MAP_TEXT = {
  [STATUS_MAP.COMMITED]: '已提交',
  [STATUS_MAP.REVIEW_PASS]: '初审通过',
  [STATUS_MAP.REVIEW_REFUSE]: '初审驳回',
  [STATUS_MAP.REPORTED]: '已报备',
  [STATUS_MAP.TL_REVIEW_PASS]: '部门预审通过',
  [STATUS_MAP.TL_REVIEW_REFUSE]: '部门预审驳回',
  [STATUS_MAP.APPROVE_PASS]: '审批通过',
  [STATUS_MAP.APPROVE_REFUSE]: '审批驳回',
  [STATUS_MAP.BIGDATA1_APPROVAL_PASS]: '大数据初审通过',
  [STATUS_MAP.BIGDATA1_APPROVAL_REJECT]: '大数据初审驳回',
  [STATUS_MAP.BIGDATA_APPROVAL_PASS]: '大数据审批通过',
  [STATUS_MAP.BIGDATA_APPROVAL_REJECT]: '大数据审批驳回',
  [STATUS_MAP.LEAD1_APPROVAL_PASS]: '姜楚江审批通过',
  [STATUS_MAP.LEAD1_APPROVAL_REJECT]: '姜楚江审批驳回',
  [STATUS_MAP.LEAD2_APPROVAL_PASS]: '蒋汝忠审批通过',
  [STATUS_MAP.LEAD2_APPROVAL_REJECT]: '蒋汝忠审批驳回',
  [STATUS_MAP.LEAD3_APPROVAL_PASS]: '金加和审批通过',
  [STATUS_MAP.LEAD3_APPROVAL_REJECT]: '金加和审批驳回',
  [STATUS_MAP.SAFETY_APPROVE_PASS]: '安全审批通过',
  [STATUS_MAP.SAFETY_APPROVE_REFUSE]: '安全审批驳回',
  [STATUS_MAP.IN_PRODUCT]: '生产中',
  [STATUS_MAP.FINISHED]: '已结单',
  // [STATUS_MAP.CANCELING]: '撤销中',
  // [STATUS_MAP.CANCEL_PASS]: '撤销通过',
  // [STATUS_MAP.CANCEL_REFUSE]: '撤销驳回',
};

export const FLOW_STATUS_MAP_TEXT = {
  [STATUS_MAP.COMMITED]: '请等待运维人员审核',
  [STATUS_MAP.REVIEW_PASS]: '请等待管理人员审批',
  [STATUS_MAP.REPORTED]: '资源将在审批通过后的2个工作日内完成开通',
  [STATUS_MAP.REVIEW_REFUSE]: '请进入详情查看驳回原因',
  [STATUS_MAP.TL_REVIEW_PASS]: '请等待管理人员审批',
  [STATUS_MAP.TL_REVIEW_REFUSE]: '请进入详情查看驳回原因',
  [STATUS_MAP.APPROVE_PASS]: '资源将在审批通过后的2个工作日内完成开通',
  [STATUS_MAP.APPROVE_REFUSE]: '请进入详情查看驳回原因',
  [STATUS_MAP.SAFETY_APPROVE_PASS]: '资源将在审批通过后的2个工作日内完成开通',
  [STATUS_MAP.SAFETY_APPROVE_REFUSE]: '请进入详情查看驳回原因',
  [STATUS_MAP.BIGDATA1_APPROVAL_PASS]: '大数据初审通过',
  [STATUS_MAP.BIGDATA1_APPROVAL_REJECT]: '请进入详情查看驳回原因',
  [STATUS_MAP.BIGDATA_APPROVAL_PASS]: '大数据审批通过',
  [STATUS_MAP.BIGDATA_APPROVAL_REJECT]: '请进入详情查看驳回原因',
  [STATUS_MAP.LEAD1_APPROVAL_PASS]: '姜楚江审批通过',
  [STATUS_MAP.LEAD1_APPROVAL_REJECT]: '请进入详情查看驳回原因',
  [STATUS_MAP.LEAD2_APPROVAL_PASS]: '蒋汝忠审批通过',
  [STATUS_MAP.LEAD2_APPROVAL_REJECT]: '请进入详情查看驳回原因',
  [STATUS_MAP.LEAD3_APPROVAL_PASS]: '金加和审批通过',
  [STATUS_MAP.LEAD3_APPROVAL_REJECT]: '请进入详情查看驳回原因',
  // [STATUS_MAP.IN_PRODUCT]: '',
  // [STATUS_MAP.FINISHED]: '',
  // [STATUS_MAP.CANCELING]: '撤销中',
  // [STATUS_MAP.CANCEL_PASS]: '撤销通过',
  // [STATUS_MAP.CANCEL_REFUSE]: '撤销驳回',
};

// 已走到/过得流程状态中显示的文案
export const FLOW_MAP_TEXT = {
  [STATUS_MAP.COMMITED]: '已提交',
  [STATUS_MAP.REVIEW_PASS]: '初审通过',
  [STATUS_MAP.REVIEW_REFUSE]: '初审驳回',
  [STATUS_MAP.REPORTED]: '已报备',
  [STATUS_MAP.TL_REVIEW_PASS]: '部门预审通过',
  [STATUS_MAP.TL_REVIEW_REFUSE]: '部门预审驳回',
  [STATUS_MAP.APPROVE_PASS]: '审批通过',
  [STATUS_MAP.BIGDATA1_APPROVAL_PASS]: '大数据初审通过',
  [STATUS_MAP.BIGDATA1_APPROVAL_REJECT]: '大数据初审驳回',
  [STATUS_MAP.BIGDATA_APPROVAL_PASS]: '大数据审批通过',
  [STATUS_MAP.BIGDATA_APPROVAL_REJECT]: '大数据审批驳回',
  [STATUS_MAP.LEAD1_APPROVAL_PASS]: '姜楚江审批通过',
  [STATUS_MAP.LEAD1_APPROVAL_REJECT]: '姜楚江审批驳回',
  [STATUS_MAP.LEAD2_APPROVAL_PASS]: '蒋汝忠审批通过',
  [STATUS_MAP.LEAD2_APPROVAL_REJECT]: '蒋汝忠审批驳回',
  [STATUS_MAP.LEAD3_APPROVAL_PASS]: '金加和审批通过',
  [STATUS_MAP.LEAD3_APPROVAL_REJECT]: '金加和审批驳回',
  [STATUS_MAP.SAFETY_APPROVE_PASS]: '安全审批通过',
  [STATUS_MAP.SAFETY_APPROVE_REFUSE]: '安全审批驳回',
  [STATUS_MAP.APPROVE_REFUSE]: '审批驳回',
  // [STATUS_MAP.IN_PRODUCT]: '生产中',
  [STATUS_MAP.FINISHED]: '已结单',
  // [STATUS_MAP.CANCELING]: '撤销中',
  // [STATUS_MAP.CANCEL_PASS]: '已撤销',
  // [STATUS_MAP.CANCEL_REFUSE]: '撤销驳回',
};

// 未走到的流程状态中显示的文案
export const NEXT_FLOW_MAP_TEXT = {
  [STATUS_MAP.COMMITED]: '提交',
  [STATUS_MAP.REVIEW_PASS]: '初审',
  [STATUS_MAP.REPORTED]: '报备',
  // [STATUS_MAP.REVIEW_REFUSE]: '初审驳回',
  [STATUS_MAP.TL_REVIEW_PASS]: '部门预审',
  // [STATUS_MAP.TL_REVIEW_REFUSE]: '部门预审驳回',
  [STATUS_MAP.APPROVE_PASS]: '审批',
  [STATUS_MAP.BIGDATA1_APPROVAL_PASS]: '大数据初审',
  [STATUS_MAP.BIGDATA_APPROVAL_PASS]: '大数据审批',
  [STATUS_MAP.LEAD1_APPROVAL_PASS]: '姜楚江审批',
  [STATUS_MAP.LEAD2_APPROVAL_PASS]: '蒋汝忠审批',
  [STATUS_MAP.LEAD3_APPROVAL_PASS]: '金加和审批',
  [STATUS_MAP.SAFETY_APPROVE_PASS]: '安全审批',
  // [STATUS_MAP.SAFETY_APPROVE_REFUSE]: '安全审批驳回',
  // [STATUS_MAP.APPROVE_REFUSE]: '审批驳回',
  // [STATUS_MAP.IN_PRODUCT]: '生产中',
  [STATUS_MAP.FINISHED]: '已结单',
  // [STATUS_MAP.CANCELING]: '撤销中',
  // [STATUS_MAP.CANCEL_PASS]: '已撤销',
  // [STATUS_MAP.CANCEL_REFUSE]: '撤销驳回',
};

// 拒绝的流程
export const FLOW_MAP_REFUSE = {
  [STATUS_MAP.REVIEW_REFUSE]: 'review_refuse',
  [STATUS_MAP.TL_REVIEW_REFUSE]: 'tl_review_refuse',
  [STATUS_MAP.BIGDATA1_APPROVAL_REJECT]: 'bigdata1_approve_refuse',
  [STATUS_MAP.BIGDATA_APPROVAL_REJECT]: 'bigdata_approve_refuse',
  [STATUS_MAP.LEAD1_APPROVAL_REJECT]: 'lead1_approve_refuse',
  [STATUS_MAP.LEAD2_APPROVAL_REJECT]: 'lead2_approve_refuse',
  [STATUS_MAP.LEAD3_APPROVAL_REJECT]: 'lead3_approve_refuse',
  [STATUS_MAP.SAFETY_APPROVE_REFUSE]: 'safety_approve_refuse',
  [STATUS_MAP.APPROVE_REFUSE]: 'approve_refuse',
};

// 申请单状态的颜色
export const STATUS_MAP_COLOR = {
  [STATUS_MAP.COMMITED]: '#1890FF', // 蓝色
  // [STATUS_MAP.CANCELING]: '#1890FF', // 蓝色
  [STATUS_MAP.IN_PRODUCT]: '#1890FF', // 蓝色
  [STATUS_MAP.REPORTED]: '#52C41A', // 绿色

  // 通过
  [STATUS_MAP.REVIEW_PASS]: '#52C41A', // 绿色
  [STATUS_MAP.TL_REVIEW_PASS]: '#52C41A', // 绿色
  [STATUS_MAP.APPROVE_PASS]: '#52C41A', // 绿色
  [STATUS_MAP.SAFETY_APPROVE_PASS]: '#52C41A', // 绿色
  // [STATUS_MAP.CANCEL_PASS]: '#52C41A', // 绿色
  [STATUS_MAP.FINISHED]: '#52C41A', // 绿色
  [STATUS_MAP.BIGDATA1_APPROVAL_PASS]: '#52C41A',
  [STATUS_MAP.BIGDATA_APPROVAL_PASS]: '#52C41A',
  [STATUS_MAP.LEAD1_APPROVAL_PASS]: '#52C41A',
  [STATUS_MAP.LEAD2_APPROVAL_PASS]: '#52C41A',
  [STATUS_MAP.LEAD3_APPROVAL_PASS]: '#52C41A',

  // 驳回
  [STATUS_MAP.REVIEW_REFUSE]: '#F50', // 红色
  [STATUS_MAP.TL_REVIEW_REFUSE]: '#F50', // 红色
  [STATUS_MAP.APPROVE_REFUSE]: '#F50', // 红色
  [STATUS_MAP.SAFETY_APPROVE_REFUSE]: '#F50', // 红色
  // [STATUS_MAP.CANCEL_REFUSE]: '#F50', // 红色
  [STATUS_MAP.BIGDATA1_APPROVAL_REJECT]: '#F50',
  [STATUS_MAP.BIGDATA_APPROVAL_REJECT]: '#F50',
  [STATUS_MAP.LEAD1_APPROVAL_REJECT]: '#F50',
  [STATUS_MAP.LEAD2_APPROVAL_REJECT]: '#F50',
  [STATUS_MAP.LEAD3_APPROVAL_REJECT]: '#F50',
};

// 按钮相关的操作
export const ACTION_STATUS = {
  REVIEW: 'review',
  REVIEW_PASS: 'reviewPass',
  REVIEW_REJECT: 'reviewReject',
  APPROVAL: 'approve',
  APPROVAL_PASS: 'approvePass',
  APPROVAL_REJECT: 'approvalReject',
  MODIFY: 'modify',
  FINISH: 'finish',
  SAFETY_APPROVE: 'safetyApprove',
  SAFETY_APPROVAL_PASS: 'safetyApprovePass',
  SAFETY_APPROVAL_REJECT: 'safetyApproveReject',
  // 大数据初审
  BIGDATA1_APPROVAL: 'bigdata1Approve',
  BIGDATA1_APPROVAL_PASS: 'bigdata1ApprovePass',
  BIGDATA1_APPROVAL_REJECT: 'bigdata1ApproveReject',
  // 大数据审批
  BIGDATA_APPROVAL: 'bigdataApprove',
  BIGDATA_APPROVAL_PASS: 'bigdataApprovePass',
  BIGDATA_APPROVAL_REJECT: 'bigdataApproveReject',
  // 一级领导审批
  LEAD1_APPROVAL: 'lead1Approve',
  LEAD1_APPROVAL_PASS: 'lead1ApprovePass',
  LEAD1_APPROVAL_REJECT: 'lead1ApproveReject',
  // 二级领导审批
  LEAD2_APPROVAL: 'lead2Approve',
  LEAD2_APPROVAL_PASS: 'lead2ApprovePass',
  LEAD2_APPROVAL_REJECT: 'lead2ApproveReject',
  // 三级领导审批
  LEAD3_APPROVAL: 'lead3Approve',
  LEAD3_APPROVAL_PASS: 'lead3ApprovePass',
  LEAD3_APPROVAL_REJECT: 'lead3ApproveReject',

  ZF_APPROVE: 'ZFApprove',
  ZF_APPROVE_PASS: 'ZFApprovePass',
  ZF_APPROVE_REJECT: 'ZFApproveReject',
  TL_REVIEW: 'TLReview',
  TL_REVIEW_PASS: 'TLReviewPass',
  TL_REVIEW_REJECT: 'TLReviewReject',
  REVOKE_PASS: 'revokePass',
  REVOKE_REJECT: 'revokeReject',

  CANCEL: 'cancel',
};

// 操作对应的文案
export const ACTION_STATUS_TEXT = {
  // [ACTION_STATUS.REVOKE]: '撤销',
  // [ACTION_STATUS.CANCEL_REVOKE]: '取消撤销',
  // [ACTION_STATUS.REVOKE_PASS]: '撤销通过',
  // [ACTION_STATUS.REVOKE_REJECT]: '撤销驳回',

  [ACTION_STATUS.REVIEW]: '初审',
  [ACTION_STATUS.REVIEW_PASS]: '初审通过',
  [ACTION_STATUS.REVIEW_REJECT]: '初审驳回',
  [ACTION_STATUS.APPROVAL]: '审批',
  [ACTION_STATUS.APPROVAL_PASS]: '审批通过',
  [ACTION_STATUS.APPROVAL_REJECT]: '审批驳回',

  [ACTION_STATUS.SAFETY_APPROVE]: '安全审批',
  [ACTION_STATUS.SAFETY_APPROVAL_PASS]: '安全审批通过',
  [ACTION_STATUS.SAFETY_APPROVAL_REJECT]: '安全审批驳回',
  // 大数据初审
  [ACTION_STATUS.BIGDATA1_APPROVAL]: '大数据初审',
  [ACTION_STATUS.BIGDATA1_APPROVAL_PASS]: '大数据初审通过',
  [ACTION_STATUS.BIGDATA1_APPROVAL_REJECT]: '大数据初审驳回',
  // 大数据审批
  [ACTION_STATUS.BIGDATA_APPROVAL]: '大数据审批',
  [ACTION_STATUS.BIGDATA_APPROVAL_PASS]: '大数据审批通过',
  [ACTION_STATUS.BIGDATA_APPROVAL_REJECT]: '大数据审批驳回',
  // 一级领导审批
  [ACTION_STATUS.LEAD1_APPROVAL]: '审批',
  [ACTION_STATUS.LEAD1_APPROVAL_PASS]: '审批通过',
  [ACTION_STATUS.LEAD1_APPROVAL_REJECT]: '审批驳回',
  // 二级领导审批
  [ACTION_STATUS.LEAD2_APPROVAL]: '审批',
  [ACTION_STATUS.LEAD2_APPROVAL_PASS]: '审批通过',
  [ACTION_STATUS.LEAD2_APPROVAL_REJECT]: '审批驳回',
  // 三级领导审批
  [ACTION_STATUS.LEAD3_APPROVAL]: '审批',
  [ACTION_STATUS.LEAD3_APPROVAL_PASS]: '审批通过',
  [ACTION_STATUS.LEAD3_APPROVAL_REJECT]: '审批驳回',

  [ACTION_STATUS.ZF_APPROVE]: '审批',
  [ACTION_STATUS.ZF_APPROVE_PASS]: '审批通过',
  [ACTION_STATUS.ZF_APPROVE_REJECT]: '审批驳回',
  [ACTION_STATUS.MODIFY]: '修改',
  [ACTION_STATUS.FINISH]: '结单',

  [ACTION_STATUS.TL_REVIEW]: '部门预审',
  [ACTION_STATUS.TL_REVIEW_PASS]: '部门预审通过',
  [ACTION_STATUS.TL_REVIEW_REJECT]: '部门预审驳回',

  [ACTION_STATUS.CANCEL]: '撤回',
};

// 操作需要的对应角色
export const ACTION_STATUS_ROLE = {
  [ACTION_STATUS.REVIEW]: 'resourceReview',
  [ACTION_STATUS.APPROVAL]: 'resourceApprove',
  [ACTION_STATUS.MODIFY]: 'resourceApply',
  [ACTION_STATUS.CANCEL]: 'resourceApply', // 撤回权限和修改一样
  [ACTION_STATUS.BIGDATA1_APPROVAL]: 'bigdata1Approve',
  [ACTION_STATUS.BIGDATA_APPROVAL]: 'bigdataApprove',
  [ACTION_STATUS.LEAD1_APPROVAL]: 'lead1Approve',
  [ACTION_STATUS.LEAD2_APPROVAL]: 'lead2Approve',
  [ACTION_STATUS.LEAD3_APPROVAL]: 'lead3Approve',
  [ACTION_STATUS.FINISH]: 'resourceFeedback',
  [ACTION_STATUS.SAFETY_APPROVE]: 'safetyApprove',
  [ACTION_STATUS.ZF_APPROVE]: 'ZFApprove',
  [ACTION_STATUS.TL_REVIEW]: 'TLReview',
};

// 操作需要的对应权限
export const ACTION_STATUS_PERMISSIONS = {
  [ACTION_STATUS.REVIEW]: 'resourcemanage:resourceapply:review',
  [ACTION_STATUS.APPROVAL]: 'resourcemanage:resourceapply:approve',
  [ACTION_STATUS.BIGDATA1_APPROVAL]: 'resourcemanage:resourceapply:bigdata1approve',
  [ACTION_STATUS.BIGDATA_APPROVAL]: 'resourcemanage:resourceapply:bigdataapprove',
  [ACTION_STATUS.LEAD1_APPROVAL]: 'resourcemanage:resourceapply:lead1approve',
  [ACTION_STATUS.LEAD2_APPROVAL]: 'resourcemanage:resourceapply:lead2approve',
  [ACTION_STATUS.LEAD3_APPROVAL]: 'resourcemanage:resourceapply:lead3approve',
  [ACTION_STATUS.MODIFY]: 'resourcemanage:resourceapply:update',
  [ACTION_STATUS.CANCEL]: 'resourcemanage:resourceapply:update', // 撤回权限和修改一样
  [ACTION_STATUS.FINISH]: 'resourcemanage:resourceapply:finish',
  [ACTION_STATUS.SAFETY_APPROVE]: 'resourcemanage:resourceapply:safetyapprove',
  [ACTION_STATUS.ZF_APPROVE]: 'resourcemanage:resourceapply:approve',
  [ACTION_STATUS.TL_REVIEW]: 'resourcemanage:resourceapply:TLReview',
  // [ACTION_STATUS.REVOKE]: 'resourcemanage:resourceapply:revoke',
  // [ACTION_STATUS.CANCEL_REVOKE]: 'resourcemanage:resourceapply:cancelrevoke',
  // [ACTION_STATUS.REVOKE_PASS]: 'resourcemanage:resourceapply:revokereview',
  // [ACTION_STATUS.REVOKE_REJECT]: 'resourcemanage:resourceapply:revokereview',
};

// 操作对应的接口
export const ACTION_STATUS_TYPE = {
  [ACTION_STATUS.REVIEW]: 'submitReview',
  [ACTION_STATUS.REVIEW_PASS]: 'submitReview',
  [ACTION_STATUS.REVIEW_REJECT]: 'submitReview',
  [ACTION_STATUS.TL_REVIEW]: 'TlReview',
  [ACTION_STATUS.TL_REVIEW_PASS]: 'TlReview',
  [ACTION_STATUS.TL_REVIEW_REJECT]: 'TlReview',
  [ACTION_STATUS.APPROVAL]: 'submitApprove',
  [ACTION_STATUS.APPROVAL_PASS]: 'submitApprove',
  [ACTION_STATUS.APPROVAL_REJECT]: 'submitApprove',
  // [ACTION_STATUS.REVOKE]: 'resourceRevoke',
  // [ACTION_STATUS.CANCEL_REVOKE]: 'cancelRevoke',
  // [ACTION_STATUS.REVOKE_PASS]: 'resourceRevokeApprove',
  // [ACTION_STATUS.REVOKE_REJECT]: 'resourceRevokeApprove',
  [ACTION_STATUS.BIGDATA1_APPROVAL]: 'bigdata1Approve',
  [ACTION_STATUS.BIGDATA1_APPROVAL_PASS]: 'bigdata1Approve',
  [ACTION_STATUS.BIGDATA1_APPROVAL_REJECT]: 'bigdata1Approve',
  [ACTION_STATUS.BIGDATA_APPROVAL]: 'bigdataApprove',
  [ACTION_STATUS.BIGDATA_APPROVAL_PASS]: 'bigdataApprove',
  [ACTION_STATUS.BIGDATA_APPROVAL_REJECT]: 'bigdataApprove',
  [ACTION_STATUS.LEAD1_APPROVAL]: 'lead1Approve',
  [ACTION_STATUS.LEAD1_APPROVAL_PASS]: 'lead1Approve',
  [ACTION_STATUS.LEAD1_APPROVAL_REJECT]: 'lead1Approve',
  [ACTION_STATUS.LEAD2_APPROVAL]: 'lead2Approve',
  [ACTION_STATUS.LEAD2_APPROVAL_PASS]: 'lead2Approve',
  [ACTION_STATUS.LEAD2_APPROVAL_REJECT]: 'lead2Approve',
  [ACTION_STATUS.LEAD3_APPROVAL]: 'lead3Approve',
  [ACTION_STATUS.LEAD3_APPROVAL_PASS]: 'lead3Approve',
  [ACTION_STATUS.LEAD3_APPROVAL_REJECT]: 'lead3Approve',
  [ACTION_STATUS.FINISH]: 'submitFeekback',

  [ACTION_STATUS.SAFETY_APPROVE]: 'safetyapprove',
  [ACTION_STATUS.SAFETY_APPROVAL_PASS]: 'safetyapprove',
  [ACTION_STATUS.SAFETY_APPROVAL_REJECT]: 'safetyapprove',
  [ACTION_STATUS.ZF_APPROVE]: 'submitApprove',
  [ACTION_STATUS.ZF_APPROVE_PASS]: 'submitApprove',
  [ACTION_STATUS.ZF_APPROVE_REJECT]: 'submitApprove',
  [ACTION_STATUS.MODIFY]: 'submitApply',
  [ACTION_STATUS.FINISH]: 'submitFeekback',
};

// 状态下可用操作(与登录接口中用户权限对应)
export const ACTION_MAP_ACTION = {
  [ACTION_STATUS.REVIEW]: [ACTION_STATUS.REVIEW_PASS, ACTION_STATUS.REVIEW_REJECT],
  [ACTION_STATUS.TL_REVIEW]: [ACTION_STATUS.TL_REVIEW_PASS, ACTION_STATUS.TL_REVIEW_REJECT],
  [ACTION_STATUS.APPROVAL]: [ACTION_STATUS.APPROVAL_PASS, ACTION_STATUS.APPROVAL_REJECT],
  [ACTION_STATUS.BIGDATA1_APPROVAL]: [
    ACTION_STATUS.BIGDATA1_APPROVAL_PASS,
    ACTION_STATUS.BIGDATA1_APPROVAL_REJECT,
  ],
  [ACTION_STATUS.BIGDATA_APPROVAL]: [
    ACTION_STATUS.BIGDATA_APPROVAL_PASS,
    ACTION_STATUS.BIGDATA_APPROVAL_REJECT,
  ],
  [ACTION_STATUS.LEAD1_APPROVAL]: [
    ACTION_STATUS.LEAD1_APPROVAL_PASS,
    ACTION_STATUS.LEAD1_APPROVAL_REJECT,
  ],
  [ACTION_STATUS.LEAD2_APPROVAL]: [
    ACTION_STATUS.LEAD2_APPROVAL_PASS,
    ACTION_STATUS.LEAD2_APPROVAL_REJECT,
  ],
  [ACTION_STATUS.LEAD3_APPROVAL]: [
    ACTION_STATUS.LEAD3_APPROVAL_PASS,
    ACTION_STATUS.LEAD3_APPROVAL_REJECT,
  ],
  [ACTION_STATUS.MODIFY]: [],
  [ACTION_STATUS.CANCEL]: [],
  [ACTION_STATUS.FINISH]: [],
  [ACTION_STATUS.SAFETY_APPROVE]: [
    ACTION_STATUS.SAFETY_APPROVAL_PASS,
    ACTION_STATUS.SAFETY_APPROVAL_REJECT,
  ],
  [ACTION_STATUS.ZF_APPROVE]: [ACTION_STATUS.ZF_APPROVE_PASS, ACTION_STATUS.ZF_APPROVE_REJECT],
};

// 详情页角色
// export const STATUS_MAP_ROLE = {
//   [STATUS_MAP.COMMITED]: 'resourceReview',
//   [STATUS_MAP.REVIEW_PASS]: 'resourceApprove',
//   [STATUS_MAP.REVIEW_REFUSE]: 'resourceApprove',
//   [STATUS_MAP.TL_REVIEW_PASS]: 'TLReview',
//   [STATUS_MAP.TL_REVIEW_REFUSE]: 'TLReview',
//   [STATUS_MAP.APPROVE_PASS]: 'resourceFeedback',
// };
// 详情页需要的权限
// export const STATUS_MAP_PERMS = {
//   [STATUS_MAP.COMMITED]: 'resourcemanage:resourceapply:review',
//   [STATUS_MAP.REVIEW_PASS]: 'resourcemanage:resourceapply:approve',
//   [STATUS_MAP.REVIEW_PASS]: 'resourcemanage:resourceapply:approve',
//   [STATUS_MAP.APPROVE_PASS]: 'resourcemanage:resourceapply:finish',
// };

export const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};
// 资源列表查询条件对应的后端别名
export const STATUS_MAP_QUERY_ALIAS = {
  APLYY_ID: '1',
  PROJECT_NAME: '2',
  DEPT_NAME: '3',
  APPLICANT: '4',
};
// 资源列表查询条件
export const STATUS_MAP_QUERY = {
  [STATUS_MAP_QUERY_ALIAS.APLYY_ID]: '申请单号',
  [STATUS_MAP_QUERY_ALIAS.PROJECT_NAME]: '项目',
  [STATUS_MAP_QUERY_ALIAS.DEPT_NAME]: '部门',
  [STATUS_MAP_QUERY_ALIAS.APPLICANT]: '申请人',
};

// 异地备份列表查询条件对应的后端别名
export const STATUS_MAP_QUERY_BACK_UP_ALIAS = {
  INSTANCE_NAME: 'instanceName', // 实例名称
  INSTANCE_ID: 'instanceId', // 实例ID
};

export const STATUS_MAP_QUERY_BACK_UP = {
  [STATUS_MAP_QUERY_BACK_UP_ALIAS.INSTANCE_NAME]: '实例名称',
  [STATUS_MAP_QUERY_BACK_UP_ALIAS.INSTANCE_ID]: '实例ID',
};

//  同城容灾条件筛选
export const DISASTER_RECOVERY_STATUS_MAP_TEXT = {
  RDS: 'RDS',
  OSS: 'OSS',
  REDIS: 'Redis',
  ECS: 'ECS',
  SLB: 'SLB',
};
