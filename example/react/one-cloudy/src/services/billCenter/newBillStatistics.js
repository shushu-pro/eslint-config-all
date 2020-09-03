import { post} from '@/utils/request';

// 账单统计
export const getDepartmentBillStatistics = async params =>
post('/oc/bill/deptBillInfo/getDepartmentBillStatistics', params);

// 项目账单
export const getProjectBillStatistics = async params =>
post('/oc/bill/deptBillInfo/getProjectBillStatistics', params);

// 实例明细
export const getInstanceBillStatistics = async params =>
post('/oc/bill/deptBillInfo/getInstanceBillStatistics', params);

// 账单统计导出
export const getDepartmentBillStatisticsExport = async params =>
post('/oc/bill/deptBillInfo/getDepartmentBillStatisticsExport', params);

// 项目账单导出
export const getProjectBillStatisticsExport = async params =>
post('/oc/bill/deptBillInfo/getProjectBillStatisticsExport', params);

// 实例明细导出
export const getInstanceBillStatisticsExport = async params =>
post('/oc/bill/deptBillInfo/getInstanceBillStatisticsExport', params);

// 账单统计汇总
export const getBillStatistics = async params =>
post('/oc/bill/deptBillInfo/getBillStatistics', params);
