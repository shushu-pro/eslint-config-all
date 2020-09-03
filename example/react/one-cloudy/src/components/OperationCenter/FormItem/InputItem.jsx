import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input } from 'antd'

export default function Item ({
  form,
  id,
  label,
  initialValue,
  formItemLayout,
  required,
  placeholder,
  validator,
  pattern,
  type,
  inputType,
  otherPlacehoder,
  defaultValue,
  maxLength,
  tips,
  ...restProps
}) {
  const { getFieldDecorator } = form
  const child = getFieldDecorator(id, {
    initialValue,
    rules: [
      {
        type,
        pattern: pattern || false,
        required,
        message: `请正确填写${placeholder || label}`,
      },
      {
        validator,
      },
    ],
  })(
    <Input
      style={{ minWidth: '200px' }}
      placeholder={otherPlacehoder || `请填写${placeholder || label}`}
      maxLength={maxLength || 255}
      {...restProps}
      type={inputType}
      defaultValue={defaultValue}

    />,
  )
  return (
    <Form.Item {...formItemLayout} label={label} {...restProps}>
      {child}
      {tips && (<span style={{ color: '#999', marginLeft: '25px', fontSize: '12px' }}>{tips}</span>)}
    </Form.Item>
  )
}

Item.defaultProps = {
  required: true,
  validator: null,
  type: 'string',
}
Item.propTypes = {
  required: PropTypes.bool,
  validator: PropTypes.func,
  type: PropTypes.string,
}
