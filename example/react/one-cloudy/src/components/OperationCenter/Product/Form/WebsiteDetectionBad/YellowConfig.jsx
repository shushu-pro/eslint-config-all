import React from 'react'
import { PRODUCT_FIELDS, FIELD_MAP } from '@/pages/OperationCenter/ResourceApply/constant'
import { Number } from '@/components/OperationCenter/Product/base'
import {
  Form,
} from 'antd'
import { INSTANCE_NAME_RULE } from '@/components/OperationCenter/Product/base/_constant'
import { InputItem } from '../../../FormItem'

const RULE_TYPE_ECS = INSTANCE_NAME_RULE.ECS
class YellowConfig extends React.Component {
  render () {
    const { form, formItemLayout } = this.props
    return (
      <>
        <Form.Item required label={FIELD_MAP[PRODUCT_FIELDS.INSTANCE_NAME]} {...formItemLayout}>
          <InputItem
            id={PRODUCT_FIELDS.INSTANCE_NAME}
            form={form}
            formItemLayout={formItemLayout}
            tips="2-114个字符，可包含汉字、字母、数字、下划线和横杠"
            validator={(rule, value, callback) => {
              if (value && !RULE_TYPE_ECS.rlue.test(value)) {
                return callback(new Error('格式不正确'))
              }
              return callback()
            }}
            placeholder={FIELD_MAP[PRODUCT_FIELDS.INSTANCE_NAME]}
            minLength={2}
            maxLength={114}
          />
        </Form.Item>
        <Form.Item required label={FIELD_MAP[PRODUCT_FIELDS.GREEN_CHECK_NUMBER]} {...formItemLayout}>
          <Number
            form={form}
            formItemLayout={formItemLayout}
            min={10}
            step={10}
            rules={[
              (rule, value, callback) => {
                if (value && value % 10 !== 0) {
                  return callback(new Error('数量应为10的整数倍'))
                }
                return callback()
              },
            ]}
            label=""
            id={PRODUCT_FIELDS.GREEN_CHECK_NUMBER}
            unit="万张（条）"
            tip="检查内容数包含url与图片总和，数量应为10的整数倍"
          />
        </Form.Item>
      </>
    )
  }
}
export default YellowConfig
