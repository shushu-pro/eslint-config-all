import React from 'react'
import { connect } from 'dva'
import { withRouter } from 'dva/router'
import { Table } from 'antd'
import AddTooltip from '@/components/Common/AddTooltip'
import { getDate, FILTER_REGION_LIST, REGION_ID_TEXT_MAP } from '@/pages/BillCenter/constant'
import { getFloatStr } from '@/utils/utils'
import InfoModal from './InfoModal'
import './index.less'

@connect(({ billStatistics, loading }) => ({
  statisticsData: billStatistics.statisticsData,
  allProductNameList: billStatistics.allProductNameList,
  loading: !!loading.models.billStatistics,
}))
class ResTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      ocRegions: '',
    }
  }

  getParams = (params) => {
    const { ocRegions, order, sidx } = this.state

    return {
      ocRegions,
      order,
      sidx,
      ...params,
    }
  };

  queryList = (params) => {
    const { queryList } = this.props
    console.log(params, this.getParams(params), 'this.getParams(params)')
    queryList({
      ...this.getParams(params),
    })
  };

  // table的操作
  onChange = (pagination, filters, sorter) => {
    console.log(pagination, filters, sorter, '1')
    // billNo （必填）
    // departmentId(必填)
    // ocRegions(非必填, 多个以逗号隔开，可选值: cloud - industry - pub、cloud - private、cloud - public）
    //   sidx  排序字段, 可选值: open_time(开通时间) 、monthfee(费用) 非必填
    //   order 排序方式, 可选值: asc(升序) 、desc(降序)
    let params = {
      page: pagination.current,
      limit: pagination.pageSize,
      order: '',
      sidx: '',
    }
    if (filters && JSON.stringify(filters) !== '{}') {
      const { productName, ocRegion } = filters
      params = {
        ...params,
        ocRegions: ocRegion && ocRegion.join(','),
        productName: productName && productName.join(','),
      }
    }
    if (sorter && JSON.stringify(sorter) !== '{}') {
      params = {
        ...params,
        order: sorter.order === 'ascend' ? 'asc' : 'desc',
        sidx: sorter.columnKey,
      }
    }
    console.log(params, 2)
    this.queryList({
      ...params,
    })
  };

  // 查看某条资源
  onShow = (e, record) => {
    this.setState({
      visible: true,
      recordData: record,
    })
  };

  onHide = () => {
    this.setState({
      visible: false,
      recordData: {},
    })
  };

  render () {
    const { statisticsData = {}, loading, allProductNameList } = this.props
    const { recordData, visible } = this.state
    const { totalCount, list, pageSize, currPage } = statisticsData
    const columns = [
      {
        title: '实例ID/名称',
        dataIndex: 'instanceName',
        render: (_, record) => (
          <div>
            <AddTooltip text={_}>
              <a style={{ display: 'block' }} onClick={(e) => this.onShow(e, record)}>
                {_ || '-'}
              </a>
            </AddTooltip>
            <AddTooltip text={record.instanceId}>
              {_ ? (
                record.instanceId
              ) : (
                <a style={{ display: 'block' }} onClick={(e) => this.onShow(e, record)}>
                  {record.instanceId}
                </a>
              )}
            </AddTooltip>
          </div>
        ),
      },
      {
        title: '资源',
        filters: allProductNameList,
        dataIndex: 'productName',
      },
      {
        title: '部门',
        dataIndex: 'department',
        render: (_) => _ || '_',
      },
      {
        title: '项目',
        dataIndex: 'projectName',
        render: (_) => <AddTooltip text={_}>{_}</AddTooltip>,
      },
      {
        title: '区域',
        dataIndex: 'ocRegion',
        filters: FILTER_REGION_LIST,
        render: (_) => <AddTooltip text={REGION_ID_TEXT_MAP[_]}>{REGION_ID_TEXT_MAP[_]}</AddTooltip>,
      },
      {
        title: '规格',
        dataIndex: 'productSepcs',
        render: (_) => <AddTooltip text={_}>{_}</AddTooltip> || '-',
      },
      {
        title: '开通时间',
        dataIndex: 'openTime',
        key: 'open_time',
        sorter: true,
        render: (_) => getDate(_),
      },
      {
        title: '费用',
        dataIndex: 'monthfee',
        key: 'monthfee',
        sorter: true,
        render: (_) => getFloatStr(_),
      },
    ]
    return (
      <>
        <Table
          style={{ marginTop: '24px', background: '#fff', overflow: 'auto' }}
          rowKey={(record) => record.seqno}
          dataSource={list}
          columns={columns}
          onChange={this.onChange}
          loading={loading}
          pagination={
            totalCount <= pageSize
              ? false
              : {
                pageSize: pageSize || 10,
                total: totalCount,
                current: currPage || 1,
                showSizeChanger: true,
                pageSizeOptions: [ '10', '20', '50' ],
                onShowSizeChange: (pageIndex, size) => {
                  this.onChange({
                    current: pageIndex,
                    pageSize: size,
                  })
                },
              }
          }
        />
        <InfoModal data={recordData} visible={visible} onCancel={this.onHide} />
      </>
    )
  }
}

export default withRouter(ResTable)
