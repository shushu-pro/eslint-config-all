import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Link } from 'umi'
import { Table, Checkbox, Row, Col, Input, Spin, Radio, Icon, Button, message } from 'antd'
import StackPanel from '@/components/Common/StackPanel'
import AddTooltip from '@/components/Common/AddTooltip'
import { getFloatStr } from '@/utils/utils'
import {
  REGION_LIST_BILLCHECK,
  transformMomAndYoyBillCheck, transformData,
} from '../constant'
import styles from './index.less'
@connect(({ billCheck, loading }) => ({
  ...billCheck,
  loading: !!loading.effects['billCheck/getDeptBillByRegion'] || !!loading.effects['billCheck/getDeptBillByProductName'],
  tableLoading: !!loading.effects['billCenter/queryDeptProjProdList'],
}))
class Detail extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      region: 'all',
      selectModalVisible: false,
      searchText: null,
      billStatusList: [], // 账单核对情况列表
      checkedListFlag: '0',
      deptBillListByRegion: {},
      deptBillListByProductName: {},
      productCategoryList: [],
      sortedInfo: {
        columnKey: '',
        order: '',
      },
      filteredInfo: {
        productGroupName: [],
      },
    }
    const { location } = props
    const { billNo } = location.query
    this.billNo = billNo
    this.onMouseUp = this.onMouseUp.bind(this)
    this.defaultCheckList = []
    REGION_LIST_BILLCHECK.forEach(item => {
      this.defaultCheckList.push(item.key)
    })
  }

  componentDidMount () {
    this.queryList()
    this.mouseUpEvent()
    this.checkType() && this.queryRegionBillStatus()
    !this.checkType() && this.getProductCategory()
    this.setState({
      checkedValues: this.defaultCheckList,
    })
  }

  componentWillUnmount () {
    window.removeEventListener('mouseup', this.onMouseUp)
  }

  mouseUpEvent () {
    window.addEventListener('mouseup', this.onMouseUp)
  }

  onMouseUp = (e) => {
    const con = document.getElementById('selectModal')
    if (con) {
      if (!con.contains(e.target)) {
        this.setState({
          selectModalVisible: false,
        })
      }
    }
  }


  // 判断是当前页面是区域还是产品跳转来的
  checkType = () => {
    const { match } = this.props
    const { url } = match
    if (url.indexOf('area') > 0) return true// 区域
    return false // 产品
  }

  // 查询账单核对情况列表
  queryRegionBillStatus = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'billCheck/queryRegionBillStatus',
      payload: {
        billNo: this.billNo,
      },
      callback: e => {
        if (e.code === 200) {
          const { resData } = e
          const billStatusList = resData && resData.filter(item => item.region)
          billStatusList.map(item => {
            if (!item.billCheckStatus) {
              item.billCheckStatus = '0'
            }
          })
          this.setState({
            billStatusList,
          }, () => {
            this.changeRegionToCheckType()
          })
        }
      },
    })
  }

  // 查询产品大类筛选列表
    getProductCategory = () => {
      const { dispatch } = this.props
      dispatch({
        type: 'resourceApply/queryProductCategory',
        payload: {},
        callback: resData => {
          if (Array.isArray(resData)) {
            const list = resData && resData.filter(item => item.id)
            const list1 = []// 数组中只能包含text和value属性，否则filters属性会报错。
            list.forEach(item => {
              list1.push({
                value: item.id,
                text: item.label,
              })
            })
            this.setState({
              productCategoryList: list1,
            })
          }
        },
      })
    }


    // 资源列表接口

  queryList = params => {
    const { region, searchText, productGroupIds } = this.state
    const { dispatch } = this.props
    const type = this.checkType()
    const payload = {
      ...params,
      billNo: this.billNo,
      region,
      productGroupIds,
      department: type ? searchText : null,
      productName: type ? null : searchText,
      page: params ? (params.page ? params.page : 1) : 1,
      limit: type ? (params ? (params.limit ? params.limit - 1 : 9) : 9) : (params && params.limit || 10),
    }

    this.setState({
      exportData: payload,
    })
    dispatch({
      type: type ? 'billCheck/getDeptBillByRegion' : 'billCheck/getDeptBillByProductName',
      payload,
      callback: e => {
        if (e.code === 200) {
          if (type) {
            this.setState({
              deptBillListByRegion: e.resData,
            })
          } else {
            this.setState({
              deptBillListByProductName: e.resData,
            })
          }
        } else {
          message.error(e.msg)
        }
      },
    })
  };
  /* eslint-enable */


  // 切换区域,请求表单数据和修改核对按钮样式
  onRegionChange = e => {
    this.onReset()
    this.setState({ region: e.target.value }, () => {
      this.changeRegionToCheckType()
      this.queryList()
    })
  };

  // table的操作
  onChange = (pagination, filters, sorter) => {
    // const type = this.checkType();
    // billNo （必填）
    // departmentId(必填)
    // regions(非必填, 多个以逗号隔开，可选值: cloud - industry - pub、cloud - private、cloud - public）
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
        productGroupIds: filters.productGroupName && filters.productGroupName.join(','),
        ...params,
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
      sortedInfo: sorter,
      filteredInfo: filters,
      ...params,
    }, () => {
      this.queryList(params)
    })
  };

  // 重置排序和筛选框内容
  onReset=() => {
    this.clearFilters()
    this.setState({
      sortedInfo: {
        columnKey: '',
        order: '',
      },
      filteredInfo: {
        productGroupName: [],
      },
      searchText: null,
    })
  }

  // 改变区域类型后，核对状态也发生变化
  changeRegionToCheckType = () => {
    const { billStatusList, region } = this.state
    if (region === 'all') {
      const flag = billStatusList.some(item => item.billCheckStatus === '0')
      this.setState({
        checkedListFlag: flag ? '0' : '1',
      })
    } else {
      billStatusList.forEach(item => {
        if (item.region === region) {
          this.setState({
            checkedListFlag: item.billCheckStatus,
          })
        }
      })
    }
  }

  // 账单按区域确认或取消核对
  onChangeCheckState = () => {
    // return false;
    const { checkedListFlag, billStatusList, region } = this.state
    const { dispatch } = this.props
    let nameList = []
    if (region === 'all') {
      checkedListFlag === '0' ? billStatusList.forEach(item => {
        if (item.billCheckStatus === '0') {
          nameList.push(item.region)
        }
      }) : billStatusList.forEach(item => nameList.push(item.region))
    } else {
      nameList = [ region ]
    }

    dispatch({
      type: checkedListFlag === '1' ? 'billCheck/unCheckRegionBill' : 'billCheck/checkRegionBill',
      payload: {
        billNo: this.billNo,
        ocRegion: nameList.join(','),
      },
      callback: e => {
        if (e.code === 200) {
          message.success('处理成功')
          this.queryRegionBillStatus()
        } else {
          message.error('账单原始状态发生变化，无法操作')
        }
      },
    })
  }

  onChangeCheck = (checkedValues) => {
    this.setState({
      checkedValues,
    })
  }

  onChangeSelectModalVisible=() => {
    const { selectModalVisible } = this.state
    this.setState({
      selectModalVisible: !selectModalVisible,
    })
  }

  onSearch = () => {
    this.queryList()
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
            placeholder={dataIndex === 'department' ? '搜索部门名称' : '搜索产品名称'}
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

  sendBillList =() => {
    const { dispatch } = this.props
    const { checkedValues } = this.state
    if (checkedValues && checkedValues.length > 0) {
      dispatch({
        type: 'billCheck/sendRegionBill',
        payload: {
          billNo: this.billNo,
          ocRegion: checkedValues.join(','),
        },
        callback: e => {
          if (e.code === 200) {
            message.success('已发送')
            this.setState({
              selectModalVisible: false,
            })
          } else {
            message.error('账单原始状态发生变化，无法操作')
          }
        },
      })
    } else {
      message.warning('请选择发送区域')
    }
  }

  onExport = () => {
    const { exportData } = this.state
    const { dispatch } = this.props
    const type = this.checkType()
    dispatch({
      type: type ? 'billCheck/getDeptBillListByRegionExport' : 'billCheck/getDeptBillByProductNameExport',
      payload: {
        ...exportData,
      },
    })
  }

  render () {
    const { loading } = this.props
    const { selectModalVisible, checkedListFlag, searchText, deptBillListByRegion, deptBillListByProductName, region, productCategoryList, sortedInfo, filteredInfo } = this.state
    let totalCount
    let regionlist = []
    let prodList = []
    let pageSize
    let currPage
    const type = this.checkType()
    if (type) {
      if (deptBillListByRegion) {
        const { summary, pageData } = deptBillListByRegion
        totalCount = pageData && pageData.total
        pageSize = pageData && (pageData.size)
        totalCount += Math.ceil(totalCount / pageSize)
        pageSize++
        regionlist = summary && [ summary ].concat(pageData && pageData.records)
        currPage = pageData && pageData.current
      }
    } else {
      totalCount = deptBillListByProductName && deptBillListByProductName.total
      prodList = deptBillListByProductName && deptBillListByProductName.records
      pageSize = deptBillListByProductName && deptBillListByProductName.size
      currPage = deptBillListByProductName && deptBillListByProductName.current
    }


    const columns = type ? [
      {
        title: searchText || '部门',
        dataIndex: 'department',
        className: `${styles.textNoBorder} ${searchText ? styles.haveSearchContent : ''}`,
        render: (department, record, index) => {
          const { departmentId } = record
          const url = `/manage/bill-center/billCheck/billdetails/dept/${this.billNo}/${departmentId}?name=${department || '-'}&type=area`
          if (index !== 0) {
            return (
              <AddTooltip text={department}>
                <Link to={url} style={{ color: '#1890ff !important' }}>{department || '-'}</Link>
              </AddTooltip>
            )
          } else {
            return <span>汇总</span>
          }
        },
        ...this.getColumnSearchProps('department'),
      },
      {
        title: '项目数',
        dataIndex: 'deptProjCnt',
        sorter: true,
        sortOrder: sortedInfo.columnKey === 'deptProjCnt' && sortedInfo.order,
        render: _ => transformData(_),
      },
      {
        title: '资源数',
        dataIndex: 'deptProdCnts',
        sorter: true,
        sortOrder: sortedInfo.columnKey === 'deptProdCnts' && sortedInfo.order,
        render: _ => transformData(_),
      },
      {
        title: '费用',
        dataIndex: 'deptProdFee',
        sorter: true,
        sortOrder: sortedInfo.columnKey === 'deptProdFee' && sortedInfo.order,
        render: _ => getFloatStr(_),
      },
      {
        title: '环比',
        dataIndex: 'linkRatio',
        sorter: true,
        sortOrder: sortedInfo.columnKey === 'linkRatio' && sortedInfo.order,
        render: _ => transformMomAndYoyBillCheck(_),
      },
      {
        title: '同比',
        dataIndex: 'yearOnYear',
        sorter: true,
        sortOrder: sortedInfo.columnKey === 'yearOnYear' && sortedInfo.order,
        render: _ => transformMomAndYoyBillCheck(_),
      },
    ]
      : [
        {
          title: searchText || '产品名称',
          dataIndex: 'productLabel',
          className: `${styles.textNoBorder} ${searchText ? styles.haveSearchContent : ''}`,
          render: (productLabel, record) => {
            const { productName } = record
            const url = `/manage/bill-center/billCheck/billdetails/prod/${this.billNo}/${productName}?name=${productLabel || '-'}&type=product`
            return (
              <AddTooltip text={productLabel}>
                <Link to={url}>{productLabel || '-'}</Link>
              </AddTooltip>
            )
          },
          ...this.getColumnSearchProps('productLabel'),
        },
        {
          title: '产品大类',
          dataIndex: 'productGroupName',
          filters: productCategoryList,
          filteredValue: filteredInfo && filteredInfo.productGroupName || null,
        },
        {
          title: '资源数',
          dataIndex: 'resourceCnt',
          sorter: true,
          sortOrder: sortedInfo.columnKey === 'resourceCnt' && sortedInfo.order,
          render: _ => transformData(_),
        },
        {
          title: '费用',
          dataIndex: 'resourceFee',
          sorter: true,
          sortOrder: sortedInfo.columnKey === 'resourceFee' && sortedInfo.order,
          render: _ => getFloatStr(_),
        },
        {
          title: '环比',
          dataIndex: 'linkRatio',
          sorter: true,
          sortOrder: sortedInfo.columnKey === 'linkRatio' && sortedInfo.order,
          render: _ => transformMomAndYoyBillCheck(_),
        },
        {
          title: '同比',
          dataIndex: 'yearOnYear',
          sorter: true,
          sortOrder: sortedInfo.columnKey === 'yearOnYear' && sortedInfo.order,
          render: _ => transformMomAndYoyBillCheck(_),
        },
      ]
    return (
      <Spin spinning={loading} className={styles.detail}>
        <div style={{ padding: '0 30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Radio.Group
              value={region}
              onChange={this.onRegionChange}
              style={{ margin: '20px 0 0' }}
            >
              <Radio.Button value="all">全部区域</Radio.Button>
              {REGION_LIST_BILLCHECK.map(item => (
                <Radio.Button value={item.key}>{item.value}</Radio.Button>
              ))}
            </Radio.Group>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div className={styles.billcheck_rightBtnArea} style={{ display: type ? 'block' : 'none', marginTop: '15px' }}>
                <AddTooltip text='所有区域账单都核对后，允许外部平台调取数据'>
                  <span className={`${styles.billcheck_rightBtn} ${checkedListFlag === '0' ? styles.unChecked : styles.isChecked}`} onClick={this.onChangeCheckState}><Icon type="check-circle" style={{ marginRight: '8px' }} />该区域数据已核对</span>
                </AddTooltip>
                <span className={`${styles.billcheck_rightBtn} `} onClick={this.onChangeSelectModalVisible}>发送账单</span>
                <div className={styles.selectModal} style={{ display: selectModalVisible ? 'block' : 'none' }} id='selectModal'>
                  <div className={styles.selectLists}>
                    <div className={styles.selectListsRow}>
                      <Checkbox.Group style={{ width: '100%' }} onChange={this.onChangeCheck} defaultValue={this.defaultCheckList}>
                        {
                          REGION_LIST_BILLCHECK.map(item => (
                            <Row style={{ marginBottom: '10px' }} key={item.key}>
                              <Col span={16} style={{ textAlign: 'left' }}>
                                {item.value}
                              </Col>
                              <Col span={8}>
                                <Checkbox value={item.key} />
                              </Col>
                            </Row>
                          ))
                        }
                      </Checkbox.Group>
                    </div>
                  </div>
                  <div className={styles.selectBtn}>
                    <span onClick={this.onChangeSelectModalVisible}>取消</span>
                    <span onClick={this.sendBillList}>发送</span>
                  </div>
                </div>
              </div>
              <StackPanel style={{ marginTop: '20px', width: '170px' }}>
                <StackPanel.RightAlice>
                  <a key="export" onClick={this.onExport}>
                    <Icon type="download" style={{ marginRight: 8 }} />
                    导出表格
                  </a>
                </StackPanel.RightAlice>
              </StackPanel>
            </div>
          </div>

          <div style={{ background: '#fff', marginTop: '20px' }}>
            <Table
              style={{ background: '#fff', overflow: 'auto' }}
              rowKey={record => record.seqno}
              dataSource={type ? regionlist : prodList}
              columns={columns}
              onChange={this.onChange}
              pagination={
                totalCount <= pageSize
                  ? false
                  : {
                    pageSize,
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
          </div>
        </div>
      </Spin>
    )
  }
}

export default Detail
