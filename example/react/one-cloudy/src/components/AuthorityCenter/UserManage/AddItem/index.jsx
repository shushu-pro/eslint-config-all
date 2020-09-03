
// 添加项目

import React from 'react'
import { connect } from 'dva'
import { Input, Checkbox } from 'antd'
import styles from './index.less'

const { Search } = Input
@connect(({ ACproject, loading }) => ({
  ...ACproject,
  loading: !!loading.effects['ACproject/deptList'],
}))
class AddItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: props.list || [],
      searchValue: '',
    }
  }

  componentDidMount () {

  }

  static getDerivedStateFromProps (nextProps) {
    const { list } = nextProps
    return {
      list,
    }
  }

    onSearch = (value) => {
      this.setState({
        searchValue: value,
      })
    }

    // 根据是否有搜索内容，渲染全部数组还是过滤后的数组
    renderList = () => {
      const { list, searchValue } = this.state
      const filterList = (list.length && list.filter((item) => item.name.indexOf(searchValue) > -1)) || []
      const renderList = searchValue ? filterList : list
      if (renderList && renderList.length) {
        return renderList.map((item) => (
          <div key={item.id} className={styles.itemRow}>
            <span>{item.name}</span>
            <Checkbox checked={item.select} onChange={this.onChangeCheckStatus.bind(this, item)} />
          </div>
        ))
      }
      return ''
    }

    onChangeCheckStatus = (item, e) => {
      const { changeMatchProject } = this.props
      const { checked } = e.target
      changeMatchProject && changeMatchProject(item, checked)
    }

    render () {
      const { placeholder } = this.props
      return (
        <div className={styles.addItem}>
          <Search
            placeholder={placeholder || '请输入内容搜索'}
            onSearch={this.onSearch}
            style={{ width: 200 }}
          />
          {this.renderList()}
        </div>
      )
    }
}
export default AddItem
