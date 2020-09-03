import React from 'react'
import { message } from 'antd'
import Modals from '@/components/Common/Modals'
import TextAreaItem from '@/components/OperationCenter/FormItem/TextAreaItem'
import { validate } from '@/utils/formx'
import {
  ACTION_STATUS,
  ACTION_STATUS_TYPE,
  formItemLayout,
} from '@/pages/OperationCenter/OperationOrder/contant'

// 同样的操作列表
const sameActionList = [
  ACTION_STATUS.REVOKE_PASS,
  ACTION_STATUS.REVOKE_REJECT,
  ACTION_STATUS.TL_REVIEW_PASS,
  ACTION_STATUS.TL_REVIEW_REJECT,
  ACTION_STATUS.REVIEW_PASS,
  ACTION_STATUS.REVIEW_REJECT,
  ACTION_STATUS.APPROVAL_PASS,
  ACTION_STATUS.APPROVAL_REJECT,
  ACTION_STATUS.ZF_APPROVE_PASS,
  ACTION_STATUS.ZF_APPROVE_REJECT,
  ACTION_STATUS.SAFETY_APPROVAL_PASS,
  ACTION_STATUS.SAFETY_APPROVAL_REJECT,
  ACTION_STATUS.BIGDATA1_APPROVAL_PASS,
  ACTION_STATUS.BIGDATA1_APPROVAL_REJECT,
  ACTION_STATUS.BIGDATA_APPROVAL_PASS,
  ACTION_STATUS.BIGDATA_APPROVAL_REJECT,
  ACTION_STATUS.LEAD1_APPROVAL_PASS,
  ACTION_STATUS.LEAD1_APPROVAL_REJECT,
  ACTION_STATUS.LEAD2_APPROVAL_PASS,
  ACTION_STATUS.LEAD2_APPROVAL_REJECT,
  ACTION_STATUS.LEAD3_APPROVAL_PASS,
  ACTION_STATUS.LEAD3_APPROVAL_REJECT,
]
const passListStatus = [
  ACTION_STATUS.REVOKE_REJECT,
  ACTION_STATUS.REVIEW_REJECT,
  ACTION_STATUS.TL_REVIEW_REJECT,
  ACTION_STATUS.APPROVAL_REJECT,
  ACTION_STATUS.ZF_APPROVE_REJECT,
  ACTION_STATUS.SAFETY_APPROVAL_REJECT,
  ACTION_STATUS.BIGDATA1_APPROVAL_REJECT,
  ACTION_STATUS.BIGDATA_APPROVAL_REJECT,
  ACTION_STATUS.LEAD1_APPROVAL_REJECT,
  ACTION_STATUS.LEAD2_APPROVAL_REJECT,
  ACTION_STATUS.LEAD3_APPROVAL_REJECT,
]
class ProcessAction extends React.Component {
  static defaultProps = {
    required: false, // 说明弹框非必填
    textAreaLabel: '说明',
    textAreaId: 'remark',
  };

  state = {
    visible: false,
  };

  // 展示审核/审批/撤销 浮层
  onShow = () => {
    this.setState({
      visible: true,
    })
  };

  // 展示审核/审批/撤销 浮层
  onHide = () => {
    this.setState({
      visible: false,
    })
  };

  // 接口请求
  onSubmitResult = (params) => {
    const { onSubmit, action, queryList, applyId, clickStatus, status, params: propsParams } = this.props

    // 审核/审批/撤销审核 入参需要添加success
    if (sameActionList.indexOf(clickStatus) > -1) {
      params = {
        ...params,
        success: passListStatus.indexOf(clickStatus) > -1 ? 0 : 1,
      }
    }
    params = {
      ...params,
      ...propsParams,
    }
    if (onSubmit) {
      return onSubmit({ ...params, applyId }, this.onHide)
    }
    action(ACTION_STATUS_TYPE[clickStatus], {
      ...params,
      applyId,
    }).then(() => {
      message.success('操作成功')
      this.onHide()
      queryList && queryList({
        state: status ? status.join(',') : '',
        pageNo: 1,
      })
    })
  };

  render () {
    const { visible } = this.state
    const { actionModalTitle, form, textAreaLabel, textAreaId, required } = this.props
    const formProps = {
      form,
      formItemLayout,
      id: textAreaId,
      label: textAreaLabel,
    }
    if (!visible) {
      return null
    }
    return Modals({
      refs: 'Modal',
      width: 700,
      title: actionModalTitle,
      content: <TextAreaItem required={required} {...formProps} />,
      visible,
      onCancel: this.onHide,
      onOk: async () => {
        const [ err, values ] = await validate(form)
        if (err) return false
        this.onSubmitResult(values)
      },
    })
  }
}

export default ProcessAction
