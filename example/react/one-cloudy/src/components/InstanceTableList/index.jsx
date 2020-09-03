
// allList:['instanceIdOrName','productName','department','projectName','productSepcs','openTime','fee',];
import React, { PureComponent } from 'react'
import moment from 'moment'
import {
  Table, Icon, DatePicker, Input, Button,
} from 'antd'
import { getFloatStr } from '@/utils/utils'
import { transformMomAndYoy } from '@/pages/BillCenter/constant'
import AddTooltip from '@/components/Common/AddTooltip'
import InfoModal from '@/components/BillCenter/BillSend/InfoModal'
import { matchWantedList } from './contants'
import styles from './index.less'

const { RangePicker } = DatePicker
class InstanceTableList extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      sortedInfo: {
        columnKey: '',
        order: '',
      },
      filteredInfo: {
        productName: [],
      },
      recordData: {},
      visible: false,
    }
  }

  componentDidMount () {
    const { onRef } = this.props
    if (onRef) {
      onRef(this)
    }
  }


  onSearch = () => {
    const { queryList } = this.props
    queryList && queryList({ page: 1, limit: 10 })
  }


  // 重置排序和筛选框内容
  onReset=() => {
    this.clearFilters()
    this.setState({
      instanceIdOrName: '',
      projectName: '',
      department: '',
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
    const { queryList } = this.props
    this.setState({
      openTimeBegin: dateString[0],
      openTimeEnd: dateString[1],
    }, () => {
      queryList && queryList({ page: 1, limit: 10 })
    })
  }

  // 查看某条资源
  onShow = (e, record) => {
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

  getColumnTimeSearchProps = () => ({
    filterDropdown: () => {
      const { openTimeBegin, openTimeEnd } = this.state
      return (
        <div style={{ padding: 8 }}>
          <RangePicker
            onChange={this.onChangeTime}
            value={[ (openTimeBegin && moment(openTimeBegin)) || null, (openTimeEnd && moment(openTimeEnd)) || null ]}
          />
        </div>
      )
    },
    filterIcon: () => {
      const { openTimeBegin, openTimeEnd } = this.state
      return <Icon type="schedule" style={{ color: openTimeBegin && openTimeEnd ? '#1890ff' : undefined }} />
    },
  });


    // table的操作
    onChange = (pagination, filters, sorter) => {
      const { queryList } = this.props
      this.setState({
        sortedInfo: sorter,
        filteredInfo: filters,
      }, () => {
        queryList && queryList()
      })
      /* eslint-enable */
    };

    getColumnSearchProps = (dataIndex) => ({
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
              ref={(node) => {
                this.searchInput = node
              }}
              placeholder={placeholder}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [ e.target.value ] : [])}
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
      onFilterDropdownVisibleChange: (visible) => {
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
      const {
        instanceIdOrName,
        projectName,
        department, sortedInfo,
        filteredInfo, recordData, visible, openTimeBegin, openTimeEnd,
      } = this.state
      const {
        wantedList, // 父级组件想要的列表项
        records, // 表格渲染的数据
        productNameList, // 资源筛选的下拉内容列表
        concatList,
      } = this.props

      // 月份过多时，表格可拖动
      const scroll = (concatList && concatList.length > 1) ? { x: (1200 + 50 * concatList.length) } : { x: false }
      const fixed = (concatList && concatList.length > 1) && true || false
      let columns = [
        {
          title: instanceIdOrName || '实例ID/名称',
          dataIndex: 'instanceIdOrName',
          key: 'instanceIdOrName',
          width: 200,
          fixed,
          className: `${styles.textNoBorder} ${instanceIdOrName ? styles.haveSearchContent : ''}`,
          render: (_, record) => (
            <div>
              <AddTooltip text={record.instanceId || '-'}>
                {
                  record.instanceId
                    ? (
                      <a style={{ display: 'block' }} onClick={(e) => this.onShow(e, record)}>
                        {record.instanceId || '-'}
                      </a>
                    )
                    : (
                      <div>
                        {record.instanceId || '-'}
                      </div>
                    )
                }
              </AddTooltip>
              <AddTooltip text={record.instanceName || '-'}>
                {
                  record.instanceId
                    ? (
                      <div>
                        {record.instanceName || '-'}
                      </div>
                    )
                    : (
                      <a style={{ display: 'block' }} onClick={(e) => this.onShow(e, record)}>
                        {record.instanceName || '-'}
                      </a>
                    )
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
          className: `${styles.tdwrap} ${department ? styles.haveSearchContent : ''}`,
          render: (_) => <AddTooltip text={_}><span className={styles.ellspan}>{_}</span></AddTooltip>,
          ...this.getColumnSearchProps('department'),
        },
        {
          title: projectName || '项目',
          dataIndex: 'projectName',
          key: 'projectName',
          className: `${styles.tdwrap} ${projectName ? styles.haveSearchContent : ''}`,
          render: (_) => <AddTooltip text={_}><span className={styles.ellspan}>{_}</span></AddTooltip>,
          ...this.getColumnSearchProps('projectName'),
        },
        {
          title: '规格',
          dataIndex: 'productSepcs',
          key: 'productSepcs',
          className: `${styles.tdwrap}`,
          render: (_) => <AddTooltip text={_}><span className={styles.ellspan}>{_}</span></AddTooltip>,
        },
        {
          title: openTimeBegin && openTimeEnd ? `${openTimeBegin}-${openTimeEnd}` : '开通时间',
          dataIndex: 'openTime',
          key: 'openTime',
          className: `${styles.tdwrap} ${openTimeBegin && openTimeEnd ? styles.haveSearchContent : ''}`,
          width: 180,
          render: (_) => _,
          ...this.getColumnTimeSearchProps('name'),
        },
      ]
      columns = matchWantedList(wantedList, columns)
      if (Array.isArray(concatList)) {
        concatList.map((item) => {
          item.dataIndex = item.key
          item.render = (_) => _ || '-'
          if (item.sorter) {
            item.sortOrder = sortedInfo.columnKey === item.key ? sortedInfo.order : null
          }
          if (item.datatype === 1) {
            item.render = (_) => getFloatStr(_)
          }
          if (item.datatype === 2) {
            item.render = (_) => transformMomAndYoy(_)
          }
        })
        columns = columns.concat(...concatList)
      }


      return (
        <div className={styles.tabPage}>
          <Table
            style={{ marginTop: '24px', background: '#fff', overflow: 'auto' }}
            rowKey={(record) => record.seqno}
            dataSource={records}
            columns={columns}
            scroll={scroll}
            onChange={this.onChange}
            className={styles.detailTable}
            getPopupContainer={() => document.getElementById('root')}
            pagination={false}
          />
          <InfoModal data={recordData} visible={visible} onCancel={this.onHide} noFee />
          {/* noFee 表示不要费用这一项 */}
        </div>


      )
    }
}

export default InstanceTableList
