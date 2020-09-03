import React from 'react'
import { connect } from 'dva'
import {
  Button, Icon,
} from 'antd'
import Modals from '@/components/Common/Modals'

@connect(({ loading }) => ({
  loading: !!loading.effects['billSend/submitDelete'] || !!loading.effects['billCheck/submitDelete'],
}))


class DeleteFormModal extends React.Component {
  onSubmitResult = async (isValidFutureBill) => {
    const {
      isBillCheck, billNo, data: record, onCancel, queryAllData, dispatch,
    } = this.props
    dispatch({
      type: 'billCheck/submitDelete',
      payload: {
        seqno: record.seqno,
        productRegionId: record.productRegionId,
        billNo,
        productName: record.productName,
        departmentId: record.departmentId,
        isValidFutureBill: String(Number(isValidFutureBill)),
      },
    }).then(() => {
      isBillCheck && queryAllData()
      onCancel()
    })
  }

  render () {
    const {
      visible,
      onCancel,
      loading,
    } = this.props
    if (!visible) {
      return null
    }

    return Modals({
      bodyStyle: {
        padding: 0,
      },
      key: 'deleteModals',
      width: 500,
      title: '删除资源',
      confirmLoading: loading,
      content: (
        <div style={{ padding: '20px 40px', lineHeight: '36px' }}>
          <Icon type="question-circle" style={{ fontSize: '22px', color: '#faad14', marginRight: '12px' }} />
          {' '}
          确定删除这条资源？
        </div>
      ),
      visible,
      onCancel,
      footer: [
        <Button key="cancel" onClick={onCancel}>取消</Button>,
        <Button
          key="save"
          type="primary"
          style={{ marginRight: 8 }}
          onClick={() => this.onSubmitResult(false)}
          loading={loading}
        >
          仅保存至本期账单

        </Button>,
        <Button
          key="allSave"
          type="primary"
          onClick={() => this.onSubmitResult(true)}
          loading={loading}
        >
          保存并影响后续账单
        </Button>,
      ],
    })
  }
}

export default DeleteFormModal
