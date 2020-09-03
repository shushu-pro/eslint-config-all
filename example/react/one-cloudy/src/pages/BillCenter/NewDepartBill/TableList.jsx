
import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Table, Icon, DatePicker, Input, Button } from 'antd'
import moment from 'moment'

import AddTooltip from '@/components/Common/AddTooltip'
import { getFloatStr } from '@/utils/utils'
import InfoModal from '@/components/BillCenter/BillSend/InfoModal'
import {
  getDate, getWantedColumns, REGION_ID_TEXT_MAP,
} from '../constant'
import styles1 from './index.less'
const { RangePicker } = DatePicker
@connect(({ newDepartBill, loading }) => ({
  ...newDepartBill,
  loading: !!loading.effects['newDepartBill/getDeptMonthProdList'],
  tableLoading: !!loading.effects['newDepartBill/getDeptMonthProdList'],
}))
class TableList extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      recordData: {},
      visible: false,
      productNameList: [],
      sortedInfo: {
        columnKey: '',
        order: '',
      },
      filteredInfo: {
        productName: [],
      },
      resData: {},
      projectName: props.projectName,
    }
    this.billNo = props.billNo
  }

  componentDidMount () {
    const { onRef } = this.props
    if (onRef) {
      onRef(this)
    }
    this.queryAllData()
    this.queryAllProductName()
  }

  queryAllData = () => {
    this.queryList()
  };

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

  // 资源列表接口
  queryList = (params = {}) => {
    const { instanceIdOrName, projectName, openTimeBegin, openTimeEnd, department, productName } = this.state
    const { dispatch, url, region, projectNameUrl } = this.props
    const payload = {
      ...params,
      billNo: this.billNo,
      current: params.current || '1',
      pageSize: params.pageSize || '10',
      region: region === 'all' ? undefined : region,
      instanceIdOrName: instanceIdOrName || undefined,
      projectName: projectNameUrl || projectName || undefined,
      openTimeBegin: openTimeBegin && `${openTimeBegin} 00:00:00` || undefined,
      openTimeEnd: openTimeEnd && `${openTimeEnd} 23:59:59` || undefined,
      department: department || undefined,
      productName: productName || undefined,
    }


    this.setState({
      payload,
    })
    /* eslint-enable */

    dispatch({
      type: url,
      payload,
      callback: e => {
        if (e.code === 200) {
          this.setState({
            resData: e.resData,
          })
        }
      },
    })
  };


  onSearch = () => {
    this.queryList({})
  }


  // 重置排序和筛选框内容
  onReset=() => {
    this.clearFilters()
    this.setState({
      instanceIdOrName: '',
      projectName: '',
      department: '',
      productName: '',
      sortedInfo: {
        columnKey: '',
        order: '',
      },
      filteredInfo: {
        productName: [],
      },
      openTimeBegin: null,
      openTimeEnd: null,
    })
  }

  onChangeTime= (value, dateString) => {
    this.setState({
      openTimeBegin: dateString[0],
      openTimeEnd: dateString[1],
    }, () => {
      this.queryList()
    })
  }

  getColumnTimeSearchProps = () => ({
    filterDropdown: () => {
      const { openTimeBegin, openTimeEnd } = this.state
      return (
        <div style={{ padding: 8 }}>
          <RangePicker onChange={this.onChangeTime} value={[ openTimeBegin && moment(openTimeBegin) || null, openTimeEnd && moment(openTimeEnd) || null ]} />
        </div>
      )
    },
    filterIcon: () => {
      const { openTimeBegin, openTimeEnd } = this.state
      return <Icon type='schedule' style={{ color: openTimeBegin && openTimeEnd ? '#1890ff' : undefined }} />
    },
  });


  changeRegionnameToOcregion = (name) => {
    const keyList = Object.keys(REGION_ID_TEXT_MAP)
    for (const i of keyList) {
      if (REGION_ID_TEXT_MAP[i] === name) {
        return i
      }
    }
  }

  // 查看某条资源
  onShow = (e, record) => {
    record.ocRegion = this.changeRegionnameToOcregion(record.regionName)
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

    // table的操作
    onChange = (pagination, filters, sorter) => {
      let params = {
        current: pagination.current,
        pageSize: pagination.pageSize,
        sortByFee: undefined,
      }
      if (filters && JSON.stringify(filters) !== '{}') {
        const productName = filters.productName.join(',')
        params = {
          ...params,
          productName,
        }
      }

      if (sorter && JSON.stringify(sorter) !== '{}') {
        params = {
          ...params,
          sortByFee: sorter.order ? (sorter.order === 'ascend' ? 0 : 1) : undefined,
        }
      }
      /* eslint-enable */
      this.setState({
        sortedInfo: sorter,
        filteredInfo: filters,
        ...params,
      }, () => {
        this.queryList({
          ...params,
        })
      })
    };

    getColumnSearchProps = dataIndex => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, clearFilters }) => {
        let placeholder
        if (dataIndex === 'instanceIdOrName') {
          placeholder = '搜索实例ID/名称'
        }
        if (dataIndex === 'projectName') {
          placeholder = '搜索项目名称'
        }
        if (dataIndex === 'department') {
          placeholder = '搜索部门名称'
        }
        this.clearFilters = clearFilters
        return (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => {
                this.searchInput = node
              }}
              placeholder={placeholder}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [ e.target.value ] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, dataIndex)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button
              type="primary"
              onClick={() => this.handleSearch(selectedKeys, dataIndex)}
              icon="search"
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              搜索
            </Button>
            <Button onClick={() => this.handleReset(clearFilters, dataIndex)} size="small" style={{ width: 90 }}>
              重置
            </Button>
          </div>
        )
      },
      filterIcon: () => {
        const { instanceIdOrName, projectName, department } = this.state
        let color
        if (dataIndex === 'instanceIdOrName') {
          if (instanceIdOrName) {
            color = '#1890ff'
          } else {
            color = 'rgba(0, 0, 0, 0.85)'
          }
        }
        if (dataIndex === 'projectName') {
          if (projectName) {
            color = '#1890ff'
          } else {
            color = 'rgba(0, 0, 0, 0.85)'
          }
        }
        if (dataIndex === 'department') {
          if (department) {
            color = '#1890ff'
          } else {
            color = 'rgba(0, 0, 0, 0.85)'
          }
        }
        return (
          <Icon type="search" style={{ color }} />
        )
      },
      onFilter: (value, record) =>
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => this.searchInput.select())
        }
      },
    });

    handleSearch = (selectedKeys, dataIndex) => {
      this.setState({
        [dataIndex]: selectedKeys[0],
      }, () => {
        this.onSearch()
      })
    };

    handleReset = (clearFilters, dataIndex) => {
      clearFilters()
      this.setState({
        [dataIndex]: '',
      }, () => {
        this.onSearch()
      })
    };


    render () {
      const { recordData, visible, instanceIdOrName, projectName, department, productNameList, sortedInfo, filteredInfo, resData, openTimeBegin, openTimeEnd } = this.state
      const { wantedList } = this.props
      // const { name,type } = location.query;

      const { size, total, current, records } = resData
      const columns = [
        {
          title: instanceIdOrName || '实例ID/名称',
          dataIndex: 'instanceIdOrName',
          key: 'instanceIdOrName',
          width: 200,
          className: `${styles1.textNoBorder} ${instanceIdOrName ? styles1.haveSearchContent : ''}`,
          render: (_, record) => (
            <div>
              <AddTooltip text={record.instanceId || '-'}>
                {
                  record.instanceId
                    ? <a style={{ display: 'block' }} onClick={e => this.onShow(e, record)}>
                      {record.instanceId || '-'}
                    </a>
                    : <div>
                      {record.instanceId || '-'}
                    </div>
                }
              </AddTooltip>
              <AddTooltip text={record.instanceName || '-'}>
                {
                  record.instanceId
                    ? <div>
                      {record.instanceName || '-'}
                    </div>
                    : <a style={{ display: 'block' }} onClick={e => this.onShow(e, record)}>
                      {record.instanceName || '-'}
                    </a>
                }
              </AddTooltip>
            </div>
          ),
          ...this.getColumnSearchProps('instanceIdOrName'),
        },
        {
          title: '资源',
          filters: productNameList,
          filteredValue: filteredInfo && filteredInfo.productName || null,
          dataIndex: 'productName',
          key: 'productName',
        },
        {
          title: department || '部门',
          dataIndex: 'department',
          key: 'department',
          className: `${styles1.textNoBorder} ${department ? styles1.haveSearchContent : ''}`,
          render: _ => <AddTooltip text={_}>{_}</AddTooltip>,
          ...this.getColumnSearchProps('department'),
        },
        {
          title: projectName || '项目',
          dataIndex: 'projectName',
          key: 'projectName',
          className: `${styles1.tdwrap} ${projectName ? styles1.haveSearchContent : ''}`,
          render: _ => <AddTooltip text={_}><span className={styles1.ellspan}>{_}</span></AddTooltip>,
          ...this.getColumnSearchProps('projectName'),
        },
        {
          title: '规格',
          dataIndex: 'productSepcs',
          key: 'productSepcs',
          className: `${styles1.tdwrap}`,
          render: _ => <AddTooltip text={_}><span className={styles1.ellspan}>{_}</span></AddTooltip> || '-',
        },
        {
          title: openTimeBegin && openTimeEnd ? `${openTimeBegin}-${openTimeEnd}` : '开通时间',
          dataIndex: 'openTime',
          width: 200,
          className: `${styles1.tdwrap} ${openTimeBegin && openTimeEnd ? styles1.haveSearchContent : ''}`,
          key: 'open_time',
          ...this.getColumnTimeSearchProps('name'),
          render: _ => getDate(_),
        },
        {
          title: '费用',
          dataIndex: 'monthfee',
          key: 'monthfee',
          sorter: true,
          sortOrder: sortedInfo.columnKey === 'monthfee' && sortedInfo.order,
          render: _ => getFloatStr(_),
        },
      ]
      return (
        <div>
          <Table
            style={{ marginTop: '16px', background: '#fff', overflow: 'auto' }}
            rowKey={record => record.seqno}
            dataSource={records}
            columns={getWantedColumns(wantedList, columns)}
            onChange={this.onChange}
            className={styles1.detailTable}
            getPopupContainer={() => document.getElementById('root')}
            pagination={
              {
                pageSize: size || 10,
                total,
                current: current || 1,
                showSizeChanger: true,
                pageSizeOptions: [ '10', '20', '50' ],
              }
            }
          />
          <InfoModal data={recordData} visible={visible} onCancel={this.onHide} />
        </div>

      )
    }
}

export default TableList
