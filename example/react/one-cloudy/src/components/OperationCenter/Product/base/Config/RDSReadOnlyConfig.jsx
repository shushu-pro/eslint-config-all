/**
 * RDS只读实例配置组件
 */
import React from 'react'
import { RDSReadOnlyInstanceName } from '../index'
import { PRODUCT_FIELDS, FIELD_MAP } from '../_constant'

class RDSReadOnlyConfig extends React.PureComponent {
  render () {
    const { form, formItemLayout, productType } = this.props
    return (
      <>
        <RDSReadOnlyInstanceName
          productType={productType}
          instanceType="RDSReadOnly"
          otherPlacehoder="请填写"
          form={form}
          formItemLayout={formItemLayout}
          label={FIELD_MAP[PRODUCT_FIELDS.RDS_INSTANCE]}
          id={PRODUCT_FIELDS.RDS_INSTANCE}
        />
      </>
    )
  }
}

export default RDSReadOnlyConfig
