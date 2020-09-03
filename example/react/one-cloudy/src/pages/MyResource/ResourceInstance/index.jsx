
// 资源实例

import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { router } from 'umi'
import _ from 'lodash'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import {
  Card, Radio, Input, Table, Select, Button, Dropdown, Menu, message, Spin,
  Icon, Modal,
} from 'antd'
import StackPanel from '@/components/Common/StackPanel'
import AddTooltip from '@/components/Common/AddTooltip'
import FooterComfire from '@/components/Common/FooterComfire'
import TableSearchItem from '@/components/Common/TableHeader/SearchTitle'
import { queryRegion } from '@/services/OperationCenter/resourceApply'
import { TypeTabs, LinkTab } from './contant'
import styles from './index.less'

const { Search } = Input
const { Option } = Select
@connect(({ resourceInstance, loading, user }) => ({
  ...resourceInstance,
  userInfo: user.userInfo,
  loading: !!loading.effects['resourceInstance/queryInstanceListCommon'],
}))

class List extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      activeRadioKey: 'ECS',
      resData: {},
      isBatch: false,
      ecsType: 'ECSInstance',
      dataSource: [],
      tableHeader: [],
      activeSelectType: 'recovery',
      selectedList: [],
      selectedRowKeys: [],
      page: 1,
      limit: 10,
      searchValue: {}, // 表头搜索详情
      activeKey: '', // 目标搜索表头{}
      filterObj: {}, // 有过滤功能的 资源列表对象
      filteredInfo: {}, // 过滤详情
      sortedInfo: {}, // 排序
    }
  }

  componentDidMount () {
    // 获取产品类型
    // this.queryProductList();
    // 获取列表数据
    this.handleGetTableData()
    // 获取区域列表
    this.queryRegion()
  }

  // 获取列表数据
  handleGetTableData = () => {
    const { dispatch } = this.props
    const {
      activeRadioKey, ecsType, searchValue, filteredInfo, limit, page, sortedInfo,
    } = this.state
    // console.log('filteredInfo', filteredInfo);
    const payload = {
      page,
      limit,
      queryEqual: {
        productcode: activeRadioKey,
      },
      queryLike: searchValue,
      queryIn: filteredInfo,
      queryOrder: sortedInfo,
    }
    if (activeRadioKey === 'ECS' && ecsType === 'ECSDisk') {
      payload.queryEqual.productcode = 'ECSDisk' // ECS 类别
    }
    // console.log('payload ==> ', payload);
    dispatch({
      type: 'resourceInstance/queryInstanceListCommon',
      payload,
      callback: (e) => {
        if (e.code === 200) {
          // console.log('e --->', e);
          this.setState({
            resData: e.resData,
            dataSource: e.resData.list.map((item) => ({ ...item, key: item.cloudinstanceid })),
            tableHeader: e.tableHeader,
          })
        }
      },
    })
  }

  // 获取产品类型列表
  queryProductList = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'resourceInstance/queryResmngProductGroups',
      payload: {},
      callback: (e) => {
        if (e.code === 200) {
          this.setState({
            // resData: e.resData
          })
        }
      },
    })
  }

  // 获取区域列表
  queryRegion = () => {
    const { userInfo } = this.props
    const { activeRadioKey } = this.state
    queryRegion({ productType: activeRadioKey, deptId: userInfo.deptId }).then(({ resData }) => {
      // console.log('resData', resData);
      this.setState({
        filterObj: {
          regionname: resData[0].regions.map((item) => ({ text: item.name, value: item.dictId })),
        },
      })
    })
  }

  // 切换批量操作
  handleChangeBatch = () => {
    const { isBatch, activeRadioKey } = this.state
    this.setState({
      isBatch: !isBatch,
    })
    !isBatch && activeRadioKey === 'ECS' && this.handleChangeEcsType('ECSInstance')
  }

  // 更换产品类型
  handleChangeRadio = (e) => {
    const { isBatch, ecsType } = this.state
    this.setState({
      activeRadioKey: e.target.value,
      searchValue: {}, // 重置列表筛选条件
      activeKey: '',
      ecsType: e.target.value === 'ECS' && isBatch ? 'ECSInstance' : ecsType,
      page: 1,
      limit: 10,
      filterObj: {}, // 有过滤功能的 资源列表对象
      filteredInfo: {}, // 过滤详情
      sortedInfo: {},
    }, () => {
      this.handleGetTableData()
      this.queryRegion()
    })
  }

  // 切换ECS实例/磁盘
  handleChangeEcsType = (v) => {
    this.setState({
      ecsType: v,
      searchValue: {}, // 重置列表筛选条件
      activeKey: '',
      filterObj: {}, // 有过滤功能的 资源列表对象
      filteredInfo: {}, // 过滤详情
    }, () => {
      this.handleGetTableData()
      this.queryRegion()
    })
  }

  // 更换多选类型
  handleChangeSet = (e) => {
    // console.log('sss', e.target.value);
    this.setState({
      activeSelectType: e.target.value,
      selectedList: [],
      selectedRowKeys: [],
    })
  }

  renderTitle = (key, title) => {
    const { activeKey, searchValue, activeRadioKey } = this.state
    const node = (
      <TableSearchItem
        activeKey={activeKey}
        value={searchValue[key]}
        titleKey={key}
        title={title}
        tableTagType={activeRadioKey}
        onClick={() => {
          this.setState({ activeKey: key })
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
        onSearch={(searchTag) => {
          if (searchTag) {
            this.handleGetTableData()
          }
        }}
      />
    )
    return node
  }

  // 获取table columns
  getTableColumns = () => {
    const {
      tableHeader, activeRadioKey, filterObj, filteredInfo, ecsType,
    } = this.state
    const res = tableHeader.filter((t) => !t.isHidden).map((item) => {
      const target = {
        title: item.columnLabel,
        dataIndex: item.columnName,
        key: item.dbColumnName,
        width:
          item.columnName &&
          item.columnName.includes('/') &&
          item.columnName.includes('cloudinstanceid') ? '240px' : 'auto',
        ellipsis: true,
        render: (t, record) => {
          if (item.columnName === 'cloudopentime') {
            return t ? t.slice(0, 11) : '-'
          }
          if (item.columnName && item.columnName.includes('/')) {
            const keys = item.columnName.split('/').map((v) => v.replace(/!/g, ''))
            // console.log('keys',keys);
            return (
              <span>
                {
                  keys.map((v) => (
                    <div key={v}>{record[v]}</div>
                  ))
                }
              </span>
            )
          }
          return t || '-'
        },
      }
      // 0：查询 1：过滤 2：排序
      switch (item.isFilter) {
        case 1:
          target.title = this.renderTitle(item.dbColumnName, item.columnLabel)
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
    const actionColumn = {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      fixed: 'right',
      width: '100px',
      render: (t, record) => (
        <Dropdown
          overlay={(
            <Menu>
              {
                activeRadioKey === 'SLB' ? null
                  : (
                    <Menu.Item>
                      <a onClick={() => this.onMenuClick('changeSet', record)}>
                        升降配
                      </a>
                    </Menu.Item>
                  )
              }
              {/* <Menu.Item>
                <a onClick={() => this.onMenuClick('changeOwner', record)}>
                  变更归属
                </a>
              </Menu.Item> */}
              <Menu.Item>
                <a onClick={() => this.onMenuClick('recovery', record)}>
                  资源回收
                </a>
              </Menu.Item>
            </Menu>
          )}
          trigger={[ 'click' ]}
        >
          <a href="#" style={{ fontSize: 20, fontWeight: 600, color: '#096dd9' }}>···</a>
        </Dropdown>
      ),
    }
    if (ecsType === 'ECSDisk' && activeRadioKey === 'ECS') {
      return res
    }
    res.push(actionColumn)
    return res
  }

  // 操作跳转
  onMenuClick (type, record) {
    this.handleCheckInstance(type, [ record.cloudinstanceid ])
    // router.push({
    //   pathname: `/manage/myresource/resourceinstance/${type}`,
    //   query: {
    //     idList: [record.cloudinstanceid],
    //   },
    // });
  }

  // 选中列表项
  onSelectChange = (selectedRowKeys, selectedRows) => {
    const { activeSelectType, selectedList } = this.state
    let res = selectedRows
    const t = [ ...(new Set([ ...selectedList, ...selectedRows ])) ]
    if (selectedRowKeys.length !== selectedRows.length) {
      res = t.filter((item) => selectedRowKeys.includes(item.cloudinstanceid))
    }
    // console.log('selectedRowKeys', selectedRowKeys);
    // console.log('selectedRows', selectedRows);
    // console.log('t', t);
    // console.log('res', res);
    const maxLen = activeSelectType === 'recovery' ? 99 : 30
    if (selectedRowKeys.length > maxLen) {
      message.warn(`批量${LinkTab.find((item) => item.value === activeSelectType).name}最多选择${maxLen}项`)
      return
    }
    this.setState({
      selectedRowKeys,
      selectedList: res,
    })
  }

  // 更新列表数据
  onChangeTable = (pagination, filters, sorter) => {
    // console.log('sorter', sorter, pagination, filters);
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
      this.handleGetTableData()
    })
  }

  // 列表
  renderTable = () => {
    const {
      resData, activeRadioKey, isBatch, activeSelectType, dataSource, selectedRowKeys,
      ecsType,
    } = this.state
    const { pageSize, totalCount, currPage } = resData
    const cols = this.getTableColumns()
    let x = 1800
    switch (activeRadioKey) {
      case 'OSS':
        x = 1400
        break
      case 'RDS':
        x = 1800
        break
      case 'SLB':
        x = 1600
        break
      case 'ECS':
        x = ecsType === 'ECSDisk' ? 'auto' : 1800
        break
      default:
        break
    }
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }
    let hasRowSelect = isBatch && activeSelectType
    if (isBatch && activeRadioKey === 'SLB' && activeSelectType === 'changeSet') {
      hasRowSelect = false
    }
    if (isBatch && activeRadioKey === 'ECS' && ecsType === 'ECSDisk') {
      hasRowSelect = false
    }
    return (
      <Table
        key={activeRadioKey}
        dataSource={dataSource}
        columns={cols}
        scroll={{ x }}
        onChange={this.onChangeTable}
        pagination={
          {
            pageSize: pageSize || 10,
            total: totalCount,
            current: currPage || 1,
            showSizeChanger: true,
            pageSizeOptions: [ '10', '20', '50' ],
          }
        }
        rowSelection={hasRowSelect ? rowSelection : null}
      />
    )
  }

  // 关闭批量操作
  handleCancelBatch = () => {
    this.setState({
      isBatch: false,
      selectedList: [],
      selectedRowKeys: [],
    })
  }

  // 判断选中的实例是否已经在操作单中
  handleCheckInstance = (type, idList, t) => {
    const { dispatch } = this.props
    const payload = {
      cloudInstanceIds: idList,
    }
    // console.log('payload', payload);
    dispatch({
      type: 'resourceInstance/queryInstanceTicketId',
      payload,
      callback: (e) => {
        if (e.code === 200) {
          const list = [ ...(new Set(Object.values(e.resData || {}))) ]
          if (list.length) {
            const text = '选中的资源实例已存在申请单：'
            Modal.info({
              icon: <Icon type="exclamation-circle" theme="filled" style={{ color: '#1890FF' }} />,
              title: text,
              content: (
                <>
                  {
                    list.map((item) => (
                      <div style={{ fontWeight: 500 }} key={item}>{item}</div>
                    ))
                  }
                </>
              ),
              okText: '确定',
              okType: 'default',
            })
          } else {
            router.push({
              pathname: `/manage/myresource/resourceinstance/${type}`,
              query: {
                idList,
              },
            })
          }
        }
      },
    })
  }

  // 批量选中提交跳转
  handleSubmit = () => {
    const {
      selectedList, activeSelectType, selectedRowKeys,
    } = this.state
    const len = (new Set(selectedList.map((item) => item.ocprojectid))).size
    const sum = selectedList.length
    sum ? null : message.warn('请选择操作项目!')
    if (len > 1) {
      message.warn('只能对同一项目进行批量操作,请修改选项!')
      return
    }
    if (len === 1 && sum) {
      this.handleCheckInstance(activeSelectType, selectedRowKeys)
    }
  }

  renderBottom = () => {
    const {
      selectedRowKeys,
    } = this.state
    const sum = selectedRowKeys.length
    // console.log('sum', sum);
    return (
      <FooterComfire>
        <StackPanel>
          <span>
            已选择
            <span style={{ padding: '0px 10px', color: '#1890ff', fontWeight: 500 }}>{sum}</span>
            项
          </span>
          <StackPanel.RightAlice>
            <div className={styles.footerToolbar}>
              <Button key="cancel" onClick={this.handleCancelBatch}>
                取消
              </Button>
              <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>
                提交
              </Button>
            </div>
          </StackPanel.RightAlice>
        </StackPanel>
      </FooterComfire>
    )
  }

  render () {
    const {
      activeRadioKey, isBatch, activeSelectType, ecsType,
    } = this.state
    const { loading } = this.props
    return (
      <PageHeaderWrapper title="资源实例">
        <Card bordered={false}>
          <Spin spinning={loading}>
            <div className={styles.betweenDiv}>
              <Radio.Group
                style={{ display: 'block' }}
                onChange={this.handleChangeRadio}
                value={activeRadioKey}
              >
                {TypeTabs.map((item) => (
                  <Radio.Button
                    disabled={isBatch && activeSelectType === 'changeSet' && item.value === 'SLB'}
                    value={item.value}
                    key={item.value}
                  >
                    {item.name}

                  </Radio.Button>
                ))}
              </Radio.Group>
              <AddTooltip text="批量操作只能对同一个项目的实例进行操作">
                <Button onClick={this.handleChangeBatch} ghost={!isBatch} type="primary">批量操作</Button>
              </AddTooltip>
            </div>

            <div className={styles.betweenDiv}>
              {
                activeRadioKey === 'ECS'
                  ? (
                    <Radio.Group
                      style={{ display: 'block' }}
                      value={ecsType}
                      onChange={(e) => this.handleChangeEcsType(e.target.value)}
                    >
                      <Radio.Button value="ECSInstance">实例</Radio.Button>
                      <Radio.Button disabled={isBatch} value="ECSDisk">磁盘</Radio.Button>
                    </Radio.Group>
                  )
                  : <span />
              }
              {
                isBatch
                  ? (
                    <Radio.Group
                      onChange={this.handleChangeSet}
                      value={activeSelectType}
                    >
                      {LinkTab.map((item) => (
                        <Radio.Button value={item.value} key={item.value}>{item.name}</Radio.Button>
                      ))}
                    </Radio.Group>
                  )
                  : null
              }
            </div>
            <div style={{ marginTop: '-15px', padding: '20px 0px' }}>
              {this.renderTable()}
            </div>
            {isBatch ? this.renderBottom() : null}
          </Spin>
        </Card>
      </PageHeaderWrapper>
    )
  }
}

export default List
