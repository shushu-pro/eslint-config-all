import { post } from '@/utils/billrequest';

// 查询下载文件列表
export const queryDownloadFiles = async params => post('/oc/deptBillFile/getDeptBillList', params);
export const queryUploadFiles = async params => post('/oc/deptBillFile/getDeptBillList', params);
export const deleteUploadFiles = async params => post('/oc/deptBillFile/removeDeptBillFile', params);
export const uploadFile = async params => post('/oc/deptBillFile/uploadDeptBillFile', params);
