import {
  post,
} from '@/utils/billrequest';

// 查询部门账单总览
export const getDeptSummaryBillPageList = async params => post('/oc/billCheck/getDeptSummaryBillPageList', params);

// 按云区维度查询部门费用总览
export const getDeptBillByRegion = async params => post('/oc/billCheck/getDeptBillByRegion', params);

// 按产品维度查询部门账单汇总
export const getDeptBillByProductName = async params => post('/oc/billCheck/getDeptBillByProductName', params);

// 账单按region核对接口
export const checkRegionBill = async params => post('/oc/bill/deptBillInfo/checkRegionBill', params);

// 账单按reigon取消核对接口
export const unCheckRegionBill = async params => post('/oc/bill/deptBillInfo/unCheckRegionBill', params);

// 账单按region发送接口
export const sendRegionBill = async params => post('/oc/bill/deptBillInfo/sendRegionBill', params);

// 按部门或按产品查询资源实例列表接口
export const getDeptMonthProdList = async params => post('/oc/bill/regionBillInfo/getDeptMonthProdList', params);

// 查询月度账单状态
export const queryRegionBillStatus = async params => post('/oc/bill/deptBillInfo/queryRegionBillStatus', params);

// 资源实例列表-资源筛选列表
export const getAllProductName = async params => post('/oc/bill/projectBillInfo/getAllProductName', params);

// 云区导出
export const getDeptBillListByRegionExport = async params => post('/oc/billCheck/getDeptBillListByRegionExport', params);

// 产品账单导出
export const getDeptBillByProductNameExport = async params => post('/oc/billCheck/getDeptBillByProductNameExport', params);

// 部门总览账单导出
export const getDeptBillListExport = async params => post('/oc/billCheck/getDeptBillListExport', params);

// 根据项目查询云区及可用资源数
export const getDeptBillProjectRegions = async params => post('/oc/bill/projectBillInfo/getDeptBillProjectRegions', params);