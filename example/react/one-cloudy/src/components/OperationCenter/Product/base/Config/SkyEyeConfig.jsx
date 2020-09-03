/**
 * 通用的配置组件（ECS，堡垒机）
 */
import React from 'react'
import { Form } from 'antd'
import { PRODUCT_FIELDS, FIELD_MAP } from '@/pages/OperationCenter/ResourceApply/constant'
import { RadioButtonItem, cascade } from '../../components'
import { IDENTIFIED_KEY, getData } from '../_constant'

@cascade([ PRODUCT_FIELDS.MONITOR_SPEC_ID ], [ PRODUCT_FIELDS.MONITOR_SPEC_ID ])
class SkyEyeConfig extends React.PureComponent {
  render () {
    const { form, formItemLayout, HELP_DOM, resourceData } = this.props
    return (
      <>
        <Form.Item required label={FIELD_MAP[PRODUCT_FIELDS.MONITOR_SPEC]} {...formItemLayout}>
          <RadioButtonItem
            form={form}
            newDom={HELP_DOM}
            id={[ PRODUCT_FIELDS.MONITOR_SPEC_ID, PRODUCT_FIELDS.MONITOR_SPEC ]}
            optionData={getData(resourceData, IDENTIFIED_KEY.MONITOR_SPEC)}
          />
        </Form.Item>
      </>
    )
  }
}

export default SkyEyeConfig
