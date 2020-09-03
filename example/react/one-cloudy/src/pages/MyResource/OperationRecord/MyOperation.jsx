import React, { PureComponent } from 'react'
import { connect } from 'dva'
import router from 'umi/router'
import {
  Badge,
  Menu,
  Dropdown,
  message,
  Modal,
  Form,
  Tooltip,
  Table,
  Spin,
} from 'antd'
import { Help } from '@/components/Common'
import AddTooltip from '@/components/Common/AddTooltip'
import ResourceRevokeModal from '@/components/OperationCenter/ResourceRevokeModal'
import TableSearchItem from '@/components/TableSearchItem'
import Pagation from '@/components/Pagation'
import {
  STATUS_MAP,
  STATUS_MAP_TEXT,
  STATUS_MAP_COLOR,
  ACTION_STATUS,
  ACTION_STATUS_TEXT,
  ACTION_STATUS_PERMISSIONS,
  ACTION_STATUS_TYPE,
  FLOW_STATUS_MAP_TEXT,
  ACTION_MAP_ACTION,
  ACTION_STATUS_ROLE,
  TYPE_NAME_LIST,
} from './constant'
import ProcessAction from './ProcessAtion'
import style from './index.less'

@Form.create()
class MyOperation extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      status: null,
      clickStatus: '',
      objValue: {},
      resData: {},
      loading: false,
      filtersParams: {},
      clickedRecord: {},
    }
  }

  componentDidMount () {
    this.queryList()
  }

  queryList = (param = {}) => {
    const { objValue, filtersParams, sorter } = this.state
    const { queryList } = this.props
    const params = {
      ...param,
      limit: param.limit || this.pagationRef.state.pageSize,
      page: param.page || this.pagationRef.state.current,
      ticketId: objValue.ticketId,
      createdUser: objValue.createdByName,
      ocDeptName: objValue.ocDeptName,
      operateType:
        filtersParams.operateType && filtersParams.operateType.length
          ? filtersParams.operateType : undefined,
      state: filtersParams.state && filtersParams.state.length ? filtersParams.state : undefined,
      order: sorter,
    }
    this.setState({
      loading: true,
    }, () => {
      queryList(params).then((res) => {
        if (res.code === 200) {
          this.setState({
            resData: res.resData,
            loading: false,
          })
        } else {
          message.error(res.msg)
          this.setState({
            resData: [],
            loading: false,
          })
        }
      })
    })
  }

  // 修改状态查询
  onChange = (pagination, filters, sorter) => {
    // console.log(sorter);
    const { order } = sorter
    const params = {
      operateType: filters.operateType,
      state: filters.state,
    }
    this.setState({
      filtersParams: params,
      sorter: order && order === 'ascend' ? 1 : 0, // order ? (order === 'ascend' ? 1 : 0) : undefined,
    }, () => {
      this.queryList({
        limit: '10',
        page: '1',
      })
    })
    /* eslint-enable */
  };

  // 提交操作
  onSubmit = (params, key) => {
    const { action } = this.props
    const { ticketId, status, clickStatus } = this.state
    action(ACTION_STATUS_TYPE[key || clickStatus], {
      ticketId,
      ...params,
    }).then(() => {
      message.success('操作成功')
      this.onHide()
      this.queryList({
        state: status ? status.join(',') : '',
        pageNo: 1,
      })
    })
  };

  // 资源详情列表操作按钮
  onMenuClick = (key, record) => {
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
        this.onCancelOperate(record)
        break
      case ACTION_STATUS.MODIFY:
        this.getcloudInstanceId(record)
        break
      default:
    }
    this.setState({
      ticketId: record.ticketId,
      clickStatus: key,
      actionModalTitle: ACTION_STATUS_TEXT[key],
      clickedRecord: record,
    })
  };

  getcloudInstanceId = (record) => {
    const type = record.operateType === 'reconfig' ? 'changeSet' : 'recovery'
    router.push({
      pathname: `/manage/myresource/resourceinstance/${type}`,
      query: {
        isChange: true,
        ticketId: record.ticketId,
      },
    })
  }

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

  // 关闭浮层
  onHide = () => {
    this.setState({
      isRevokeShow: false,
    })
  };

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

  // 操作记录撤回
  onCancelOperate = (record) => {
    const { resData } = this.state
    const {
      totalCount, pageSize, currPage,
    } = resData
    let page = currPage
    if (totalCount % pageSize === 1) {
      page = currPage - 1
      if (page === 0) {
        page = 1
      }
    }

    const { ticketRevert } = this.props
    const that = this
    Modal.confirm({
      title: '取消确认撤销该条申请？',
      content: '该条申请记录会被删除，审批方不会收到申请。',
      okText: '撤销',
      cancelText: '取消',
      onOk: () => {
        ticketRevert({ ticketId: record.ticketId }).then((res) => {
          if (res.code === 200) {
            message.success('撤销成功')
            that.queryList({ page, limit: pageSize })
          }
        })
      },
    })
  };

  renderTitle = (key, title) => {
    const { activeKey, objValue } = this.state
    const { noSearchIcon } = this.props
    return (
      <TableSearchItem
        noSearchIcon={noSearchIcon}
        activeKey={activeKey}
        value={objValue[key]}
        titleKey={key}
        title={title}
        onClick={() => {
          this.setState({ activeKey: key })
        }}
        onBlur={() => {
          this.setState({ activeKey: '' })
        }}
        onChange={(inputValue, key1) => {
          objValue[key1] = inputValue
          this.setState({ objValue: { ...objValue } })
        }}
        onSearch={this.onSearch}
      />
    )
  }

  onSearch = () => {
    this.queryList({ limit: '10', page: '1' })
  }

  render () {
    const { resData, loading } = this.state
    const {
      totalCount, pageSize, currPage, list,
    } = resData
    const {
      permsList, roleList, userInfo, action, form,
    } = this.props
    const {
      isRevokeShow,
      status,
      optionList,
      ticketId,
      clickStatus,
      actionModalTitle,
      clickedRecord,
    } = this.state
    const statusList = Object.values(STATUS_MAP).map((key) => ({
      text: STATUS_MAP_TEXT[key],
      value: key,
    }))
    const columns = [
      {
        title: this.renderTitle('ticketId', '操作单号'),
        dataIndex: 'ticketId',
        key: 'ticketId',
        render: (_, record) => (
          <AddTooltip text={_}>
            <a onClick={() => {
              router.push({
                pathname: '/manage/myresource/operationrecord/recorddetail',
                query: {
                  ticketId: record.ticketId,
                  createdBy: record.createdBy,
                  operateType: record.operateType,
                },
              })
            }}
            >
              {_}
            </a>
          </AddTooltip>
        ),
      },
      {
        title: '操作',
        dataIndex: 'operateType',
        key: 'operateType',
        filters: [
          { text: '资源回收', value: 'recycle' },
          { text: '升降配', value: 'reconfig' },
        ],
        render: (_) => <span>{TYPE_NAME_LIST[_]}</span>,
      },
      {
        title: this.renderTitle('ocDeptName', '部门'),
        dataIndex: 'ocDeptName',
        key: 'ocDeptName',
      },
      {
        title: '状态',
        dataIndex: 'state',
        filters: statusList,
        render: (_) => {
          const text = FLOW_STATUS_MAP_TEXT[_]
          const sta = <Badge color={STATUS_MAP_COLOR[_]} text={STATUS_MAP_TEXT[_]} />
          if (text) {
            return <Tooltip title={text}>{sta}</Tooltip>
          }
          return sta
        },
      },
      {
        title: this.renderTitle('createdByName', '发起人'),
        dataIndex: 'createdByName',
        key: 'createdByName',
      },
      {
        title: '提交时间',
        dataIndex: 'createdDate',
        key: 'createdDate',
        sorter: true,
      },
      {
        title: (
          <span>
            <span style={{ marginRight: 5 }}>操作</span>
            <Help title="已初审完成及之后状态的申请单不支持修改 " />
          </span>
        ),
        className: 'action',
        render: (_, record) => {
          const { nextOperate, createdBy } = record
          if (!nextOperate) {
            return null
          }
          const actionList = nextOperate.split(',')

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

            if (item === ACTION_STATUS.MODIFY && userInfo.userId !== Number(createdBy)) {
              return null
            }

            // 撤回只在当前用户申请和已提交状态
            if (item === ACTION_STATUS.CANCEL && userInfo.userId !== Number(createdBy)) {
              return null
            }

            if (item === ACTION_STATUS.CANCEL && !(record.state === 'commited' || record.state.includes('refuse'))) {
              return null
            }

            const nextOpeList = ACTION_MAP_ACTION[item]
            const text = ACTION_STATUS_TEXT[item]
            // console.log(record.ticketId, actionList, item);
            // 如果 操作是个有数据的数据，则表示是个组合型操作按钮
            if (nextOpeList.length > 0) {
              return (
                <Dropdown
                  key={item}
                  overlay={(
                    <Menu key={item}>
                      {nextOpeList.map((key) => (
                        <Menu.Item key={key}>
                          <a key={key} onClick={() => this.onMenuClick(key, record)}>
                            {ACTION_STATUS_TEXT[key]}
                          </a>
                        </Menu.Item>
                      ))}
                    </Menu>
                  )}
                  trigger={[ 'click' ]}
                >
                  <a key={item} href="#">
                    {text}
                  </a>
                </Dropdown>
              )
            }
            return (
              <a key={item} onClick={() => this.onMenuClick(item, record)}>
                {text}
              </a>
            )
          })
        },
      },
    ]
    return (
      <div className={style.operationRecord}>
        <Spin spinning={loading}>
          <Table
            rowKey={(record) => record.ticketId}
            columns={columns}
            dataSource={list}
            pagination={false}
            onChange={this.onChange}
          />
          <Pagation
            onRef={(ref) => { this.pagationRef = ref }}
            queryList={this.queryList}
            total={totalCount}
            pageSize={pageSize}
            current={currPage}
          />
        </Spin>

        <ProcessAction
          onRef={(ref) => {
            this.modal = ref
          }}
          action={action}
          queryData={this.queryList}
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
      </div>
    )
  }
}

function mapStateToProps ({ operationOrder, user }) {
  return {
    orderList: operationOrder.orderList,
    permsList: user.permsList,
    roleList: user.roleList,
    userInfo: user.userInfo,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    queryList (payload) {
      return dispatch({
        type: 'OperationRecord/getOperateList',
        payload,
      })
    },
    getcloudInstanceId (payload) {
      return dispatch({
        type: 'OperationRecord/getInstanceChangeInfo',
        payload,
      })
    },
    ticketRevert (payload) {
      return dispatch({
        type: 'OperationRecord/ticketRevert',
        payload,
      })
    },
    queryRevokeOptions (payload) {
      return dispatch({
        type: 'operationOrder/queryRevokeOptions',
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOperation)
