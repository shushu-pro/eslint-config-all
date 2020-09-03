
import React, { Component } from 'react'
import { Radio } from 'antd'
import styles from './index.less'

class RaiodButtonRegionList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      region: 'all',
    }
  }

  componentDidMount () {
    const { onRef } = this.props
    if (onRef) {
      onRef(this)
    }
  }


    onRegionChange = (e) => {
      const { queryList, getBillStatistics, onResetTableListRef } = this.props
      onResetTableListRef && onResetTableListRef()
      this.setState({ region: e.target.value }, () => {
        getBillStatistics && getBillStatistics()
        queryList && queryList({ page: 1, limit: 10 })
      })
    };

    render () {
      const { region } = this.state
      const { list, loading } = this.props
      return (
        <div className={styles.paginationMain}>
          <Radio.Group
            disabled={loading}
            value={region}
            onChange={this.onRegionChange}
            style={{ margin: '20px 0 0' }}
          >
            <Radio.Button value="all">全部</Radio.Button>
            {list && list.length > 0 && list.map((item) => (
              <Radio.Button value={item.value} key={item.value}>{item.label}</Radio.Button>
            ))}
          </Radio.Group>
        </div>
      )
    }
}

export default RaiodButtonRegionList
