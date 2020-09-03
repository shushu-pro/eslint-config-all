import React, { Component } from 'react'
import { connect } from 'dva'
import { Tree, Input, Icon } from 'antd'
import { ScrollShadowBox } from '@/components/Common'
import { querySubDepts, getDistributeCurrentOcDeptTree } from '@/services/OperationCenter/quotaManage'
import './style.less'

@connect(({ pageData }) => ({
  regionId: pageData.regionId,
}))

class DeptTree extends Component {
  state = {
    selectedKeys: [], // 选择的key值
    searchKey: undefined, // 搜索关键字
    expandedKeys: [], // 展开的节点
    treeData: [],
  }

  componentDidMount () {
    this.getSubDeptTree()
  }

  getSubDeptTree = async () => {
    const { treeData } = this.state
    const { type } = this.props
    const api = type === 'distribute' ? getDistributeCurrentOcDeptTree() : querySubDepts()
    const { resData } = await api
    const { list } = resData
    const data = this.transformDept(list)
    treeData.children = data
    this.setState({
      treeData: data,
    })
  }

  transformDept = (list) => {
    list && list.map((item) => {
      item.title = item.deptName
      item.key = item.deptId
      item.children = item.childDeptList && this.transformDept(item.childDeptList)
      item.icon = <Icon type="apartment" style={{ marginRight: '8px' }} />
    })
    return list
  };

  searchDept = (val) => {
    const expandedKeys = []
    const { treeData } = this.state
    if (val) {
      this.selectExpandedKeys(treeData, val, (key) => {
        expandedKeys.push(key)
      })
    }
    this.setState({
      searchKey: val,
      expandedKeys,
    })
  }

  selectExpandedKeys = (data, val, callback, parentData) => {
    data.forEach((item) => {
      const { children, title } = item
      if (title.includes(val) && parentData) {
        callback(parentData.key)
      }
      children && children.length > 0 && this.selectExpandedKeys(children, val, callback, item)
    })
  }

  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
    })
  }

  onSelectTree = (keys, { node }) => {
    const { selectedKeys: oldSelectedKeys } = this.state
    const { onSelect, onChange, beforeSelect } = this.props
    const selectedKeys = node.props.eventKey
    const ifContinue = beforeSelect ? beforeSelect() : true
    if (!ifContinue) return
    this.setState({
      selectedKeys: [ selectedKeys ],
    })
    onSelect && onSelect(selectedKeys)
    if (selectedKeys !== oldSelectedKeys[0]) {
      onChange && onChange(selectedKeys)
    }
  }

  render () {
    const {
      selectedKeys, expandedKeys, searchKey, treeData,
    } = this.state
    const { size } = this.props
    return (
      <div>
        <Input.Search
          className="dept-search"
          size={size || 'default'}
          allowClear
          onSearch={this.searchDept}
          placeholder="请输部门名称查询"
        />
        <ScrollShadowBox
          className="dept-tree"
        >
          <Tree
            selectedKeys={selectedKeys}
            onExpand={this.onExpand}
            onSelect={this.onSelectTree}
            treeData={treeData}
            expandedKeys={expandedKeys}
            filterTreeNode={(node) => searchKey && node.props.title.includes(searchKey)}
            switcherIcon={<Icon type="down" />}
            defaultExpandAll
            showIcon
          />
        </ScrollShadowBox>
      </div>
    )
  }
}

export default function SubordinateDeptTree ({ size = '', children, ...args }) {
  return (
    <div className={`subordinate-dept ${size}`}>
      <div className="left">
        <DeptTree size={size} {...args} />
      </div>
      <div className="right">
        {children}
      </div>
    </div>
  )
}
