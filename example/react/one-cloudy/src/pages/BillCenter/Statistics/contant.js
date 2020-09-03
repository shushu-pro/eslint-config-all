export const TYPE_ENUM = {
  // 产品维度
  PROJECT_BILL_PRODUCT_EXPORT: 'PROJECT_BILL_PRODUCT_EXPORT',
  // 部门维度
  PROJECT_BILL_DEPARTMENT_EXPORT: 'PROJECT_BILL_DEPARTMENT_EXPORT'
}

export const TYPE_ENUM_TEXT = {
  [TYPE_ENUM.PROJECT_BILL_PRODUCT_EXPORT]: '1.每种产品导出为一个sheet，每个月份导出为一个文档文件。',
  [TYPE_ENUM.PROJECT_BILL_DEPARTMENT_EXPORT]: '1.每个部门导出为一个sheet，每个月份导出为一个文档文件。'
}