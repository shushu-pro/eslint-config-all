/**
 * 选择某个字段进行搜索
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Select, Input } from 'antd'

const { Option } = Select
const { Search } = Input
class SelectSearch extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectKey: props.optionList ? props.optionList[0].key : '',
    }
  }

  onSelectChange = (value) => {
    this.setState({
      selectKey: value,
    })
  };

  onSearch = (value) => {
    const { queryData } = this.props
    const { selectKey } = this.state
    queryData({
      selectKey,
      value,
    })
  };

  render () {
    const { optionList } = this.props
    const { selectKey } = this.state
    if (!optionList.length) {
      return null
    }
    return (
      <>
        <Select
          onChange={this.onSelectChange}
          style={{ width: 100, marginRight: 10, marginLeft: 20 }}
          placeholder="请选择"
          value={selectKey}
        >
          {optionList.map((item) => (
            <Option key={item.key}>{item.value}</Option>
          ))}
        </Select>
        <Search
          allowClear
          placeholder="请输入查询"
          onSearch={this.onSearch}
          style={{ width: 200 }}
        />
      </>
    )
  }
}

SelectSearch.propTypes = {
  optionList: PropTypes.array.isRequired,
  queryData: PropTypes.func.isRequired,
}
export default SelectSearch
