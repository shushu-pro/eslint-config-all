import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Form, DatePicker } from 'antd'

export default function DatePickerItem ({
  form,
  id,
  label,
  initialValue,
  formItemLayout,
  required,
  placeholder,
  validator,
  pattern,
  ...restProps
}) {
  const { getFieldDecorator } = form
  const child = getFieldDecorator(id, {
    initialValue: initialValue && moment(initialValue, 'YYYY-MM-DD'),
    rules: [ { type: 'object', required, message: '请选择时间' } ],
  })(
    <DatePicker
      format="YYYY-MM-DD"
      {...restProps}
    />,
  )
  return (
    <Form.Item {...formItemLayout} label={label} {...restProps}>
      {child}
    </Form.Item>
  )
}

DatePickerItem.defaultProps = {
  required: true,
  validator: null,
}
DatePickerItem.propTypes = {
  required: PropTypes.bool,
  validator: PropTypes.func,
}
