import React from 'react'
import { connect } from 'dva'
import { Row, Col, Spin, Icon, message } from 'antd'
import RaiodButtonRegionList from '@/components/RaiodButtonRegionList'
import OrgTableList from '@/components/OrgTableList'
import Pagation from '@/components/Pagation'
import { getFloatStr, goExport } from '@/utils/utils'
import { swicthData } from '@/components/InstanceTableList/contants'
import { getTimeInterval } from './constant'
import { getBillingCycle, transformData } from '../constant'
import styles from './index.less'
@connect(({ newBillStatistics, user, loading }) => ({
  ...newBillStatistics,
  userInfo: user.userInfo,
  loading: !!loading.effects['newBillStatistics/getDepartmentBillStatistics'] || !!loading.effects['newBillStatistics/getBillStatistics'],
}))
class Overview extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      resData: {},
      billStatistics: {},
    }
  }

  componentDidMount () {
    const { onRef } = this.props
    if (onRef) {
      onRef(this)
    }
    const { userInfo = {} } = this.props
    const { deptName } = userInfo
    this.setState({
      deptName,
    })

    // this.queryList();
    // this.getBillStatistics();
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
      department: this.tableListRef.state.searchText || undefined,
      order: order || undefined,
      sidx: sidx || undefined,
    }

    dispatch({
      type: 'newBillStatistics/getDepartmentBillStatistics',
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
      type: 'newBillStatistics/getDepartmentBillStatisticsExport',
      payload,
      callback: e => {
        if (e.code === 200) {
          message.success('导出成功!')
          goExport(e.resData)
        }
      },
    })
  }

  getBillStatistics = () => {
    const { dateValue, dispatch, regionValueList } = this.props
    const payload = {
      startTime: dateValue && dateValue[0] || undefined,
      endTime: dateValue && dateValue[1] || undefined,
      regions: this.radioRef.state.region === 'all' ? regionValueList : undefined,
      region: this.radioRef.state.region === 'all' ? undefined : this.radioRef.state.region,
      department: this.tableListRef.state.searchText || undefined,
    }
    // console.log(payload);
    dispatch({
      type: 'newBillStatistics/getBillStatistics',
      payload,
      callback: e => {
        if (e.code === 200) {
          const { resData } = e
          this.setState({
            billStatistics: resData && resData[0],
          })
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
    const { dateValue, regionList, loading } = this.props
    const { resData, billStatistics, deptName } = this.state
    const { list, currPage, pageSize, totalCount } = resData
    const { productCounts, projectCounts, totalFee } = billStatistics
    const dataList = swicthData(list)
    return (
      <div className={styles.tabPage}>
        <div style={{ color: '#000', fontSize: '18px', margin: '20px 0 0' }}>
          {deptName}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <RaiodButtonRegionList
            onRef={ref => { this.radioRef = ref }}
            list={regionList}
            queryList={this.queryList}
            getBillStatistics={this.getBillStatistics}
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
          <Row style={{ paddingTop: '18px' }}>
            <Col span={6}>
              项目数：{ transformData(projectCounts) }
            </Col>
            <Col span={6}>
              资源数量：{ transformData(productCounts) }
            </Col>
            <Col span={6}>
              费用总计：{ getFloatStr(totalFee) }
            </Col>
            <Col span={6}>
              计费周期：{ getBillingCycle(...dateValue)}
            </Col>
          </Row>
          <OrgTableList
            onRef={ref => { this.tableListRef = ref }}
            queryList={this.queryList}
            records={dataList}
            concatList={this.getConcatList()}
            targetUrl={false}
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

export default Overview
