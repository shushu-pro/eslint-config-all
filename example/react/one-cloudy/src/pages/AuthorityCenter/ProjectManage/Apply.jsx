// 项目具体信息页面-申请单
import React from 'react'
import moment from 'moment'
import { connect } from 'dva'
import { Table, Badge } from 'antd'
import ResourceInfo from '@/components/OperationCenter/ResourceInfo'
import {
  STATUS_MAP_COLOR,
  STATUS_MAP_TEXT,
} from '@/pages/OperationCenter/OperationOrder/contant'
import Pagation from '@/components/Pagation'
import styles from './index.less'
@connect(({ ACproject, loading }) => ({
  ...ACproject,
  loading: !!loading.effects['ACproject/queryOrderList'] || !!loading.effects['ACproject/queryOrderDetail'],
}))

class Apply extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      deptId: props.deptId,
      stateList: [],
      expandedRowKeys: [],
      resData: {},
    }
  }

  componentDidMount () {
    const list = []
    for (const i in STATUS_MAP_TEXT) {
      list.push({
        value: i,
        text: STATUS_MAP_TEXT[i],
      })
    }
    /* eslint-enable */
    this.queryList()
    this.setState({
      stateList: list,
    })
  }

  queryList = (params = {}) => {
    const { deptId } = this.state
    const { dispatch } = this.props
    const { page, limit } = params
    dispatch({
      type: 'ACproject/queryOrderList',
      payload: {
        projectId: deptId,
        page: page || this.pagationRef.state.current,
        limit: limit || this.pagationRef.state.pageSize,
      },
      callback: (e) => {
        if (e.code === 200) {
          this.setState({
            resData: e.resData,
          })
        }
      },
    })
  }

  onExpand = (record) => {
    const { expanded, expandedRowKeys } = this.state
    if (!expanded || expandedRowKeys[0] !== record.applyId) {
      const { dispatch } = this.props
      dispatch({
        type: 'ACproject/queryOrderDetail',
        payload: {
          applyId: record.applyId,
        },
        callback: (e) => {
          if (e.code === 200) {
            this.setState({
              expandedRowKeys: [ record.applyId ],
              detailData: e.resData,
              expanded: true,
            })
          }
        },
      })
    } else {
      this.setState({
        expandedRowKeys: [],
        detailData: {},
        expanded: false,
      })
    }
  }

  renderExpandedRow = () => {
    const { detailData } = this.state
    return (
      <div>
        <ResourceInfo data={detailData.resourceItems || []} className={styles.resInfo} />
        <div style={{ paddingTop: 10 }}>
          申请单附件：
          {
            detailData.attachFileLinks &&
            detailData.attachFileLinks.map(item => (
              <a style={{ marginRight: 8 }} href={item.url}>
                {item.fileName}
              </a>
            ))}
        </div>
      </div>
    )
  };

  render () {
    const {
      expandedRowKeys, expanded, stateList, resData,
    } = this.state
    const { loading } = this.props
    const {
      list, totalCount, pageSize, currPage,
    } = resData
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
        render: _ => _ || '-',
      },
      {
        title: '状态',
        dataIndex: 'state',
        // filters: stateList,
        render: (_) => {
          const sta = <Badge color={STATUS_MAP_COLOR[_]} text={STATUS_MAP_TEXT[_]} />
          return sta
        },
      },
      {
        title: '申请人',
        dataIndex: 'applyUserFullName',
        render: _ => _ || '-',
      },
      {
        title: '最后操作时间',
        width: 250,
        dataIndex: 'updatedDate',
        // sorter: true,
        render: _ => <span>{_ ? moment(_).format('YYYY-MM-DD HH:mm:ss') : '-'}</span>,
      },

      {
        title: '操作',
        className: 'action',
        render: (_, record) => (
          <a onClick={() => this.onExpand(record)}>
            {expandedRowKeys[0] === record.applyId && expanded ? '收起' : '查看'}
          </a>
        ),
      },
    ]
    return (
      <div>
        <Table
          className={styles.table}
          rowKey={record => record.applyId}
          columns={columns}
          loading={loading}
          expandedRowRender={record => this.renderExpandedRow(record)}
          expandedRowKeys={expandedRowKeys}
          expandIcon={() => ''}
          expandRowByClick
          expandIconAsCell={false}
          dataSource={list}
          pagination={false}
        />
        <Pagation
          onRef={(ref) => { this.pagationRef = ref }}
          queryList={this.queryList}
          total={totalCount}
          pageSize={pageSize}
          current={currPage}
        />
      </div>
    )
  }
}

export default Apply
