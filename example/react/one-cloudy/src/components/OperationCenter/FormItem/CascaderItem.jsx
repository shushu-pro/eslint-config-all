import React from 'react'
import PropTypes from 'prop-types'
import { Form, Cascader } from 'antd'

export default function CascaderItem ({
  form,
  id,
  label,
  options,
  initialValue,
  formItemLayout,
  required,
  placeholder,
  help,
  ...restProps
}) {
  // const displayRender = lab => lab[lab.length - 1];
  const { getFieldDecorator } = form
  const child = getFieldDecorator(id, {
    rules: [
      {
        type: 'array',
        required,
        message: `请选择${label}`,
      },
    ],
  })(
    <Cascader
      options={options}
      placeholder={placeholder || `请选择${label}`}
      // displayRender={displayRender}
      style={{ width: '100%' }}
    />,
  )
  return (
    <Form.Item {...formItemLayout} label={label} {...restProps}>
      {child}
    </Form.Item>
  )
}

CascaderItem.defaultProps = {
  required: true,
}
CascaderItem.propTypes = {
  required: PropTypes.bool,
}
