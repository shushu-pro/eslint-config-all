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
  ruleType,
  inputKey,
  onChange,
  inputProps,
  tips,
  inputWidth = 200,
  ...restProps
}) {
  const { getFieldDecorator } = form
  const currentInputProps = {
    ...inputProps,
  }
  if (inputWidth > 0) {
    currentInputProps.style = {
      ...currentInputProps.style,
      width: `${inputWidth}px`,
    }
  }

  const child = getFieldDecorator(id, {
    initialValue,
    rules: [
      {
        ruleType,
        pattern: pattern || false,
        required,
        message: placeholder || `请正确填写${label}`,
      },
      {
        validator,
      },
    ],
  })(
    <Input
      placeholder={placeholder || `请填写${label}`}
      maxlength={200}
      onChange={onChange}
      {...currentInputProps}

      style={{ width: inputWidth }}
    />,
  )
  return (
    <Form.Item {...formItemLayout} label={label} {...restProps}>
      {child}
      <span style={{ paddingLeft: '10px', color: '#999' }}>{tips}</span>
    </Form.Item>
  )
}

Item.defaultProps = {
  required: true,
  validator: null,
  ruleType: 'string',
}
Item.propTypes = {
  required: PropTypes.bool,
  validator: PropTypes.func,
  ruleType: PropTypes.string,
}
