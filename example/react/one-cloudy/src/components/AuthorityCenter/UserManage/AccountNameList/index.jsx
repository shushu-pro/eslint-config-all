
import React, { PureComponent } from 'react'
import { connect } from 'dva'
import {
  Icon, Table, Dropdown, Menu, Modal, Checkbox, Switch, message,
} from 'antd'
import { Link } from 'umi'
import AddTooltip from '@/components/Common/AddTooltip'
import MatchDTUser from '@/pages/AuthorityCenter/UserManage/MatchDTUser'
import TableSearchItem from '@/components/TableSearchItem'
import { matchWantedList } from '../../utils'
import styles from './index.less'

const { confirm } = Modal
@connect(({ ACuser, loading }) => ({
  ...ACuser,
  loading: !!loading.effects['ACuser/updateUserStatus'],
}))
class AccountNameList extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      matchVisible: false,
      records: props.records,
      checkRecord: {},
      filters: {},
      activeKey: '',
      checkedIndex: '',
      objValue: {},
    }
  }

  componentDidMount () {
    const { onRef } = this.props
    if (onRef) {
      onRef(this)
    }

    // const { records, mappingDtUser } = this.props;

    // this.initallCheckIndex(records, mappingDtUser);
  }

  UNSAFE_componentWillReceiveProps (nextProps, prevState) {
    if (nextProps.records !== prevState.records) {
      this.setState({
        records: nextProps.records,
        haveMappping: !!nextProps.mappingDtUser,
      }, () => {
        this.initallCheckIndex(this.state.records, nextProps.mappingDtUser)
      })
    }
  }

  initallCheckIndex = (list, obj) => {
    const { wantedList } = this.props
    let flagIndex = ''
    // 有选中的一列时，初始化选中的项
    if (wantedList && wantedList.indexOf('匹配') > -1) {
      // 存在DT用户数据和已匹配用户信息时候设置选中项
      if (list && list.length && obj) {
        list.forEach((item, index) => {
          if (item.userId === obj.cloudUserId) {
            flagIndex = index.toString()
          }
        })
        if (flagIndex) {
          this.setState({
            checkedIndex: flagIndex,
            FirstCheckedIndex: flagIndex, // 暂存刷新页面时选中的index
          })
        } else {
          this.setState({
            checkedIndex: '',
            checkRecord: {},
            FirstCheckedIndex: '',
          })
        }
      } else {
        this.setState({
          checkedIndex: '',
          checkRecord: {},
        })
      }
    }
  }

  // 下拉框出现时，将当前项的数据暂存到recordData，以便操作使用
  // 下拉框收起后，删除recordData数据，防止出错
  onVisibleChange = (record, visible) => {
    if (visible) {
      this.setState({
        recordData: record,
      })
    } else {
      this.setState({
        recordData: null,
      })
    }
  }

  onDel = () => {
    const { recordData } = this.state
    const { dispatch, resData } = this.props
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

    const that = this
    if (recordData) {
      confirm({
        title: '是否确认删除该用户?',
        content: '删除一朵云平台上的用户，不会对DT平台上的用户、资源产生影响。',
        okText: '删除',
        cancelText: '取消',
        onOk () {
          dispatch({
            type: 'ACuser/deleteUser',
            payload: {
              userId: recordData.userId,
            },
            callback: (e) => {
              if (e.code === 200) {
                message.success('删除成功！')
                that.onSearch({ page, limit: pageSize })
              } else {
                that.warning()
              }
            },
          })
        },
        onCancel () {
          // console.log('Cancel');
        },
      })
    }
  }

  warning = () => {
    Modal.warning({
      title: '当前用户不可删除',
      content: '如需删除用户，请先解除该DT用户的匹配关系。',
    })
  }

  onMatch = () => {
    const { matchVisible } = this.state
    this.setState({
      matchVisible: !matchVisible,
    })
  }

  onSearch = (params = { page: 1, limit: 10 }) => {
    const { queryList } = this.props
    queryList && queryList(params)
  }

  // 切换表格
  onChange = (pagination, filters) => {
    // console.log(filters)
    this.setState({
      filters,
    }, () => {
      this.onSearch({ page: 1, limit: 10 })
    })
  }


  getCheckedIndex = (index, e, record) => {
    const { checked } = e.target
    this.setState({
      checkedIndex: checked ? index.toString() : '',
      checkRecord: record,
      checkedStatus: checked ? '1' : '0',
    })
  }

  // 切换启停状态
  switchStatus = (e, record) => {
    const { dispatch, queryList } = this.props
    console.log(record.status)
    confirm({
      title: `是否确认要${record.status ? '启' : '停'}用该用户?`,
      okText: '确认',
      cancelText: '取消',
      onOk () {
        dispatch({
          type: 'ACuser/updateUserStatus',
          payload: {
            userId: record.userId,
            status: record.status ? 0 : 1,
          },
          callback: (ev) => {
            if (ev.successful) {
              message.success(ev.resData)
              queryList && queryList()
            }
          },
        })
      },
      onCancel () {

      },
    })
  }

  // 渲染角色列表
  renderChara = (list) => {
    if (list && list.length > 0) {
      const roleList = []
      list.forEach((item) => { roleList.push(item.remark) })
      return roleList.join('，')
    }
    return ''
  }

  onSetACData = (record) => {
    const { dispatch } = this.props
    dispatch({
      type: 'ACuser/setUserInfo',
      payload: {
        userInfo: record,
      },
    })
  }

  // 将数组的字段名转换成组件需要的字段名
  changeOcDeptTree = (list) => {
    list && list.map((item) => {
      item.text = item.deptName
      item.key = item.deptId
      item.value = item.deptId
      item.children = item.childDeptList && this.changeOcDeptTree(item.childDeptList)
    })
    return list
  }

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

  render () {
    // matchUser 表示是否有选择框和账号是否可以点击

    const {
      matchVisible, records, recordData, FirstCheckedIndex,
    } = this.state
    const { wantedList, matchUser, style } = this.props
    const menu = (
      <Menu>
        <Menu.Item>
          <div onClick={this.onDel}>
            删除
          </div>
        </Menu.Item>
        <Menu.Item>
          <div onClick={this.onMatch}>
            匹配DT账号
          </div>
        </Menu.Item>
      </Menu>
    )
    let columns = [
      {
        title: '选择',
        dataIndex: '匹配',
        key: '匹配',
        width: 150,
        render: (_, record, index) => {
          const { checkedIndex, haveMappping } = this.state
          return (
            (record.mappingDTUserFlag && !record.mappingCurrentUser) ? (
              <span className={styles.matchedItem}>已匹配其他部门</span>
            ) : (
              <Checkbox
                onClick={(e) => { this.getCheckedIndex(index, e, record) }}
                checked={checkedIndex === index.toString()}
                disabled={haveMappping ? (FirstCheckedIndex !== index.toString()) : false}
              />
            )
          )
        },
      },
      {
        title: this.renderTitle('username', '账号'),
        dataIndex: 'username',
        key: 'username',
        render: (_, record) => {
          const { userId, deptId } = record
          return (
            matchUser ? <AddTooltip text={_}>{_ || '-'}</AddTooltip>
              : (
                <AddTooltip text={_}>
                  <Link
                    to={`/manage/authority-center/usermanage/userdetail?id=${userId}&ocDeptId=${deptId}`}
                    onClick={() => { this.onSetACData(record) }}
                  >
                    {_}
                  </Link>
                </AddTooltip>
              )
          )
        },
      },
      {
        title: this.renderTitle('ocDeptName', '部门'),
        dataIndex: 'ocDeptName',
        key: 'ocDeptName',
        render: (_) => (
          <AddTooltip text={_}>
            {_ || '-'}
          </AddTooltip>
        ),
      },
      {
        title: this.renderTitle('fullname', '显示名'),
        dataIndex: 'fullname',
        key: 'fullname',
        render: (_) => (
          <AddTooltip text={_}>
            {_ || '-'}
          </AddTooltip>
        ),
      },
      {
        title: this.renderTitle('mobile', '联系方式'),
        dataIndex: 'mobile',
        key: 'mobile',
        render: (_) => (
          <AddTooltip text={_}>
            {_ || '-'}
          </AddTooltip>
        ),
      },
      {
        title: this.renderTitle('email', '邮箱'),
        dataIndex: 'email',
        key: 'email',
        render: (_) => (
          <AddTooltip text={_}>
            {_ || '-'}
          </AddTooltip>
        ),
      },
      {
        title: '角色',
        dataIndex: 'roleList',
        key: 'roleList',
        width: 200,
        render: (_) => (
          this.renderChara(_)
            ? (
              <AddTooltip text={this.renderChara(_)}>
                {this.renderChara(_)}
              </AddTooltip>
            )
            : '-'
        ),
      },
      {
        title: '启停',
        dataIndex: 'status',
        key: 'status',
        width: 100,
        filters: [ { text: '禁用', value: 1 }, { text: '正常', value: 0 } ],
        render: (_, record) => (
          <Switch checked={!_} onClick={(e) => { this.switchStatus(e, record) }} />),
      },
      {
        title: '操作',
        dataIndex: 'id',
        key: 'id',
        render: (_, record) => (
          <Dropdown overlay={menu} placement="bottomCenter" onVisibleChange={this.onVisibleChange.bind(this, record)}>
            <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
              <Icon type="ellipsis" />
            </a>
          </Dropdown>
        ),
      },

    ]
    columns = matchWantedList(wantedList, columns)
    return (
      <div>
        <Table
          style={{ marginTop: '24px', ...style }}
          rowKey={(record) => record.userId}
          dataSource={records}
          columns={columns}
          onChange={this.onChange}
          className={styles.accountnamelist}
          getPopupContainer={() => document.getElementById('root')}
          pagination={false}
          scroll={{ y: 490 }}
        />
        {matchVisible ? (
          <MatchDTUser
            visible={matchVisible}
            onMatch={this.onMatch}
            recordData={recordData}
          />
        ) : null}
      </div>
    )
  }
}

export default AccountNameList
