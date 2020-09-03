import { get ,post} from '@/utils/request';

// 月度账单列表
export const listMonthBillSumInfo = async params =>
get('/oc/bill/deptBillInfo/listMonthBillSumInfo', params);

// Region信息
export const listRegions = async params =>
get('/oc/bill/deptBillInfo/listRegions', params);

// 账单统计
export const billSumInfo = async params =>
get('/oc/bill/deptBillInfo/billSumInfo', params);

// 组织账单
export const listDeptBillSumInfo = async params =>
get('/oc/bill/deptBillInfo/listDeptBillSumInfo', params);

// 项目账单列表
export const listProjectBillSumInfo = async params =>
get('/oc/bill/deptBillInfo/listProjectBillSumInfo', params);

// 项目账单列表导出
export const listProjectBillSumInfoExport = async params =>
get('/oc/bill/deptBillInfo/listProjectBillSumInfo/export', params);

// 实例明细
export const listInstance = async params =>
get('/oc/bill/deptBillInfo/listInstance', params);

// 实例明细导出
export const listInstancesExport = async params =>
get('/oc/bill/deptBillInfo/listInstance/export', params);

// 获取资源列表
export const queryAllProductName = async params =>
post('/oc/bill/projectBillInfo/getAllProductName', params);

// 获取资源列表
export const hasDeptBillMenu = async params =>
get('/oc/bill/deptBillInfo/hasDeptBillMenu', params);

