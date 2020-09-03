// 从数据库中的预设用户选择

import React, { PureComponent } from 'react'
import { Form, Select, Icon } from 'antd'
import { PRODUCT_FIELDS } from '@/components/OperationCenter/Product/base/_constant'
import { connect } from 'dva'

const { Option } = Select
const mapStateToProps = ({ user }) => ({
  userList: user.userList,
})
@connect(mapStateToProps)

class PresetPicker extends PureComponent {
  remove = () => {
    const {
      remove, form, dataKey,
    } = this.props
    remove()
    form.setFieldsValue({
      [dataKey]: [],
      [`${dataKey}Detail`]: [],
    })
  }

  change = (value) => {
    const {
      form, userList, dataKey,
    } = this.props

    /*
    form.validateFields([dataKey], (err) => {
      err.resourceKeys.errors[0].message = '';
    }); */


    const data = userList
      .filter((item) => value.find((val) => item.userId === val))
      .map((item) => ({
        userName: `${item.fullname}`,
        mobile: `${item.mobile}`,
        email: `${item.email}`,
      }))
    setTimeout(() => {
      form.setFieldsValue({
        [`${dataKey}Detail`]: data,
      })
    }, 80)
  };

  render () {
    const {
      form, formItemLayout, userList, initialValue, dataKey,
    } = this.props

    // 把具体的值存在这里
    const valueDom = form.getFieldDecorator(`${dataKey}Detail`, {
      initialValue: [],
    })(<input type="hidden" />)
    const decorator = form.getFieldDecorator(dataKey, {
      initialValue,
      rules: [
        {
          type: 'array',
          whitespace: true,
          message: '请填写资源使用人',
        },
      ],
    })
    return (
      <Form.Item {...formItemLayout}>
        { <Form.Item style={{ marginTop: -20 }}>{valueDom}</Form.Item>}
        {decorator(
          <Select
            showSearch
            style={{ width: '300px', marginLeft: 20 }}
            placeholder="请选择资源使用人"
            optionFilterProp="children"
            mode="multiple"
            onChange={this.change}
          >
            {userList.length > 0 && userList.map((item) => (
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

export default PresetPicker
