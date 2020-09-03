import moment from 'moment'
import {
  PRODUCT_TYPE,
  PRODUCT_FIELDS,
  IDENTIFIED_KEY,
  getACSDataDiskList,
  sysDiskTransform,
  dataDiskTransform,
  filterNull,
} from './index'

export const submitDataTransform = (values, type, resourceData) => {
  // ACS产品中， 对系统盘和数据盘的处理
  if (type === PRODUCT_TYPE.ACS) {
    values = getACSDataDiskList(values)
  }
  // 系统盘 - 数据转换
  if (values[PRODUCT_FIELDS.SYSTEM_DISK_TYPE_ID]) {
    values.diskList = sysDiskTransform(resourceData, values)
  }
  // 数据盘 - 规格数据转换
  if (values[PRODUCT_FIELDS.DATA_DISK_LIST]) {
    values[PRODUCT_FIELDS.DATA_DISK_LIST] = filterNull(values, PRODUCT_FIELDS.DATA_DISK_LIST)
    // 规格改造 打的补丁，后期接口改造可能需要重新调整
    values.diskList = dataDiskTransform(resourceData, values)
  }
  // MQ中Topic列表
  if (values.topicList) {
    values.topicList = filterNull(values, 'topicList')
  }
  // 处理VPC中交换机，VPC不存在批量申请，只用于单个申请及变更，批量申请PRODUCT_FIELDS.SWITCH_DETAIL_LIST不存在也不会进入该条件
  if (values[PRODUCT_FIELDS.SWITCH_DETAIL_LIST]) {
    values[PRODUCT_FIELDS.SWITCH_DETAIL_LIST] = filterNull(values, PRODUCT_FIELDS.SWITCH_DETAIL_LIST)
  }
  if (values.ifTempRes) {
    values.releaseDate = moment(values.releaseDate).format('YYYY-MM-DD')
  }
  values.ifTempRes = values.ifTempRes ? 1 : 0
  return values
}
export const singleApplySubmitDataTransform = (values, type, productList, productName) => {
  // 从产品列表中获取出提交产品的id
  const list = productList.length > 1 ? productList[0][IDENTIFIED_KEY.CHILDRENS] : []
  const data = list.find((item) => item.name === productName)
  values = {
    ...values,
    productGroupId: data.productGroupId,
    resourceName: productName,
    resourceType: type,
  }
  return values
}
