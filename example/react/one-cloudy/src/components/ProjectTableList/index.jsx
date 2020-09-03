
import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Icon, Table, Input, Button } from 'antd'
import { getFloatStr } from '@/utils/utils'
import { Link } from 'umi'
import AddTooltip from '@/components/Common/AddTooltip'
import { transformMomAndYoy, transformData } from '@/pages/BillCenter/constant'
import styles from './index.less'

@connect(({ billCenter, loading }) => ({
  ...billCenter,
  loading: !!loading.effects['newDepartBill/listProjectBillSumInfo'],
}))
class ProjectTableList extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      sortedInfo: {
        columnKey: '',
        order: '',
      },
      projectName: '',
      department: '',
    }
  }

  componentDidMount () {
    const { onRef } = this.props
    if (onRef) {
      onRef(this)
    }
  }

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, clearFilters }) => {
      this.clearFilters = clearFilters
      return (
        <div style={{ padding: 8 }}>
          <Input
            ref={(node) => {
              this.searchInput = node
            }}
            placeholder={dataIndex === 'projectName' ? '搜索项目名称' : '搜索部门名称'}
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
      projectName: null,
      department: null,
    })
  }

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
    const { queryList } = this.props
    queryList && queryList({ page: 1, limit: 10 })
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


  render () {
    const { projectName, department, sortedInfo } = this.state
    const { concatList, records, targetUrl, extreParams } = this.props
    const scroll = (concatList && concatList.length > 3) ? { x: (800 + 100 * concatList.length) } : { x: false }
    const fixed = (concatList && concatList.length > 3) && true || false
    let columns = [
      {
        title: projectName || '项目名称',
        dataIndex: 'projectName',
        width: 200,
        fixed,
        className: `${styles.textNoBorder} ${projectName ? styles.haveSearchContent : ''}`,
        render: (_, record) => {
          const project = record && record.projectName
          return (
            <AddTooltip text={_}>
              <Link
                to={`/manage/bill-center/${targetUrl}?projectName=${project}${extreParams}`}
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
        className: `${styles.textNoBorder} ${department ? styles.haveSearchContent : ''}`,
        render: (_) => _ || '-',
        ...this.getColumnSearchProps('department'),
      },
      {
        title: '资源数量',
        dataIndex: 'productNum',
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
        style={{ marginTop: '24px' }}
        rowKey={(record) => record.seqno}
        dataSource={records}
        scroll={scroll}
        columns={columns}
        onChange={this.onChange}
        className={styles.detailTable}
        getPopupContainer={() => document.getElementById('root')}
        pagination={false}
      />

    )
  }
}

export default ProjectTableList


// concatlist
// -参数列表title,key,(sorter需要时传),datatype
// -datatype参数决定数据展示类型：1-费用类型 2-环比同比类型,其他为原本内容或-
