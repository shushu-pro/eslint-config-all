/**
 * 账单驳回 - 浮层
 */
import React from 'react'
import { Modal, Form, Input, Checkbox } from 'antd'
import { formItemLayout } from '../../../contants'
import styles from './index.less'

const { TextArea } = Input
@Form.create()
class RejectModal extends React.PureComponent {
  onOk = () => {
    const { form, onOk } = this.props
    form.validateFields((err, values) => {
      if (!err) {
        const params = {
          ...values,
          refuseType: values.refuseType.join(','),
        }
        onOk(params)
      }
    })
  };

  render () {
    const { form, visible, onCancel } = this.props
    const plainOptions = [
      { label: '资源规格与实际不符', value: '资源规格与实际不符' },
      { label: '开通时间与实际不符', value: '开通时间与实际不符' },
      { label: '价格存在疑问', value: '价格存在疑问' },
      { label: '其他', value: '其他' },
    ]
    return (
      <Modal
        title="驳回账单"
        visible={visible}
        onOk={this.onOk}
        onCancel={onCancel}
        className={styles.moadl}
        width={600}
      >
        <Form>
          <Form.Item {...formItemLayout} label="原因类别选择">
            {form.getFieldDecorator('refuseType', {
              rules: [
                {
                  required: true,
                  message: '请选择驳回原因类型',
                },
              ],
            })(
              <Checkbox.Group>
                {plainOptions.map((item) => (
                  <Checkbox key={item.value} value={item.value}>
                    {item.label}
                  </Checkbox>
                ))}
              </Checkbox.Group>,
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="具体问题描述">
            {form.getFieldDecorator('refuseInfo', {
              rules: [
                {
                  message: '请选择驳回原因类型',
                },
              ],
            })(
              <div>
                <TextArea rows={4} placeholder="请输入具体问题描述" />
                <div className={styles.extar}>
                  问题描述有助于更准确快速的帮您提供解决方案，请尽量详细
                </div>
              </div>,
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default RejectModal
