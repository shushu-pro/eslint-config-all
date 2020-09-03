import React from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Checkbox } from 'antd'

export default function Item ({
  form,
  id,
  label,
  initialValue,
  formItemLayout,
  required,
  placeholder,
  optionData,
  help,
  className,
  style,
  ...restProps
}) {
  const { getFieldDecorator } = form
  const selectDom = <Checkbox.Group options={optionData} />
  const children = getFieldDecorator(id, {
    initialValue,
    rules: [
      {
        type: 'array',
        required,
        message: `请选择${restProps.dropdownRender ? '或者填写' : ''}${placeholder || label || ''}`,
      },
    ],
  })(selectDom)
  return (
    <Form.Item
      {...formItemLayout}
      label={label}
      className={className}
      style={{ ...style, width: 'auto' }}
    >
      {help ? (
        <Row gutter={24}>
          <Col span={18}>{children}</Col>
          <Col span={4}>{help}</Col>
        </Row>
      ) : (
        children
      )}
    </Form.Item>
  )
}

Item.defaultProps = {
  required: true,
  optionData: [],
}
Item.propTypes = {
  required: PropTypes.bool,
  optionData: PropTypes.array,
}
