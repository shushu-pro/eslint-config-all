import React, { PureComponent } from 'react'
import { connect } from 'dva'
import {
  Icon, Table, Dropdown, Menu, Modal, Checkbox, message,
} from 'antd'
import { router, Link, withRouter } from 'umi'
import MatchDTProject from '@/pages/AuthorityCenter/ProjectManage/MatchDTProject'
import AddTooltip from '@/components/Common/AddTooltip'
import TableSearchItem from '@/components/TableSearchItem'
import { matchWantedList, swicthData } from '../../utils'
import styles from './index.less'

const { confirm } = Modal
@connect(({ ACproject, loading }) => ({
  ...ACproject,
  loading: !!loading.effects['ACproject/list'],
}))
@withRouter
class ProjectNameList extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      matchVisible: false,
      records: props.records,
      activeKey: '',
      objValue: {},
      checkedRecord: {},
    }
  }

  componentDidMount () {
    const { onRef } = this.props
    if (onRef) {
      onRef(this)
    }
  }

  UNSAFE_componentWillReceiveProps (nextProps, prevState) {
    if (nextProps.records !== prevState.records) {
      this.initallCheckIndex(nextProps.records, nextProps.matchedDtProjects)
    }
  }

  initallCheckIndex = (list, obj) => {
    const { wantedList } = this.props
    let flagIndex = ''
    // 有选中的一列时，初始化选中的项
    if (wantedList && wantedList.indexOf('匹配') > -1) {
      // 存在DT用户数据和已匹配用户信息时候设置选中项
      if (list && list.length && obj && obj.length) {
        list.forEach((item, index) => {
          if (item.cloudProjectId === obj[0]) {
            flagIndex = index.toString()
          }
        })
        if (flagIndex) {
          this.setState({
            checkedIndex: flagIndex,
            // FirstCheckedIndex: flagIndex, // 暂存刷新页面时选中的index
          })
        } else {
          this.setState({
            checkedIndex: '',
            checkRecord: {},
            // FirstCheckedIndex: '',
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
    // this.warning();
    if (recordData) {
      confirm({
        title: '是否确认删除该项目?',
        content: '删除一朵云平台项目，不会对应删除DT项目，也不会删除已经开通的资源实例。',
        okText: '删除',
        cancelText: '取消',
        onOk () {
          dispatch({
            type: 'ACproject/ocprojectinfoDelete',
            payload: {
              canDel: 0,
              projectId: recordData.projectId,
            },
            callback: (e) => {
              if (e.code === 200) {
                message.success('删除成功')
                that.onSearch({ page, limit: pageSize })
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
      title: '当前项目不可删除',
      content: '如需删除项目，请先解除该DT项目的匹配关系。',
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
  onChange = () => {
    this.onSearch({ page: 1, limit: 10 })
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

  renderCheckBox = (record, index) => {
    const { checkedIndex } = this.state
    const { matchedDtProjects } = this.props
    const { type } = record

    // type 0 当前项目未匹配
    if (type === 0) {
      if (matchedDtProjects && matchedDtProjects.length) {
        return (
          <Checkbox
            disabled
            checked={checkedIndex === index.toString()}
            onClick={(e) => { this.getCheckedIndex(index, e, record) }}
          />
        )
      }
      return (
        <Checkbox
          checked={checkedIndex === index.toString()}
          onClick={(e) => { this.getCheckedIndex(index, e, record) }}
        />
      )
    }
    // type 0 当前项目已匹配
    if (type === 1) {
      return (
        <Checkbox
          checked={checkedIndex === index.toString()}
          onClick={(e) => { this.getCheckedIndex(index, e, record) }}
        />
      )
    }
    // type 不存在 当前DT项目被其他OC项目匹配
    return null
  }

  getCheckedIndex = (index, e, record) => {
    const { checked } = e.target
    this.setState({
      checkedIndex: checked ? index.toString() : '',
      checkRecord: record,
      checkedStatus: checked,
    })
  }

  render () {
    const {
      matchVisible, recordData,
    } = this.state
    const { wantedList, records, matchProject, match, hasOperAuth } = this.props
    console.log('operation-center', match && match.path)
    const curretnPath = (match && match.path) || '/manage/operation-center/projectmanage'
    const menu = (
      <Menu>
        <Menu.Item>
          <div onClick={() => { router.push(`${curretnPath}/createproject?id=${recordData.projectId}`) }}>
            编辑
          </div>
        </Menu.Item>
        <Menu.Item>
          <div onClick={this.onDel}>
            删除
          </div>
        </Menu.Item>
        <Menu.Item>
          <div onClick={this.onMatch}>
            匹配DT项目
          </div>
        </Menu.Item>
      </Menu>
    )
    let columns = [
      {
        title: '',
        dataIndex: '匹配',
        key: '匹配',
        width: 100,
        render: (_, record, index) => this.renderCheckBox(record, index),
      },
      {
        title: this.renderTitle('projectName', '项目名称'),
        dataIndex: 'projectName',
        key: 'projectName',
        render: (_, record) => (
          // matchProject判断是否可以跳转到详情页面
          matchProject ? <AddTooltip text={_}>{_ || '-'}</AddTooltip>
            : (
              <AddTooltip text={_}>
                <Link
                  to={`${curretnPath}/details?id=${record.projectId}&name=${record.projectName}`}
                >
                  {_}
                </Link>
              </AddTooltip>
            )
        ),
      },
      {
        title: this.renderTitle('projectLeader', '项目负责人'),
        dataIndex: 'projectLeader',
        key: 'projectLeader',
        render: (_) => <AddTooltip text={_}>{_ || '-'}</AddTooltip>,
      },
      {
        title: '项目描述',
        dataIndex: 'description',
        key: 'description',
        render: (_) => <AddTooltip text={_}>{_ || '-'}</AddTooltip>,
      },
      {
        title: this.renderTitle('dtDeptName', '部门'),
        dataIndex: 'dtDeptName',
        key: 'dtDeptName',
        render: (_) => <AddTooltip text={_}>{_ || '-'}</AddTooltip>,
      },
      {
        title: this.renderTitle('contactusername', '项目联系人'),
        dataIndex: 'contactusername',
        key: 'contactusername',
        render: (_) => <AddTooltip text={_}>{_ || '-'}</AddTooltip>,
      },
      {
        title: '项目成员',
        dataIndex: 'membersusername',
        key: 'membersusername',
        render: (_) => <AddTooltip text={_}>{_ || '-'}</AddTooltip>,
      },
      {
        title: '已匹配的一朵云项目',
        dataIndex: 'ocProjectName',
        key: 'ocProjectName',
        render: (_) => <AddTooltip text={_}>{_ || '-'}</AddTooltip>,
      },
      {
        title: '操作',
        dataIndex: 'id',
        key: 'id',
        render: (_, record) => (
          hasOperAuth ? (
            <Dropdown overlay={menu} placement="bottomCenter" onVisibleChange={() => this.onVisibleChange(record)}>
              <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                <Icon type="ellipsis" />
              </a>
            </Dropdown>
          ) : ''),
      },

    ]
    columns = matchWantedList(wantedList, columns)
    return (
      <div>
        <Table
          style={{ marginTop: '24px' }}
          rowKey={(record) => record.id}
          dataSource={swicthData(records)}
          columns={columns}
          onChange={this.onChange}
          className={styles.projectnamelist}
          getPopupContainer={() => document.getElementById('root')}
          pagination={false}
          scroll={{ y: 470 }}
        />
        {
          matchVisible ? (
            <MatchDTProject
              visible={matchVisible}
              onMatch={this.onMatch}
              recordData={recordData}
            />
          ) : null
        }

      </div>


    )
  }
}

export default ProjectNameList
