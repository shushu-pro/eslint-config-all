/**
 * DATAHUB配置组件
 */
import React from 'react'
import { PRODUCT_FIELDS } from '../_constant'
import { InstanceName, Number } from '../index'

class DATAHUBConfig extends React.PureComponent {
  render () {
    const { form, formItemLayout, productType } = this.props
    return (
      <>
        <InstanceName
          form={form}
          formItemLayout={formItemLayout}
          productType={productType}
          instanceType="DATAHUB"
        />
        <InstanceName
          label="项目描述"
          id={PRODUCT_FIELDS.NAME_DESC}
          form={form}
          formItemLayout={formItemLayout}
        />
        <Number
          label="Shard数量"
          id={PRODUCT_FIELDS.SHARD_NUM}
          form={form}
          formItemLayout={formItemLayout}
        />
        <Number
          label="Topic数量"
          id={PRODUCT_FIELDS.TOPIC_NUM}
          form={form}
          formItemLayout={formItemLayout}
        />
      </>
    )
  }
}

export default DATAHUBConfig
