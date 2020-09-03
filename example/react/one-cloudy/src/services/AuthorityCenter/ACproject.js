import { get, post, deleteRes } from '@/utils/request'

// DT部门列表
export const deptList = async (params) => get('/oc/project/dt/deptList', params)

// 匹配DT项目
export const match = async (params) => post('/oc/project/dt/match', params)

// DT项目列表
export const list = async (params) => get('/oc/project/dt/list', params)

// 查询项目信息有分页
export const ocprojectinfoList = async (params) => get('/oc/resmng/ocprojectinfo/list', params)

// 保存项目信息
export const ocprojectinfoSave = async (params) => post('/oc/resmng/ocprojectinfo/save', params)

// 获取项目详情
export const ocprojectinfoInfo = async (params) => get(`/oc/resmng/ocprojectinfo/info/${params.projectId}`, params)

// 项目信息修改
export const ocprojectinfoUpdate = async (params) => post('/oc/resmng/ocprojectinfo/update', params)

// 删除项目
export const ocprojectinfoDelete = async (params) => deleteRes('/oc/resmng/ocprojectinfo/delete', params)

// 获取用户列表
export const alluserlist = async (params) => get('/oc/sys/user/alluserlist', params)

// 申请单列表
export const queryOrderList = async (params) => get('/oc/resmng/list', params)

// 详情
export const queryOrderDetail = async (params) => get('/oc/resmng/detail', params)
