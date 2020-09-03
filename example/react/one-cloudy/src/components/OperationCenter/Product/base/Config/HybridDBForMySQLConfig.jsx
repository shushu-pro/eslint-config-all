/**
 * HybridDBForMySQL配置组件
 */
import React from 'react'
import { Form } from 'antd'
import { InstanceName, Number } from '../index'
import { SelectItem } from '../../components'
import { PRODUCT_FIELDS } from '../_constant'

class HybridDBForMySQLConfig extends React.PureComponent {
  render () {
    const { form, formItemLayout, productType, nodeQuantityList } = this.props
    return (
      <>
        <InstanceName productType={productType} form={form} formItemLayout={formItemLayout} />
        <InstanceName
          label="数据库名称"
          form={form}
          formItemLayout={formItemLayout}
          id={PRODUCT_FIELDS.DB_NAME}
          instanceType="HybridDBForMySQLName"
        />
        <InstanceName
          label="数据库账户名"
          form={form}
          formItemLayout={formItemLayout}
          id={PRODUCT_FIELDS.DB_COUNT_NAME}
          instanceType="HybridDBForMySQLAccount"
        />
        <Form.Item required label="节点规格" {...formItemLayout}>
          <SelectItem
            id={[ PRODUCT_FIELDS.NODE_SPEC_ID, PRODUCT_FIELDS.NODE_SPEC ]}
            placeholder="节点规格"
            form={form}
            optionData={nodeQuantityList}
          />
        </Form.Item>
        <Number
          label="节点个数"
          id={PRODUCT_FIELDS.NODE_QUANTITY}
          form={form}
          formItemLayout={formItemLayout}
          max={100}
          min={2}
        />
      </>
    )
  }
}

export default HybridDBForMySQLConfig
