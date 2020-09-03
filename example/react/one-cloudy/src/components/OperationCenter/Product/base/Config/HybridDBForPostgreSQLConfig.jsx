/**
 * HybridDBForPostgreSQL配置组件
 */
import React from 'react'
import { Form } from 'antd'
import { SelectItem, RadioButtonItem, cascade } from '../../components'
import { PRODUCT_FIELDS } from '../_constant'

@cascade(
  [ PRODUCT_FIELDS.NODE_SPEC_ID, PRODUCT_FIELDS.NODE_QUANTITY_ID ],
)

class HybridDBForPostgreSQLConfig extends React.PureComponent {
  render () {
    const { form, formItemLayout, cascadeList, storageTypeList, engineSpecList } = this.props
    return (
      <>
        <Form.Item required label="引擎" {...formItemLayout}>
          <RadioButtonItem
            id={[ PRODUCT_FIELDS.ENGINE_ID, PRODUCT_FIELDS.ENGINE ]}
            form={form}
            optionData={engineSpecList}
          />
        </Form.Item>
        <Form.Item required label="存储类型" {...formItemLayout}>
          <RadioButtonItem
            id={[ PRODUCT_FIELDS.STORAGE_TYPE_ID, PRODUCT_FIELDS.STORAGE_TYPE ]}
            form={form}
            optionData={storageTypeList}
          />
        </Form.Item>
        <Form.Item required label="计算组规格" {...formItemLayout}>
          <SelectItem
            id={[ PRODUCT_FIELDS.NODE_SPEC_ID, PRODUCT_FIELDS.NODE_SPEC ]}
            placeholder="计算组规格"
            form={form}
            optionData={cascadeList[0]}
          />
        </Form.Item>
        <Form.Item required label="计算组节点" {...formItemLayout}>
          <SelectItem
            id={[ PRODUCT_FIELDS.NODE_QUANTITY_ID, PRODUCT_FIELDS.NODE_QUANTITY ]}
            placeholder="计算组节点"
            form={form}
            optionData={cascadeList[1]}
          />
        </Form.Item>
      </>
    )
  }
}

export default HybridDBForPostgreSQLConfig
