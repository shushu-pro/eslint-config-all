// titleKey:当前点击表头的标识符
// activeKey：当前激活的表头的标识符，和titleKey配合判断当前哪个表头是激活的
// noSearchIcon:表示没有表头没有搜索功能
import React from 'react'
import { Input, Icon } from 'antd'
import styles from './index.less'

const { Search } = Input
class TableSearchItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searchTag: true,
      searchTypeTag: '',
      searchKeys: {},
    }
  }

  UNSAFE_componentWillMount () {
    const randomKey = Math.floor(Math.random() * 100)
    // console.log('randomKey', randomKey);
    this.setState({ searchTypeTag: randomKey })
  }

  render () {
    const { searchTag, searchKeys, searchTypeTag } = this.state
    const {
      value,
      onClick,
      titleKey,
      onChange,
      title,
      onSearch,
    } = this.props
    // console.log(searchKeys, titleKey, value)
    const onlyKey = `${titleKey}_${searchTypeTag}`
    return (
      <div key={onlyKey} className={styles.tableSearchItem}>
        {searchKeys[onlyKey] || value ? (
          <Search
            ref={(node) => {
              this[onlyKey] = node
            }}
            key={`${titleKey}Search`}
            defaultValue={value}
            style={{ width: '100%' }}
            placeholder={`请输入${title}`}
            onSearch={() => {
              this.setState({ searchTag: false })
              onSearch(true)
            }}
            onChange={(e) => {
              this.setState({ searchTag: true })
              onChange(e.target.value, titleKey)
            }}
            onBlur={(e) => {
              onChange(e.target.value, titleKey)
              // 防止点了搜索
              onSearch(searchTag)
              if (!e.target.value && titleKey) {
                const data = { ...searchKeys, [onlyKey]: false }
                this.setState({ searchKeys: data })
              }
            }}
            allowClear
          />
        ) : (
          <div key={`${titleKey}Title`}>
            <span>
              {title}
              {' '}
              <Icon
                className={styles.searchIcon}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  this.setState({ searchKeys: { [onlyKey]: true } })
                  onClick(titleKey)
                  setTimeout(() => this[onlyKey] && this[onlyKey].focus(), 100)
                }}
                type="search"
              />
            </span>
          </div>
        )}
      </div>

    )
  }
}
export default TableSearchItem
