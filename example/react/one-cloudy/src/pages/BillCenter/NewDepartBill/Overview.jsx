import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Spin, Row, Col, Radio, Table, Input, Button, Icon } from 'antd'
// import { Link } from 'umi';
import Title from '@/components/Common/Title'
import { getFloatStr } from '@/utils/utils'
import { Link } from 'umi'
import AddTooltip from '@/components/Common/AddTooltip'
import { getBill, getTime, transformMomAndYoy, transformData } from '../constant'
import styles from '../index.less'
import styles1 from './index.less'
@connect(({ newDepartBill, user, loading }) => ({
  ...newDepartBill,
  userInfo: user.userInfo,
  loading: !!loading.effects['newDepartBill/listRegions'] || !!loading.effects['newDepartBill/queryDeptBillDetail'] || !!loading.effects['newDepartBill/listDeptBillSumInfo'],
}))
class Detail extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      region: 'all',
      sortedInfo: {
        columnKey: '',
        order: '',
      },
      regionList: [],
      resData: {},
      billStatic: {},
      departmentId: null,
      hasDeptBillMenu: 1,
      deptName: '',
      containChild: '',
    }
    this.billNo = getBill(props)
  }


  componentDidMount () {
    this.queryAllData()
    const { userInfo = {} } = this.props
    const { deptName } = userInfo
    this.setState({
      deptName,
    })
  }

  componentWillReceiveProps (nextProps) {
    const { departmentId } = this.state
    const newDepartmentId = nextProps.location.query.departmentId
    const department = nextProps.location.query.department
    const containChild = nextProps.location.query.containChild// 0表示没有组织账单，不是0的需要请求原来的接口判断有没有组织账单
    /* eslint-enable */
    if (newDepartmentId && newDepartmentId !== departmentId) {
      this.setState({
        deptName: department,
        containChild,
        hasDeptBillMenu: containChild === '0' ? 0 : 1,
      }, () => {
        this.queryDetail({ departmentId: newDepartmentId })
        ;(containChild !== '0') && this.queryHasDeptBillMenu(newDepartmentId)
        ;(containChild !== '0') && this.queryList({ departmentId: newDepartmentId })
      })
    }
  }

  queryAllData = () => {
    this.queryDetail()
    this.queryList()
    this.getRegionList()
    this.queryHasDeptBillMenu()
  }

  queryHasDeptBillMenu = (id) => {
    const { dispatch } = this.props
    dispatch({
      type: 'newDepartBill/hasDeptBillMenu',
      payload: {
        departmentId: id,
      },
      callback: e => {
        if (e.code === 200) {
          this.setState({
            hasDeptBillMenu: e.resData,
          })
        }
      },
    })
  }

  // 获取区域列表
  getRegionList = () => {
    const { dispatch } = this.props
    return dispatch({
      type: 'newDepartBill/listRegions',
      payload: {
      },
      callback: e => {
        if (e.code === 200) {
          this.setState({
            regionList: e.resData,
          })
        }
      },
    })
  }

  // 详情接口
  queryDetail = (params = {}) => {
    const { region, departmentId, containChild } = this.state
    const { dispatch } = this.props
    return dispatch({
      type: 'newDepartBill/billSumInfo',
      payload: {
        billNo: this.billNo,
        region: region === 'all' ? undefined : region,
        departmentId: params.departmentId || departmentId, // 用params的departmentId表示点击了列表中的组织
        containChild: containChild || '',
        ...params,
      },
      callback: e => {
        if (e.code === 200) {
          this.setState({
            billStatic: e.resData,
            departmentId: params.departmentId || departmentId,
          })
        }
      },
    })
  };

  // 组织账单列表接口
  queryList = (params = {}) => {
    const { region, departmentId } = this.state
    const { dispatch } = this.props
    return dispatch({
      type: 'newDepartBill/listDeptBillSumInfo',
      payload: {
        billNo: this.billNo,
        region: region === 'all' ? null : region,
        current: params.current || '1',
        pageSize: params.pageSize || '10',
        departmentId: params.departmentId || departmentId, // 用params的departmentId表示点击了列表中的组织
        ...params,
      },
      callback: e => {
        if (e.code === 200) {
          this.setState({
            resData: e.resData,
            departmentId: params.departmentId || departmentId,
          })
        }
      },
    })
  };

  // 切换区域
  onRegionChange = e => {
    const { hasDeptBillMenu } = this.state
    this.onReset()
    this.setState({ region: e.target.value }, () => {
      hasDeptBillMenu === 1 && this.queryList()
      this.queryDetail()
    })
  };

  // 切换表格
  onChange= (pagination, filters, sorter) => {
    const { searchText } = this.state
    let params = {}
    if (sorter && JSON.stringify(sorter) !== '{}') {
      console.log(sorter)
      params = {
        orderType: sorter.order ? (sorter.order === 'ascend' ? 0 : 1) : '',
        orderBy: sorter.columnKey && this.switchSortOrder(sorter.columnKey) || '',
      }
    }
    /* eslint-enable */

    this.setState({
      sortedInfo: sorter,
      ...params,
    })
    
      current: pagination.current,
      pageSize: pagination.pageSize,
      department: searchText,
      ...params,
    })
  }

  switchSortOrder = (columnKey) => {
    switch (columnKey) {
      case 'projectNum':
        return 1
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

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
      this.clearFilters = clearFilters
      return (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => {
              this.searchInput = node
            }}
            placeholder='搜索部门名称'
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [ e.target.value ] : [])}
            onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon="search"
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            搜索
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            重置
          </Button>
        </div>
      )
    },

    filterIcon: () => {
      const { searchText } = this.state
      return (
        <Icon type="search" style={{ color: searchText ? '#1890ff' : 'rgba(0, 0, 0, 0.85)' }} />
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

  // 重置排序和筛选框内容
  onReset=() => {
    this.clearFilters()
    this.setState({
      sortedInfo: {
        columnKey: '',
        order: '',
      },
      searchText: null,
    })
  }


  handleSearch = (selectedKeys) => {
    this.setState({
      searchText: selectedKeys[0],
    }, () => {
      this.onSearch(selectedKeys[0])
    })
  };

  handleReset = clearFilters => {
    clearFilters()
    this.setState({ searchText: '' }, () => {
      this.onSearch()
    })
  };

  onSearch = (value) => {
    this.queryList({
      department: value,
    })
  }


  render () {
    const { region, regionList, searchText, sortedInfo, resData, billStatic, hasDeptBillMenu, deptName } = this.state
    const { loading } = this.props
    const { billNo, projectNum, productNum, fee, mom, yoy } = billStatic
    const { size, total, current, records } = resData
    const columns = [
      {
        title: searchText || '组织',
        dataIndex: 'department',
        key: 'department',
        width: 200,
        className: `${styles1.textNoBorder} ${searchText ? styles1.haveSearchContent : ''}`,
        render: (_, record) => {
          const { departmentId, department, containChild = '' } = record
          return (
            <AddTooltip text={_}>
              <Link
                to={`/manage/bill-center/newDepartBill/details/overview?billNo=${this.billNo}&departmentId=${departmentId}&department=${department}&containChild=${containChild}`}
                onClick={() => {
                  this.setState({ departmentId })
                  this.onReset()
                }}
              >
                {_}
              </Link>
            </AddTooltip>
          )
        },
        ...this.getColumnSearchProps('department'),
      },
      {
        title: '项目数',
        dataIndex: 'projectNum',
        key: 'projectNum',
        sorter: true,
        sortOrder: sortedInfo.columnKey === 'projectNum' && sortedInfo.order,
        render: _ => transformData(_),
      },
      {
        title: '资源数量',
        dataIndex: 'productNum',
        key: 'productNum',
        sorter: true,
        sortOrder: sortedInfo.columnKey === 'productNum' && sortedInfo.order,
        render: _ => transformData(_),
      },
      {
        title: '费用',
        dataIndex: 'fee',
        key: 'fee',
        sorter: true,
        sortOrder: sortedInfo.columnKey === 'fee' && sortedInfo.order,
        render: _ => getFloatStr(_),
      },
      {
        title: '环比',
        dataIndex: 'mom',
        key: 'mom',
        sorter: true,
        sortOrder: sortedInfo.columnKey === 'mom' && sortedInfo.order,
        render: _ => transformMomAndYoy(_),
      },
      {
        title: '同比',
        dataIndex: 'yoy',
        key: 'yoy',
        sorter: true,
        sortOrder: sortedInfo.columnKey === 'yoy' && sortedInfo.order,
        render: _ => transformMomAndYoy(_),
      },
    ]
    return (
      <div style={{ padding: '0 30px' }}>
        <Spin spinning={loading} className={styles.detail}>
          <div style={{ color: '#000', fontSize: '18px', margin: '20px 0 0' }}>
            {deptName}
          </div>
          <Radio.Group
            value={region}
            onChange={this.onRegionChange}
            style={{ margin: '20px 0 0' }}
          >
            <Radio.Button value="all">全部</Radio.Button>
            {regionList && regionList.length > 0 && regionList.map(item => (
              <Radio.Button value={item.cloudRegion} key={item.cloudRegion}>{item.regionName}</Radio.Button>
            ))}
          </Radio.Group>
          <div className={styles.detailInfo} style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}>
            <Title level="h3">账单统计</Title>
            <Row>
              <Col span={6}>
                项目数：{ transformData(projectNum) }
              </Col>
              <Col span={6}>
                资源数量：{ transformData(productNum) }
              </Col>
              <Col span={6}>
                费用总计：{ getFloatStr(fee) }
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                计费周期：{ getTime(billNo)}
              </Col>
              <Col span={6}>
                环比：{ transformMomAndYoy(mom) }
              </Col>
              <Col span={6}>
                同比：{ transformMomAndYoy(yoy) }
              </Col>
            </Row>
          </div>
          {
            hasDeptBillMenu === 1 ? (
              <div className={styles.detailInfo}>
                <Title level="h3">组织账单</Title>
                <Table
                  className={styles1.detailTable}
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
              </div>
            ) : null
          }
        </Spin>
      </div>

    )
  }
}

export default Detail
