/**
 * 动态增减input组件
 */
import React from 'react'
import {
  Form, Input, Icon, Button,
} from 'antd'
import { INSTANCE_NAME_RULE } from './_constant'

let id = 0
class InputPlus extends React.Component {
  getInputKeys = () => {
    const { form } = this.props
    return form.getFieldValue('inputKeys') || []
  };


  // 移除一项
  remove = (k) => {
    const { form } = this.props
    const inputKeys = this.getInputKeys()
    if (inputKeys && inputKeys.length === 1) {
      return
    }
    form.setFieldsValue({
      inputKeys: inputKeys.filter((key) => key !== k),
    })
  };

  // 添加一个input
  add = () => {
    const { form } = this.props
    const inputKeys = this.getInputKeys()
    const nextKeys = inputKeys && inputKeys.concat(id++)
    form.setFieldsValue({
      inputKeys: nextKeys,
    })
  };

  render () {
    const {
      id, formItemLayout, form, label, instanceType, btnContent,
    } = this.props
    const { getFieldDecorator, getFieldValue } = form
    getFieldDecorator('inputKeys', { initialValue: [] })
    const inputKeys = this.getInputKeys()
    const inputValue = getFieldValue(id) || []
    const ruleType = INSTANCE_NAME_RULE[instanceType]
    const keyDom = getFieldDecorator('inputKeys', {
      initialValue: inputKeys,
      rules: [
        (rule, value, callback) => {
          if ((value && value.length > 0) || inputValue.length > 0) {
            return callback()
          }
          return callback(new Error('请至少添加一个内网域名'))
        },
      ],
    })(<input type="hidden" />)
    const formItems = inputKeys && inputKeys.map((k, index) => (
      <Form.Item key={k}>
        {getFieldDecorator(`${id}[${k}]`, {
          validateTrigger: [ 'onChange' ],
          initialValue: inputValue[k],
          rules: [
            {
              required: true,
              whitespace: true,
              message: `请输入${label}`,
            },
            {
              validator: (rule, value, callback) => {
                if (!ruleType) return callback()
                const pattern = ruleType.rlue
                if (value && !pattern.test(value)) {
                  return callback(new Error(`请输入正确的${label}格式(字母小写，结尾以“.”结尾)`))
                }
                return callback()
              },
            },
          ],
        })(
          <Input
            placeholder={`请输入${label}`}
            style={{ minWidth: '200px', marginRight: '15px' }}
            maxLength={255}
          />,
        )}
        {inputKeys.length > 1 ? (
          <Icon
            type="minus-circle-o"
            onClick={() => this.remove(k)}
            style={{ color: '#1890ff' }}
          />
        ) : null}
      </Form.Item>
    ))
    return (
      <Form.Item required label={label} {...formItemLayout}>
        {formItems}
        <Button type="dashed" onClick={this.add} style={{ color: '#1890ff' }}>
          <Icon type="plus" />
          {' '}
          添加
          {btnContent || '域名'}
        </Button>
        <Form.Item>{keyDom}</Form.Item>
      </Form.Item>
    )
  }
}

export default InputPlus
