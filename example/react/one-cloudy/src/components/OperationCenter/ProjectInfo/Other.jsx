/**
 * 项目详情 - 项目描述/中标公司/中标价格
 */
import React from 'react'
import FormItem from '@/components/Common/FormItem'
import { getOtherData, defaultFormItemLayout } from './contant'
import styles from './index.less'

function Other ({ data, unitId, formItemLayout, ...reset }) {
  if (!data) {
    return null
  }
  return getOtherData(unitId).map((item) => (
    <FormItem
      formItemLayout={formItemLayout || defaultFormItemLayout}
      className={styles.detail}
      key={item.value}
      label={item.label}
      value={data[item.value] || '暂无'}
      {...reset}
    />
  ))
}

export default Other
