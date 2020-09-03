/**
 * 申请单列表 - 申请单详情展开显示
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import moment from 'moment'
import {
  Input, Form, Select, Badge,
} from 'antd'
import PagedTable, { withDva } from '@/components/Common/PagedTable'
import {
  STATUS_MAP_QUERY,
  STATUS_MAP_QUERY_ALIAS,
  STATUS_MAP_COLOR,
  STATUS_MAP_TEXT,
} from '@/pages/OperationCenter/OperationOrder/contant'
import ResourceInfo from '../ResourceInfo'
import styles from './index.less'

const { Search } = Input
const { Option } = Select
@Form.create()
class OrderList extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      status: null,
      selectedVal: STATUS_MAP_QUERY_ALIAS.APLYY_ID,
      expandedRowKeys: [],
      detailData: {},
      expanded: false,
    }
  }

  queryOrderList = (params) => {
    const { keyWord, queryType } = this.state
    const { queryOrderList, projectId } = this.props
    queryOrderList({
      keyWord,
      queryType,
      projectId,
      ...params,
    })
  };

  // 修改状态查询
  onChange = (pagination, filters) => {
    const { keyWord, queryType } = this.state
    let params = {
      keyWord,
      queryType,
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
    }
    if (filters.state) {
      params = {
        ...params,
        state: filters.state.join(','),
      }
    }

    this.queryOrderList(params)
    this.setState({
      status: filters.state,
    })
  };

  // 搜索关键字
  onSearch = (val) => {
    const { status, selectedVal } = this.state
    this.queryOrderList({
      state: status ? status.join(',') : '',
      keyWord: val,
      pageNo: 1,
      pageSize: 10,
      queryType: selectedVal,
    })
    this.setState({
      keyWord: val,
      queryType: selectedVal,
    })
  };

  onClickRowKeys = (record) => {
    this.setState({
      expandedRowKeys: [ record.applyId ],
    })
  };

  onExpand = (record) => {
    const { expanded, expandedRowKeys } = this.state
    if (!expanded || expandedRowKeys[0] !== record.applyId) {
      const { queryOrderDetail } = this.props
      queryOrderDetail({ applyId: record.applyId }).then((res) => {
        this.setState({
          expandedRowKeys: [ record.applyId ],
          detailData: res,
          expanded: true,
        })
      })
    } else {
      this.setState({
        expandedRowKeys: [],
        detailData: {},
        expanded: false,
      })
    }
  };

  renderExpandedRow = () => {
    const { detailData } = this.state
    return (
      <div>
        <ResourceInfo data={detailData.resourceItems || []} className={styles.resInfo} />
        <div style={{ paddingTop: 10 }}>
          申请单附件：
          {detailData.attachFileLinks.map((item) => (
            <a key={item.url} style={{ marginRight: 8 }} href={item.url}>
              {item.fileName}
            </a>
          ))}
        </div>
      </div>
    )
  };

  render () {
    const Table = withDva('operationOrder', 'queryOrderList', false)(PagedTable)
    const { loading, projectId } = this.props
    const { expandedRowKeys, expanded } = this.state
    const quryList = []
    Object.values(STATUS_MAP_QUERY_ALIAS).map((key) => {
      if (!(key === '2' && projectId)) {
        quryList.push({
          text: STATUS_MAP_QUERY[key],
          value: key,
        })
      }
    })
    const columns = [
      {
        width: 250,
        title: '申请单号',
        dataIndex: 'applyId',
      },
      {
        title: '部门',
        dataIndex: 'deptName',
      },
      {
        title: '项目',
        dataIndex: 'projectName',
        render: (_) => _ || '-',
      },
      {
        title: '修改时间',
        width: 250,
        dataIndex: 'updatedDate',
        render: (_) => <span>{_ ? moment(_).format('YYYY-MM-DD HH:mm:ss') : '-'}</span>,
      },
      {
        title: '申请人',
        dataIndex: 'applyUserFullName',
        render: (_) => _ || '-',
      },
      {
        title: '状态',
        dataIndex: 'state',
        noTips: true,
        render: (_) => {
          const sta = <Badge color={STATUS_MAP_COLOR[_]} text={STATUS_MAP_TEXT[_]} />
          return sta
        },
      },
      {
        title: '操作',
        className: 'action',
        render: (record) => (
          <a onClick={() => this.onExpand(record)}>
            {expandedRowKeys[0] === record.applyId && expanded ? '收起' : '查看'}
          </a>
        ),
      },
    ]
    return (
      <>
        <Select
          style={{ width: 150 }}
          defaultValue="申请单号" // 默认选择的值
          optionFilterProp="children"
          onSelect={this.onSelect}
        >
          {quryList.map((item) => (
            <Option key={item.value} value={item.value}>
              {item.text}
            </Option>
          ))}
        </Select>
        <Search
          placeholder="请输入查询内容"
          onSearch={this.onSearch}
          style={{ width: 200, margin: '0 16px 24px' }}
          allowClear
        />
        <Table
          className={styles.table}
          rowKey={(record) => record.applyId}
          columns={columns}
          onChange={this.onChange}
          loading={loading}
          expandedRowRender={(record) => this.renderExpandedRow(record)}
          expandedRowKeys={expandedRowKeys}
          expandIcon={() => ''}
          expandRowByClick
          expandIconAsCell={false}
        />
      </>
    )
  }
}

OrderList.defaultProps = {
  projectId: '',
}
OrderList.propTypes = {
  queryOrderList: PropTypes.func.isRequired,
  projectId: PropTypes.string,
}
function mapStateToProps ({ operationOrder, user }) {
  return {
    orderList: operationOrder.orderList,
    roleList: user.roleList,
    userInfo: user.userInfo,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    queryOrderList (payload) {
      return dispatch({
        type: 'operationOrder/queryOrderList',
        payload,
      })
    },
    queryOrderDetail (payload) {
      return dispatch({
        type: 'operationOrder/showOrderDetail',
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderList)
