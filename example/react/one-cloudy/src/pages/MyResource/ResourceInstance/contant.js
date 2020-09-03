
export const RES_INSTANCE = {
  title: '资源实例',
  href: '/manage/myresource/resourceinstance',
}
export const TypeTabs = [
  {
    name: '云服务器ECS',
    value: 'ECS',
  },
  {
    name: '对象存储OSS',
    value: 'OSS',
  },
  {
    name: '云数据库RDS',
    value: 'RDS',
  },
  {
    name: '负载均衡SLB',
    value: 'SLB',
  },
]
export const LinkTab = [
  {
    name: '升降配',
    value: 'changeSet',
  },
  // {
  //   name: '变更归属',
  //   value: 'changeOwner'
  // },
  {
    name: '资源回收',
    value: 'recovery',
  },
]
export const InitSelectedList = [
  {
    code: 'ECSInstance',
    value: [],
  },
  {
    code: 'ECSDisk',
    value: [],
  },
  {
    code: 'OSS',
    value: [],
  },
  {
    code: 'RDS',
    value: [],
  },
  {
    code: 'SLB',
    value: [],
  },
]

// ECS 表单数据
const getEcsFormData = (values, data) => {
  // console.log('values  data', values, data);
  const defaultDataDisk = values.defaultDataDiskList.map((item) => ({
    typeName: values.defaultTypeName[item],
    storageMax: values.defaultStorageMax[item],
    cloudProductInstanceId: values.defaultTypeId[item],
  }))
  const changedDataDisk = data.dataDiskList.filter((t) => !!t.diskType).map((t) => {
    const res = defaultDataDisk
      .find((item) => item.cloudProductInstanceId &&
        item.cloudProductInstanceId === t.cloudProductInstanceId)
      ? {
        ...t,
        storageMax: defaultDataDisk
          .find((item) => item.cloudProductInstanceId &&
            item.cloudProductInstanceId === t.cloudProductInstanceId).storageMax,
      }
      : t
    // console.log('res', res);
    return res
  })
  const addDataDisk = values.addDataDiskList.map((item) => ({
    typeName: values.typeName[item],
    storageMax: values.storageMax[item],
  }))
  // console.log('changedDataDisk', changedDataDisk);
  // console.log('dataDisk', dataDisk);
  const instanceInfo = {
    ...data,
    ...values,
    dataDiskList: [ ...changedDataDisk, ...addDataDisk ],
  }
  // 过滤掉ECS原始数据中 没有的表单字段(数据盘)
  delete instanceInfo.storageMax
  delete instanceInfo.typeName
  delete instanceInfo.defaultDataDiskList
  delete instanceInfo.defaultStorageMax
  delete instanceInfo.defaultTypeName
  delete instanceInfo.defaultTypeId
  delete instanceInfo.addDataDiskList
  return instanceInfo
}

// OSS 表单数据
const getOssFormData = (values, data) => ({
  ...data,
  ...values,
  specifiedCapacity: `${values.specifiedCapacity}`,
})

// RDS 表单数据
const getRdsFormData = (values, data) => ({
  ...data,
  ...values,
})

// SLB 表单数据
const getSlbFormData = (values, data) => ({
  ...data,
  ...values,
})

// 获取实例表单数据
export const getInstanceInfo = (targetValues, data) => {
  const values = { ...targetValues }
  // 过滤掉 通用的表单字段(资源申请人 附件)
  delete values.resourceKeys
  delete values.resourceUserIds
  delete values.resourceUserInfos
  delete values.resourceUsers
  delete values.attachFileLinks
  if (!data.remark) {
    delete values.remark
  }
  delete data.deptType
  switch (data.productCode) {
    case 'ECS':
      return getEcsFormData(values, data)
    case 'OSS':
      return getOssFormData(values, data)
    case 'RDS':
      return getRdsFormData(values, data)
    case 'SLB':
      return getSlbFormData(values, data)
    default:
      break
  }
}
export const getTargetState = (data, key, v) => {
  let res = []
  if (key in data) {
    const t = data[key].children || []
    if (t.find((item) => item.label === v)) {
      res = t.find((item) => item.label === v).children || []
    }
  }
  return res
}
export const getImageVersionList = (arr, v) => {
  const res = arr.find((item) => item.label === v) &&
    arr.find((item) => item.label === v).dependSpecTypeGroups &&
    arr.find((item) => item.label === v).dependSpecTypeGroups.image_version &&
    arr.find((item) => item.label === v).dependSpecTypeGroups.image_version.children
  return res || []
}
export const getCpuMemoryList = (arr, v) => {
  const res = arr.find((item) => item.label === v).dependSpecTypeGroups.cpu_mem &&
    arr.find((item) => item.label === v).dependSpecTypeGroups.cpu_mem.children
  return res || []
}
export const difference = (object, base, _) => {
  // eslint-disable-next-line no-shadow
  function changes (object, base) {
    return _.transform(object, (result, value, key) => {
      if (!_.isEqual(value, base[key])) {
        result[key] = (_.isObject(value) && _.isObject(base[key]))
          ? changes(value, base[key]) : value
      }
    })
  }
  return changes(object, base)
}
export const isSame = (base, arr, _) => {
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index]
    for (let j = 0; j < base.length; j++) {
      const target = base[j]
      if (_.isEqual(element, target)) {
        return true
      }
    }
  }
  return false
}
