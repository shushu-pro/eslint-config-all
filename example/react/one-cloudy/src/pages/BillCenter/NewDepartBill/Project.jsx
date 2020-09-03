import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Icon, Spin, Table, Input, Button, message } from 'antd'
import StackPanel from '@/components/Common/StackPanel'
import { getFloatStr } from '@/utils/utils'
import { Link } from 'umi'
import AddTooltip from '@/components/Common/AddTooltip'
import { getBill, transformMomAndYoy, transformData, fetchTypeExport } from '../constant'
import styles1 from './index.less'
@connect(({ billCenter, loading }) => ({
  ...billCenter,
  loading: !!loading.effects['newDepartBill/listProjectBillSumInfo'],
}))
class Resource extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      payload: {},
      sortedInfo: {
        columnKey: '',
        order: '',
      },
      resData: {},
      projectName: '',
      department: '',
    }
    this.billNo = getBill(props)
  }

  componentDidMount () {
    this.queryList()
  }

  queryList = (params = {}) => {
    const { dispatch, match } = this.props
    const { departmentId } = match.params
    const { projectName, department } = this.state
    const payload = {
      ...params,
      billNo: this.billNo,
      current: params.current || '1',
      pageSize: params.pageSize || '10',
      departmentId: departmentId || undefined,
      projectName: projectName || undefined,
      department: department || undefined,
    }
    dispatch({
      type: 'newDepartBill/listProjectBillSumInfo',
      payload,
      callback: e => {
        if (e.code === 200) {
          this.setState({
            resData: e.resData,
            payload,
          })
        }
      },
    })
  };


  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, clearFilters }) => {
      this.clearFilters = clearFilters
      return (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => {
              this.searchInput = node
            }}
            placeholder={dataIndex === 'projectName' ? '搜索项目名称' : '搜索部门名称'}
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
      const { projectName, department } = this.state
      let color
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


  onSearch = () => {
    this.queryList()
  }

  // 切换表格
  onChange= (pagination, filters, sorter) => {
    // const { searchText } = this.state;
    let params = {}
    if (sorter && JSON.stringify(sorter) !== '{}') {
      params = {
        orderType: sorter.order ? (sorter.order === 'ascend' ? 0 : 1) : '',
        orderBy: sorter.column && this.switchSortOrder(sorter.columnKey) || '',
      }
    }
    /* eslint-enable */

    this.setState({
      sortedInfo: sorter,
      ...params,
    })
    this.queryList({
      current: pagination.current,
      pageSize: pagination.pageSize,
      ...params,
    })
  }

  switchSortOrder = (columnKey) => {
    switch (columnKey) {
      case 'productNum':
        return 2
      case 'fee':
        return 3
      case 'mom':
        return 4
      case 'yoy':
        return 5
      default:
        return null
    }
  }


  onExport = (params = {}) => {
    message.info('正在导出中，请稍等')
    const { payload } = this.state
    params = {
      ...payload,
    }
    fetchTypeExport({
      type: 'GET',
      url: 'oc/bill/deptBillInfo/listProjectBillSumInfo/export',
      param: params,
      name: 'zhangdan',
    })
  }

  setBillStatic =(record) => {
    const { dispatch } = this.props
    dispatch({
      type: 'setBillData/setbillStatic',
      payload: {
        billStatic: record,
      },
    })
  }


  render () {
    const { projectName, department, sortedInfo, resData } = this.state
    const { loading } = this.props
    const { size, total, current, records } = resData
    const columns = [
      {
        title: projectName || '项目名称',
        dataIndex: 'projectName',
        width: 200,
        className: `${styles1.textNoBorder} ${projectName ? styles1.haveSearchContent : ''}`,
        render: (_, record) => {
          const project = record && record.projectName
          return (
            <AddTooltip text={_}>
              <Link
                to={`/manage/bill-center/newDepartBill/billdetails/${this.billNo}?projectName=${project}`}
                onClick={() => { this.setBillStatic(record) }}
              >
                {_}
              </Link>
            </AddTooltip>
          )
        },
        ...this.getColumnSearchProps('projectName'),
      },
      {
        title: department || '所属部门',
        dataIndex: 'department',
        width: 200,
        className: `${styles1.textNoBorder} ${department ? styles1.haveSearchContent : ''}`,
        render: _ => _ || '-',
        ...this.getColumnSearchProps('department'),
      },
      {
        title: '资源数量',
        dataIndex: 'productNum',
        sorter: true,
        sortOrder: sortedInfo.columnKey === 'productNum' && sortedInfo.order,
        render: _ => transformData(_),
      },
      {
        title: '费用',
        dataIndex: 'fee',
        sorter: true,
        sortOrder: sortedInfo.columnKey === 'fee' && sortedInfo.order,
        render: _ => getFloatStr(_),
      },
      {
        title: '环比',
        dataIndex: 'mom',
        sorter: true,
        sortOrder: sortedInfo.columnKey === 'mom' && sortedInfo.order,
        render: _ => transformMomAndYoy(_),
      },
      {
        title: '同比',
        dataIndex: 'yoy',
        sorter: true,
        sortOrder: sortedInfo.columnKey === 'yoy' && sortedInfo.order,
        render: _ => transformMomAndYoy(_),
      },
    ]
    return (
      <Spin spinning={loading}>
        <div style={{ marginTop: '20px', marginRight: '20px' }}>
          <StackPanel>
            <StackPanel.RightAlice>
              <a
                key="export"
                onClick={this.onExport}
                style={{ minWidth: '100px' }}
              >
                <Icon type="download" style={{ marginRight: 8 }} />
                导出表格
              </a>
            </StackPanel.RightAlice>
          </StackPanel>
        </div>
        <Table
          className={styles1.detailTable}
          style={{ margin: '24px 30px 10px' }}
          rowKey={record => record.seqno}
          dataSource={records}
          columns={columns}
          onChange={this.onChange}
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
      </Spin>
    )
  }
}

export default Resource
