/**
 * 用户列表选择
 */
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { Form, Select, Icon } from 'antd'
import { PRODUCT_FIELDS } from '@/components/OperationCenter/Product/base/_constant'

const { Option } = Select
class AddUserList extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {}
  }

  posChange = (value) => {
    const { form, optionData } = this.props
    form.validateFields([ PRODUCT_FIELDS.RESOURCE_KEYS ], (err) => {
      err.resourceKeys.errors[0].message = ''
    })
    const data = optionData
      .filter((item) => value.find((val) => item.userId === val))
      .map((item) => ({
        userName: `${item.fullname}`,
        mobile: `${item.mobile}`,
        email: `${item.email}`,
      }))
    form.setFieldsValue({
      [PRODUCT_FIELDS.RESOURCE_USER_INFOS]: data,
    })
  };

  remove = () => {
    const { remove, form } = this.props
    remove()
    form.setFieldsValue({
      [PRODUCT_FIELDS.RESOURCE_USER_INFOS]: [],
      [PRODUCT_FIELDS.RESOURCE_USER_IDS]: [],
    })
  };

  render () {
    const {
      form, formItemLayout, optionData, initialValue,
    } = this.props
    const initValue = initialValue
    const valueDom = form.getFieldDecorator(PRODUCT_FIELDS.RESOURCE_USER_INFOS, {
      initialValue: '',
    })(<input type="hidden" />)
    const decorator = form.getFieldDecorator(PRODUCT_FIELDS.RESOURCE_USER_IDS, {
      initialValue: initValue,
      rules: [
        {
          type: 'array',
          whitespace: true,
          message: '请填写资源使用人',
        },
      ],
    })
    return (
      <Form.Item key="formItem-resourceUserIds" {...formItemLayout}>
        <Form.Item style={{ marginTop: -20 }}>{valueDom}</Form.Item>
        {decorator(
          <Select
            showSearch
            style={{ width: '240px' }}
            placeholder="请选择资源使用人"
            optionFilterProp="children"
            mode="multiple"
            onChange={this.posChange}
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
        <Icon
          type="close-circle"
          theme="filled"
          style={{ color: '#1890ff', marginLeft: 20 }}
          onClick={this.remove}
        />
      </Form.Item>
    )
  }
}
export default AddUserList
AddUserList.defaultProps = {
  required: true,
  optionData: [],
}
AddUserList.propTypes = {
  form: PropTypes.object.isRequired,
  required: PropTypes.bool,
  optionData: PropTypes.array,
}
