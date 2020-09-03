/**
 * 异地备份申请
 */

import React, { PureComponent } from 'react'
import moment from 'moment'
import { connect } from 'dva'
import _ from 'lodash'
import {
  Input, Select, message, Icon,
} from 'antd'
import LeftTitle from '@/components/OperationCenter/LeftTitle'
import { RecoveryConfigInfo, OSSRecoveryConfigInfo, RDSRecoveryConfigInfo } from '@/components/OperationCenter/Product/base'
import TableX from '@/components/Common/TableX'
import { queryBackUpRecoveryList } from '@/services/OperationCenter/operationOrder'
import {
  STATUS_MAP_QUERY_BACK_UP_ALIAS,
  STATUS_MAP_QUERY_BACK_UP,
} from '@/pages/OperationCenter/OperationOrder/contant'
import { FORM_ICON, PRODUCT_FIELDS as PF } from '../Product/base/_constant'
import { subscribeFormChange, unSubscribeFormChange } from '../Product/index'
import TableSearch from './tableSearch'

import styles from './index.less'

@connect(({ pageData, operationOrder }) => ({
  recoveryList: pageData.recoveryList,
  offSiteBackupData: operationOrder.offSiteBackupData,
}))
class RecoveryList extends PureComponent {
  constructor (props) {
    super(props)
    const expandedRowKeys = props.initData && props.initData.resourceDetailList.length > 0
      ? props.initData.resourceDetailList.map((item) => item.cloudInstanceId)
      : []
    this.state = {
      expandedRowKeys,
      copyData: {},
      selectedData: {},
      selectedRegion: (props.initData && props.initData.regionId) || null,
      current: 1,
      isProjectNameSearch: false, // 项目搜索
      isCloudInstanceNameSearch: false, // 实例搜索
      selectProductCode: '', // 搜索类型
      projectNameValue: '', // 项目搜索词
      keyWordValue: '', // 实例搜索词
      isAsc: false, // 开通时间排序，默认正序
    }
    const { selectedData } = this.state
    const dealData = selectedData
    props.initData &&
      props.initData.resourceDetailList.length > 0 &&
      props.initData.resourceDetailList.map((item) => {
        Object.assign(dealData, {
          [item.cloudInstanceId]: {
            ...item,
            otherData: item,
            [PF.PREFERRED_BACK_UP_PERIOD]:
              item.preferredBackupPeriod &&
              (Array.isArray(item.preferredBackupPeriod)
                ? item.preferredBackupPeriod
                : item.preferredBackupPeriod.split(',')),
          },
        })
      })
    this.setState({
      selectedData: {
        ...selectedData,
        ...dealData,
      },
    }, () => {
      props.dispatch({
        type: 'resourceApply/setter',
        payload: {
          recoveryList: {
            ...selectedData,
            ...dealData,
          },
        },
      })
    })
  }

  componentDidMount () {
    subscribeFormChange(this.onFormChange)
  }

  componentWillUnmount () {
    unSubscribeFormChange(this.onFormChange)
  }

  onFormChange = (changedValues, changeField) => {
    setTimeout(() => {
      const { form } = this.props
      const regionId = form.getFieldValue(PF.REGION_ID)
      if ([ PF.REGION_ID, PF.REGION_NAME ].indexOf(changeField) !== -1) {
        this.setState({
          selectedRegion: regionId,
        })
      }
      if (Array.isArray(changeField)) {
        return
      }
      const value = changedValues[changeField]
      if (changeField === 'resourceDetailList') {
        value && this.getSelectedData(value)
      } else {
        const arrData = changeField.split('.')
        value && this.getSelectedData({ [arrData[1]]: { [arrData[2]]: value } })
      }
    })
  };

  getSelectedData = (param) => {
    const { dispatch } = this.props
    let { selectedData } = this.state
    let newData = {}
    if (!selectedData[Object.keys(param)[0]]) {
      newData = {
        ...selectedData,
        ...param,
      }
    } else {
      Object.keys(selectedData).map((item) => {
        if (item === Object.keys(param)[0]) {
          if (Object.keys(selectedData[item]).indexOf(Object.keys(param[item])[0]) < 0) {
            selectedData[item][Object.keys(param[item])[0]] = param[item][Object.keys(param[item])[0]]
          } else {
            selectedData = {
              ...selectedData,
              [item]: {
                ...selectedData[item],
                ...Object.values(param)[0],
              },
            }
          }
        }
      })

      newData = {
        ...selectedData,
      }
    }
    this.setState({
      selectedData: newData,
    }, () => {
      dispatch({
        type: 'resourceApply/setter',
        payload: {
          recoveryList: newData,
        },
      })
    })
    delete selectedData[undefined]
  };


  changeCheckboxProps = (record) => {
    const { selectedData, expandedRowKeys } = this.state
    const { initData } = this.props
    const changeableData = initData && initData.resourceDetailList ? initData.resourceDetailList : []
    let state = {}
    if (record.backUpStatus === '已开通' || record.backUpStatus === '审核中') {
      record.disabled = true
      state = {
        disabled: record.backUpStatus === '已开通' || record.backUpStatus === '审核中',
        checked: true,
      }
      if (changeableData.some((item) => item.cloudInstanceId === record.cloudInstanceId)) {
        record.backUpStatus = '未开通'
        record.disabled = false
        state = {
          disabled: false,
        }
      }
      if (Object.keys(selectedData).some((item) => item === record.cloudInstanceId)) {
        if (expandedRowKeys.indexOf(record.cloudInstanceId) < 0) {
          expandedRowKeys.push(record.cloudInstanceId)
        }
        this.setState({ expandedRowKeys })
        record.disabled = false
        state = {
          disabled: false,
        }
      }
    }
    return state
  };

  onExpand = (record, flag) => {
    const { expandedRowKeys, selectedData } = this.state
    const { dispatch } = this.props
    if (flag && expandedRowKeys.indexOf(record.cloudInstanceId) < 0) {
      expandedRowKeys.push(record.cloudInstanceId)
      this.setState({
        expandedRowKeys,
      })
    } else {
      expandedRowKeys.splice(expandedRowKeys.indexOf(record.cloudInstanceId), 1)
      this.setState({
        expandedRowKeys,
      })
    }
    this.closeCheckEvent(record)
    if (selectedData[record.cloudInstanceId]) {
      delete selectedData[record.cloudInstanceId]
    }
    this.setState({
      selectedData,
    }, () => {
      dispatch({
        type: 'resourceApply/setter',
        payload: {
          recoveryList: selectedData,
        },
      })
    })
  };

  closeCheckEvent = (record) => {
    // 取消勾选时
    const { form } = this.props
    const listName = `${PF.RESOURCE_DETAIL_LIST}.${record.cloudInstanceId}`
    record[PF.PREFERRED_BACK_UP_TIME] = undefined
    record[PF.BACK_UP_RETENTION_PERIOD] = undefined
    record[PF.PREFERRED_BACK_UP_PERIOD] = undefined
    form.setFieldsValue({
      [`${listName}.${PF.PREFERRED_BACK_UP_PERIOD}`]: undefined,
      [`${listName}.${PF.PREFERRED_BACK_UP_TIME}`]: undefined,
      [`${listName}.${PF.BACK_UP_RETENTION_PERIOD}`]: undefined,
    })
  };

  renderExpandedRow = (record) => {
    const { form, formItemLayout } = this.props
    const { copyData, selectedData, expandedRowKeys } = this.state
    const formProps = {
      form,
      formItemLayout,
    }
    if (expandedRowKeys.indexOf(record.targetInstanceId) < 0) {
      return null
    }
    return (
      <LeftTitle title="异地备份设置" icon={FORM_ICON.BACK_UP} noDivider>
        {record.productCode === 'RDS'
          ? (
            <RDSRecoveryConfigInfo
              selectedData={selectedData}
              id={record.cloudInstanceId}
              key={record.cloudInstanceId}
              {...formProps}
              record={record}
              copyClick={this.copyClick}
              operateData={copyData}
              changeState={this.changeState}
            />
          )
          : (
            <OSSRecoveryConfigInfo
              selectedData={selectedData}
              id={record.cloudInstanceId}
              key={record.cloudInstanceId}
              {...formProps}
              record={record}
              copyClick={this.copyClick}
              operateData={copyData}
              changeState={this.changeState}
            />
          )}
      </LeftTitle>
    )
  };

  copyClick = (val) => {
    this.setState({
      copyData: { ...val },
    })
  };

  changeState=(val) => {
    const { selectedData } = this.state
    const { dispatch } = this.props
    this.setState({
      selectedData: { ...selectedData, ...val },
    }, () => {
      dispatch({
        type: 'resourceApply/setter',
        payload: {
          recoveryList: { ...selectedData, ...val },
        },
      })
    })
  }

  selectRow = (record) => {
    const { expandedRowKeys, selectedData } = this.state
    const { dispatch } = this.props
    if (expandedRowKeys.indexOf(record.cloudInstanceId) > -1) {
      expandedRowKeys.splice(expandedRowKeys.indexOf(record.cloudInstanceId), 1)
      this.closeCheckEvent(record)
      if (selectedData[record.cloudInstanceId]) {
        delete selectedData[record.cloudInstanceId]
      }
      this.setState({
        selectedData,
      }, () => {
        dispatch({
          type: 'resourceApply/setter',
          payload: {
            recoveryList: selectedData,
          },
        })
      })
    } else {
      expandedRowKeys.push(record.cloudInstanceId)
    }
    this.setState({ expandedRowKeys: [ ...expandedRowKeys ] })
  };

  setSearch = (key) => {
    if (key === 'cloudInstanceName') {
      this.setState({
        isCloudInstanceNameSearch: true,
      })
    } else {
      this.setState({
        isProjectNameSearch: true,
      })
    }
  }

  // 搜索关键字
  onSearch1 = (value) => {
    this.setState({
      keyWordValue: value,
      current: 1,
    })
  };

  // 搜索关键字
  onSearch2 = (value) => {
    this.setState({
      projectNameValue: value,
      current: 1,
    })
  };

  onBlur1 = (value) => {
    const { isCloudInstanceNameSearch } = this.state
    if (!value && isCloudInstanceNameSearch) {
      this.setState({
        isCloudInstanceNameSearch: false,
      })
      this.onSearch1(value)
    }
  }

  onBlur2 = (value) => {
    const { isProjectNameSearch } = this.state
    if (!value && isProjectNameSearch) {
      this.setState({
        isProjectNameSearch: false,
      })
      this.onSearch2(value)
    }
  }

  handleTableChange = (page) => {
    this.setState({
      current: page,
    })
  };

  getFilters = (productCode, sorter) => {
    if (productCode) {
      this.setState({
        selectProductCode: productCode.toLocaleString(),
      })
    }
    if (sorter && sorter === 'ascend') {
      this.setState({
        isAsc: true,
      })
    } else {
      this.setState({
        isAsc: false,
      })
    }
  }

  handleClickHeader (row) {
    const { key } = row
    return {
      onClick: () => {
        if (key === 'cloudInstanceName') {
          this.setState({
            isCloudInstanceNameSearch: true,
          })
        } else {
          this.setState({
            isProjectNameSearch: true,
          })
        }
      },
    }
  }

  render () {
    const {
      expandedRowKeys,
      keyWordValue,
      projectNameValue,
      selectedRegion,
      current,
      selectedData,
      selectProductCode,
      isProjectNameSearch,
      isCloudInstanceNameSearch,
      isAsc,
    } = this.state
    const { loading, form, initData } = this.props
    delete selectedData[undefined]
    const changeableData = initData &&
      initData.resourceDetailList
      ? initData.resourceDetailList : []
    const rowSelection = {
      selectedRowKeys: expandedRowKeys,
      columnTitle: ' ',
      onSelect: this.onExpand,
      getCheckboxProps: this.changeCheckboxProps,
    }
    // const quryList = Object.values(STATUS_MAP_QUERY_BACK_UP_ALIAS).map(key => ({
    //   key,
    //   value: key,
    //   text: STATUS_MAP_QUERY_BACK_UP[key],
    // }));
    const columns = [
      {
        width: 80,
        title: ' ',
        render: (record) => {
          if (record.backUpStatus === '已开通') {
            return <div className={styles.divRadius}>已开通</div>
          } if (
            record.backUpStatus === '审核中' &&
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
        filters: [
          {
            text: '全部',
            value: 'ALL',
          },
          {
            text: 'RDS',
            value: 'RDS',
          },
          {
            text: 'OSS',
            value: 'OSS',
          },
        ],
        filterMultiple: false,
        // onFilter: (value, record) => this.setFilterValue(value, record),
      },
      {
        key: 'cloudInstanceName',
        width: 200,
        onHeaderCell: (row) => this.handleClickHeader(row),
        title: () => (
          isCloudInstanceNameSearch ? <TableSearch onSearch={(value) => this.onSearch1(value)} onBlur={(value) => this.onBlur1(value)} placeholder="实例ID/名称" /> : (
            <span style={{ cursor: 'pointer' }}>
              实例ID/名称
              <Icon type="search" style={{ marginLeft: '5px' }} />
            </span>
          )
        ),
        render: (record) => (
          <>
            <div>
              <a>{record.cloudInstanceId}</a>
            </div>
            <div>{record.cloudInstanceName}</div>
          </>
        ),
      },
      {
        width: 150,
        title: '区域',
        // dataIndex: 'regionName',
        render: (record) => (
          <span>
            {record.areaName}
            -
            {record.regionName}
          </span>
        ),
      },
      {
        key: 'projectName',
        width: 220,
        onHeaderCell: (row) => this.handleClickHeader(row),
        title: () => (
          isProjectNameSearch ? <TableSearch onSearch={(value) => this.onSearch2(value)} onBlur={(value) => this.onBlur2(value)} placeholder="项目" /> : (
            <span style={{ cursor: 'pointer' }}>
              项目
              <Icon type="search" style={{ marginLeft: '5px' }} />
            </span>
          )
        ),
        dataIndex: 'projectName',
        render: (text) => text || '-',
      },
      {
        width: 200,
        title: '规格',
        render: (record) => (
          <>
            <div>
              <span style={{ color: '#999' }}>CPU/内存:</span>
              {record.cpuMemory}
            </div>
            <div>
              <span style={{ color: '#999' }}>存储:</span>
              {record.storage}
            </div>
          </>
        ),
      },
      {
        title: '开通时间',
        width: 250,
        dataIndex: 'cloudOpenTime',
        render: (text) => <span>{text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : '-'}</span>,
        sorter: true,
      },
    ]
    // form.setFieldsValue({[`${PF.RESOURCE_DETAIL_LIST}.submitData`]:selectedData});
    return (
      <>
        {/* <Select
          style={{ width: 150, marginLeft: -112, marginTop: 50 }}
          defaultValue="实例名称" // 默认选择的值
          optionFilterProp="children"
          onSelect={this.onSelect}
        >
          {quryList.map(item => (
            <Option key={item.value} value={item.value}>
              {item.text}
            </Option>
          ))}
        </Select> */}
        {/* <Search
          placeholder="请输入查询内容"
          onSearch={this.onSearch}
          style={{ width: 200, margin: '0 16px 24px' }}
          allowClear
        /> */}
        <TableX
          api={selectedRegion ? queryBackUpRecoveryList : null}
          beforeRequest={() => ({
            page: current,
            limit: 10,
          })}
          params={{
            keyWord: keyWordValue,
            projectName: projectNameValue,
            resourceType: 'BackUp',
            regionId: selectedRegion,
            productCode: selectProductCode || 'ALL',
            isAsc: isAsc || false,
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
          getFilters={(filters, sorter) => this.getFilters(filters, sorter)}
          columns={columns}
          scroll={{ y: 500, x: 800 }}
          loading={loading}
          rowKey={(record) => record.cloudInstanceId}
          expandedRowKeys={expandedRowKeys}
          expandIcon={() => ''}
          rowSelection={rowSelection}
          expandedRowRender={(record) => this.renderExpandedRow(record)}
          onRowClick={(record) => this.selectRow(record)}
        />
        {form.getFieldDecorator([ `${PF.RESOURCE_DETAIL_LIST}.submitData` ], {
          initialValue: selectedData,
          rules: [
            (rule, value, callback) => {
              value = selectedData
              if (value && Object.values(value).length > 0) {
                const val = Object.values(value).map((item) => {
                  if (item.targetProductCode === 'RDS') {
                    const isArr = Array.isArray(item.preferredBackupPeriod)
                    const hasValue = isArr
                      ? !item.preferredBackupPeriod.length
                      : !item.preferredBackupPeriod
                    if (
                      !item.preferredBackupTime ||
                      hasValue ||
                      !item.backupRetentionPeriod
                    ) {
                      return item.targetInstanceId
                    }
                  } else if (item.targetProductCode === 'OSS') {
                    const OSShasValue = item.backupTimeInterval && item.backupTimeInterval >= 0
                    if (
                      !item.preferredBackupTime ||
                      !OSShasValue ||
                      !item.backupRetentionPeriod
                    ) {
                      return item.targetInstanceId
                    }
                  }
                  // const isArr = Array.isArray(item.preferredBackupPeriod);
                  // const hasValue = isArr
                  //   ? !item.preferredBackupPeriod.length
                  //   : !item.preferredBackupPeriod;
                  // const OSShasValue = item.backupTimeInterval && item.backupTimeInterval >= 0;
                  // if (
                  //   !item.preferredBackupTime
                  //   || hasValue
                  //   || !item.backupRetentionPeriod
                  //   || OSShasValue
                  // ) {
                  //   return item.targetInstanceId;
                  // }
                })
                if (val && _.compact(val).length > 0) {
                  const text = `${_.compact(val).join(',')} 配置信息未填写完整！`
                  message.error(text)
                  return null
                }
                return callback()
              }
              message.error('未设置参数')
              return null
            },
          ],
        })}
      </>
    )
  }
}
export default RecoveryList
