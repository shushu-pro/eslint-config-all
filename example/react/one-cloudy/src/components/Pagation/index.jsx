
import React, { Component } from 'react'
import { Pagination } from 'antd'
import styles from './index.less'

class TablePagination extends Component {
  constructor (props) {
    super(props)
    this.state = {
      current: 1,
      pageSize: 10,
    }
  }

  componentDidMount () {
    const { onRef } = this.props
    if (onRef) {
      onRef(this)
    }
  }

  onChange = (current, pageSize) => {
    const { queryList } = this.props
    this.setState({
      current,
      pageSize,
    }, () => {
      queryList && queryList()
    })
  }

  // 再次保存，为了防止用户列表切换页数--搜索名称--启停状态后页码不同
  setData = (current, pageSize) => {
    this.setState({
      current,
      pageSize,
    })
  }

  render () {
    const { total = 0, pageSize = 10, current = 1, disabled = false } = this.props
    return (
      <div className={styles.paginationMain}>
        <Pagination
          ref="pagination"
          className={styles.tablepagination}
          total={total}
          pageSize={pageSize}
          onChange={this.onChange}
          defaultCurrent={1}
          current={current}
          disabled={disabled}
          pageSizeOptions={[ '10', '20', '50' ]}
          showSizeChanger
          onShowSizeChange={this.onChange}
        />
      </div>
    )
  }
}

export default TablePagination
