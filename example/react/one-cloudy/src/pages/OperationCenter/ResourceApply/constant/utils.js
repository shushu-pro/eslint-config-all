import _ from 'lodash'
import { PRODUCT_FIELDS } from './productFields'
import { PRODUCT_TYPE } from './productType'


// 对资源使用人进行筛选，剔除undefined
export function getUserList (values) {
  let userList = []
  let list = []
  // 并不是所有的产品都有基础信息，资源使用人为非必填项，所以需要做判断
  if (values[PRODUCT_FIELDS.RESOURCE_USER]) {
    userList = values[PRODUCT_FIELDS.RESOURCE_USER].filter(
      (item) => item && item[PRODUCT_FIELDS.USER_NAME],
    )
  }
  if (values[PRODUCT_FIELDS.RESOURCE_USER_INFOS]) {
    list = values[PRODUCT_FIELDS.RESOURCE_USER_INFOS].map((item) => item)
  }

  return userList.concat(list)
}

// 数据盘，剔除undefined
export function getDataDiskList (values) {
  let dataDiskList = []
  // 数据盘不一定为必填项，所以需要做判断
  if (values[PRODUCT_FIELDS.DATA_DISK_LIST]) {
    dataDiskList = values[PRODUCT_FIELDS.DATA_DISK_LIST].filter(
      (item) => item && item[PRODUCT_FIELDS.DISK_TYPE],
    )
  }
  return dataDiskList
}

// 规格数据转换
export function specTransform (data, resourceData, values, type) {
  if (type === PRODUCT_TYPE.SLB && values[PRODUCT_FIELDS.NETWORK_TYPE_NAME] === '专有网络') {
    return []
  }
  return data.map((item) => {
    let { specTypeGroupId } = item
    if (resourceData[item.specTypeGroupId] || values[item.specTypeGroupId]) {
      specTypeGroupId = resourceData[item.specTypeGroupId]
        ? resourceData[item.specTypeGroupId].id
        : values[item.specTypeGroupId]
    }
    return {
      ...item,
      specTypeGroupId,
      groupsSpecTypeId: item.groupsSpecTypeId && values[item.groupsSpecTypeId],
      value: item.value && values[item.value],
    }
  })
}

export function sysDiskTransform (resourceData, values) {
  return [
    {
      key: 'sys',
      specTypeGroupId: values[PRODUCT_FIELDS.SYSTEM_DISK_TYPE_ID],
      value: values[PRODUCT_FIELDS.SYSTEM_DISK_SIZE],
      // quantity: '',
    },
  ]
}
export function dataDiskTransform (resourceData, values) {
  values[PRODUCT_FIELDS.DATA_DISK_LIST].forEach((item) => {
    values.diskList.push({
      key: 'data',
      specTypeGroupId: item[PRODUCT_FIELDS.DISK_TYPE_ID],

      value: item[PRODUCT_FIELDS.DISK_STORAGE_MAX],
      // quantity: item[PRODUCT_FIELDS.DISK_NUM],
    })
  })
  return values.diskList
}

// ACS 产品中系统盘和系统盘的提交处理
export function getACSDataDiskList (values) {
  console.log('getACSDataDiskList', values)
  values.diskList = [].concat({
    key: 'sys_master',
    specTypeGroupId: values[PRODUCT_FIELDS.SYS_MASTER_TYPE_ID],
    value: values[PRODUCT_FIELDS.SYS_MASTER_STORAGE],
  })
  values.diskList = values.diskList.concat({
    key: 'sys_worker',
    specTypeGroupId: values[PRODUCT_FIELDS.SYS_WORKER_TYPE_ID],
    value: values[PRODUCT_FIELDS.SYS_WORKER_STORAGE],
  })
  if (values[PRODUCT_FIELDS.CHECK_DATA_DISK]) {
    values.diskList = values.diskList.concat({
      key: 'data',
      specTypeGroupId: values[PRODUCT_FIELDS.DATA_WORKER_TYPE_ID],
      value: values[PRODUCT_FIELDS.DATA_WORKER_STORAGE],
    })
  }
  return values
}


// RDS变更时，添加specTypeGroupId数据处理
export function getRdsSpecTypeGroupId (dataList, values, cascadeIdList, cascadeKeyList, specList) {
  if (!Array.isArray(cascadeIdList)) {
    return specList
  }
  let data = dataList
  cascadeIdList.map((key, index) => {
    const itemIndex = specList.findIndex((items) => items.key === cascadeKeyList[index])
    if (data.children) {
      data = data.children.find((keys) => keys.id === values[key])
    }
    if (data.dependSpecTypeGroups) {
      const iKey = cascadeKeyList[index]
      data = data.dependSpecTypeGroups[iKey]
    }
    if (specList[itemIndex] && !specList[itemIndex].specTypeGroupId) {
      specList[itemIndex].specTypeGroupId = data.id
    }
  })
  return specList
}


// 过滤数组中的空值
export function filterNull (values, id) {
  let list = []
  if (values[id]) {
    list = values[id].filter((item) => item && !_.isEmpty(item))
  }
  return list
}
