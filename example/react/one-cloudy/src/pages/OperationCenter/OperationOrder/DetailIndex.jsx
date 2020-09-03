/**
 * 申请单详情 + 流程状态
 * 可在申请单详情进行审核/审批
 */
import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { router } from 'umi'
import {
  Tabs, Spin, Button, Form, message,
} from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import FooterComfire from '@/components/Common/FooterComfire'
import StackPanel from '@/components/Common/StackPanel'
import ProcessAction from '@/components/OperationCenter/ProcessAtion'
import DescriptionModal from '@/components/descriptionModal'
import Detail from './Detail'
import Process from './Process'
import ProjectDetail from './ProjectDetail'
import {
  ACTION_STATUS,
  ACTION_STATUS_TYPE,
  ACTION_STATUS_TEXT,
  ACTION_STATUS_ROLE,
  ACTION_STATUS_PERMISSIONS,
  ACTION_MAP_ACTION,
} from './contant'
import { RES_LIST_MAP } from '../breadcrumbConstant'
// import Feekback from './Feekback';

import styles from './DetailIndex.less'

const { TabPane } = Tabs
const mapDispatchToProps = (dispatch) => ({
  queryAllDetail (payload) {
    return dispatch({
      type: 'operationOrder/queryAllDetail',
      payload,
    })
  },
  action (action, payload) {
    return dispatch({
      type: `operationOrder/${action}`,
      payload,
    })
  },
  setter (payload) {
    return dispatch({
      type: 'operationOrder/setter',
      payload,
    })
  },
})
@Form.create()
@connect(({ user, loading, operationOrder }) => ({
  userInfo: user.userInfo,
  roleList: user.roleList,
  permsList: user.permsList,
  detailInfo: operationOrder.detailInfo,
  source: operationOrder.source,
  loading: loading.effects['operationOrder/queryAllDetail'],
}), mapDispatchToProps)
class DetailsIndex extends PureComponent {
  constructor (props) {
    super(props)
    const { orderId } = props.match.params
    this.state = {
      clickStatus: '',
      orderId,
    }
  }


  componentDidMount () {
    this.queryAllDetail()
  }

  componentDidUpdate (nextProps, nextState) {
    const { match } = this.props
    const { orderId } = match.params
    if (nextState.orderId !== orderId) {
      this.queryAllDetail()
    }
  }

  queryAllDetail = (payload) => {
    const { queryAllDetail, match } = this.props
    const { orderId } = match.params
    this.setState({
      orderId,
    })
    queryAllDetail({
      ...payload,
      applyId: orderId,
    })
  };

  onChange = (key) => {
    const { match } = this.props
    const { orderId } = match.params
    router.push(`/manage/operation-center/operation-order/details/${orderId}/${key}`)
  };

  // 资源详情页底部流程操作
  onClick = (key) => {
    const { action, match } = this.props
    const { orderId } = match.params
    switch (key) {
      case ACTION_STATUS.REVIEW_PASS:
      case ACTION_STATUS.REVIEW_REJECT:
      case ACTION_STATUS.TL_REVIEW_PASS:
      case ACTION_STATUS.TL_REVIEW_REJECT:
      case ACTION_STATUS.APPROVAL_PASS:
      case ACTION_STATUS.APPROVAL_REJECT:
      case ACTION_STATUS.BIGDATA1_APPROVAL:
      case ACTION_STATUS.BIGDATA1_APPROVAL_PASS:
      case ACTION_STATUS.BIGDATA1_APPROVAL_REJECT:
      case ACTION_STATUS.BIGDATA_APPROVAL:
      case ACTION_STATUS.BIGDATA_APPROVAL_PASS:
      case ACTION_STATUS.BIGDATA_APPROVAL_REJECT:
      case ACTION_STATUS.LEAD1_APPROVAL:
      case ACTION_STATUS.LEAD1_APPROVAL_PASS:
      case ACTION_STATUS.LEAD1_APPROVAL_REJECT:
      case ACTION_STATUS.LEAD2_APPROVAL:
      case ACTION_STATUS.LEAD2_APPROVAL_PASS:
      case ACTION_STATUS.LEAD2_APPROVAL_REJECT:
      case ACTION_STATUS.LEAD3_APPROVAL:
      case ACTION_STATUS.LEAD3_APPROVAL_PASS:
      case ACTION_STATUS.LEAD3_APPROVAL_REJECT:
      case ACTION_STATUS.ZF_APPROVE_PASS:
      case ACTION_STATUS.ZF_APPROVE_REJECT:
      case ACTION_STATUS.SAFETY_APPROVAL_PASS:
      case ACTION_STATUS.SAFETY_APPROVAL_REJECT:
        this.setState({
          actionModalTitle: ACTION_STATUS_TEXT[key],
          clickStatus: key,
        })
        // debugger;
        this.modal.onShow()
        break
      case ACTION_STATUS.FINISH:
        action(ACTION_STATUS_TYPE[key], {
          applyId: orderId,
        }).then(() => {
          message.success('操作成功')
          this.queryAllDetail()
        })
        break
      case ACTION_STATUS.MODIFY:
        router.push(`/manage/operation-center/operation-order/update/${orderId}`)
        break
      default:
    }
  }

  renderAction = (actionList, userId) => {
    const { roleList, permsList, userInfo } = this.props
    // 该条申请单可做的操作
    return actionList.map((item) => {
      // 查询是否含有对应操作的角色
      const hasRolePre = roleList.some((key) => ACTION_STATUS_ROLE[item] === key)
      // 查询是否含有对应操作的权限
      const pre = permsList.some((key) => ACTION_STATUS_PERMISSIONS[item] === key)
      // 没有角色或者权限
      if (!pre || !hasRolePre) {
        return null
      }
      if (ACTION_STATUS.MODIFY === item && userInfo.userId !== userId) {
        return null
      }
      const nextOpeList = ACTION_MAP_ACTION[item]
      // 如果 操作是个有数据的数据，则表示是个组合型操作按钮
      if (nextOpeList.length > 0) {
        return nextOpeList.map((key) => (
          <Button
            key={key}
            onClick={() => this.onClick(key)}
            type={key.indexOf('Reject') > -1 ? '' : 'primary'}
          >
            {ACTION_STATUS_TEXT[key]}
          </Button>
        ))
      }
      return (
        <Button
          key={item}
          onClick={() => this.onClick(item)}
          type="primary"
        >
          {ACTION_STATUS_TEXT[item]}
        </Button>
      )
    })
  }

  renderFooter = () => {
    const {
      detailInfo, roleList, permsList, userInfo,
    } = this.props
    const { nextOperator, userId } = detailInfo
    if (!nextOperator) {
      return null
    }
    const actionList = nextOperator.split(',')
    if (actionList.length === 1) {
      // 查询是否含有对应操作的角色
      const hasRolePre = roleList.some((key) => ACTION_STATUS_ROLE[actionList[0]] === key)
      // 查询是否含有对应操作的权限
      const pre = permsList.some((key) => ACTION_STATUS_PERMISSIONS[actionList[0]] === key)
      // 没有角色或者权限
      if (!pre || !hasRolePre) {
        return null
      }
      if (ACTION_STATUS.MODIFY === actionList[0] && userInfo.userId !== userId) {
        return null
      }
    }
    return (
      <FooterComfire>
        <StackPanel>
          <StackPanel.RightAlice>
            <div className={styles.footerToolbar}>
              <DescriptionModal isText />
              {this.renderAction(actionList, userId)}
            </div>
          </StackPanel.RightAlice>
        </StackPanel>
      </FooterComfire>
    )
  }

  render () {
    const {
      match, loading, action, form, detailInfo,
    } = this.props
    const { orderId, selectPanel } = match.params
    const { clickStatus, actionModalTitle } = this.state
    const { projectDetail = {}, resourceItems = [] } = detailInfo
    const projectId = projectDetail && projectDetail.projectId
    const resourceType = resourceItems[0] && resourceItems[0].resourceType
    return (
      <PageHeaderWrapper
        title={`单号：${orderId}`}
        breadcrumbList={[ RES_LIST_MAP ]}
      >
        <Spin spinning={loading}>
          <div className={styles.tabPage}>
            <Tabs activeKey={selectPanel} onChange={this.onChange}>
              <TabPane tab="资源详情" key="detail">
                <Detail match={match} projectDetail={projectDetail} />
              </TabPane>
              <TabPane tab={<span>流程信息</span>} key="process">
                <Process match={match} />
              </TabPane>
              {projectId && resourceType !== 'SkyNet' && (
                <TabPane tab={<span>项目信息</span>} key="project">
                  <ProjectDetail match={match} projectId={projectId} />
                </TabPane>
              )}
            </Tabs>
          </div>
          {/* // 审核/审批/完成 */}
          {this.renderFooter()}
          <ProcessAction
            ref={(ref) => { this.modal = ref }}
            action={action}
            queryList={this.queryAllDetail}
            applyId={orderId}
            clickStatus={clickStatus}
            actionModalTitle={actionModalTitle}
            form={form}
          />
        </Spin>
      </PageHeaderWrapper>
    )
  }
}

export default DetailsIndex
