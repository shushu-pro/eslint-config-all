import {
  post
} from '@/utils/request';

// 账单列表（月度）
export const queryOperationsStaffMonthBillList = async params =>
  post('/oc/bill/regionBillInfo/getOperationsStaffMonthBillList', params);
// 账单统计 - 某月账单详情
export const queryOperationsStaffMonthBillDetail = async params =>
  post('/oc/bill/regionBillInfo/getOperationsStaffMonthBillDetail', params);
// 账单统计 - 某月部门账单列表
export const queryMonthRegionDeptBillList = async params =>
  post('/oc/bill/regionBillInfo/getMonthRegionDeptBillList', params);
// 方法说明: 查詢region辖的部门月度账单列表导出接口
// 参数: 与getMonthRegionDeptBillList接口一致
export const queryMonthRegionDeptBillExport = async params =>
  post('/oc/bill/regionBillInfo/getMonthRegionDeptBillExport', params);
// 账单发送与编辑 - 列表
export const queryMonthDeptRegionBillList = async params =>
  post('/oc/bill/regionBillInfo/getMonthDeptRegionBillList', params);
// 资源列表
export const queryDeptMonthProjProdList = async params =>
  post('/oc/bill/regionBillInfo/getDeptMonthProjProdList', params);
// 方法说明: 月度项目资源费用导出接口导出接口
// 请求方式: POST
// 参数: billNo 必填
// departmentId 部门ID, 选填
// productName 产品名称， 选填
export const queryMonthProjectBillExport = async params =>
  post('/oc/bill/regionBillInfo/getMonthProjectBillExport', params);

// 账单发送
export const submitSend = async params =>
  post('/oc/bill/deptBillInfo/send', params);
// 方法说明: 获取project_bill表里指定部门的所有的项目信息
// 请求方式: POST
// 参数: departmentId 部门ID， 必填
export const queryDeptAllProject = async params =>
  post('/oc/bill/projectBillInfo/getDeptAllProject', params);
// 方法说明:获取project_bill表里指定部门的所有的项目信息
// 请求方式: POST
// 参数:  departmentId 部门ID，必填
//  	   billNo           必填
export const queryDeptBillProject = async params =>
  post('/oc/bill/projectBillInfo/getDeptBillProject', params);
// 方法说明: 获取project_bill表里所有的产品名称
// 请求路径: /projectBillInfo/getAllProductName
// 请求方式: POST
// 参数: 无
export const queryAllProductName = async () =>
  post('/oc/bill/projectBillInfo/getAllProductName');
// 获取全部部门
// 请求方式: POST
// 参数: 无
export const queryAllDept = async () =>
  post('/oc/bill/projectBillInfo/getAllDept');
// 方法说明:项目资源账单修改接口
// 请求方式: POST
// 入参：seqno 				ID,必填
//  	  oldDepartmentId   原部门ID。为防止参数篡改，同时校验seqno与原部门ID
//  	  billNo        	账单号,必填
//  	  instanceName  	资源名称
//  	  ocRegion     	 	(非必填,可选值:cloud-industry-pub、cloud-private、cloud-public）
//  	  departmentId  	部门id，与department一致，要么都为空，要么全不为空
//  	  department    	部门名称
//  	  projectId    	 	项目Id，与projectName一致，要么都为空，要么全不为空
//  	  projectName  	 	项目名称
//  	  productSepcs 	 	资源规格
//  	  monthfee   	项目资源费用
export const submitAdd = async params =>
  post('/oc/bill/projectBillInfo/add', params);
// 方法说明:项目资源账单新增
// 请求方式: POST
// 参数: productName 	产品名称,如ACS,必填
//   	  instanceName   资源名称,必填
//  	  instanceId    实例ID,必填
//  	  billNo        账单号,必填
//  	  ocRegion      区域，可选值:cloud-industry-pub、cloud-private、cloud-public，必填
//  	  departmentId  部门id，注意：是keycloakGroupId，而非deptId,必填 
//  	  department    部门名称,必填
//  	  projecId      项目Id
//  	  projectName   项目名称
//  	  productSepcs  资源规格,必填
//  	  monthfee   项目资源费用,必填
export const submitUpdate = async params =>
  post('/oc/bill/projectBillInfo/update', params);
// 方法说明:项目费用中项目移动接口
// 请求方式: POST
// 参数: billNo              账单号,必填
//       oldDepartmentId 	 旧部门id,必填
//   	  projectInfoId      项目Id,必填
//  	  departmentId       新部门id,必填
//  	  departmentName     新部门名称,必填
//  	  isValidFutureBill  是否对以后账单生效,,默认为false,true：是，false:否
export const submitUpdateDeptProject = async params =>
  post('/oc/bill/projectBillInfo/updateDeptProject', params);
//  方法说明:删除项目费用记录 
// 请求方式: POST
// 参数:  seqno               ID,必填
//  	   departmentId       部门id,必填
export const submitDelete = async params =>
  post('/oc/bill/projectBillInfo/delete', params);

  // 运营人员月度部门账单列表导出(新)
  export const queryOperatorMonthProjectBillExport = async params =>
    post('/oc/bill/regionBillInfo/monthProjectBillExport', params);
