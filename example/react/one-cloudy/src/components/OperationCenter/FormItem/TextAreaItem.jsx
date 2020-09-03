import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input } from 'antd'

const { TextArea } = Input
export default function Item ({
  form,
  id,
  label,
  initialValue,
  formItemLayout,
  required,
  placeholder,
  maxLength,
  validator,
  otherPlaceholder,
  ...restProps
}) {
  const { getFieldDecorator } = form
  return (
    <Form.Item {...formItemLayout} label={label} {...restProps}>
      {getFieldDecorator(id, {
        initialValue,
        rules: [ { required, message: `请填写${placeholder || label}` }, { validator } ],
      })(<TextArea maxLength={maxLength} rows={4} placeholder={otherPlaceholder || `请填写${placeholder || label}`} />)}
    </Form.Item>
  )
}

Item.defaultProps = {
  required: true,
  maxLength: 300,
  validator: null,
}
Item.propTypes = {
  required: PropTypes.bool,
  maxLength: PropTypes.number,
  validator: PropTypes.func,
}
