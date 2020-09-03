import React, { Component } from 'react'
import { connect } from 'dva'
import { router, Link } from 'umi'
import { Radio, Button, Badge } from 'antd'
import TableX from '@/components/Common/TableX'
import { getDeptQuotaApplyList, getMyApproveList } from '@/services/OperationCenter/quotaManage'
import { API_PARAMS } from './constant'

const { SIDX, ORDER, APPLY_STATUS } = API_PARAMS
@connect(({ user }) => ({
  permsList: user.permsList,
  roleList: user.roleList,
  subDeptList: user.subDeptList,
}))
class ApplyList extends Component {
  columnRender = (_) => {
    let color
    let text
    switch (_) {
      case '1':
        text = '审批通过'
        color = '#52C41A'
        break
      case '2':
        text = '审批驳回'
        color = '#f50'
        break
      default:
        text = '待审批'
        color = '#1890FF'
    }
    return <Badge color={color} text={text} />
  };

  columnsApply = [
    {
      dataIndex: API_PARAMS.APPLY_ID,
      title: '申请单号',
      render: (text) => <Link to={`./applyDetail/${text}`}>{text}</Link>,
    },
    {
      dataIndex: API_PARAMS.APPLY_TIME,
      title: '申请时间',
      sorter: true,
    },
    {
      dataIndex: API_PARAMS.APPROVE_USER_NAME,
      title: '审批人',
      render: (text) => <span>{text || '-'}</span>,
    },
    {
      dataIndex: API_PARAMS.APPLY_STATUS,
      title: '状态',
      render: this.columnRender,
      filterMultiple: true,
      filters: [
        {
          text: '待审批',
          value: '0',
        },
        {
          text: '审批通过',
          value: '1',
        },
        {
          text: '审批驳回',
          value: '2',
        },
      ],
    },
    {
      dataIndex: API_PARAMS.APPROVE_TIME,
      title: '审批时间',
      sorter: true,
      render: (text) => <span>{text || '-'}</span>,
    },
  ];

  columnsApprove = [
    {
      dataIndex: API_PARAMS.APPLY_ID,
      title: '申请单号',
      render: (text) => <Link to={`./applyDetail/${text}`}>{text}</Link>,
    },
    {
      dataIndex: API_PARAMS.APPLY_DEPT_NAME,
      title: '申请部门',
    },
    {
      dataIndex: API_PARAMS.APPLY_TIME,
      title: '申请时间',
      sorter: true,
    },
    {
      dataIndex: API_PARAMS.APPLY_USER,
      title: '申请人',
      render: (text) => <span>{text || '-'}</span>,
    },
    {
      dataIndex: API_PARAMS.APPLY_STATUS,
      title: '状态',
      render: this.columnRender,
      filterMultiple: true,
      filters: [
        {
          text: '待审批',
          value: '0',
        },
        {
          text: '审批通过',
          value: '1',
        },
        {
          text: '审批驳回',
          value: '2',
        },
      ],
    },
    {
      dataIndex: API_PARAMS.APPROVE_TIME,
      title: '审批时间',
      sorter: true,
      render: (text) => <span>{text || '-'}</span>,
    },
  ];

  constructor (props) {
    super(props)
    const { permsList } = this.props
    // 如果没有apply权限，则初始展示approve列表
    this.defaultList = permsList.some((item) => item === 'quota:applyList') ? 'apply' : 'approve'
    this.state = {
      columns: this.defaultList === 'apply' ? this.columnsApply : this.columnsApprove,
      api: this.defaultList === 'apply'
        ? getDeptQuotaApplyList
        : getMyApproveList,
    }
  }

  selectList = (e) => {
    const { value } = e.target
    this.setState({
      columns: value === 'apply' ? this.columnsApply : this.columnsApprove,
      api: value === 'apply' ? getDeptQuotaApplyList : getMyApproveList,
    })
  };

  goToApply = () => {
    router.push('./Apply')
  };

  render () {
    const { columns, api } = this.state
    const { roleList, subDeptList } = this.props
    // 我的申请/发起配额申请
    const applyList = [ 'gaManager', 'zfManager', 'deptManager' ]
    // 我的审批
    const approveList = [ 'gaManager', 'zwManager', 'zfManager', 'deptManager' ]
    const apply = roleList.some((a) => applyList.some((b) => a === b))
    const approve = roleList.some((a) => approveList.some((b) => a === b))
    const checkDeptMa = [ 'deptManager' ]
    const hasDeptMa = roleList.some((a) => checkDeptMa.some((b) => a === b))
    const isDeptMa = hasDeptMa && subDeptList && subDeptList.length > 0
    return (
      <div>
        <div className="top-line clearfix">
          <Radio.Group style={{ float: 'left' }} onChange={this.selectList} defaultValue={this.defaultList}>
            {apply &&
            <Radio.Button value="apply">我的申请</Radio.Button>}
            {(approve || isDeptMa) &&
            <Radio.Button value="approve">我的审批</Radio.Button>}
          </Radio.Group>
          {apply &&
            (
              <Button onClick={this.goToApply} style={{ float: 'right' }} type="primary">
                发起配额申请
              </Button>
            )}
        </div>
        <TableX
          api={api}
          columns={columns}
          beforeRequest={({ current, pageSize }, filter, { order, field }) => ({
            page: current,
            limit: pageSize,
            [SIDX]: order && field,
            [ORDER]: order && order.slice(0, -3),
            [APPLY_STATUS]: filter[APPLY_STATUS],
          })}
        />
      </div>
    )
  }
}

export default ApplyList
