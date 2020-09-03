import React from 'react'
import { Table } from 'antd'
import { connect } from 'dva'
import { getFloatStr } from '@/utils/utils'
import StackPanel from '../../Common/StackPanel'
import AddTooltip from '../../Common/AddTooltip'
import styles from './index.less'

@connect(({ billCenter }) => ({
  changeInfoList: billCenter.changeInfoList,
}))
class ProjectResourceList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      expandedKey: [],
    }
  }

  isExpanded = (e, row) => {
    const { dispatch } = this.props
    const { expandedKey } = this.state
    dispatch({
      type: 'billCenter/queryChangeInfo',
      payload: {
        instanceId: row.instanceId,
      },
    }).then(() => {
      const aDom = document.getElementById(row.seqno)
      if (expandedKey.indexOf(row.seqno) === -1) {
        aDom.innerHTML = '收起'
        expandedKey.push(row.seqno)
      } else {
        const i = expandedKey.findIndex((item) => item === row.seqno)
        aDom.innerHTML = '查看'
        if (i > -1) {
          expandedKey.splice(i, 1)
        }
      }
      this.setState({
        expandedKey, // 设置展开行的key值
      })
    })
  };

  expandedRowRender = (record) => {
    const { changeInfoList } = this.props
    return (
      <div className={styles.changeInfo}>
        {changeInfoList.map((item, i) => (
          <StackPanel key={i}>
            <div style={{ marginRight: '40px' }}>
              <span style={{ color: '#999' }}>变更时间：</span>
              {item.closeTime}
            </div>
            <div>
              <span style={{ color: '#999' }}>变更内容：</span>
              {item.productSepcs && (
                <span>
                  <span style={{ color: '#999' }}>CPU核数/内存 </span>
                  {item.productSepcs}
                  {' '}
                  <span style={{ color: '#999' }}>变更为 </span>
                  {record.productSepcs}
                </span>
              )}
              <div style={{ marginLeft: '70px' }}>
                {item.diskSize && (
                  <div>
                    <span style={{ color: '#999' }}>磁盘 </span>
                    {item.diskSize}
                    {' '}
                    <span style={{ color: '#999' }}>变更为 </span>
                    {record.productSepcs}
                  </div>
                )}
              </div>
            </div>
          </StackPanel>
        ))}
      </div>
    )
  };

  render () {
    const { pageData, queryList } = this.props
    // const { expandedKey } = this.state;
    const { pageSize, totalCount, currPage, list } = pageData
    const columns = [
      {
        title: '实例ID/名称',
        dataIndex: 'instanceName',
        render: (_, record) => (
          <div>
            <AddTooltip text={_}>
              <div>
                <a className={styles.textOverflow}>{record.instanceId || '-'}</a>
              </div>
            </AddTooltip>
            <AddTooltip text={_}>
              <div className={styles.textOverflow}>{_ || '-'}</div>
            </AddTooltip>
          </div>
        ),
      },
      {
        title: '资源',
        dataIndex: 'productName',
      },
      {
        title: '项目',
        dataIndex: 'projectName',
        render: (_) => <AddTooltip text={_}>{_ || '-'}</AddTooltip>,
      },
      {
        title: '配置',
        dataIndex: 'productSepcs',
        render: (_) => <AddTooltip text={_}>{_ || '-'}</AddTooltip>,
      },
      {
        title: '网络要求',
        dataIndex: 'network',
        render: (_) => _ || '-',
      },
      {
        title: '开通时间',
        dataIndex: 'openTime',
        render: (time) => (time ? time.split(' ')[0] : '-'),
      },
      // {
      //   title: '变更',
      //   dataIndex: 'isChange',
      //   render: (isChange, record) =>
      //     isChange === 'Y' ? (
      //       <a id={record.seqno} onClick={() => this.isExpanded(this, record)}>
      //         查看
      //       </a>
      //     ) : (
      //       '-'
      //     ),
      // },
      {
        title: '费用（元）',
        dataIndex: 'monthfee',
        render: (_) => getFloatStr(_),
      },
    ]
    return (
      <Table
        rowKey={(record) => record.seqno}
        dataSource={list}
        columns={columns}
        // expandedRowKeys={expandedKey}
        // expandedRowRender={this.expandedRowRender}
        // expandRowByClick
        // expandIconAsCell={false}
        pagination={
          totalCount <= pageSize
            ? false
            : {
              pageSize: pageSize || 10,
              total: totalCount,
              current: currPage || 1,
              showSizeChanger: true,
              pageSizeOptions: [ '10', '20', '50' ],
              onChange: (pageIndex) => {
                queryList({ page: pageIndex.toString(), limit: '10' })
              },
              onShowSizeChange: (pageIndex, size) => {
                queryList({
                  page: pageIndex.toString(),
                  limit: size.toString(),
                })
              },
            }
        }
      />
    )
  }
}

export default ProjectResourceList
