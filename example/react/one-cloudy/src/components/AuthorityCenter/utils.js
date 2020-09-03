import { message } from 'antd'

// 传入wantedList,匹配对应需要的columns项
export const matchWantedList = (wantedList, allList) => {
  const list = []
  if (Array.isArray(wantedList) && Array.isArray(allList)) {
    wantedList.forEach((a) => {
      if (typeof a === 'string') {
        allList.forEach((b) => {
          if (a === b.key) {
            list.push(b)
          }
        })
      } else {
        list.push(a)
      }
    })
  } else {
    message.error('传入的参数格式有误')
  }
  return list
}

// 将不同接口的不同参数名转换成组件表格中需要的字段名
export const matchParams = (str) => {
  switch (str) {
    case 'product':
      return 'productName'// 资源名称
    case 'productCounts':
      return 'productNum'// 资源数量
    case 'departmentName':
      return 'department'// 部门名称
    case 'deptName':
      return 'dtDeptName'// 部门
    case 'projectCounts':
      return 'projectNum'// 资源数量
    case 'chargeusername':
      return 'projectLeader'// 项目负责人
    case 'ocRegionId':
      return 'ocRegion'// 部署区域
    case 'name':
      return 'projectName'// 项目名称
    default:
      return str
  }
}

// 将不同接口的不同参数名转换成组件表格中需要的字段名
export const swicthData = (list) => {
  const newList = []
  list && list.forEach((obj) => {
      const newObj = {}
            const keyList = Object.keys(obj)
    keyList.forEach((i) => {
      newObj[matchParams(i)] = obj[i]
    })
    newList.push(newObj)
  })
  return newList
}
