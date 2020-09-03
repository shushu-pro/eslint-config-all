import React from 'react'
import { connect } from 'dva'
import {
  Table, Alert, Radio, Dropdown, Icon, Menu, Modal, Button, Spin, message,
} from 'antd'
import api from '@/api'
import AddTooltip from '@/components/Common/AddTooltip'
import TableSearchItem from '@/components/TableSearchItem'
import AddModel from './AddModel'
import {
  PRODUCTNAME, PRODUCTNAME_CHINESE,
} from './constant'
import styles from './index.less'

const { confirm } = Modal
@connect(({ OperationRecordManage, loading }) => ({
  billList: OperationRecordManage.billList,
  loading: !!loading.effects['OperationRecordManage/instanceListCommon'],
}))

class CloudSecurityProducts extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      resData: {},
      tableHeader: [],
      productValue: PRODUCTNAME.ANTIDDOS,
      productList: [
        {
          value: PRODUCTNAME.ANTIDDOS,
          label: PRODUCTNAME_CHINESE.ANTIDDOS,
        },
        {
          value: PRODUCTNAME.HSM,
          label: PRODUCTNAME_CHINESE.HSM,
        },
        {
          value: PRODUCTNAME.SKYEYE,
          label: PRODUCTNAME_CHINESE.SKYEYE,
        },
        {
          value: PRODUCTNAME.DDOSIP,
          label: PRODUCTNAME_CHINESE.DDOSIP,
        },
      ],
      page: 1,
      limit: 10,
      isGetHeader: true,
      searchValue: {}, // 表头搜索详情
      activeKey: '', // 目标搜索表头{}
      filterObj: {}, // 有过滤功能的 资源列表对象
      filteredInfo: {}, // 过滤详情
      sortedInfo: {}, // 排序
      recordDetail: {},
    }
  }

  componentDidMount () {
    this.queryList()
  }

  onRegionChange = (e) => {
    this.setState({
      productValue: e.target.value,
      isGetHeader: true,
      page: 1,
      limit: 10,
      searchValue: {}, // 表头搜索详情
      activeKey: '', // 目标搜索表头{}
      filterObj: {}, // 有过滤功能的 资源列表对象
      filteredInfo: {}, // 过滤详情
      sortedInfo: {}, // 排序
    }, () => {
      this.queryList()
    })
  }

  queryList = (params = {}) => {
    const {
      productValue, searchValue, filteredInfo, limit, page, sortedInfo, resData: { list },
    } = this.state
    const { dispatch } = this.props
    const payload = {
      isNdt: '1',
      page: (params.isDelete && list.length === 1) ? page - 1 : page,
      limit,
      queryEqual: {
        productcode: productValue,
      },
      queryLike: searchValue,
      queryIn: filteredInfo,
      queryOrder: sortedInfo,
    }
    dispatch({
      type: 'OperationRecordManage/instanceListCommon',
      payload,
      callback: (e) => {
        if (e.code === 200) {
          const { isGetHeader } = this.state
          if (isGetHeader) {
            this.setState({
              resData: e.resData,
              tableHeader: e.tableHeader,
              isGetHeader: false,
            })
          } else {
            this.setState({
              resData: e.resData,
            })
          }
        }
      },
    })
  }

  getTableColumns = (tableHeader = []) => {
    const {
      filterObj, filteredInfo,
    } = this.state
    const res = tableHeader.filter((t) => !t.isHidden).map((item) => {
      const target = {
        title: item.columnLabel,
        dataIndex: item.columnName,
        key: item.columnName,
        width: item.columnName && item.columnName.includes('/') && item.columnName.includes('cloudInstanceId') ? '210px' : 'auto',
        ellipsis: true,
        render: (t, record) => {
          if (item.columnName === 'cloudOpenTime') {
            return t ? t.slice(0, 11) : '-'
          }
          if (item.columnName && item.columnName.includes('/')) {
            const keys = item.columnName.split('/').map((v) => v.replace(/!/g, ''))
            // console.log('keys',keys);
            return (
              <span>
                {
                  // eslint-disable-next-line no-shadow
                  keys.map((item) => (
                    <div key={item}>{record[item]}</div>
                  ))
                }
              </span>
            )
          }
          return t || '-'
        },
      }
      let colName = item.columnName
      if (item.columnName && item.columnName.includes('/')) {
        colName = item.columnName.split('/')[1].replace(/!/g, '')
      }
      // 0：正常 1：查询 2：过滤 3：排序
      switch (item.isFilter) {
        case 1:
          target.title = this.renderTitle(colName, item.columnLabel)
          break
        case 2:
          target.filters = filterObj[item.columnName] || []
          target.filteredValue = filteredInfo[item.columnName] || null
          break
        case 3:
          target.sorter = true
          break
        default:
          break
      }
      return target
    })
    res.push({
      title: (
        <span>
          <span style={{ marginRight: 5 }}>操作</span>
          <AddTooltip text="操作说明" />
        </span>
      ),
      dataIndex: '操作',
      key: '操作',
      fixed: 'right',
      width: 100,
      render: (_, record) => (
        <Dropdown
          overlay={(
            <Menu>
              <Menu.Item>
                <div onClick={() => { this.onEdit(true) }}>
                  编辑
                </div>
              </Menu.Item>
              <Menu.Item>
                <div onClick={() => this.onDel(record)}>
                  删除
                </div>
              </Menu.Item>
            </Menu>
          )}
          placement="bottomCenter"
          onVisibleChange={this.onVisibleChange.bind(this, record)}
        >
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            <Icon type="ellipsis" />
          </a>
        </Dropdown>
      ),
    })
    return res
  }

  onChangeTable = (pagination, filters, sorter) => {
    const { order } = sorter
    this.setState({
      filteredInfo: filters,
      sortedInfo: {
        sortField: sorter.columnKey,
        isAsc: order && order === 'ascend' ? '1' : '0',
      },
      page: pagination.current,
      limit: pagination.pageSize,
    }, () => {
      this.queryList()
    })
  }

  queryDetail = (bool, addModelVisible) => {
    const { recordData } = this.state
    const sendData = {
      productInstanceId: recordData.cloudproductinstanceid,
    }
    api.nDtInstanceDetail(sendData).then((data) => {
      this.setState({
        recordDetail: data,
        isEdit: bool,
        addModelVisible: !addModelVisible,
      })
    })
  }

  onEdit = (bool) => {
    const { addModelVisible } = this.state
    if (bool) {
      this.queryDetail(bool, addModelVisible)
    } else {
      this.setState({
        addModelVisible: !addModelVisible,
        isEdit: bool,
      })
    }
  }

  onDel = (record) => {
    const that = this
    const { dispatch } = this.props
    confirm({
      title: '是否要删除该资源实例?',
      content: '删除后用户将无法在"我的资源"中查看该实例，账单中也会移除该实例及费用。',
      okText: '删除',
      cancelText: '取消',
      onOk () {
        dispatch({
          type: 'OperationRecordManage/instanceDelete',
          payload: {
            productInstanceId: record.cloudproductinstanceid,
          },
        }).then((e) => {
          if (e.code === 200) {
            that.queryList({ isDelete: true })
            message.success('删除成功！')
          } else {
            message.error(e.msg)
          }
        })
      },
      onCancel () { },
    })
  }

  // 下拉框出现时，将当前项的数据暂存到recordData，以便操作使用
  // 下拉框收起后，删除recordData数据，防止出错
  onVisibleChange = (record, visible) => {
    if (visible) {
      this.setState({
        recordData: record,
      })
    } else {
      this.setState({
        recordData: null,
      })
    }
  }

  renderTitle = (key, title) => {
    const { activeKey, searchValue } = this.state
    return (
      <TableSearchItem
        activeKey={activeKey}
        value={searchValue[key]}
        titleKey={key}
        title={title}
        onClick={() => {
          this.setState({ activeKey: key })
        }}
        onBlur={() => {
          this.setState({ activeKey: '' })
        }}
        onChange={(inputValue, key1) => {
          if (searchValue[key1] && searchValue[key1] === inputValue) {
            return
          } if (inputValue) {
            searchValue[key1] = inputValue
          } else {
            delete searchValue[key1]
          }
          this.setState({ searchValue: { ...searchValue } })
        }}
        onSearch={this.onSearch}
      />
    )
  }


  onSearch = () => {
    this.queryList()
  }

  render () {
    const {
      productList, productValue, resData, addModelVisible, isEdit, tableHeader, recordDetail,
    } = this.state
    const tableColumns = this.getTableColumns(tableHeader)
    const { loading } = this.props
    const {
      totalCount,
      list,
      pageSize,
      currPage,
    } = resData
    let x = 1700
    switch (productValue) {
      case PRODUCTNAME.ANTIDDOS:
        x = 1300
        break
      case PRODUCTNAME.WAF:
        x = 1500
        break
      case PRODUCTNAME.PCNBGPIP:
        x = 1600
        break
      default:
        break
    }

    return (
      <div style={{ marginTop: 20 }} className={styles.cloudSecurityProducts}>
        <Spin spinning={loading}>

          <Alert
            message="资源申请单中'已结单'状态的资源实例信息会自动流转到本模块，请根据实际开通情况核对资源实例规格和费用。"
            type="info"
            showIcon
            style={{ width: '100%' }}
          />
          <div className={styles.changeProduct}>

            <Radio.Group
              value={productValue}
              onChange={this.onRegionChange}
              style={{ margin: '20px 0 0' }}
            >
              {productList && productList.length > 0 && productList.map((item) => (
                <Radio.Button value={item.value} key={item.value}>{item.label}</Radio.Button>
              ))}
            </Radio.Group>

            <Button
              style={{ marginTop: 20, color: '#1890ff', borderColor: '#1890ff' }}
              onClick={() => { this.onEdit(false) }}
            >
              <Icon type="plus-circle" style={{ color: '#1890ff' }} />
              新增实例
            </Button>
          </div>
          <Table
            style={{ marginTop: '24px', background: '#fff' }}
            rowKey={(record) => record.cloudproductinstanceid}
            dataSource={list}
            scroll={{ x }}
            columns={tableColumns}
            onChange={this.onChangeTable}
            pagination={{
              pageSize: pageSize || 10,
              total: totalCount,
              current: currPage || 1,
              showSizeChanger: true,
              pageSizeOptions: [ '10', '20', '50' ],
              // onChange: pageIndex => this.queryList({ page: pageIndex.toString(), limit: pageSize }),
            }}
          />

          {addModelVisible ? (
            <AddModel
              dispatch={this.props.dispatch}
              visible={addModelVisible}
              onEdit={this.onEdit}
              queryList={this.queryList}
              isEdit={isEdit}
              recordDetail={recordDetail}
              productValue={productValue}
            />
          ) : null}
        </Spin>

      </div>
    )
  }
}

export default CloudSecurityProducts
