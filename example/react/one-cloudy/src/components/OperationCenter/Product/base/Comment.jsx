/**
 * 注释组件
 */
import React from 'react'
import { Form } from 'antd'
import { TextAreaItem } from '../../FormItem'
import { PRODUCT_FIELDS } from './_constant'
import styles from '../style.less'

function Comment ({
  form,
  formItemLayout,
  placeholder,
  maxLength,
  label,
  tip,
  id,
  required = false,
}) {
  return (
    <Form.Item label={label || '备注'} {...formItemLayout} required={required}>
      <TextAreaItem
        form={form}
        id={id || PRODUCT_FIELDS.REMARK}
        placeholder={placeholder || ' '}
        maxLength={maxLength || 255}
        required={required}
      />
      {tip && (
        <p className={styles.tip} style={{ margin: '-30px 0 14px' }}>
          {tip}
        </p>
      )}
    </Form.Item>
  )
}

export default Comment
