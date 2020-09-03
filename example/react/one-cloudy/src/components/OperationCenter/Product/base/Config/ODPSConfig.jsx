/**
 * MaxCompute(ODPS)配置组件
 */
import React from 'react'
import { PRODUCT_FIELDS } from '../_constant'
import { Number } from '../index'

class ODPSConfig extends React.PureComponent {
  render () {
    const { form, formItemLayout } = this.props
    return (
      <>
        <Number
          label="CU个数"
          form={form}
          formItemLayout={formItemLayout}
          id={PRODUCT_FIELDS.CU_COUNT}
          min={20}
          unit="CU"
          tip="CU个数至少为20"
        />
        <Number
          label="存储空间"
          form={form}
          formItemLayout={formItemLayout}
          id={PRODUCT_FIELDS.ODPS_CAPACITY}
          min={1024}
          unit="GB"
          tip="存储空间至少为1024GB"
        />
      </>
    )
  }
}

export default ODPSConfig
