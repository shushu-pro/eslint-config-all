import React from 'react'
import { InputItem } from '@/components/OperationCenter/FormItem'
import StackPanel from '@/components/Common/StackPanel'
import {
  Form, Icon, Button,
} from 'antd'
import styles from './style.less'

let id = 0
class DynamicFieldSet extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      inputList: [],
    }
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    const { form, keyNameStr, inputFileds } = nextProps
    const strUrl = form.getFieldValue(keyNameStr)
    if (strUrl && strUrl.length) {
      const arr = strUrl.split(';') || []
      form.setFieldsValue({ [inputFileds.keyName]: arr })
      const nextKeys = Object.keys(Array.from({ length: arr.length }))
      id = arr.length
      this.setState({ inputList: nextKeys })
    }
  }

  remove = (uuid) => {
    this.setState((pre) => {
      const itemList = pre.inputList.filter((item) => item !== uuid)
      return { inputList: itemList }
    })
  };

  add = () => {
    const { inputList } = this.state
    const nextKeys = inputList.concat(id++)
    this.setState({ inputList: nextKeys })
  };


  renderInputKeys= (inputList) => {
    const { form, inputFileds } = this.props
    const {
      placeholder = '', pattern, keyName = 'keyName', required = true,
    } = inputFileds
    const arr = form.getFieldValue(keyName)
    return inputList && inputList.map((k, idx) => (
      <StackPanel
        key={idx}
        otherClass={styles.listStackPanel}
        style={{
          'flex-wrap': 'nowrap',
        }}
      >
        {/* {form.getFieldDecorator(`${keyName}[${k}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          initialValue: '',
          rules: [
            {
              required: { required },
              whitespace: true,
              validator: pattern,
              message: "Please input passenger's name or delete this field.",
            },
            {
              validator: (rule, value, callback) => {
                if (value && !pattern.test(value)) {
                  return callback(new Error('格式不正确'));
                }
                return callback();
              }
            }],
        })(<Input placeholder={placeholder} style={{ marginRight: 8 }} />)} */}
        <InputItem
          pattern={pattern}
          id={`${keyName}[${k}]`}
          initialValue={(arr && arr[k]) || ''}
          label=""
          placeholder={placeholder}
          form={form}
          required={required}
        />

        {inputList.length > 1 ? (
          <Button
            onClick={() => this.remove(k)}
            className="ant-row ant-form-item"
            style={{ color: '#1890ff' }}
            type="link"
            icon="minus-circle"
          />
        ) : null}
      </StackPanel>
    ))
  }

  render () {
    const {
      buttonName = '添加地址',
      buttonType = 'dashed',
      formItemLayout,
      buttonIcon = 'plus-circle',
    } = this.props
    const { inputList } = this.state
    return (
      <>
        <Form.Item label="防护地址" required {...formItemLayout}>
          {this.renderInputKeys(inputList)}
          <Button style={{ color: '#1890ff', borderColor: '#1890ff' }} type={buttonType} onClick={this.add}>
            <Icon type={buttonIcon} />
            {buttonName}
          </Button>
        </Form.Item>
      </>
    )
  }
}
export default DynamicFieldSet
