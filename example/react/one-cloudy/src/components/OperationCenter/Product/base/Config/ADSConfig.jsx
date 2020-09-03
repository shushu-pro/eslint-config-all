/**
 * ADS配置组件
 */
import React from 'react'
import { Form } from 'antd'
import { SelectItem } from '../../components'
import { PRODUCT_FIELDS } from '../_constant'
import { Number, InstanceName } from '../index'

class ADSConfig extends React.PureComponent {
  UNSAFE_componentWillReceiveProps (nextProps) {
    const { form } = nextProps
    if (!form.getFieldValue(PRODUCT_FIELDS.NETWORK_TYPE_NAME)) {
      form.setFieldsValue({ [PRODUCT_FIELDS.NETWORK_TYPE_NAME]: '经典网络' })
    }
    if (form.getFieldValue(PRODUCT_FIELDS.ECU_COUNT) === undefined) {
      form.setFieldsValue({
        [PRODUCT_FIELDS.ECU_COUNT]: 1,
      })
    }
  }

  render () {
    const {
      form, formItemLayout, productType, optionList,
    } = this.props
    return (
      <>
        <InstanceName form={form} formItemLayout={formItemLayout} productType={productType} />
        {/* <Form.Item required label="网络类型" {...formItemLayout}>
          <RadioButtonItem
            form={form}
            optionData={networkTypeList.slice(1)}
            id={PRODUCT_FIELDS.NETWORK_TYPE_NAME}
          />
        </Form.Item> */}
        <Form.Item required label="ECU型号" {...formItemLayout}>
          <SelectItem
            id={[ PRODUCT_FIELDS.ECU_TYPE_ID, PRODUCT_FIELDS.ECU_TYPE ]}
            placeholder="规格"
            form={form}
            optionData={optionList}
          />
        </Form.Item>
        <div style={{ display: 'none' }}>
          <Number
            label="ECU初始数量"
            id={PRODUCT_FIELDS.ECU_COUNT}
            form={form}
            formItemLayout={formItemLayout}
          />
        </div>
      </>
    )
  }
}

export default ADSConfig
