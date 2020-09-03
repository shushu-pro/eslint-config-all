/**
 * 交换机配置组件
 */
import React from 'react'
import { Icon, Form, Input } from 'antd'
import { InputItem, TextAreaItem } from '../../../FormItem'
import { PRODUCT_FIELDS, INSTANCE_NAME_RULE } from '../_constant'
import styles from '../../style.less'

let id = 0
class SwitchConfig extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      idList: [],
    }
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    const { form } = nextProps
    const keyList = form.getFieldValue('switchDetailKeyList') || []
    id = keyList.length ? keyList[keyList.length - 1] + 1 : 0
  }

  onAdd = () => {
    const { form } = this.props
    const keyList = form.getFieldValue('switchDetailKeyList') || []
    form.setFieldsValue({
      switchDetailKeyList: keyList.concat(id++),
    })
  };

  onMove = (key) => {
    const { form } = this.props
    const keyList = form.getFieldValue('switchDetailKeyList') || []
    keyList.splice(key, 1)
    form.setFieldsValue({
      switchDetailKeyList: keyList,
    })
  };

  render () {
    const { form, formItemLayout } = this.props
    const { idList } = this.state
    const keysList = form.getFieldValue('switchDetailKeyList') || idList
    const list = form.getFieldValue('switchDetailLists') || []
    const ruleType = INSTANCE_NAME_RULE.VPC
    return (
      <>
        <Form.Item>
          <a onClick={this.onAdd} style={{ paddingBottom: 10, lineHeight: '40px' }}>
            <div
              style={{
                display: ' inline-block',
                marginRight: '4px',
                color: '#f5222d',
                fontSize: '14px',
                fontFamily: 'SimSun, sans-serif',
              }}
            >
              *
            </div>
            <Icon type="plus-circle" style={{ paddingRight: 8 }} />
            添加一个交换机
          </a>
          {form.getFieldDecorator('switchDetailLists')}
          {form.getFieldDecorator('switchDetailKeyList', {
            initialValue: idList || [],
            rules: [
              {
                type: 'array',
                required: true,
                message: '交换机不能为空',
              },
            ],
          })(<Input type="hidden" />)}
        </Form.Item>
        {keysList.map((key, index) => {
          const data = list[key] || {}
          return (
            <div key={key} style={{ marginBottom: 10 }} className="clearfix">
              <div
                style={{
                  border: '1px solid #ccc',
                  padding: 10,
                  borderRadius: '4px',
                  float: 'left',
                  marginBottom: '20px',
                }}
              >
                <div style={{ marginBottom: 10 }}>
                  交换机
                  {key + 1}
                </div>
                <div style={{ paddingLeft: 10 }}>
                  <Form.Item required label="名称" {...formItemLayout}>
                    <InputItem
                      className="product-item"
                      id={`switchDetailList.${key}.${[ PRODUCT_FIELDS.SWITCH_NAME ]}`}
                      form={form}
                      placeholder="名称"
                      validator={(rule, value, callback) => {
                        if (!ruleType) return callback()
                        const pattern = ruleType.rlue
                        if (value && !pattern.test(value)) {
                          return callback(new Error('格式不正确'))
                        }
                        return callback()
                      }}
                      initialValue={data && data[PRODUCT_FIELDS.SWITCH_NAME]}
                    />
                    {ruleType && <span className={styles.tip}>{ruleType.text}</span>}
                  </Form.Item>
                  <Form.Item label="描述" required {...formItemLayout}>
                    <TextAreaItem
                      form={form}
                      id={`switchDetailList.${key}.${[ PRODUCT_FIELDS.SWITCH_DESC ]}`}
                      maxLength={256}
                      placeholder="描述"
                      initialValue={data && data[PRODUCT_FIELDS.SWITCH_DESC]}
                    />
                  </Form.Item>
                </div>
              </div>
              <div style={{ float: 'left' }}>
                <a
                  onClick={() => this.onMove(index)}
                  style={{ paddingBottom: 10, lineHeight: '40px' }}
                >
                  <Icon type="minus-circle" style={{ fontSize: '14px', marginLeft: 10 }} />
                </a>
              </div>
            </div>
          )
        })}
      </>
    )
  }
}

export default SwitchConfig
