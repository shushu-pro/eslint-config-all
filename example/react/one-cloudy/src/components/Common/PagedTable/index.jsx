import React from 'react'
import PropTypes from 'prop-types'
import { Table, Tooltip } from 'antd'
import { noop } from '../../../utils/common'
import Column from './Column'
import Pagination from './Pagination'
import withDva from './withDva'

export { withDva }
const render = (children, renders, ...rest) => {
  if (typeof children === 'function') {
    return children(rest[1])
  }
  if (typeof renders === 'function') {
    return renders(...rest)
  }

  return rest[0]
}

const parseChildren = (tableChildren) => {
  const columns = []
  let pagination = {}
  React.Children.forEach(tableChildren, (child) => {
    if (child.type === Column) {
      const { children, ...others } = child.props
      columns.push({
        ...others,
        render: (...rest) => render(children, others.render, ...rest),
      })
    } else if (child.type === Pagination) {
      pagination = child.props
    }
  })
  return [ columns, pagination ]
}
export default function PagedTable ({
  tableList,
  loading,
  pagination,
  totalCount,
  pageNo,
  pageSize,
  pagedQuery,
  children,
  rowSelection,
  selectedRowKeys,
  changeSelectedRowKeys,
  ...others
}) {
  // 从children 中解析出，列以及分页信息
  const [ columns, overridePaging ] = parseChildren(children)
  // 如果
  let column = others.columns || columns
  if (column) {
    column = column.map((item) => ({
      ...item,
      render (...rest) {
        let value = rest[0]
        // rest为【dataIndex, record, index】
        // 如果dataIndex为string，说明不是操作栏，需要做数据显示
        // 如果render是function，说明传入的render为自定义，否则为table默认的table
        if (item.render) {
          value = item.render(...rest)
        }
        if (item.noTips) {
          return value
        }
        // 需要给长度超出170px的行，加上tips
        if (typeof rest[0] === 'string' && value.length <= 8) {
          return value
        }
        if (!item.dataIndex) {
          return value
        }

        return (
          <Tooltip title={rest[1][item.dataIndex]}>
            {value}
          </Tooltip>
        )
      },
    }))
  }
  const pageChange = {
    onChange: (pageIndex) => {
      pagedQuery({ pageNo: pageIndex })
    },
    onShowSizeChange: (current, size) => {
      pagedQuery({ pageNo: 1, pageSize: size })
    },
  }
  let newPage = {
    total: totalCount,
    current: pageNo,
    showSizeChanger: true,
    pageSize,
    pageSizeOptions: [ '10', '20', '50', '100' ],
    ...overridePaging,
  }
  if (!others.onChange) {
    newPage = {
      ...newPage,
      ...pageChange,
    }
  }
  const paging = pagination && totalCount ? newPage : false
  const rowSelectionObject = rowSelection
    ? {
      ...rowSelection,
      selectedRowKeys,
      onChange: changeSelectedRowKeys,
    }
    : null
  return (
    <Table
      {...others}
      dataSource={tableList}
      loading={loading}
      columns={column}
      pagination={paging}
      rowSelection={rowSelectionObject}
    />
  )
}

PagedTable.propTypes = {
  tableList: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    // 用以配置列
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  pagination: PropTypes.bool, // 是否开启分页
  totalCount: PropTypes.number,
  pageNo: PropTypes.number,
  pageSize: PropTypes.number,
  pagedQuery: PropTypes.func, // 分页时发起的分页请求
  rowSelection: PropTypes.object,
  selectedRowKeys: PropTypes.arrayOf(PropTypes.any),
  changeSelectedRowKeys: PropTypes.func,
}
PagedTable.defaultProps = {
  tableList: [],
  children: '',
  pagination: true,
  totalCount: 0,
  pageNo: 1,
  pageSize: 10,
  pagedQuery: noop,
  rowSelection: undefined,
  selectedRowKeys: [],
  changeSelectedRowKeys: noop,
}
PagedTable.Column = Column
PagedTable.Pagination = Pagination
