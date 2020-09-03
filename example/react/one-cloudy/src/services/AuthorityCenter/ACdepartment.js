import { get, post } from '@/utils/request'

// 查询OC部门树
export const getOcDeptTree = async (params) => get('/oc/uum/deptManage/getOcDeptTree', params)

// 查询平台对接列表接口
export const getPlatformIntegrationList = async (params) => get('/oc/uum/deptManage/getPlatformIntegrationList', params)

// 查询OC部门关联用户列表
export const getOcDeptRelatedUserList = async (params) => post('/oc/uum/deptManage/getOcDeptRelatedUserList', params)

// 获取DT部门树-包含OC选中的部门
export const getDtDeptTree = async (params) => get('/oc/uum/deptManage/getDtDeptTree', params)

// 校验OC部门与DT部门是否可以解绑
export const checkOcDtDeptUnbound = async (params) => get('/oc/uum/deptManage/checkOcDtDeptUnbound', params)

// 查询财务主体列表
export const getFinanceDepartmentList = async (params) => get('/oc/uum/deptManage/getFinanceDepartmentList', params)

// 保存OC部门与DT部门的关系和部门与财务主体的关系
export const saveOcDtDeptRelationFinance = async (params) => post('/oc/uum/deptManage/saveOcDtDeptRelationFinance', params)

// 检查OC部门是否重名
export const checkOcDeptIsExists = async (params) => post('/oc/uum/deptManage/checkOcDeptIsExists', params)

// 编辑OC部门接口
export const updateOcDept = async (params) => post(`/oc/uum/deptManage/updateOcDept?ocDeptId=${params.ocDeptId}&ocDeptName=${params.ocDeptName}`, params)

// 删除OC部门
export const deleteOcDept = async (params) => post(`/oc/uum/deptManage/deleteOcDept?ocDeptId=${params.ocDeptId}`, params)
