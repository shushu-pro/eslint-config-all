/**
 * 项目名称
 */
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { Form, Select } from 'antd'

const FormItem = Form.Item
const { Option } = Select
class ProjectContacts extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { form, formItemLayout, required, initialValue, optionData } = this.props
    let initValue = initialValue
    if (!Array.isArray(initialValue)) {
      initValue = initialValue.split(',')
    }
    initValue = initValue.map((item) => Number(item))
    const decorator = form.getFieldDecorator('contactUserIds', {
      initialValue: initValue,
      rules: [
        {
          required,
          type: 'array',
          whitespace: true,
          message: '请填写项目联系人',
        },
      ],
    })
    return (
      <FormItem key="formItem-contactUserIds" {...formItemLayout} label="项目联系人">
        {decorator(
          <Select
            showSearch
            style={{ minWidth: '200px' }}
            placeholder="请选择项目联系人"
            optionFilterProp="children"
            mode="multiple"
            dropdownClassName="formItem-contactUserIds"
          >
            {optionData.length > 0 &&
              optionData.map((item) => (
                <Option key={item.userId} value={item.userId}>
                  {item.deptName}
                  -
                  {item.fullname}
                </Option>
              ))}
          </Select>,
        )}
      </FormItem>
    )
  }
}

export default ProjectContacts
ProjectContacts.defaultProps = {
  required: true,
  optionData: [],
}
ProjectContacts.propTypes = {
  form: PropTypes.object.isRequired,
  formItemLayout: PropTypes.object.isRequired,
  required: PropTypes.bool,
  optionData: PropTypes.array,
}
