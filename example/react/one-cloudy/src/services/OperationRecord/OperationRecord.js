// 我的资源-资源实例操作记录
import { get, post } from '@/utils/request'
import { post as postRequest } from '@/utils/billrequest'

// 操作记录列表
export const getOperateList = async (params) => postRequest('/oc/cloud/resmng/getOperateList', params)

// 操作单详情
export const getInstanceChangeInfo = async (params) => get('/oc/cloud/resmng/getInstanceChangeInfo', params)

// 操作单流程信息
export const getOperateDetail = async (params) => get('/oc/cloud/resmng/getOperateDetail', params)

// 操作单撤销
export const ticketRevert = async (params) => get('/oc/cloud/resmng/operateTicketRevert', params)

// 审批接口
export const approve = async (params) => get('/oc/cloud/approve', params)


// 资源释放审批流程
export const releaseReview = async (params) => post('/oc/cloud/resmng/releaseReview', params)


// 资源变更审批流程
export const applyReviewOrApprove = async (params) => post('/oc/cloud/resmng/applyReviewOrApprove', params)
