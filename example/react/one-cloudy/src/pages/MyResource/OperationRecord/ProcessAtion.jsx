import React from 'react'
import { message } from 'antd'
import Modals from '@/components/Common/Modals'
import TextAreaItem from '@/components/OperationCenter/FormItem/TextAreaItem'
import { validate } from '@/utils/formx'
import { connect } from 'dva'
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
@connect(({ OperationRecord, loading }) => ({
  queryList: OperationRecord.deptBillDetail,
  loading: !!loading.effects['OperationRecord/getInstanceChangeInfo'],
}))

class ProcessAction extends React.Component {
  static defaultProps = {
    required: false, // 说明弹框非必填
    textAreaLabel: '说明',
    textAreaId: 'remark',
  };

  componentDidMount () {
    const { onRef } = this.props
    if (onRef) {
      onRef(this)
    }
  }

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
  onSubmitResult = (params = {}) => {
    const {
      dispatch, record, clickStatus, queryData, applyId,
    } = this.props
    const { remark } = params
    let success
    // 审核/审批/撤销审核 入参需要添加success
    if (sameActionList.indexOf(clickStatus) > -1) {
      success = passListStatus.indexOf(clickStatus) > -1 ? 0 : 1
    }
    if (clickStatus === 'finish') {
      success = 1
    }

    dispatch({
      type: record.operateType === 'reconfig'
        ? 'OperationRecord/applyReviewOrApprove'
        : 'OperationRecord/releaseReview',
      payload: {
        ticketId: record.ticketId || applyId,
        success,
        remark: remark || '',
        targetState: record.nextState,
      },
      callback: (e) => {
        if (e.code === 200) {
          message.success('操作成功')
          this.onHide()
          queryData && queryData()
        }
      },
    })
  };

  render () {
    const { visible } = this.state
    const {
      actionModalTitle, form, textAreaLabel, textAreaId, required, record,
    } = this.props
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
