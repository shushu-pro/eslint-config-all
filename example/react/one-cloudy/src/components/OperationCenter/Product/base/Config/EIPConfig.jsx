/**
 * Mongodb配置组件
 */
import React from 'react'
import { Form } from 'antd'
import _ from 'lodash'
import { Number } from '../index'
import { InputItem } from '../../../FormItem'
import { PRODUCT_FIELDS } from '../_constant'

const FormItem = Form.Item
class EIPConfig extends React.PureComponent {
  UNSAFE_componentWillReceiveProps ({ form, optionList }) {
    const { optionList: oldOptionList } = this.props
    if (!_.isEqual(optionList, oldOptionList)) {
      form.setFieldsValue({ [PRODUCT_FIELDS.BAND_WIDTH]: optionList[0] ? optionList[0].value : undefined })
    }
  }

  render () {
    const { form, formItemLayout } = this.props
    return (
      <>
        <Number
          id={PRODUCT_FIELDS.BAND_WIDTH}
          label="带宽峰值"
          form={form}
          formItemLayout={formItemLayout}
          unit="Mbps"
          tip="范围：1-1000"
          min={1}
          max={1000}
        />
        <FormItem key="formItem-departmentId" {...formItemLayout} label="关联ECS">
          <InputItem
            id={PRODUCT_FIELDS.ECS_INSTANCE}
            placeholder="请输入ECS实例ID或实例名称"
            form={form}
            required={false}
          />
        </FormItem>
      </>
    )
  }
}

export default EIPConfig
