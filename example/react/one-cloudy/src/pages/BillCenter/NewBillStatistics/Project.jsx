import React, { PureComponent } from 'react'
import { Spin, Icon, message } from 'antd'
import { connect } from 'dva'
import RaiodButtonRegionList from '@/components/RaiodButtonRegionList'
import ProjectTableList from '@/components/ProjectTableList'
import Pagation from '@/components/Pagation'
import { goExport } from '@/utils/utils'
import { swicthData } from '@/components/InstanceTableList/contants'
import { getTimeInterval } from './constant'
import styles from './index.less'
@connect(({ billCenter, loading }) => ({
  ...billCenter,
  loading: !!loading.effects['newBillStatistics/getProjectBillStatistics'],
}))
class Resource extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      resData: {},
    }
  }

  componentDidMount () {
    const { onRef } = this.props
    if (onRef) {
      onRef(this)
    }
    this.queryList()
  }

  // 将组件中表格的dataindex转换成返回数据中对于的字段
  matchSidx = (str) => {
    switch (str) {
      case 'projectNum':
        return 'projectCounts'
      case 'productNum':
        return 'productCounts'
      default:
        return str
    }
  }

  onResetTableListRef = () => {
    this.tableListRef && this.tableListRef.onReset()
  }

  queryList = (params = {}) => {
    const { page, limit } = params
    const { dateValue, dispatch, regionValueList } = this.props
    const { sorter } = this.tableListRef.state
    const order = sorter && JSON.stringify(sorter) !== '{}' ? (sorter.order === 'ascend' ? 'asc' : 'desc') : null
    /* eslint-enable */
    const sidx = sorter && JSON.stringify(sorter) !== '{}' ? this.matchSidx(sorter.columnKey) : null
    const payload = {
      startTime: dateValue && dateValue[0] || undefined,
      endTime: dateValue && dateValue[1] || undefined,
      regions: this.radioRef.state.region === 'all' ? regionValueList : undefined,
      region: this.radioRef.state.region === 'all' ? undefined : this.radioRef.state.region,
      page: page || this.pagationRef.state.current || undefined,
      limit: limit || this.pagationRef.state.pageSize || undefined,
      projectName: this.tableListRef.state.projectName || undefined,
      department: this.tableListRef.state.department || undefined,
      order: order || undefined,
      sidx: sidx || undefined,
    }

    dispatch({
      type: 'newBillStatistics/getProjectBillStatistics',
      payload,
      callback: e => {
        if (e.code === 200) {
          const { resData } = e
          this.setState({
            resData,
            payload,
          })
        }
      },
    })
  }

  onExport = () => {
    message.warning('正在导出，请稍等')
    const { dispatch } = this.props
    const { payload } = this.state
    dispatch({
      type: 'newBillStatistics/getProjectBillStatisticsExport',
      payload,
      callback: e => {
        if (e.code === 200) {
          message.success('导出成功!')
          goExport(e.resData)
        }
      },
    })
  }

  getConcatList = () => {
    const { dateValue } = this.props
    const list = getTimeInterval(dateValue)
    const concatList = []
    list && list.map((item, index) => {
      concatList.push({
        title: `${item}月费用`,
        key: `fee${index}`,
        sorter: true,
        datatype: 1,
      })
    })
    return concatList
  }


  render () {
    const { regionList, loading, dateValue } = this.props
    const { resData } = this.state
    const { list, currPage, pageSize, totalCount } = resData
    const dataList = swicthData(list)
    return (
      <div className={styles.tabPage}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <RaiodButtonRegionList
            onRef={ref => { this.radioRef = ref }}
            list={regionList}
            queryList={this.queryList}
            onResetTableListRef={this.onResetTableListRef}
            loading={loading}
          />
          <a
            key="export"
            onClick={this.onExport}
            style={{ minWidth: '100px', marginTop: '24px', textAlign: 'right' }}
          >
            <Icon type="download" />
            导出表格
          </a>
        </div>
        <Spin spinning={loading}>
          <ProjectTableList
            onRef={ref => { this.tableListRef = ref }}
            records={dataList}
            queryList={this.queryList}
            concatList={this.getConcatList()}
            targetUrl='newbillstatistics/detailindex'
            extreParams={`&chosenTime=${dateValue && dateValue[0]}-${dateValue && dateValue[1]}`}
          />
          <Pagation
            onRef={ref => { this.pagationRef = ref }}
            queryList={this.queryList}
            total={totalCount}
            pageSize={pageSize}
            current={currPage}
          />
        </Spin>

      </div>
    )
  }
}

export default Resource
