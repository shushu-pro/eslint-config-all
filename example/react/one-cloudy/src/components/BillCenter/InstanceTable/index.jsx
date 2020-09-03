import React from 'react'
import { withRouter } from 'dva/router'
import PropTypes from 'prop-types'
import { Table, Icon } from 'antd'
import StackPanel from '@/components/Common/StackPanel'
import AddTooltip from '@/components/Common/AddTooltip'
import { getDate, FILTER_REGION_LIST, REGION_ID_TEXT_MAP } from '@/pages/BillCenter/constant'
import { getFloatStr } from '@/utils/utils'
import SelectSearch from '../../SelectSearch'
import InfoModal from '../BillSend/InfoModal'
import styles from './index.less'

class InstanceTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      ocRegions: '',
    }
  }

  getParams = (params) => {
    const { match } = this.props
    const { billNo, departmentId } = match.params
    const { selectKey, value, ocRegions, order, sidx } = this.state
    return {
      billNo,
      departmentId,
      [selectKey]: value,
      ocRegions,
      order,
      sidx,
      ...params,
    }
  };

  queryList = (params) => {
    const { queryList } = this.props
    queryList(this.getParams(params))
  };

  onExport = (params) => {
    const { onExport } = this.props
    onExport(this.getParams(params))
  };

  // table的操作
  onChange = (pagination, filters, sorter) => {
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
      params = {
        ocRegions: filters.ocRegion.join(','),
      }
    }
    if (sorter && JSON.stringify(sorter) !== '{}') {
      params = {
        ...params,
        order: sorter.order === 'ascend' ? 'asc' : 'desc',
        sidx: sorter.columnKey,
      }
    }
    this.setState({
      ...params,
    })
    this.queryList({
      ...params,
    })
  };

  // 搜索
  queryData = ({ selectKey, value }) => {
    this.setState(
      {
        selectKey,
        value,
      },
      () => {
        this.queryList({
          [selectKey]: value,
        })
      },
    )
  };

  // 设置编辑和查看信息的数据
  onSetData = (record) => {
    this.setState({
      recordData: record,
    })
  };

  // 查看某条资源
  onShow = (e, record) => {
    this.onSetData(record)
    this.setState({
      visible: true,
    })
  };

  onHide = () => {
    this.setState({
      visible: false,
    })
  };

  render () {
    const { tableData = {}, loading, optionList, needRegion } = this.props
    const { recordData, visible } = this.state
    const { totalCount, list, pageSize, currPage } = tableData
    const columns = [
      {
        title: '实例ID/名称',
        dataIndex: 'instanceName',
        render: (_, record) => (
          <div>
            <AddTooltip text={record.instanceId}>
              <div className={styles.textShow}>
                {record.instanceId ? (
                  <a onClick={(e) => this.onShow(e, record)}>{record.instanceId}</a>
                ) : (
                  '-'
                )}
              </div>
            </AddTooltip>
            <AddTooltip text={_}>
              <div className={styles.textShow}>
                {!record.instanceId ? <a onClick={(e) => this.onShow(e, record)}>{_}</a> : _}
              </div>
            </AddTooltip>
          </div>
        ),
      },
      {
        title: '资源',
        width: 80,
        dataIndex: 'productName',
      },
      {
        title: '项目',
        dataIndex: 'projectName',
        render: (_) => <AddTooltip text={_}>{_}</AddTooltip>,
      },
      {
        title: '区域',
        dataIndex: 'ocRegion',
        filters: needRegion ? FILTER_REGION_LIST : [],
        render: (_) => <AddTooltip text={REGION_ID_TEXT_MAP[_]}>{REGION_ID_TEXT_MAP[_]}</AddTooltip>,
      },
      {
        title: '规格',
        dataIndex: 'productSepcs',
        render: (_) => <AddTooltip text={_}>{_}</AddTooltip>,
      },
      {
        title: '开通时间',
        dataIndex: 'openTime',
        key: 'open_time',
        sorter: true,
        render: (_) => getDate(_),
      },
      {
        title: '金额',
        dataIndex: 'monthfee',
        key: 'monthfee',
        sorter: true,
        render: (_) => getFloatStr(_),
      },
    ]
    return (
      <div className="InstanceTable" style={{ padding: 24, background: '#fff' }}>
        <StackPanel>
          <SelectSearch optionList={optionList} queryData={this.queryData} />
          <StackPanel.RightAlice>
            <a key="export" onClick={() => this.onExport()}>
              <Icon type="download" style={{ marginRight: 8 }} />
              导出表格
            </a>
          </StackPanel.RightAlice>
        </StackPanel>
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
      </div>
    )
  }
}

InstanceTable.defaultProps = {
  needRegion: true,
}
InstanceTable.propTypes = {
  optionList: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  needRegion: PropTypes.bool,
  tableData: PropTypes.object.isRequired,
  queryList: PropTypes.func.isRequired,
  onExport: PropTypes.func.isRequired,
}
export default withRouter(InstanceTable)
