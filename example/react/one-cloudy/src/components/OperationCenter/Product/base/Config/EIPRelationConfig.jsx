/**
 * 通用的配置组件（ECS，堡垒机）
 */
import React from 'react'
import { Form, Switch } from 'antd'
import { Number } from '../index'
import { subscribeFormChange, unSubscribeFormChange } from '../../index'
import { PRODUCT_FIELDS } from '../_constant'

class EIPRelationConfig extends React.PureComponent {
  constructor () {
    super()
    this.state = {}
  }

  componentDidMount () {
    subscribeFormChange(this.onFormChange)
  }

  componentWillUnmount () {
    unSubscribeFormChange(this.onFormChange)
  }

  onFormChange = (changedValues, changeField) => {
    const { form } = this.props
    if (changeField === PRODUCT_FIELDS.EIP_FLAG) {
      if (typeof changedValues[PRODUCT_FIELDS.EIP_FLAG] === 'undefined') {
        form.setFieldsValue({ [PRODUCT_FIELDS.EIP_FLAG]: false })
      }
      if (changedValues[PRODUCT_FIELDS.EIP_FLAG] === false) {
        form.setFieldsValue({ [PRODUCT_FIELDS.EIP_BAND_WIDTH]: '' })
      }
    }
  }

  render () {
    const { form, formItemLayout } = this.props
    const eipState = form.getFieldValue(PRODUCT_FIELDS.EIP_FLAG)
    return (
      <>
        <Form.Item label="是否开通EIP" {...formItemLayout} extra="如需提供外网访问，需要开通eip服务">
          {form.getFieldDecorator(PRODUCT_FIELDS.EIP_FLAG, { valuePropName: 'checked' })(<Switch size="small" />)}
        </Form.Item>
        {eipState
          ? (
            <Number
              id={PRODUCT_FIELDS.EIP_BAND_WIDTH}
              required
              label="带宽峰值"
              form={form}
              formItemLayout={formItemLayout}
              unit="Mbps"
              tip="范围：1-1000"
              min={1}
              max={1000}
            />
          ) : null}
      </>
    )
  }
}

export default EIPRelationConfig
