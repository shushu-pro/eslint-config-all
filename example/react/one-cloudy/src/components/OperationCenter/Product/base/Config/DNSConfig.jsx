/**
 * DNS配置组件
 */
import React from 'react'
import { InputPlus } from '../index'
import { PRODUCT_FIELDS, FIELD_MAP } from '../_constant'

class DNSConfig extends React.PureComponent {
  render () {
    const {
      form, formItemLayout, productType,
    } = this.props
    return (
      <>
        <InputPlus
          id={PRODUCT_FIELDS.LAN_DOMAIN_NAME}
          form={form}
          label={FIELD_MAP[PRODUCT_FIELDS.LAN_DOMAIN_NAME]}
          formItemLayout={formItemLayout}
          instanceType={productType}
        />
      </>
    )
  }
}

export default DNSConfig
