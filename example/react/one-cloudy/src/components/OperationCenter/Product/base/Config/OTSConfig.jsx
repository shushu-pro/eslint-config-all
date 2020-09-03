/**
 * OTS配置组件
 */
import React from 'react'
import { Form } from 'antd'
import { InstanceName } from '../index'
import { SelectItem } from '../../components'
import { PRODUCT_FIELDS } from '../_constant'

class OTSConfig extends React.PureComponent {
  render () {
    const { form, formItemLayout, productType, optionList } = this.props
    return (
      <>
        <InstanceName
          productType={productType}
          instanceType="SLS"
          form={form}
          formItemLayout={formItemLayout}
        />
        <Form.Item required label="实例规格" {...formItemLayout}>
          <SelectItem
            id={[ PRODUCT_FIELDS.INSTANCE_TYPE_ID, PRODUCT_FIELDS.INSTANCE_TYPE ]}
            placeholder="实例规格"
            form={form}
            optionData={optionList}
          />
        </Form.Item>
      </>
    )
  }
}

export default OTSConfig
