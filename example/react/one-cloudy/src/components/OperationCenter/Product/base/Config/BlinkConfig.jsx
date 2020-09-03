/**
 * blink产品配置组件
 */
import React from 'react'
import { Number } from '@/components/OperationCenter/Product/base'
import { PRODUCT_FIELDS } from '../_constant'

class BlinkConfig extends React.PureComponent {
  render () {
    const { form, formItemLayout } = this.props
    return (
      <Number
        id={PRODUCT_FIELDS.SLOTS_NUM}
        required
        label="SLOTS数量"
        form={form}
        formItemLayout={formItemLayout}
        tip="范围：1-5000"
        min={1}
        max={5000}
      />
    )
  }
}

export default BlinkConfig
