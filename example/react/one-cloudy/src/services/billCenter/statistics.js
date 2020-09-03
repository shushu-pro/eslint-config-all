import { post } from '@/utils/request';

// 运营人员月度部门账单列表查询(新)
export const queryMonthProjectBillList = async params =>
  post('/oc/bill/regionBillInfo/monthProjectBillList', params);
// 运营人员月度部门账单列表导出(新)
export const queryOperatorMonthProjectBillExport = async params =>
  post('/oc/bill/regionBillInfo/monthProjectBillExport', params);
