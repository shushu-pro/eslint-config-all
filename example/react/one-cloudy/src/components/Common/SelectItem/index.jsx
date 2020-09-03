import React from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Select,
  Row,
  Col,
  Button,
  Tooltip,
} from 'antd'

const { Option } = Select
export default function SelectItem ({
  form,
  id,
  label,
  initialValue,
  formItemLayout,
  required,
  placeholder,
  optionData,
  addText,
  onCreate,
  className,
  ...restProps
}) {
  let selectDom = (
    <Select
      allowClear
      showSearch
      style={{ minWidth: '200px' }}
      placeholder={`请选择${restProps.dropdownRender ? '或者填写' : ''}${placeholder ||
        label ||
        ''}`}
      optionFilterProp="children"
      filterOption={(input, option) => {
        if (option.props.children.props && option.props.children.props.title) {
          return option.props.children.props.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }}
      getPopupContainer={(triggerNode) => triggerNode.parentElement}
      {...restProps}
    >
      {optionData.length > 0 &&
        optionData.map((item) => (
          <Option key={item.key} value={item.key}>
            {item.value.length > 8 ? (
              <Tooltip placement="topLeft" title={item.value}>
                <div>{item.value}</div>
              </Tooltip>
            ) : item.value}
          </Option>
        ))}
    </Select>
  )
  if (form) {
    const { getFieldDecorator } = form
    selectDom = getFieldDecorator(id, {
      initialValue,
      rules: [
        {
          required,
          message: `请选择${restProps.dropdownRender ? '或者填写' : ''}${placeholder || label || ''}`,
        },
      ],
    })(selectDom)
  }

  return (
    <Form.Item {...formItemLayout} label={label} className={className}>
      <Row gutter={24}>
        <Col span={addText ? 18 : 24}>{selectDom}</Col>
        {addText && (
          <Col span={6}>
            <Button type="primary" onClick={onCreate}>
              {addText}
            </Button>
          </Col>
        )}
      </Row>
    </Form.Item>
  )
}

SelectItem.defaultProps = {
  required: true,
  addText: '',
  onCreate: () => { },
  optionData: [],
}
SelectItem.propTypes = {
  required: PropTypes.bool,
  addText: PropTypes.oneOfType([ PropTypes.node, PropTypes.string ]),
  onCreate: PropTypes.func,
  optionData: PropTypes.array,
}
