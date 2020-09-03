/**
 * ACS master 配置组件
 */
import React from 'react'
import { Form } from 'antd'
import { SelectItem } from '../../components'
import { PRODUCT_FIELDS } from '../_constant'
import SystemDisk from '../SystemDisk'
import { Number } from '../index'

class ACSConfig extends React.PureComponent {
  UNSAFE_componentWillReceiveProps (nextProps) {
    const { form } = nextProps
    if (!form.getFieldValue(PRODUCT_FIELDS.MASTER_INSTANCE_NUM)) {
      form.setFieldsValue({
        [PRODUCT_FIELDS.MASTER_INSTANCE_NUM]: 3,
      })
    }
  }

  render () {
    const { form, formItemLayout, optionList, diskTypeList } = this.props
    return (
      <>
        <Form.Item required label="实例规格" {...formItemLayout}>
          <SelectItem
            id={[ PRODUCT_FIELDS.MASTER_INSTANCE_TYPE_ID, PRODUCT_FIELDS.MASTER_INSTANCE_TYPE ]}
            placeholder="规格"
            form={form}
            optionData={optionList}
          />
        </Form.Item>
        <Number
          label="实例个数"
          id={PRODUCT_FIELDS.MASTER_INSTANCE_NUM}
          form={form}
          formItemLayout={formItemLayout}
          disabled
        />
        <Form.Item required label="系统盘" {...formItemLayout}>
          <SystemDisk
            form={form}
            formItemLayout={formItemLayout}
            diskTypeList={diskTypeList}
            idData={{
              diskTypeId: PRODUCT_FIELDS.SYS_MASTER_TYPE_ID,
              diskType: PRODUCT_FIELDS.SYS_MASTER_TYPE,
              diskStorage: PRODUCT_FIELDS.SYS_MASTER_STORAGE,
            }}
          />
        </Form.Item>
      </>
    )
  }
}

export default ACSConfig
