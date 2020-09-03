/**
 * 新增项目名称 - 浮层
 */
import React from 'react'
import { connect } from 'dva'
import { Modal, Form } from 'antd'
import { baseFormItemLayout } from '@/contants'
import Project from '@/pages/AuthorityCenter/ProjectManage/Project'

@connect(({ user }) => ({
  deptName: user.userInfo.deptName,
  deptId: user.userInfo.deptId,
}))
@Form.create()
class AddNameModal extends React.PureComponent {
  onOk = () => {
    const { form, onOk } = this.props
    form.validateFields((err, values) => {
      if (!err) {
        onOk(values)
      }
    })
  };

  onCancel = () => {
    const { form, onCancel } = this.props
    form.validateFields((err, values) => {
      onCancel(values)
    })
  };

  resetFields = () => {
    const { form } = this.props
    form.resetFields()
  }

  render () {
    const {
      form, visible, initValue, title, deptId, isEdit,
    } = this.props
    const formProps = {
      form,
      formItemLayout: baseFormItemLayout,
    }
    return (
      <Modal
        maskClosable={false}
        width="60%"
        title={title}
        visible={visible}
        onCancel={this.onCancel}
        onOk={this.onOk}
      >
        <Project {...formProps} isEdit={isEdit} initValue={initValue} deptId={deptId} />
      </Modal>
    )
  }
}

export default AddNameModal
