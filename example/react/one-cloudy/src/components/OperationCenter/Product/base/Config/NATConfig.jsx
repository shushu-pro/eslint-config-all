/**
 * NAT配置组件
 */
import React from 'react'
import { Form } from 'antd'
import { SelectItem } from '../../components'
import { Number, InstanceName } from '../index'
import { PRODUCT_FIELDS } from '../_constant'

class NATConfig extends React.PureComponent {
  render () {
    const { form, formItemLayout, optionList } = this.props
    return (
      <>
        <InstanceName instanceType="RDS" form={form} formItemLayout={formItemLayout} />
        <Form.Item required label="规格" {...formItemLayout}>
          <SelectItem
            id={[ PRODUCT_FIELDS.INSTANCE_SPEC_ID, PRODUCT_FIELDS.INSTANCE_SPEC ]}
            placeholder=" "
            form={form}
            optionData={optionList}
          />
        </Form.Item>
        <Number
          id={PRODUCT_FIELDS.NETWORK_NUMBER}
          label="公网IP个数"
          form={form}
          max={50}
          formItemLayout={formItemLayout}
          tip="最大个数50"
        />
        <Number
          id={PRODUCT_FIELDS.BAND_WIDTH}
          label="带宽峰值"
          form={form}
          formItemLayout={formItemLayout}
          unit="Mbps"
          tip="范围：5-5000"
          min={5}
          max={5000}
        />
      </>
    )
  }
}

export default NATConfig
