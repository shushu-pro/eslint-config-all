import React from 'react'
import {
  Table,
} from 'antd'
import TableSearchItem from './SearchTitle'
import styles from './index.less'
// import { columns, data } from './mockData';
class TableItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      status: null,
      filterInfo: { ...props.filterInfos },
      selectedRowKeys: [],
      activeKey: '',
      col11: [],
      inputTagType: null,
      initPages: {
        total: 0,
        showSizeChanger: true,
        current: 1,
        pageSize: 10,
        pageSizeOptions: [ '10', '20', '50', '100' ],
      },
    }
  }

  UNSAFE_componentWillMount () {
    const { pagination, filterInfos, columns } = this.props
    const pageInfo = pagination || this.state.initPages
    this.onSearch(filterInfos, pageInfo)
    // const col = this.renderColumns(columns);
    // this.setState({ col11: col });
  }

  onSearch = (params, pages) => {
    const { onChange } = this.props
    const { filterInfo } = this.state
    onChange({
      ...filterInfo, ...params, limit: (pages && pages.pageSize) || 10, page: (pages && pages.current) || 1,
    })
  }

  changeTable = (pagination, filters, sorter, extra) => {
    const { filterInfo } = this.state
    const params = { ...filters }
    if (sorter) {
      params.order = sorter.order && sorter.order.includes('end') ? sorter.order.split('end')[0] : sorter.order
      params.soretField = sorter.field
    }
    this.onSearch({ ...params }, pagination)
    this.setState({ initPages: { ...pagination }, filterInfo: { ...filterInfo, ...params } })
  }

  renderTitle = (key, title, idx) => {
    const { activeKey, filterInfo } = this.state
    const { noSearchIcon } = this.props
    return (
      <TableSearchItem
        noSearchIcon={noSearchIcon}
        activeKey={activeKey}
        value={filterInfo[key]}
        titleKey={key}
        title={title}
        tableTagType={idx}
        onClick={() => {
          this.setState({ activeKey: key })
        }}
        onChange={(inputValue, key1) => {
          if (key1) {
            filterInfo[key1] = inputValue
            this.setState({ filterInfo: { ...filterInfo } })
          }
        }}
        onSearch={(searchTag) => {
          if (searchTag) {
            this.onSearch()
          }
        }}
      />
    )
  };

  renderColumns = (cols) => {
    const { tableTagType } = this.props
    // console.log('noSearchIcon', tableTagType);
    let temp = []
    temp = cols.map((item) => {
      item.title = item.isSearch && typeof (item.title) !== 'object'
        ? this.renderTitle(item.key || item.dataIndex, item.title, tableTagType)
        : item.title
      return { ...item }
    })
    return temp
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys })
    // onSelectedRowKeys(selectedRowKeys)
  };


  render () {
    const {
      others, loading = false, pagination, rowSelection, columns, data, components,
      scroolX,
    } = this.props
    const { initPages } = this.state
    const pageInfo = {
      ...initPages,
      ...pagination,
      showTotal (item) {
        return item ? (
          <div>
            共计
            {' '}
            <span style={{ color: '#1890ff' }}>
              {item || 0}
              {' '}
            </span>
            条
          </div>
        ) : ''
      },
    }
    // const rowSelection1 = {
    //   selectedRowKeys,
    //   onChange: this.onSelectChange,
    // };
    const cols = columns && columns.length ? this.renderColumns(columns) : []
    return (
      <div className={styles.autoTableComp}>
        <Table
          {...others}
          scroll={{ x: scroolX || 'auto' }}
          components={components}
          rowSelection={rowSelection}
          dataSource={data}
          pagination={pageInfo}
          loading={loading}
          columns={cols}
          onChange={this.changeTable}
          rowClassName={() => 'editable-row'}
        />
      </div>
    )
  }
}
export default TableItem
