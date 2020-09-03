/**
 * 项目详情 - 项目详情/部门
 */
import React from 'react'
import FormItem from '@/components/Common/FormItem'
import { PROJECT_BASE_DATA, defaultFormItemLayout } from './contant'
import styles from './index.less'

function Name ({ data, formItemLayout }) {
  if (!data) {
    return null
  }
  return PROJECT_BASE_DATA.map((item) => (
    <FormItem
      formItemLayout={formItemLayout || defaultFormItemLayout}
      className={styles.detail}
      key={item.value}
      label={item.label}
      value={data[item.value] || '暂无'}
    />
  ))
}

export default Name
