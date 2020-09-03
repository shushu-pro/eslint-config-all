/**
 * 中标价格
 */
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { Form, InputNumber } from 'antd'

const FormItem = Form.Item
class BidPrice extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { form, formItemLayout, required, initialValue } = this.props
    const decorator = form.getFieldDecorator('bidPrice', {
      initialValue,
      rules: [
        {
          required,
          type: 'number',
          whitespace: true,
          message: '请填写中标价格',
        },
      ],
    })
    return (
      <FormItem key="formItem-bidPrice" {...formItemLayout} label="中标价格">
        {decorator(<InputNumber style={{ width: '200px' }} placeholder="请输入中标价格" />)}
      </FormItem>
    )
  }
}

export default BidPrice
BidPrice.defaultProps = {
  required: true,
}
BidPrice.propTypes = {
  form: PropTypes.object.isRequired,
  formItemLayout: PropTypes.object.isRequired,
  required: PropTypes.bool,
}
