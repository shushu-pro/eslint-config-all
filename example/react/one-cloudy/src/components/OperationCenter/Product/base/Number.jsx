/**
 * 数量组件
 */
import React from 'react'
import { Form } from 'antd'
import { InputNumItem } from '../../FormItem'
import { PRODUCT_FIELDS } from './_constant'
import styles from '../style.less'

function Number ({
  form,
  formItemLayout,
  label = '申请台数',
  id: propId,
  min = 1,
  max = 99999999, // 后端输入型的数字最大长度限制为8位
  tip,
  unit,
  step,
  precision = 0,
  required = true,
  ...arg
}) {
  const id = propId || PRODUCT_FIELDS.QUANTITY
  const onChange = () => {
    form.validateFields([ id ], () => {})
  }
  return (
    <Form.Item required={required} label={label} {...formItemLayout}>
      <InputNumItem
        onChange={onChange}
        className="product-item"
        min={min}
        max={max}
        required={required}
        id={id}
        precision={precision}
        form={form}
        placeholder=" "
        step={step || 1}
        rules={[
          (rule, value, callback) => {
            if (!value) return callback()
            if (value < min) {
              return callback(new Error(`${label}不能小于${min}`))
            }
            if (value > max) {
              return callback(new Error(`${label}不能大于${max}`))
            }
            return callback()
          },
        ]}
        {...arg}
      />
      {unit && <div className={styles.unit}>{unit}</div>}
      {tip && <div className={styles.tip}>{tip}</div>}
    </Form.Item>
  )
}

export default Number
