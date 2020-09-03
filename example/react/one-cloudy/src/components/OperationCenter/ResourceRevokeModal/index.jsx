/**
 * 审核流程中的资源撤销操作
 */
import React, { Component } from 'react'
import { Modal, Form, Checkbox, Input } from 'antd'
import styles from './index.less'

const { Group } = Checkbox
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
}
@Form.create()
class ResourceRevoke extends Component {
  constructor (props) {
    super(props)
    this.defaultFormData = {
      concelReason: '',
      otherReason: '',
      description: '',
    }
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    const { isShow } = this.props
    if (!nextProps.isShow && isShow) {
      this.formInit()
    }
  }

  formInit = () => {
    const { form } = this.props
    form.setFieldsValue(this.defaultFormData)
  };

  onOk = () => {
    const { form, onSubmit } = this.props
    form.validateFields((err, values) => {
      if (!err) {
        const { concelReason } = values
        const reason = concelReason.join(',')
        const params = {
          ...values,
          concelReason: reason,
        }
        onSubmit(params)
      }
    })
  };

  render () {
    const { form, isShow, onRest, optionList } = this.props
    const { getFieldDecorator } = form
    return (
      <Modal
        title="资源撤销"
        width={700}
        visible={isShow}
        onOk={this.onOk}
        onCancel={onRest}
        className={styles.resourceRevoke}
      >
        <p className={styles.tip}>资源撤销一般在审核通过后的7个工作日后完成</p>
        <Form className={styles.form}>
          <Form.Item {...formItemLayout} label="撤销原因：">
            {getFieldDecorator('concelReason', {
              rules: [
                {
                  required: true,
                  message: '请选择撤销原因',
                },
              ],
            })(
              <Group className={styles.group}>
                {optionList.map((item) => (
                  <Checkbox key={item} value={item}>
                    {item}
                  </Checkbox>
                ))}
              </Group>,
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="具体描述：">
            {getFieldDecorator('description', {})(<Input.TextArea maxLength={300} rows={4} />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default ResourceRevoke
