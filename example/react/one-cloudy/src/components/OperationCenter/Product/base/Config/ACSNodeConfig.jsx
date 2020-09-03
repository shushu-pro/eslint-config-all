/**
 * ACS 节点 配置组件
 */
import React from 'react'
import { Form } from 'antd'
import { SelectItem } from '../../components'
import { PRODUCT_FIELDS } from '../_constant'

class ACSConfig extends React.PureComponent {
  render () {
    const { form, formItemLayout, optionList } = this.props
    return (
      <>
        <Form.Item required label="节点Pod数量" {...formItemLayout}>
          <SelectItem
            id={[ PRODUCT_FIELDS.NODE_POD_NUM_ID, PRODUCT_FIELDS.NODE_POD_NUM ]}
            placeholder="数量"
            form={form}
            optionData={optionList}
            tip="建议选择128个Pod节点"
          />
        </Form.Item>
      </>
    )
  }
}

export default ACSConfig
