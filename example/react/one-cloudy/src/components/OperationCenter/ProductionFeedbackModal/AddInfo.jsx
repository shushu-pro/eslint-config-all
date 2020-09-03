import React from 'react'
import { Form, Input, Icon, Row, Col } from 'antd'

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 18, offset: 4 },
  },
}
const colFormItemLayout = {
  labelCol: {
    span: 1,
  },
  wrapperCol: {
    span: 23,
  },
}
let id = 0
class AddInfo extends React.PureComponent {
  state = {};

  onRemove = (k) => {
    const { form } = this.props
    const keys = form.getFieldValue('keys')
    if (keys.length === 1) {
      return
    }
    form.setFieldsValue({
      keys: keys.filter((key) => key !== k),
    })
  };

  onAdd = () => {
    const { form } = this.props
    const keys = form.getFieldValue('keys')
    id += 1
    const nextKeys = keys.concat(id)
    form.setFieldsValue({
      keys: nextKeys,
    })
  };

  formItems = () => {
    const { form, formItemLayout } = this.props
    const keys = form.getFieldValue('keys')
    const formItems = keys.map((k, index) => (
      <Form.Item
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index === 0 ? '访问资源信息' : ''}
        // required
        key={k}
        style={{ marginBottom: 0 }}
      >
        <Row>
          <Col span={5}>
            <Form.Item {...colFormItemLayout} label="">
              {form.getFieldDecorator(`infoDetails[${k}].instanceId`, {
                rules: [
                  {
                    required: false,
                    message: '资源ID不能为空',
                  },
                  {
                    validator: (rule, value, callback) => {
                      const pattern = /^[a-zA-Z0-9]+$/
                      if (value && !pattern.test(value)) {
                        return callback(new Error('请输入字符和数字'))
                      }
                      return callback()
                    },
                  },
                ],
              })(<Input placeholder="请输入资源ID" />)}
            </Form.Item>
          </Col>

          <Col span={5} style={{ marginLeft: 8 }}>
            <Form.Item {...colFormItemLayout} label="">
              {form.getFieldDecorator(`infoDetails[${k}].ipAddress`, {
                rules: [
                  {
                    required: false,
                    message: '资源IP不能为空',
                  },
                  {
                    validator: (rule, value, callback) => {
                      const pattern = /(2[0-5]{2}|[0-1]?\d{1,2})(\.(2[0-5]{2}|[0-1]?\d{1,2})){3}/g
                      if (value && !pattern.test(value)) {
                        return callback(new Error('格式不正确'))
                      }
                      return callback()
                    },
                  },
                ],
              })(<Input placeholder="请输入资源IP" />)}
            </Form.Item>
          </Col>
          <Col span={5} style={{ marginLeft: 8 }}>
            <Form.Item {...colFormItemLayout} label="">
              {form.getFieldDecorator(`infoDetails[${k}].username`, {
                rules: [
                  {
                    required: false,
                    message: '用户名不能为空',
                  },
                ],
              })(<Input placeholder="请输入用户名" />)}
            </Form.Item>
          </Col>
          <Col span={5} style={{ marginLeft: 8 }}>
            <Form.Item {...colFormItemLayout} label="">
              {form.getFieldDecorator(`infoDetails[${k}].password`, {
                rules: [
                  {
                    required: false,
                    message: '密码不能为空',
                  },
                ],
              })(<Input placeholder="请输入密码" />)}
            </Form.Item>
          </Col>
          <Col span={1} style={{ marginLeft: 8 }}>
            {keys.length > 1 && k !== 0 ? (
              <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                onClick={() => this.onRemove(k)}
              />
            ) : null}
            {k === 0 && (
              <Icon className="dynamic-delete-button" type="plus-circle" onClick={this.onAdd} />
            )}
          </Col>
        </Row>
      </Form.Item>
    ))
    return formItems
  };

  render () {
    const { form } = this.props
    form.getFieldDecorator('keys', {
      initialValue: [ 0 ],
      rules: [
        {
          type: 'array',
          required: true,
          whitespace: true,
          message: '请输入访问资源信息',
        },
      ],
    })
    return <div>{this.formItems()}</div>
  }
}

export default AddInfo
