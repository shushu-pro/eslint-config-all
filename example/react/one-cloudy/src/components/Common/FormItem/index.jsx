/**
 *
 */
import React from 'react'
import { Form } from 'antd'
import { formItemLayout } from '@/contants'
import styles from './index.less'
function FormItem ({ label, value, ...rest }) {
  const layout = rest.formItemLayout || formItemLayout
  return (
    <Form.Item
      className={styles.formItem}
      label={label}
      style={{ marginBottom: 24 }}
      {...layout}
      {...rest}

    >
      {value}
    </Form.Item>
  )
}

export default FormItem
