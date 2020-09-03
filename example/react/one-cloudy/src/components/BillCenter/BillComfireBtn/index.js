import React, { PureComponent } from 'react'
import { connect } from 'dva'
import RejectModal from '@/components/BillCenter/RejectModal'
import { Button, Modal, Icon, Tooltip } from 'antd'
import styles from './index.less'

@connect(({ global }) => ({
  collapsed: global.collapsed,
}))
class BillComfireBtn extends PureComponent {
  static defaultProps = {
    isDept: false,
  };

  constructor (props) {
    super(props)
    this.state = {
      rejectVisable: false,
    }
  }

  submitBureauFeedback = (params) => {
    const { submitFeedback, isDept } = this.props
    submitFeedback({
      comfirmFlag: !isDept ? '2' : '3',
      ...params,
    }).then(() => {
      this.onHide()
    })
  };

  onShow = () => {
    this.setState({
      rejectVisable: true,
    })
  };

  onHide = () => {
    this.setState({
      rejectVisable: false,
    })
  };

  onOk = () => {
    const { isDept, submitFeedback } = this.props
    Modal.confirm({
      icon: <Icon style={{ color: '#1890FF' }} type="info-circle" />,
      title: '“确认账单”表示对账单内容无异议',
      content: (
        <div className={styles.subTitle}>确认后的账单不可修改，账单将作为计费的最终依据。</div>
      ),
      okText: '确认账单',
      cancelText: '再想想',
      onOk: () => {
        submitFeedback({
          comfirmFlag: !isDept ? '1' : '2',
        })
      },
    })
  };

  render () {
    const {
      collapsed,
      disabled,
      rejectDisabled,
    } = this.props
    const { rejectVisable } = this.state
    return (
      <div id="billComfireBtn">
        <div className={styles.btnGroup} style={{ marginLeft: collapsed ? '-104px' : '-280px' }}>
          <Tooltip title="测试中">
            <Button
              onClick={
                this.onShow
              }
              disabled={
                disabled || !!rejectDisabled
              }
            >
              驳回
            </Button>
          </Tooltip>
          <span style={{ marginLeft: 8 }} />
          <Tooltip title="测试中">
            <Button type="primary" onClick={this.onOk} disabled={disabled}>
              确认账单
            </Button>
          </Tooltip>
        </div>
        <RejectModal
          visible={rejectVisable}
          onCancel={this.onHide}
          onOk={this.submitBureauFeedback}
        />
      </div>
    )
  }
}

export default BillComfireBtn
