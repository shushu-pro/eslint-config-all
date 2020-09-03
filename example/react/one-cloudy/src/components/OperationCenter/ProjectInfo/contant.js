import { FIELD_MAP, PRODUCT_FIELDS } from '@/pages/OperationCenter/ResourceApply/constant'

export { FIELD_MAP, PRODUCT_FIELDS }
export const PROJECT_BASE_DATA = [
  {
    label: '项目名称',
    value: PRODUCT_FIELDS.PROJECT_NAME,
  },
  {
    label: '部门',
    value: PRODUCT_FIELDS.DEPARTMENT_NAME,
  },
]
export const PROJECT_USER_DATA = [
  {
    label: '项目负责人',
    value: 'chargeUserInfoIds',
  },
  {
    label: '项目联系人',
    value: 'contactUserInfoIds',
  },
]
export const getOtherData = (unitId) => {
  if (unitId === 2 || unitId === '2') {
    return [
      {
        label: '中标公司',
        value: 'bidCompany',
      },
      {
        label: '中标价格(元)',
        value: 'bidPrice',
      },
      {
        label: '项目描述',
        value: 'description',
      },
    ]
  }
  return [
    {
      label: '项目描述',
      value: 'description',
    },
  ]
}
export const defaultFormItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
}
