/**
 * 通用的配置组件（ECS，堡垒机）
 */
import React from 'react'
import { Form } from 'antd'
import { RadioButtonItem, SelectItem, cascade } from '../../components'
import { PRODUCT_FIELDS } from '../_constant'
import { InstanceName } from '../index'

@cascade(
  [ PRODUCT_FIELDS.INSTANCE_TYPE_ID, PRODUCT_FIELDS.INSTANCE_SPEC_ID ],
  [ PRODUCT_FIELDS.INSTANCE_TYPE_ID ],
)
class ECSConfig extends React.PureComponent {
  render () {
    const { form, formItemLayout, cascadeList } = this.props
    return (
      <>
        <InstanceName form={form} instanceType="ECS" formItemLayout={formItemLayout} />
        <Form.Item required label="实例类型" {...formItemLayout}>
          <RadioButtonItem
            form={form}
            optionData={cascadeList[0]}
            id={[ PRODUCT_FIELDS.INSTANCE_TYPE_ID, PRODUCT_FIELDS.INSTANCE_TYPE ]}
          />
        </Form.Item>
        <Form.Item required label="实例规格" {...formItemLayout}>
          <SelectItem
            id={[ PRODUCT_FIELDS.INSTANCE_SPEC_ID, PRODUCT_FIELDS.INSTANCE_SPEC ]}
            placeholder="实例规格"
            form={form}
            optionData={cascadeList[1]}
          />
        </Form.Item>
      </>
    )
  }
}

export default ECSConfig
