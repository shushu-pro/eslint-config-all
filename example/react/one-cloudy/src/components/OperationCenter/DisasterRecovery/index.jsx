/**
 * 需要创建同城容灾的资源实例列表
 */

import React, { PureComponent } from 'react'
import moment from 'moment'
import { Input, Select, message } from 'antd'
import TableX from '@/components/Common/TableX'
import { queryRecoveryList } from '@/services/OperationCenter/operationOrder'
import {
  STATUS_MAP_QUERY_BACK_UP_ALIAS,
  STATUS_MAP_QUERY_BACK_UP,
  DISASTER_RECOVERY_STATUS_MAP_TEXT,
} from '@/pages/OperationCenter/OperationOrder/contant'
import { PRODUCT_FIELDS } from '../Product/base/_constant'
import { subscribeFormChange, unSubscribeFormChange } from '../Product/index'
import styles from './index.less'

const { Search } = Input
const { Option } = Select
class DisasterRecovery extends PureComponent {
  constructor (props) {
    super(props)
    const selectedData = props.initData &&
      props.initData.resourceDetailList.length > 0 &&
      props.initData.resourceDetailList.map((item) => ({
        allData: item,
        targetInstanceId: item.targetInstanceId,
      }))
    const selectedRowKeys = props.initData &&
      props.initData.resourceDetailList.length > 0 &&
      props.initData.resourceDetailList.map((item) => item.targetInstanceId)
    this.state = {
      selectedVal: STATUS_MAP_QUERY_BACK_UP_ALIAS.INSTANCE_NAME,
      selectedData: selectedData || [],
      selectedRegion: (props.initData && props.initData.regionId) || null,
      current: 1,
      selectedRowKeys: selectedRowKeys || [],
    }
  }

  componentDidMount () {
    subscribeFormChange(this.onAreaChange)
  }

  componentWillUnmount () {
    unSubscribeFormChange(this.onAreaChange)
  }

  onAreaChange = (changedValues, changeField) => {
    setTimeout(() => {
      const { form } = this.props
      const regionId = form.getFieldValue(PRODUCT_FIELDS.REGION_ID)
      if ([ PRODUCT_FIELDS.REGION_ID, PRODUCT_FIELDS.REGION_NAME ].indexOf(changeField) !== -1) {
        this.setState({
          selectedRegion: regionId,
          current: 1,
        })
      }
    })
  };

  onSelect = (val) => {
    this.setState({ selectedVal: val })
  };

  // 搜索关键字
  onSearch = (val) => {
    const { selectedVal } = this.state
    this.setState({
      keyWord: val,
      queryType: selectedVal,
    })
  };

  handleTableChange = (page) => {
    this.setState({
      current: page,
    })
  };

  changeCheckboxProps = (record) => {
    const { initData } = this.props
    const changeableData = initData && initData.resourceDetailList ? initData.resourceDetailList : []
    let state = {}
    if (record.disasterRecoveryStatus === '已开通' || record.disasterRecoveryStatus === '审核中') {
      state = {
        disabled:
          record.disasterRecoveryStatus === '已开通' || record.disasterRecoveryStatus === '审核中',
        checked: true,
      }
      if (changeableData.some((item) => item.cloudInstanceId === record.cloudInstanceId)) {
        record.disasterRecoveryStatus = '未开通'
      }
    }
    if (initData && initData.resourceDetailList.length > 0) {
      initData.resourceDetailList.map((item) => {
        if (item.targetInsctanceId === record.cloudInstanceId) {
          state = {
            disabled: false,
          }
        }
      })
    }
    return state
  };

  onSelectVal = (record, flag) => {
    if (!flag) {
      if (record.disasterRecoveryStatus === '审核中') {
        record.disasterRecoveryStatus = '未开通'
      }
    }
  };

  onChange = (selectedRowKeys, selectedRows) => {
    selectedRowKeys = [ ...new Set(selectedRowKeys) ]
    const { selectedData } = this.state
    selectedData.length > 0 &&
      selectedData.map((item) => {
        selectedRows.map((items, index) => {
          if (items.cloudInstanceId === item.targetInstanceId) {
            selectedRows.splice(index, 1)
          }
        })
      })
    selectedRows.map((item) => {
      selectedRowKeys.map((rows) => {
        if (rows === item.cloudInstanceId) {
          if (
            item.disasterRecoveryStatus !== '审核中' &&
            item.disasterRecoveryStatus !== '已开通'
          ) {
            selectedData.push({
              allData: item,
              targetInstanceId: item.targetInstanceId,
            })
          }
        }
      })
    })
    // 取消勾选时的操作
    const newKeys = new Set(selectedRowKeys)
    const otherData = selectedData.length > 0 && selectedData.filter((item) => !newKeys.has(item.targetInstanceId))
    otherData.length > 0 &&
      otherData.map((item) => {
        selectedData.map((items, index) => {
          if (items.targetInstanceId === item.targetInstanceId) {
            selectedData.splice(index, 1)
          }
        })
      })
    this.setState({
      selectedData,
      selectedRowKeys,
    })

    // 临时解决方案
    this.props.form.setFieldsValue({ aaaaaaSUSUDADKJKDJAKSA: selectedData.length > 0 ? '#' : '' })
  };

  render () {
    const {
      selectedData,
      keyWord,
      queryType,
      selectedRegion,
      current,
      selectedRowKeys,
    } = this.state
    const { loading, form, initData } = this.props
    const changeableData = initData && initData.resourceDetailList ? initData.resourceDetailList : []
    form.resetFields([ PRODUCT_FIELDS.RESOURCE_DETAIL_LIST ])
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onChange,
      onSelect: this.onSelectVal,
      getCheckboxProps: this.changeCheckboxProps,
    }
    const statusList = Object.values(DISASTER_RECOVERY_STATUS_MAP_TEXT).map((key) => ({
      text: key,
      value: key,
    }))
    const quryList = Object.values(STATUS_MAP_QUERY_BACK_UP_ALIAS).map((key) => ({
      key,
      value: key,
      text: STATUS_MAP_QUERY_BACK_UP[key],
    }))
    const columns = [
      {
        width: 80,
        title: ' ',
        dataIndex: 'disasterRecoveryStatus',
        render: (record) => {
          if (record === '已开通') {
            return <div className={styles.divRadius}>已开通</div>
          } if (
            record === '审核中' &&
            !changeableData.some((item) => item.cloudInstanceId === record.cloudInstanceId)
          ) {
            return <div className={styles.divRadius}>审核中</div>
          }
          return ' '
        },
      },
      {
        width: 100,
        title: '资源',
        dataIndex: 'productCode',
        filters: statusList,
        filtered: true,
        noTips: true,
      },
      {
        width: 200,
        title: '实例ID/名称',
        render: (record) => {
          let content = ''
          if (record.productCode === 'OSS') {
            content = '-'
          } else {
            content = record.cloudInstanceId
          }
          return (
            <>
              <div>
                <a>{content}</a>
              </div>
              <div>{record.cloudInstanceName}</div>
            </>
          )
        },
      },
      {
        width: 150,
        title: '区域',
        render: (record) => (
          <span>
            {record.areaName}
            -
            {record.regionName}
          </span>
        ),
      },
      {
        width: 220,
        title: '项目',
        dataIndex: 'projectName',
        render: (record) => record || '-',
      },
      {
        width: 200,
        title: '规格',
        render: (record) => {
          let content = null
          switch (record.productCode) {
            case 'RDS':
              content = (
                <>
                  <div>
                    <span style={{ color: '#999' }}>CPU/内存:</span>
                    {record.cpuMemory}
                  </div>
                  <div>
                    <span style={{ color: '#999' }}>存储:</span>
                    {' '}
                    {record.storage}
                  </div>
                </>
              )
              break
            case 'ECS':
              content = (
                <>
                  <div>
                    <span style={{ color: '#999' }}>CPU/内存:</span>
                    {record.specification}
                  </div>
                  <div>
                    <span style={{ color: '#999' }}>系统盘:</span>
                    {record.systemDiskType}
                    ,
                    {record.systemDiskSize}
                    GB
                  </div>
                  {record.dataDiskList
                    .filter((item) => item.diskType === 'data')
                    .map((item) => (
                      <div key={item.id}>
                        <span style={{ color: '#999' }}>数据盘:</span>
                        {item.typeName}
                        ,
                        {item.storageMax}
                        GB
                      </div>
                    ))}
                </>
              )
              break
            case 'SLB':
              content = (
                <div>
                  <span style={{ color: '#999' }}>网络类型:</span>
                  {record.netWorkType}
                </div>
              )
              break
            case 'Redis':
              content = (
                <div>
                  <span style={{ color: '#999' }}>实例类型:</span>
                  {record.instanceType}
                </div>
              )
              break
            case 'OSS':
              content = (
                <div>
                  <span style={{ color: '#999' }}>容量:</span>
                  {record.storage}
                </div>
              )
              break
            default:
              break
          }
          return content
        },
      },
      {
        title: '开通时间',
        width: 250,
        dataIndex: 'cloudOpenTime',
        render: (record) => (
          <span>{record ? moment(record).format('YYYY-MM-DD HH:mm:ss') : '-'}</span>
        ),
      },
    ]
    return (
      <>
        <Select
          style={{ width: 150, marginLeft: -112, marginTop: 50 }}
          defaultValue="实例名称" // 默认选择的值
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
        <TableX
          api={selectedRegion ? queryRecoveryList : null}
          beforeRequest={(pagination, filter) => ({
            page: current,
            limit: pagination.pageSize,
            productCode: filter.productCode ? filter.productCode.join(',') : null,
          })}
          params={{
            keyWord,
            queryType,
            resourceType: 'DisasterRecovery',
            regionId: selectedRegion,
          }}
          afterRequest={({ resData }) => ({
            list: resData.list,
            total: resData.totalCount,
          })}
          style={{ marginLeft: -145 }}
          className={styles.table}
          pagination={{
            current,
            onChange: this.handleTableChange,
          }}
          columns={columns}
          loading={loading}
          rowKey={(record) => record.cloudInstanceId}
          rowSelection={rowSelection}
          scroll={{ y: 500, x: 800 }}
        />

        {form.getFieldDecorator('aaaaaaSUSUDADKJKDJAKSA', {
          initialValue: selectedData.map(() => '#').join(''),
          rules: [
            (rule, value, callback) => {
              if (value) {
                return callback()
              }
              message.error('请选择需要容灾的实例资源！')
              return null
            },
          ],
        })}
        {form.getFieldDecorator('resourceDetailList', {
          initialValue: selectedData,
        })}
      </>
    )
  }
}

export default DisasterRecovery
