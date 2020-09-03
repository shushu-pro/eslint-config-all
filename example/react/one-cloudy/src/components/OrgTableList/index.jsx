
import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Table, Input, Button, Icon } from 'antd'
import { getFloatStr } from '@/utils/utils'
import { Link } from 'umi'
import AddTooltip from '@/components/Common/AddTooltip'
import { transformMomAndYoy, transformData } from '@/pages/BillCenter/constant'
import styles from './index.less'

@connect(({ newDepartBill, loading }) => ({
  ...newDepartBill,
  loading: !!loading.effects['newDepartBill/listRegions'],
}))
class OrgTableListIndex extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      sortedInfo: {
        columnKey: '',
        order: '',
      },
    }
  }

  componentDidMount () {
    const { onRef } = this.props
    if (onRef) {
      onRef(this)
    }
  }

  componentWillReceiveProps () {

  }


  // 切换表格
  onChange= (pagination, filters, sorter) => {
    const { queryList } = this.props
    this.setState({
      sorter,
      sortedInfo: sorter,
    }, () => {
      queryList && queryList()
    })
    /* eslint-enable */
  }

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
      this.clearFilters = clearFilters
      return (
        <div style={{ padding: 8 }}>
          <Input
            ref={(node) => {
              this.searchInput = node
            }}
            placeholder="搜索部门名称"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [ e.target.value ] : [])}
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
    onFilter: (value, record) => record[dataIndex]
      .toString()
      .toLowerCase()
      .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
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
      this.onSearch()
    })
  };

  handleReset = (clearFilters) => {
    clearFilters()
    this.setState({ searchText: '' }, () => {
      this.onSearch()
    })
  };

  onSearch = () => {
    const { queryList } = this.props
    queryList && queryList({ page: 1, limit: 10 })
  }


  render () {
    const { searchText, sortedInfo } = this.state
    const { records, concatList, targetUrl } = this.props
    const scroll = (concatList && concatList.length > 3) ? { x: (800 + 100 * concatList.length) } : { x: false }
    const fixed = (concatList && concatList.length > 3) && true || false
    let columns = [
      {
        title: searchText || '组织',
        dataIndex: 'department',
        key: 'department',
        fixed,
        width: 200,
        className: searchText ? styles.haveSearchContent : '',
        render: (_, record) => {
          const { departmentId } = record
          return (
            <AddTooltip text={_}>
              {
                targetUrl
                  ? (
                    <Link
                      to={`/manage/bill-center/${targetUrl}?departmentId=${departmentId}`}
                      onClick={() => {
                        this.onReset()
                      }}
                    >
                      {_}
                    </Link>
                  ) : <div>{_}</div>
              }

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
        render: (_) => transformData(_),
      },
      {
        title: '资源数量',
        dataIndex: 'productNum',
        key: 'productNum',
        sorter: true,
        sortOrder: sortedInfo.columnKey === 'productNum' && sortedInfo.order,
        render: (_) => transformData(_),
      },
    ]
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
      <Table
        className={styles.detailTable}
        style={{ marginTop: '24px' }}
        rowKey={(record) => record.seqno}
        scroll={scroll}
        dataSource={records}
        columns={columns}
        onChange={this.onChange}
        getPopupContainer={() => document.getElementById('root')}
        pagination={false}
      />
    )
  }
}

export default OrgTableListIndex

// concatlist
// -参数列表title,key,(sorter需要时传),datatype
// -datatype参数决定数据展示类型：1-费用类型 2-环比同比类型,其他为原本内容或-
