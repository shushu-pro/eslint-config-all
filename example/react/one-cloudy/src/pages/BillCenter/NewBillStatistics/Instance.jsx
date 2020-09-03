import React from 'react'
import { Spin, Icon, message } from 'antd'
import { connect } from 'dva'
import { swicthData } from '@/components/InstanceTableList/contants'
import RaiodButtonRegionList from '@/components/RaiodButtonRegionList'
import InstanceTableList from '@/components/InstanceTableList'
import { goExport } from '@/utils/utils'
import Pagation from '@/components/Pagation'
import { getTimeInterval } from './constant'
import styles from './index.less'
@connect(({ billCenter, loading }) => ({
  ...billCenter,
  loading: !!loading.effects['newBillStatistics/getInstanceBillStatistics'],
}))
class Instance extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      resData: {},
      productNameList: [],
    }
  }

  componentDidMount () {
    const { onRef } = this.props
    if (onRef) {
      onRef(this)
    }
    this.queryAllProductName()
    this.queryList()
  }

  onResetTableListRef = () => {
    this.tableListRef && this.tableListRef.onReset()
  }

  // 获取资源列表
  queryAllProductName = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'newDepartBill/queryAllProductName',
      payload: {},
      callback: e => {
        if (e.code === 200) {
          const { resData } = e
          if (Array.isArray(resData)) {
            const list = []
            resData.forEach(item => {
              list.push({
                value: item,
                text: item,
              })
            })
            this.setState({
              productNameList: list,
            })
          }
        }
      },
    })
  }

  queryList = (params = {}) => {
    const { page, limit } = params
    const { dateValue, dispatch, projectName, regionValueList } = this.props
    const { sorter } = this.tableListRef.state
    const { filteredInfo } = this.tableListRef.state
    const order = sorter && JSON.stringify(sorter) !== '{}' ? (sorter.order === 'ascend' ? 'asc' : 'desc') : null
    /* eslint-enable */
    const sidx = sorter && JSON.stringify(sorter) !== '{}' ? sorter.columnKey : null
    const productCodes = filteredInfo && JSON.stringify(filteredInfo) !== '{}' ? filteredInfo.productName : null
    const payload = {
      startTime: dateValue && dateValue[0] || undefined,
      endTime: dateValue && dateValue[1] || undefined,
      regions: this.radioRef.state.region === 'all' ? regionValueList : undefined,
      region: this.radioRef.state.region === 'all' ? undefined : this.radioRef.state.region,
      page: page || this.pagationRef.state.current || undefined,
      limit: limit || this.pagationRef.state.pageSize || undefined,
      projectName: projectName || this.tableListRef.state.projectName || undefined,
      department: this.tableListRef.state.department || undefined,
      openTimeBegin: this.tableListRef.state.openTimeBegin && (`${this.tableListRef.state.openTimeBegin} 00:00:00`) || undefined,
      openTimeEnd: this.tableListRef.state.openTimeEnd && (`${this.tableListRef.state.openTimeEnd} 23:59:59`) || undefined,
      instanceIdOrName: this.tableListRef.state.instanceIdOrName || undefined,
      order: order || undefined,
      sidx: sidx || undefined,
      productCodes: productCodes || undefined,
    }

    dispatch({
      type: 'newBillStatistics/getInstanceBillStatistics',
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
      type: 'newBillStatistics/getInstanceBillStatisticsExport',
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
    const { regionList, loading, wantedList } = this.props
    const { resData, productNameList } = this.state
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
          <InstanceTableList
            onRef={ref => { this.tableListRef = ref }}
            queryList={this.queryList}
            wantedList={wantedList || [ 'instanceIdOrName', 'productName', 'department', 'projectName', 'productSepcs', 'openTime', 'fee' ]}
            records={dataList}
            concatList={this.getConcatList()}
            productNameList={productNameList}
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

export default Instance
