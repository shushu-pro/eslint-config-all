import React, { PureComponent } from 'react'
import { Input } from 'antd'
import styles from './index.less'

const { Search } = Input
class TableSearch extends PureComponent {
  static propTypes = {}

  constructor (props) {
    super(props)
    this.state = {
    }
  }

  onBlurSearch = (value) => {
    const { onBlur } = this.props
    onBlur(value)
  }

  getSearch = (value) => {
    const { onSearch } = this.props
    onSearch(value)
  }

  render () {
    const { placeholder } = this.props
    return (
      <div className={styles.tableSearchWrap}>
        <Search
          allowClear
          className={styles.tableSearch}
          placeholder={placeholder}
          onSearch={(value) => this.getSearch(value)}
          onBlur={(e) => this.onBlurSearch(e.target.value)}
        />
      </div>
    )
  }
}

export default TableSearch
