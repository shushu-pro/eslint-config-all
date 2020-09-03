import React, { Component } from 'react'
import { connect } from 'dva'
import { withRouter, router } from 'umi'
import {
  Button, Form, Steps, Spin, Modal, message,
} from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import ProcessAction from '@/components/OperationCenter/ProcessAtion'
import FooterComfire from '@/components/Common/FooterComfire'
import StackPanel from '@/components/Common/StackPanel'
import {
  applyDetail,
  deptQuotaApplyApprovePass,
  deptQuotaApplyApproveReject,
} from '@/services/OperationCenter/quotaManage'
import PageLoading from '@/components/PageLoading'
import { ApplyDetail, ApplyDetailRegion } from './containers'
import { API_PARAMS } from './constant'

const { Step } = Steps
const {
  APPLY_TIME, APPLY_STATUS, APPROVE_TIME, ATTACH_ID, REFUSE_INFO, IS_APPROVE, DESCRIPTION,
} = API_PARAMS
@Form.create()
@withRouter
@connect(({ user }) => ({
  permsList: user.permsList,
}))
class Apply extends Component {
  constructor (props) {
    super(props)
    const {
      match: {
        params: { applyId },
      },
    } = props
    this.state = {
      quotaData: undefined,
      loading: true,
      applyId,
      approveState: true,
    }
    this.modal = React.createRef()
    this.getQuotaData(applyId)
  }

  getQuotaData = async (applyId) => {
    this.setState({ loading: true })
    await applyDetail({ applyId })
      .then(({ resData }) => {
        this.setState({
          quotaData: resData,
        })
      })
      .finally(() => {
        this.setState({ loading: false })
      })
  };

  onPass = () => {
    this.goToApprove(true)
  };

  onReject = () => {
    this.goToApprove(false)
  };

  goToApprove = (state) => {
    this.setState(
      {
        approveState: state,
      },
      () => {
        this.modal.onShow()
      },
    )
  };

  onAction = () => {
    router.push('../applyList')
  };

  onApprove = (params, callback) => {
    const { approveState } = this.state
    const deptQuotaApplyApprove = approveState
      ? deptQuotaApplyApprovePass
      : deptQuotaApplyApproveReject
    deptQuotaApplyApprove(params).then(({ resData }) => {
      if (resData === 'continueFlag') {
        this.approveConfirm(params)
      } else {
        message.success(resData)
        this.onAction()
      }
      callback()
    })
  }

  approveConfirm = (params) => {
    Modal.confirm({
      title: '审批确认',
      content: '该部门配额值发生过变动，初始值已不是页面中显示的数值，是否继续审批',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        deptQuotaApplyApprovePass({ ...params, continueFlag: true }).then(({ resData }) => {
          message.success(resData)
          this.onAction()
        })
      },
    })
  }

  render () {
    const {
      quotaData, loading, applyId, approveState,
    } = this.state
    const { form, permsList } = this.props
    if (!quotaData) {
      return <PageLoading />
    }
    return (
      <PageHeaderWrapper
        title={`订单号：${applyId}`}
        breadcrumbList={[
          {
            href: '/manage/operation-center/quotaManage/applyList',
            title: '配额管理',
          },
        ]}
      >
        <div className="quota" style={{ backgroundColor: '#fff', padding: '0 20px 20px' }}>
          <Spin spinning={loading} size="large">
            <div className="quota-apply">
              <div className="top-line clearfix">
                <p className="title">进度：</p>
                <Steps
                  current={quotaData[APPLY_STATUS] === '0' ? 1 : 2}
                  status={quotaData[APPLY_STATUS] === '2' ? 'error' : 'process'}
                  style={{ marginBottom: '40px' }}
                >
                  <Step title="发起申请" description={quotaData[APPLY_TIME]} />
                  <Step
                    title="管理部门审批"
                    description={
                      quotaData[APPLY_STATUS] === '0' ? '进行中' : quotaData[APPROVE_TIME]
                    }
                  />
                  <Step title={quotaData[APPLY_STATUS] === '2' ? '审批驳回' : '审批通过'} />
                </Steps>
              </div>
              <div className="top-line clearfix">
                <p className="title">配额调整的内容：</p>
                <ApplyDetailRegion region={quotaData.cloudRegion} style={{ float: 'left' }} />
              </div>
              <ApplyDetail data={quotaData.productList} />
              <div className="top-line clearfix">
                <p className="title">附件：</p>
                {quotaData[ATTACH_ID] &&
                  quotaData[ATTACH_ID].map((item) => (
                    <p key={item.fileId}>
                      <a href={item.url}>{item.fileName}</a>
                    </p>
                  ))}
              </div>
              {quotaData[DESCRIPTION] &&
                (
                  <div className="top-line clearfix">
                    <span className="title">
                      备注：
                      {quotaData[DESCRIPTION]}
                    </span>
                  </div>
                )}
              {// 申请单要在待审批状态
                quotaData[APPLY_STATUS] === '0' &&
                // 申请单是否有审批权限
                permsList.findIndex((o) => o === 'quota:approveList') !== -1 &&
                // 是否是审批单
                quotaData[IS_APPROVE] && (
                  <FooterComfire>
                    <StackPanel>
                      <StackPanel.RightAlice>
                        <Button onClick={this.onReject}>审批驳回</Button>
                        <Button onClick={this.onPass} type="primary">
                          审批通过
                        </Button>
                      </StackPanel.RightAlice>
                    </StackPanel>
                  </FooterComfire>
                )
              }
              <ProcessAction
                ref={(ref) => {
                  this.modal = ref
                }}
                onSubmit={this.onApprove}
                applyId={applyId}
                actionModalTitle={`审批${approveState ? '通过' : '驳回'}`}
                form={form}
                textAreaId={REFUSE_INFO}
                required={false}
              />
            </div>
          </Spin>
        </div>
      </PageHeaderWrapper>
    )
  }
}

export default Apply
