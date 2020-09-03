/**
 * ContentSecurity 内容安全服务（互联网安全服务）配置组件
 */
import React from 'react'
import { Form } from 'antd'
import { PRODUCT_FIELDS } from '../_constant'
import { SelectItem } from '../../components'
import { InstanceName, Number } from '../index'

class ContentSecurityConfig extends React.PureComponent {
  render () {
    const {
      form, formItemLayout, productType, optionList,
    } = this.props
    return (
      <>
        <InstanceName
          form={form}
          formItemLayout={formItemLayout}
          productType={productType}
          instanceType="CONTENTSECURITY"
        />
        <Form.Item required label="检测内容数" {...formItemLayout}>
          <SelectItem
            id={[ PRODUCT_FIELDS.CHECK_CONTENT_QUANTITY_ID, PRODUCT_FIELDS.CHECK_CONTENT_QUANTITY ]}
            form={form}
            optionData={optionList}
          />
        </Form.Item>
        <Number
          label="检测扩展包1"
          id={PRODUCT_FIELDS.CHECK_EXTEND_PACK_ONE}
          form={form}
          formItemLayout={formItemLayout}
          unit="万张（条）"
          tip="数值应为50的整数倍"
          min={50}
          step={50}
          required={false}
          rules={[
            (rule, value, callback) => {
              if (value && (value % 50 !== 0)) {
                return callback(new Error('数值必须为50的整数倍'))
              }
              return callback()
            },
          ]}
        />
        <Number
          label="检测扩展包2"
          id={PRODUCT_FIELDS.CHECK_EXTEND_PACK_TWO}
          form={form}
          formItemLayout={formItemLayout}
          unit="万张（条）"
          tip="数值应为300的整数倍"
          min={300}
          step={300}
          required={false}
          rules={[
            (rule, value, callback) => {
              if (value && (value % 300 !== 0)) {
                return callback(new Error('数值必须为300的整数倍'))
              }
              return callback()
            },
          ]}
        />
      </>
    )
  }
}

export default ContentSecurityConfig
