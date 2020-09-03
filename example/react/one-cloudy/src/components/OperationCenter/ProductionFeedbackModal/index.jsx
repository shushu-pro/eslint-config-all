/**
 * 工单操作（包含：审核、驳回等） - 浮层
 */
import React from 'react'
import { Modal, Form, Input, Row, Col } from 'antd'
import { InputNumItem } from '../FormItem'
import UploadItem from '../Upload'
import AddInfo from './AddInfo'

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 18,
  },
}
const colFormItemLayout = {
  labelCol: {
    span: 1,
  },
  wrapperCol: {
    span: 22,
  },
}
@Form.create()
class ActionModal extends React.PureComponent {
  onOk = () => {
    const { form, onSubmitData } = this.props
    form.validateFields((err, values) => {
      if (!err) {
        onSubmitData(values)
      }
    })
  };

  render () {
    const { form, visible, onCancel, max } = this.props
    const formProps = {
      form,
      formItemLayout,
    }
    return (
      <Modal width={800} title="生产反馈" visible={visible} onOk={this.onOk} onCancel={onCancel}>
        <Form>
          <InputNumItem
            type="number"
            id="succeedQuantity"
            label="完成生产数量"
            {...formProps}
            max={max}
            min={1}
          />
          <AddInfo {...formProps} />
          <Form.Item {...formItemLayout} label="问题联系人" required>
            <Row>
              <Col span={12}>
                <Form.Item {...colFormItemLayout} label="">
                  {form.getFieldDecorator('contactUser', {
                    rules: [
                      {
                        required: true,
                        message: '姓名不能为空',
                      },
                    ],
                  })(<Input placeholder="请填写姓名" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item {...colFormItemLayout} label="">
                  {form.getFieldDecorator('contactPhone', {
                    rules: [
                      {
                        required: true,
                        message: '联系电话不能为空',
                      },
                      {
                        validator: (rule, value, callback) => {
                          const pattern = /^1(3|4|5|6|7|8|9)\d{9}$/
                          if (value && !pattern.test(value)) {
                            return callback(new Error('格式不正确'))
                          }
                          return callback()
                        },
                      },
                    ],
                  })(<Input placeholder="请填写联系电话" maxLength={11} />)}
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
          <UploadItem id="attachList" label="附件" maxLen={1} {...formProps} />
        </Form>
      </Modal>
    )
  }
}

export default ActionModal
