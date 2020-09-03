/**
 * 中标公司
 */
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { Form, Input } from 'antd'

const FormItem = Form.Item
class BdCompany extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { form, formItemLayout, required, initialValue } = this.props
    const decorator = form.getFieldDecorator('bidCompany', {
      initialValue,
      rules: [
        {
          required,
          whitespace: true,
          message: '请填写中标公司',
        },
      ],
    })
    return (
      <FormItem key="formItem-bidCompany" {...formItemLayout} label="中标公司">
        {decorator(<Input placeholder="请填写中标公司" />)}
      </FormItem>
    )
  }
}

export default BdCompany
BdCompany.defaultProps = {
  required: true,
}
BdCompany.propTypes = {
  form: PropTypes.object.isRequired,
  formItemLayout: PropTypes.object.isRequired,
  required: PropTypes.bool,
}
