import React from 'react'
import { connect } from 'dva'
import {
  Table, Spin, Badge, Button, message, Modal, Form,
} from 'antd'
import {
  STATUS_MAP_TEXT, STATUS_MAP_COLOR,
} from '@/pages/OperationCenter/OperationOrder/contant'
import { router } from 'umi'
import { File } from '@/components/OperationCenter/ProjectInfo'
import AddTooltip from '@/components/Common/AddTooltip'
import StackPanel from '@/components/Common/StackPanel'
import FooterComfire from '@/components/Common/FooterComfire'
// import DescriptionModal from '@/components/descriptionModal';
import ResourceRevokeModal from '@/components/OperationCenter/ResourceRevokeModal'
import { parseUrlParams } from './utils'
import ProcessAction from './ProcessAtion'
import {
  TYPE_NAME_LIST,
  ACTION_STATUS,
  ACTION_STATUS_TEXT,
  ACTION_STATUS_ROLE,
  ACTION_STATUS_PERMISSIONS,
  ACTION_MAP_ACTION,
} from './constant'
import RecordDetailRow from './RecordDetailRow'
import styles from './index.less'

@connect(({ user, loading }) => ({
  userInfo: user.userInfo,
  roleList: user.roleList,
  permsList: user.permsList,
  loading: !!loading.effects['OperationRecord/getInstanceChangeInfo'],
}))

@Form.create()
class RecordDetail extends React.Component {
  constructor (props) {
    super(props)
    const res = parseUrlParams()
    this.state = {
      detail: [],
      status: null,
      ticketId: res.ticketId,
      createdBy: res.createdBy,
      operateType: res.operateType,
      clickStatus: '',
      clickedRecord: {},
    }
    // console.log('props', props,);
  }

  componentDidMount () {
    this.queryDetail()
  }

  queryDetail = () => {
    const { dispatch } = this.props
    const { ticketId } = this.state
    dispatch({
      type: 'OperationRecord/getInstanceChangeInfo',
      payload: {
        ticketId,
      },
      callback: (e) => {
        if (e.code === 200) {
          this.setState({
            detail: e.resData,
          })
        }
      },
    })
  };

  renderSize = (before, after, operateType, productCode) => (
    <RecordDetailRow
      beforeData={before}
      afterData={after}
      productType={productCode}
    />
  )

  onSubmit = () => {

  }

  action = () => {

  }

  // 取消撤销
  onCancelRevoke = () => {
    Modal.confirm({
      title: '取消撤销',
      content: '确定要取消资源撤销？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        this.onSubmit()
      },
    })
  };

  // 撤销浮层
  onRevokeShow = () => {
    const { queryRevokeOptions } = this.props
    queryRevokeOptions().then((resData) => {
      this.setState({
        isRevokeShow: true,
        optionList: resData.optionsList,
      })
    })
  };

  // 操作记录撤回
  onCancelOperate = (id) => {
    const { dispatch } = this.props
    Modal.confirm({
      title: '取消确认撤销该条申请？',
      content: '该条申请记录会被删除，审批方不会收到申请。',
      okText: '撤销',
      cancelText: '取消',
      onOk: () => {
        dispatch({
          type: 'OperationRecord/ticketRevert',
          payload: {
            ticketId: id,
          },
          callback: (e) => {
            if (e.code === 200) {
              router.goBack()
            }
          },
        })
      },
    })
  };

  switchCloudId = (str) => {
    switch (str) {
      case 'cloud-public':
        return 1
      case 'cloud-private':
        return 2
      case 'cloud-industry-pub':
        return 3
      case 'cloud-industry-secu':
        return 4
      default:
        return ''
    }
  }

  getcloudInstanceId = () => {
    const { operateType, ticketId } = this.state
    const type = operateType === 'reconfig' ? 'changeSet' : 'recovery'
    router.push({
      pathname: `/manage/myresource/resourceinstance/${type}`,
      query: {
        isChange: true,
        ticketId,
      },
    })
  }

  renderFooter = () => {
    const { detail } = this.state
    const {
      roleList, permsList, userInfo,
    } = this.props
    const { nextOperate } = detail
    let { createdBy } = this.state
    createdBy = Number(createdBy)
    if (!nextOperate) {
      return null
    }
    const actionList = nextOperate.split(',')
    if (actionList.length === 1) {
      // 查询是否含有对应操作的角色
      const hasRolePre = roleList.some((key) => ACTION_STATUS_ROLE[actionList[0]] === key)
      // 查询是否含有对应操作的权限
      const pre = permsList.some((key) => ACTION_STATUS_PERMISSIONS[actionList[0]] === key)
      // 没有角色或者权限

      if (!pre || !hasRolePre) {
        return null
      }
      if (ACTION_STATUS.MODIFY === actionList[0] && userInfo.userId !== createdBy) {
        return null
      }
    }

    return (
      <FooterComfire>
        <StackPanel>
          <StackPanel.RightAlice>
            <div className={styles.footerToolbar}>
              {/* <DescriptionModal isText /> */}
              {this.renderAction(actionList, createdBy)}
            </div>
          </StackPanel.RightAlice>
        </StackPanel>
      </FooterComfire>
    )
  }

  renderAction = (actionList, userId) => {
    const { detail } = this.state
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

      // 撤回只在当前用户申请和已提交状态
      if (item === ACTION_STATUS.CANCEL && userInfo.userId !== userId) {
        return null
      }

      if (item === ACTION_STATUS.CANCEL && !(detail.state === 'commited' || detail.state.includes('refuse'))) {
        return null
      }

      const nextOpeList = ACTION_MAP_ACTION[item]
      // 如果 操作是个有数据的数据，则表示是个组合型操作按钮
      // console.log('item', item, 'nextOpeList', nextOpeList);
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

  // 操作记录详情页底部流程操作
  onClick = (key) => {
    const { detail, ticketId } = this.state
    switch (key) {
      case ACTION_STATUS.REVIEW_PASS:
      case ACTION_STATUS.REVIEW_REJECT:
      case ACTION_STATUS.TL_REVIEW_PASS:
      case ACTION_STATUS.TL_REVIEW_REJECT:
      case ACTION_STATUS.APPROVAL_PASS:
      case ACTION_STATUS.APPROVAL_REJECT:
      case ACTION_STATUS.ZF_APPROVE_PASS:
      case ACTION_STATUS.ZF_APPROVE_REJECT:
      case ACTION_STATUS.SAFETY_APPROVAL_PASS:
      case ACTION_STATUS.SAFETY_APPROVAL_REJECT:
      case ACTION_STATUS.BIGDATA1_APPROVAL_PASS:
      case ACTION_STATUS.BIGDATA1_APPROVAL_REJECT:
      case ACTION_STATUS.BIGDATA_APPROVAL_PASS:
      case ACTION_STATUS.BIGDATA_APPROVAL_REJECT:
      case ACTION_STATUS.LEAD1_APPROVAL_PASS:
      case ACTION_STATUS.LEAD1_APPROVAL_REJECT:
      case ACTION_STATUS.LEAD2_APPROVAL_PASS:
      case ACTION_STATUS.LEAD2_APPROVAL_REJECT:
      case ACTION_STATUS.LEAD3_APPROVAL_PASS:
      case ACTION_STATUS.LEAD3_APPROVAL_REJECT:
      case ACTION_STATUS.FINISH:
        this.modal.onShow()
        break
      case ACTION_STATUS.CANCEL_REVOKE:
        this.onCancelRevoke()
        break
      case ACTION_STATUS.REVOKE:
        this.onRevokeShow()
        break
      case ACTION_STATUS.CANCEL:
        this.onCancelOperate(ticketId)
        break
      case ACTION_STATUS.MODIFY:
        this.getcloudInstanceId()
        break
      default:
    }
    this.setState({
      ticketId,
      clickStatus: key,
      actionModalTitle: ACTION_STATUS_TEXT[key],
      clickedRecord: detail,
    })
  }

  render () {
    const {
      detail,
      isRevokeShow,
      status,
      optionList,
      ticketId,
      clickStatus,
      actionModalTitle,
      clickedRecord,
    } = this.state
    const { loading, form } = this.props
    const columns = [
      {
        title: '资源',
        dataIndex: 'productCode',
        key: 'productCode',
        width: 100,
      },
      {
        title: '实例ID/名称',
        dataIndex: 'cloudInstanceId',
        key: 'cloudInstanceId',
        width: 200,
        render: (_, record) => (
          <div>
            {
              record.productCode === 'OSS' ? '-'
                : (
                  <AddTooltip text={record.beforeData.cloudInstanceId || '-'}>
                    <div style={{ color: '#1890ff' }}>
                      {record.beforeData.cloudInstanceId || '-'}
                    </div>
                  </AddTooltip>
                )
            }
            <AddTooltip text={record.beforeData.cloudInstanceName || '-'}>
              <div>
                {record.beforeData.cloudInstanceName || '-'}
              </div>
            </AddTooltip>
          </div>
        ),
      },
      {
        title: '区域',
        dataIndex: 'ocRegionName',
        key: 'ocRegionName',
        width: 200,
        className: `${styles.tdwrap}`,
        filters: [
          { text: '公有云区', value: 'cloud-public' },
          { text: '专有云区', value: 'cloud-private' },
          { text: '行业政法云区', value: 'cloud-industry-pub' },
          { text: '公安云区', value: 'cloud-industry-secu' },
        ],
        onFilter: (value, record) => record.ocRegionId.includes(value),
        render: (_, record) => (
          <AddTooltip text={record.beforeData ? `${record.beforeData.areaName},${_}` : '-'}>
            <span className={styles.ellspan}>
              {record.beforeData ? `${record.beforeData.areaName},${_}` : '-'}
            </span>
          </AddTooltip>
        ),
      },
      {
        title: '部门',
        dataIndex: 'ocDeptName',
        key: 'ocDeptName',
        width: 200,
        className: `${styles.tdwrap}`,
        render: (_) => (
          <AddTooltip text={_ || '-'}>
            <span className={styles.ellspan}>
              {_ || '-'}
            </span>
          </AddTooltip>
        ),
      },
      {
        title: '项目',
        dataIndex: 'ocProjectName',
        key: 'ocProjectName',
        width: 200,
        className: `${styles.tdwrap}`,
        render: (_) => (
          <AddTooltip text={_ || '-'}>
            <span className={styles.ellspan}>
              {_ || '-'}
            </span>
          </AddTooltip>
        ),
      },
      {
        title: '规格',
        dataIndex: 'guige',
        key: 'guige',
        width: detail.operateType === 'recycle' ? 459 : 639,
        render: (_, record) => this.renderSize(
          record.beforeData,
          record.afterData,
          record.operateType,
          record.productCode,
        ),
      },
    ]
    if (detail.operateType === 'recycle') {
      columns.push({
        title: '开通时间',
        dataIndex: 'cloudOpenTime',
        key: 'cloudOpenTime',
        width: 180,
        render: (_, record) => (
          <AddTooltip text={record.beforeData ? record.beforeData.cloudOpenTime : '-'}>
            {record.beforeData ? record.beforeData.cloudOpenTime : '-'}
          </AddTooltip>
        ),
      })
    }

    return (
      <div className={styles.recorddetail}>
        <Spin spinning={loading}>
          <div className={styles.row}>
            <div className={styles.title}>操作类型：</div>
            <div className={styles.content}>{TYPE_NAME_LIST[detail.operateType]}</div>
          </div>

          <div className={styles.row}>
            <div className={styles.title}>申请人：</div>
            <div className={styles.content}>{detail.fullName}</div>
          </div>

          <div className={styles.row}>
            <div className={styles.title}>资源使用人：</div>
            <div className={styles.content}>
              {
                detail.resourceUsers && detail.resourceUsers.map((item) => (
                  <span key={item.mobile} style={{ paddingRight: '10px' }}>
                    <span style={{ color: '#1890ff' }}>{item.userName}</span>
                    /
                    <span style={{ color: '#1890ff' }}>{item.mobile}</span>
                    /
                    <span style={{ color: '#1890ff' }}>{item.email}</span>
                    ,
                  </span>
                ))
              }
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.title}>发起时间：</div>
            <div className={styles.content}>{detail.createDate}</div>
          </div>

          <div className={styles.row}>
            <div className={styles.title}>状态：</div>
            <div className={styles.content}>
              <Badge color={STATUS_MAP_COLOR[detail.state]} text={STATUS_MAP_TEXT[detail.state]} />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.title}>
              {`${detail.operateType === 'recycle' ? '回收' : '变更'}实例：`}
            </div>
          </div>
          <div className={styles.row} style={{ overflowX: 'auto' }}>
            <Table
              rowKey={(record) => record.cloudInstanceId}
              columns={columns}
              dataSource={detail.ticketEntityList}
              pagination={false}
            />
          </div>

          <div className={styles.row}>
            <div className={styles.title}>备注：</div>
            <div className={styles.content}>{detail.remark}</div>
          </div>

          <div className={styles.row}>
            <div className={styles.title}>附件：</div>
            <div className={styles.content}>
              {detail.attachEntityList && detail.attachEntityList.length > 0 && (
                <div>
                  <File
                    label={undefined}
                    data={detail}
                    // formItemLayout={threeFormItemLayout}
                    id="attachEntityList"
                  />
                </div>
              )}
            </div>
          </div>

          {this.renderFooter()}

          <ProcessAction
            onRef={(ref) => {
              this.modal = ref
            }}
            action={this.action}
            queryData={this.queryDetail}
            applyId={ticketId}
            clickStatus={clickStatus}
            actionModalTitle={actionModalTitle}
            form={form}
            status={status}
            record={clickedRecord}
          />
          {isRevokeShow && (
            <ResourceRevokeModal
              isShow={isRevokeShow}
              onSubmit={this.onSubmit}
              onRest={this.onHide}
              optionList={optionList}
            />
          )}
        </Spin>

      </div>
    )
  }
}

export default RecordDetail
