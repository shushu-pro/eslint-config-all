import { message } from 'antd'

/**
 * 账单中心的常量
 */
export const STATUS_MAP = {
  0: 'confirmed',
  1: 'adopt',
  2: 'reject',
}
export const STATUS_TEXT_MAP = {
  0: '待确认',
  1: '确认通过',
  2: '驳回',
}
export const DEPT_STATUS_MAP = {
  0: 'noSent',
  1: 'confirmed',
  2: 'adopt',
  3: 'reject',
}
export const DEPT_STATUS_TEXT_MAP = {
  0: '未发送',
  1: '待确认',
  2: '确认通过',
  3: '驳回',
}
export const getTitle = billNo => {
  const year = billNo.substring(0, 4)
  const isZero = billNo.substring(4, 5)
  const month = isZero === '0' ? billNo.substring(5, 6) : billNo.substring(4, 6)
  return `${year}年${month}月账单`
}
export const spiltTime = billNo => {
  const year = billNo.substring(0, 4)
  const isZero = billNo.substring(4, 5)
  const month = isZero === '0' ? billNo.substring(5, 6) : billNo.substring(4, 6)
  return { year, month }
}
export const getTime = billNo => {
  if (!billNo) {
    return '-'
  }
  const { year, month } = spiltTime(billNo)
  return `${year}.${month}.1 - ${year}.${month}.${new Date(year, month, 0).getDate()}`
}
export const getDate = _ => (_ ? _.split(' ')[0] : '-')

// 省大数据局/省委政法委 展示的详情页的字段
export const BIG_DATA_BASE_DETAIL_FIELD_MAP = {
  DEPARTMENT_CNTS: 'departmentCnts',
  PRODUCT_TYPE_CNTS: 'productTypeCnts',
  BILL_DEPT_CONFIM_CNTS: 'billDeptConfimCnts',
  BILL_CONFIRMER_NAME: 'billConfirmerName',
  PROJECT_CNTS: 'projectCnts',
  PRODUCT_CNTS: 'productCnts',
  BILL_STATUS: 'billStatus',
  BILL_CONFIRM_TIME: 'billConfirmTime',
  BILL_AMT: 'billAmt',
  TIME: 'time',
  RESFUSE_TYPE: 'resfuseType',
  RESFUSE_INFO: 'resfuseInfo',
}
// 省大数据局/省委政法委 展示的详情页的字段对应的文案
export const BIG_DATA_BASE_DETAIL_FIELD_TEXT_MAP = {
  [BIG_DATA_BASE_DETAIL_FIELD_MAP.DEPARTMENT_CNTS]: '部门数',
  [BIG_DATA_BASE_DETAIL_FIELD_MAP.PRODUCT_TYPE_CNTS]: '资源种类',
  [BIG_DATA_BASE_DETAIL_FIELD_MAP.BILL_DEPT_CONFIM_CNTS]: '部门确认',
  [BIG_DATA_BASE_DETAIL_FIELD_MAP.BILL_CONFIRMER_NAME]: '确认人',
  [BIG_DATA_BASE_DETAIL_FIELD_MAP.PROJECT_CNTS]: '项目数',
  [BIG_DATA_BASE_DETAIL_FIELD_MAP.PRODUCT_CNTS]: '资源数目',
  [BIG_DATA_BASE_DETAIL_FIELD_MAP.BILL_STATUS]: '确认状态',
  [BIG_DATA_BASE_DETAIL_FIELD_MAP.BILL_CONFIRM_TIME]: '确认时间',
  [BIG_DATA_BASE_DETAIL_FIELD_MAP.BILL_AMT]: '金额总计',
  [BIG_DATA_BASE_DETAIL_FIELD_MAP.TIME]: '计费周期',
  [BIG_DATA_BASE_DETAIL_FIELD_MAP.RESFUSE_TYPE]: '驳回类型',
  [BIG_DATA_BASE_DETAIL_FIELD_MAP.RESFUSE_INFO]: '驳回原因',
}

// 省委政法委 详情页显示的数据字段
export const UNIT_DEPT_DETAIL_FIELD_MAP = {
  DEPARTMENT_CNTS: 'departmentCnts',
  PROJ_CNT: 'deptProjCnt',
  PRODTYPE_CNTS: 'deptProdtypeCnts',
  PROD_CNTS: 'deptProdCnts',
  PROD_FEE: 'deptProdFee',
  TIME: 'time',
}

// 省大数据局/省委政法委 展示的详情页的字段对应的文案
export const UNIT_DEPT_DETAIL_FIELD_TEXT_MAP = {
  [UNIT_DEPT_DETAIL_FIELD_MAP.DEPARTMENT_CNTS]: '部门数',
  [UNIT_DEPT_DETAIL_FIELD_MAP.PROJ_CNT]: '项目数',
  [UNIT_DEPT_DETAIL_FIELD_MAP.PRODTYPE_CNTS]: '资源种类',
  [UNIT_DEPT_DETAIL_FIELD_MAP.PROD_CNTS]: '资源数目',
  [UNIT_DEPT_DETAIL_FIELD_MAP.PROD_FEE]: '金额总计',
  [UNIT_DEPT_DETAIL_FIELD_MAP.TIME]: '计费周期',
}

// 一级部门 详情页显示的数据字段
export const DEPT_DETAIL_FIELD_MAP = {
  DEPTPROD_FEE: 'deptProdFee',
  DEPTPROJ_CNT: 'deptProjCnt',
  DEPT_PRODTYPE_CNTS: 'deptProdtypeCnts',
  DEPT_PROD_CNTS: 'deptProdCnts',
  TIME: 'time',
  BILL_STATUS: 'billStatus',
  DEPT_BILL_CONFIRMER_NAME: 'deptBillConfirmerName',
  DEPT_BILL_CONFIRM_TIME: 'deptBillConfirmTime',
  DEPT_RESFUSE_TYPE: 'deptResfuseType',
  DEPT_RESFUSE_INFO: 'deptResfuseInfo',
}
// 一级部门 详情页显示的数据字段相应文案
export const DEPT_DETAIL_FIELD_TEXT_MAP = {
  [DEPT_DETAIL_FIELD_MAP.DEPTPROD_FEE]: '金额总计',
  [DEPT_DETAIL_FIELD_MAP.DEPTPROJ_CNT]: '项目数',
  [DEPT_DETAIL_FIELD_MAP.DEPT_PRODTYPE_CNTS]: '资源类目',
  [DEPT_DETAIL_FIELD_MAP.DEPT_PROD_CNTS]: '资源数目',
  [DEPT_DETAIL_FIELD_MAP.TIME]: '计费周期',
  [DEPT_DETAIL_FIELD_MAP.BILL_STATUS]: '账单确认',
  [DEPT_DETAIL_FIELD_MAP.DEPT_BILL_CONFIRMER_NAME]: '确认人',
  [DEPT_DETAIL_FIELD_MAP.DEPT_BILL_CONFIRM_TIME]: '确认时间',
  [DEPT_DETAIL_FIELD_MAP.DEPT_RESFUSE_TYPE]: '驳回类型',
  [DEPT_DETAIL_FIELD_MAP.DEPT_RESFUSE_INFO]: '驳回原因',
}

// 运维人员 详情页显示的数据字段
export const OPERATIONS_STAFF_DEPT_DETAIL_FIELD_MAP = {
  DEPARTMENT_CNTS: 'departmentCnts',
  PROJECT_CNTS: 'projectCnts',
  PRODUCT_CNTS: 'productCnts',
  BILL_AMT: 'billAmt',
  TIME: 'time',
}
// 运维人员 详情页显示的数据字段相应文案
export const OPERATIONS_STAFF_DEPT_DETAIL_FIELD_TEXT_MAP = {
  [OPERATIONS_STAFF_DEPT_DETAIL_FIELD_MAP.DEPARTMENT_CNTS]: '部门数',
  [OPERATIONS_STAFF_DEPT_DETAIL_FIELD_MAP.PROJECT_CNTS]: '项目数',
  [OPERATIONS_STAFF_DEPT_DETAIL_FIELD_MAP.PRODUCT_CNTS]: '资源数目',
  [OPERATIONS_STAFF_DEPT_DETAIL_FIELD_MAP.BILL_AMT]: '金额总计',
  [OPERATIONS_STAFF_DEPT_DETAIL_FIELD_MAP.TIME]: '计费周期',
}

// 区域
export const REGION_ID_MAP = {
  KCLOUD_PUBLICEY: 'cloud-public',
  CLOUD_PRIVAT: 'cloud-private',
  CLOUD_INDUSTRY_PUB: 'cloud-industry-pub',
  CLOUD_INDUSTRY_SECU: 'cloud-industry-secu',
}
export const REGION_ID_TEXT_MAP = {
  [REGION_ID_MAP.KCLOUD_PUBLICEY]: '公有云区',
  [REGION_ID_MAP.CLOUD_PRIVAT]: '专有云区',
  [REGION_ID_MAP.CLOUD_INDUSTRY_PUB]: '行业云区（省数字政法平台）- 公共区',
  [REGION_ID_MAP.CLOUD_INDUSTRY_SECU]: '行业云区（省数字政法平台）- 公安云区',
}

// regionId
export const REGION_ID_NUM_MAP = {
  KCLOUD_PUBLICEY: '1',
  CLOUD_PRIVAT: '2',
  CLOUD_INDUSTRY_PUB: '3',
  CLOUD_INDUSTRY_SECU: '4',
}
export const REGION_ID_NUM_TEXT_MAP = {
  [REGION_ID_NUM_MAP.KCLOUD_PUBLICEY]: 'cloud-public',
  [REGION_ID_NUM_MAP.CLOUD_PRIVAT]: 'cloud-private',
  [REGION_ID_NUM_MAP.CLOUD_INDUSTRY_PUB]: 'cloud-industry-pub',
  [REGION_ID_NUM_MAP.CLOUD_INDUSTRY_SECU]: 'cloud-industry-secu',
}
export const REGION_LIST = Object.values(REGION_ID_MAP).map(key => ({
  key,
  value: REGION_ID_TEXT_MAP[key],
}))
export const FILTER_REGION_LIST = Object.values(REGION_ID_MAP).map(key => ({
  value: key,
  text: REGION_ID_TEXT_MAP[key],
}))
export const UNIT_LIST = [
  {
    value: '1',
    text: '政务',
  },
  {
    value: '2',
    text: '政法',
  },
]
export const RES_INFO = {
  PRODUCT_NAME: 'productName',
  INSTANCE_ID: 'instanceId',
  INSTANCE_NAME: 'instanceName',
  DEPART_MENT: 'department',
  DEPART_MENT_ID: 'departmentId',
  PROJECT_ID: 'projectId',
  PROJECT_NAME: 'projectName',
  PROJECT_INFO_ID: 'projectInfoId',
  OC_REGION: 'ocRegion',
  PRODUCT_SEPCS: 'productSepcs',
  OPEN_TIME: 'openTime',
  MONTH_FEE: 'monthfee',
}
export const RES_INFO_LIST = [
  RES_INFO.PRODUCT_NAME,
  RES_INFO.INSTANCE_ID,
  RES_INFO.INSTANCE_NAME,
  RES_INFO.DEPART_MENT,
  RES_INFO.OC_REGION,
  RES_INFO.PROJECT_NAME,
  RES_INFO.PRODUCT_SEPCS,
  RES_INFO.OPEN_TIME,
  RES_INFO.MONTH_FEE,
]
export const RES_INFO_TEXT = {
  [RES_INFO.PRODUCT_NAME]: '资源',
  [RES_INFO.INSTANCE_ID]: '实例ID',
  [RES_INFO.INSTANCE_NAME]: '实例名称',
  [RES_INFO.DEPART_MENT]: '所属部门',
  [RES_INFO.PROJECT_NAME]: '所属项目',
  [RES_INFO.PROJECT_INFO_ID]: '项目',
  [RES_INFO.OC_REGION]: '部署区域',
  [RES_INFO.PRODUCT_SEPCS]: '资源规格',
  [RES_INFO.OPEN_TIME]: '开通时间',
  [RES_INFO.MONTH_FEE]: '费用',
}

// 财务主体： 1 省大数据局 2: 省委政法委 3: 阿里 4 数字浙江 5公安
export const FINANCE_FILED_MAP = {
  BIG_DATA_BUREAU: 1,
  POLITICAL_COMMISSION: 2,
  ALI: 3,
  DIGITAL: 4,
  PUBLIC_SECURITY: 5,
}
export const FINANCE_FILED_MAP_TEXT = {
  [FINANCE_FILED_MAP.BIG_DATA_BUREAU]: '省大数据局',
  [FINANCE_FILED_MAP.POLITICAL_COMMISSION]: '省委政法委',
  [FINANCE_FILED_MAP.ALI]: '阿里',
  [FINANCE_FILED_MAP.DIGITAL]: '数字浙江',
  [FINANCE_FILED_MAP.PUBLIC_SECURITY]: '公安',
}

// 财务主体： 1 省大数据局 2: 省委政法委 3: 阿里 4 数字浙江
export const SEAERCH_FILED_MAP = {
  INSTANCE_NAME: 'instanceName',
  INSTANCE_ID: 'instanceId',
  PROJECT_NAME: 'projectName',
  PROJECT_ID: 'projectId',
  DEPARTMENT: 'department',
  DEPARTMENT_ID: 'departmentId',
  PRODUCT_NAME: 'productName',
}
export const SEAERCH_FILED_MAP_TEXT = {
  [SEAERCH_FILED_MAP.INSTANCE_NAME]: '实例名称',
  [SEAERCH_FILED_MAP.INSTANCE_ID]: '实例ID',
  [SEAERCH_FILED_MAP.PROJECT_NAME]: '项目名称',
  [SEAERCH_FILED_MAP.PROJECT_ID]: '项目ID',
  [SEAERCH_FILED_MAP.DEPARTMENT]: '部门名称',
  [SEAERCH_FILED_MAP.DEPARTMENT_ID]: '部门ID',
  [SEAERCH_FILED_MAP.PRODUCT_NAME]: '资源',
}


// 账单核对的区域
// 互联网：公有云，
// 专有云：私有云，
// 政法行业云区：公有工业云，
// 公安行业云区：公安云
export const REGION_ID_MAP_BILLCHECK = {
  CLOUD_PUBLICEY: 'cloud-public',
  CLOUD_PRIVAT: 'cloud-private',
  CLOUD_INDUSTRY_PUB: 'cloud-industry-pub',
  CLOUD_INDUSTRY_SECU: 'cloud-industry-secu',
}
export const REGION_ID_TEXT_MAP_BILLCHECK = {
  [REGION_ID_MAP_BILLCHECK.CLOUD_PUBLICEY]: '互联网区',
  [REGION_ID_MAP_BILLCHECK.CLOUD_PRIVAT]: '政务专有云区',
  [REGION_ID_MAP_BILLCHECK.CLOUD_INDUSTRY_PUB]: '政法专有云区',
  [REGION_ID_MAP_BILLCHECK.CLOUD_INDUSTRY_SECU]: '公安行业云区',
}
export const REGION_LIST_BILLCHECK = Object.values(REGION_ID_MAP_BILLCHECK).map(key => ({
  key,
  value: REGION_ID_TEXT_MAP_BILLCHECK[key],
}))
export const FILTER_REGION_LIST_BILLCHECK = Object.values(REGION_ID_MAP_BILLCHECK).map(key => ({
  value: key,
  text: REGION_ID_TEXT_MAP_BILLCHECK[key],
}))
export const changeRegionStr = str => {
  if (str === 'cloud-public' || str === 'cloud_public') return 'cn-hangzhou-zwynet-d01'
  if (str === 'cloud-private' || str === 'cloud_private') return 'cn-hangzhou-zjzwy01-d01'
  if (str === 'cloud-industry-pub' || str === 'cloud_industry_pub') return 'cn-deqing-zjzfy01-d02'
  if (str === 'cloud-industry-secu' || str === 'cloud_industry_secu') return 'cn-deqing-hzjw-d01'
  return str
}

// 环比和同比返回-1000.00时，表示上一期数据为空
export const LINKRATIO_AND_YAERONYEAR = '-1000.00'
export const transformMomAndYoyBillCheck = (num) => {
  if (num) {
    if (num === LINKRATIO_AND_YAERONYEAR) {
      return '-'
    }
    if (num === '0.0000') {
      return '0.00%'
    }
    if (num === '0.00') {
      return '0.00%'
    }
    let number = (num * 100).toFixed(2)
    if (number > 0) {
      number = `+${number}`
    }
    number += '%'
    return number
  }
  return '-'
}


export const getBill = (props) => {
  if (props) {
    const { location } = props
    const { billNo } = location.query
    return billNo
  }
  return '-'
}

// 输入需要的表格的列名，展示对应的表格列
// arr1：需要展示的列表  arr2：所有的表格列名的列表
export const getWantedColumns = (arr1, arr2) => {
  const list = []
  if (arr1 && arr1[0] && arr1[0] === 'all') {
    return arr2
  }
  arr1.forEach(item1 => {
    arr2.forEach(item2 => {
      if (item1 === item2.dataIndex) {
        list.push(item2)
      }
    })
  })
  return list
}

// 切换部门账单-表格环比同比数据样式exportUrl
export const transformMomAndYoy = (num) => {
  if (num == 0) {
    return '0.00%'
  }
  if (num) {
    let number = (num * 100).toFixed(2)
    if (number > 0) {
      number = `+${number}`
    }
    number += '%'
    return number
  }
  return '-'
}

// 切换部门账单-表格数据样式
export const transformData = (num) => {
  if (num === 0) {
    return '0'
  }
  if (!num) {
    return '-'
  }
  return num
}

// 请求方式是get时，获得Url路径中的参数格式
export const getUrlParams = (obj) => {
  const str = []
  if (obj && JSON.stringify(obj) !== '{}') {
    Object.keys(obj).map(i => {
      if (obj[i]) {
        str.push(`${i}=${obj[i]}`)
      }
    })
  }
  return str.join('&')
}

// 导出的返回数据是字符流格式时的导出方法
export const fetchTypeExport = (params) => {
  const { type = 'GET', url, param, name } = params
  const { host } = window.location
  const http = document.location.protocol
  let exportUrl = `${http}//${host}/${url}`
  if (type === 'GET') {
    exportUrl += `?${getUrlParams(param)}`
  }

  fetch(exportUrl, {
    method: type,
    credentials: 'include',
    headers: new Headers({
      'Content-type': 'application/json',
    }),
  })
    .then((response) => {
      message.success('导出成功')
      const eleLink = document.createElement('a')
      eleLink.download = `${name}.xls`
      eleLink.style.display = 'none'
      eleLink.href = response.url
      document.body.appendChild(eleLink)
      eleLink.click()
      document.body.removeChild(eleLink)
    },
    ).catch((error) => {
      message.error(error)
    })
}

// 计费周期
export const getBillingCycle = (billNo1, billNo2) => {
  if (!billNo1 || !billNo2) {
    return '-'
  }
  const year1 = spiltTime(billNo1).year
  const month1 = spiltTime(billNo1).month
  const year2 = spiltTime(billNo2).year
  const month2 = spiltTime(billNo2).month
  return `${year1}.${month1}.1 - ${year2}.${month2}.${new Date(year2, month2, 0).getDate()}`
}
