/**
 * 请选择RDS只读实例组件
 */
import React from 'react'
import { Form } from 'antd'
import { InputItem } from '../../FormItem'
import { INSTANCE_NAME_RULE, PRODUCT_FIELDS, FIELD_MAP } from './_constant'

class RDSReadOnlyInstanceName extends React.PureComponent {
  render () {
    const {
      form,
      formItemLayout, label, productType = '', otherPlacehoder = '', instanceType, id, maxLength, disabled,
    } = this.props
    const ruleType = instanceType && INSTANCE_NAME_RULE[instanceType]
    const realLabel = label ||
     FIELD_MAP[productType + PRODUCT_FIELDS.INSTANCE_NAME] ||
     FIELD_MAP[PRODUCT_FIELDS.INSTANCE_NAME]
    return (
      <Form.Item
        required
        label={realLabel}
        {...formItemLayout}
      >
        <InputItem
          disabled={disabled}
          className="product-item-rdsReadOnly"
          id={id || PRODUCT_FIELDS.INSTANCE_NAME}
          form={form}
          validator={(rule, value, callback) => {
            if (!ruleType) return callback()
            const pattern = ruleType.rlue
            if (value && !pattern.test(value)) {
              return callback(new Error('格式不正确'))
            }
            return callback()
          }}
          otherPlacehoder={otherPlacehoder}
          placeholder={realLabel}
          // 实例名称校验中最长的长度为256，后端的实例名称默认最大长度是255，默认取最大的长度
          maxLength={maxLength || 255}
        />
        <div className="product-item-rdsReadOnly-tips">
          <span>1. 请手动输入需要建立只读实例的RDS实例IP或ID</span>
          <span>2. 目前仅支持数据库版本为MySQL和PgSQL10.0的RDS实例</span>
        </div>
      </Form.Item>
    )
  }
}

export default RDSReadOnlyInstanceName
