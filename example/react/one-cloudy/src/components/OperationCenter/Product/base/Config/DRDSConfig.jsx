/**
 * DRDS配置组件
 */
import React from 'react'
import { Form } from 'antd'
import { RadioButtonItem, SelectItem, cascade } from '../../components'
import { PRODUCT_FIELDS } from '../_constant'

@cascade(
  [ PRODUCT_FIELDS.INSTANCE_SERIES_ID, PRODUCT_FIELDS.INSTANCE_SPEC_ID ],
  [ PRODUCT_FIELDS.INSTANCE_SERIES_ID ],
)
class DRDSConfig extends React.PureComponent {
  UNSAFE_componentWillReceiveProps (nextProps) {
    const { form } = nextProps
    if (!form.getFieldValue(PRODUCT_FIELDS.INSTANCE_TYPE_ID)) {
      form.setFieldsValue({ [PRODUCT_FIELDS.INSTANCE_TYPE_ID]: '专享' })
    }
  }

  render () {
    const { form, formItemLayout, cascadeList } = this.props
    return (
      <>
        <Form.Item required label="实例类型" {...formItemLayout}>
          <RadioButtonItem
            form={form}
            optionData={[ { value: '专享', key: '专享' } ]}
            id={[ PRODUCT_FIELDS.INSTANCE_TYPE_ID, PRODUCT_FIELDS.INSTANCE_TYPE ]}
          />
        </Form.Item>
        <Form.Item required label="实例系列" {...formItemLayout}>
          <RadioButtonItem
            form={form}
            optionData={cascadeList[0]}
            id={[ PRODUCT_FIELDS.INSTANCE_SERIES_ID, PRODUCT_FIELDS.INSTANCE_SERIES ]}
          />
        </Form.Item>
        <Form.Item required label="实例规格" {...formItemLayout}>
          <SelectItem
            id={[ PRODUCT_FIELDS.INSTANCE_SPEC_ID, PRODUCT_FIELDS.INSTANCE_SPEC ]}
            placeholder="规格"
            form={form}
            optionData={cascadeList[1]}
          />
        </Form.Item>
      </>
    )
  }
}

export default DRDSConfig
