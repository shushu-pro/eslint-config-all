import React from 'react'
import PropTypes from 'prop-types'
import {
  Form, InputNumber, Row, Col, Input,
} from 'antd'

export default function Item ({
  form,
  id,
  label,
  initialValue,
  formItemLayout,
  required,
  placeholder,
  help,
  validator,
  min,
  max,
  rules = [],
  className,
  onChange: propsOnChange,
  ...restProps
}) {
  const { getFieldDecorator, getFieldValue } = form
  const onChange = (value) => {
    form.setFieldsValue({
      [id]: value,
    })
    propsOnChange && propsOnChange(value)
  }
  const child = (
    <InputNumber
      style={{ minWidth: '200px' }}
      min={min}
      max={max}
      placeholder={placeholder || `请输入${min ? `范围${min}-${max}` : label}`}
      onChange={onChange}
      defaultValue={initialValue}
      value={getFieldValue(id) || initialValue}
      {...restProps}
    />
  )
  let itemDom = child
  if (help) {
    itemDom = (
      <Row gutter={24}>
        <Col span={18}>{child}</Col>
        <Col span={4}>{help}</Col>
      </Row>
    )
  }

  return (
    <Form.Item {...formItemLayout} label={label} className={className}>
      <div>
        {itemDom}
        {getFieldDecorator(id, {
          initialValue,
          rules: [
            {
              required,
              message: `请填写${placeholder || label}`,
            },
            ...rules,
          ],
        })(<Input type="hidden" />)}
      </div>
    </Form.Item>
  )
}

Item.defaultProps = {
  required: true,
  hashelp: null,
  validator: null,
}
Item.propTypes = {
  required: PropTypes.bool,
  hashelp: PropTypes.node,
  validator: PropTypes.func,
}
