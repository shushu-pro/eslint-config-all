
// isCheckable 表示是否有checkbox按钮
// haveMenu 表示是否有操作栏
// isRelated 显示是否有已配对标识
// showSelectTreeDepart 改变页面在页面中的显示位置
// setList checkbox选中或取消某个元素后，组成一个不重复的数组
// haveRoot 拥有level是0的根组织，true:用state中的treeData;fales:用props中的treeData


import React from 'react'
import { connect } from 'dva'
import {
  Tree, Icon, Checkbox, Input, Modal, message,
} from 'antd'
import AddTooltip from '@/components/Common/AddTooltip'
import EditDepartName from '@/pages/AuthorityCenter/DepartmentManage/EditDepartName'
import CreateDepartment from '@/pages/AuthorityCenter/DepartmentManage/CreateDepartment'
import styles from './index.less'

const { confirm } = Modal
const { TreeNode } = Tree
const { Search } = Input
@connect(({ ACdepartment, loading }) => ({
  ...ACdepartment,
  loading: !!loading.effects['ACdepartment/deleteOcDept'],
}))

class TreeSelect extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      expandedKeys: [ '0' ],
      autoExpandParent: true,
      selectedKeys: [],
      editDepartNameVisible: false,
      createDepartmentVisible: false,
      treeData: [
        {
          name: 'ROOT',
          key: '0',
          deptId: '0',
          level: 0,
          children: [],
          orgType: 0,
        },
      ],
    }
  }

  componentDidMount () {
    const { onRef } = this.props
    if (onRef) {
      onRef(this)
    }

    this.expandDefaultCheck()
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    const { treeData } = this.state
    const childrentreeData = nextProps.treeData
    treeData[0].children = childrentreeData
    this.setState({
      treeData,
    }, () => {
      this.expandDefaultCheck()
    })
  }

  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: true,
    })
  };

  onCheck = (item, e) => {
    const { setList, dispatch, OCdepartmentId } = this.props
    const { checked } = e.target
    e.stopPropagation()
    if (!checked) {
      dispatch({
        type: 'ACdepartment/checkOcDtDeptUnbound',
        payload: {
          ocDeptId: OCdepartmentId,
          dtDeptId: item.key,
          cloudRegion: item.cloud,
        },
        callback: (ev) => {
          if (ev.successful) {
            const { isCanUnbound } = ev.resData
            if (isCanUnbound) {
              item.isChecked = checked
              setList && setList(item, checked)
            } else {
              message.error(e.msg)
            }
          }
        },
      })
    } else {
      item.isChecked = checked
      setList && setList(item, checked)
    }
  };

  onSelect = (selectedKeys, e) => {
    if (selectedKeys[0] !== '0') { // 点击的时候ROOT时，不展示右侧菜单
      const { showSelectTreeDepart, getTheChosenTreeNode, closeSelectTreeDepart } = this.props
      if (e.node.props.dataRef.isVirtual === 0) {
        showSelectTreeDepart && showSelectTreeDepart()
      } else {
        closeSelectTreeDepart && closeSelectTreeDepart()
      }
      getTheChosenTreeNode && getTheChosenTreeNode(e)
      if (e.selected) {
        this.setState({ selectedKeys })
      }
    }
  };

  onResetSelectedKeys = () => {
    this.setState({ selectedKeys: [] })
  }

  onCreate = (e, item) => {
    e && e.stopPropagation()
    const { createDepartmentVisible } = this.state
    this.setState({
      createDepartmentVisible: !createDepartmentVisible,
      itemData: item,
    })
  }

  onEdit = (e, item) => {
    e && e.stopPropagation()
    const { editDepartNameVisible } = this.state
    this.setState({
      editDepartNameVisible: !editDepartNameVisible,
      itemData: item,
    })
  }

  onDel = (e, item) => {
    e && e.stopPropagation()
    this.showConfirm(item)
  }

  showConfirm = (item) => {
    const that = this
    const { dispatch, getOcDeptTree } = this.props
    confirm({
      title: '是否删除该部门?',
      content: '删除一朵云上的部门，不会对DT平台上的部门、项目、资源产生影响。',
      okText: '确认',
      cancelText: '取消',
      onOk () {
        dispatch({
          type: 'ACdepartment/deleteOcDept',
          payload: {
            ocDeptId: item.deptId,
          },
          callback: (e) => {
            if (e.successful) {
              const { isSuccess } = e.resData
              if (isSuccess) {
                message.success('删除成功')
                getOcDeptTree && getOcDeptTree()
              } else {
                that.warning()
              }
            }
          },
        })
      },
      onCancel () {
      },
    })
  }

  warning = () => {
    Modal.warning({
      title: '当前部门不可删除',
      content: '如需删除部门，需要保证该一朵云部门下项目和用户，不存在与任何DT平台匹配的关系。',
    })
  }

  // 匹配DT部门时，将当前部门已匹配的部门勾选
  setDefaultChecked = (data, chosenList) => {
    data.forEach((item) => {
      chosenList.forEach((listItem) => {
        if (item.key === listItem.id) {
          item.defaultChecked = true
        }
      })
    })
    return data
  }

  // 匹配DT部门时，将当前部门已匹配的部门展开
  expandDefaultCheck = () => {
    const { chosenList } = this.props
    const { expandedKeys } = this.state
    if (chosenList && chosenList.length > 0) {
      chosenList.forEach((item) => {
        expandedKeys.push(item.id)
      })
      this.setState({
        expandedKeys,
        autoExpandParent: true,
      })
    }
  }

  // 渲染树节点
  renderTreeNodes = (list) => {
    const { haveMenu, isCheckable } = this.props
    let iconDom
    return list && list.map((item) => {
      let iconDom
      if (item.orgType === 0) {
        iconDom = <Icon type="cluster" style={{ marginRight: '8px' }} />
      } else if (item.orgType === 1) {
        iconDom = <Icon type="cluster" style={{ marginRight: '8px' }} />
      } else if (item.orgType === 2) {
        iconDom = <Icon type="apartment" style={{ marginRight: '8px' }} />
      } else if (item.orgType === 3) {
        iconDom = <Icon type="gold" style={{ marginRight: '8px' }} />
      }
      const title = (
        <span className={styles.menuTitle} key={item.id}>
          {iconDom}
          <span className={`${styles.menuDepartName}  ${item.right ? styles.menuDepartNameChosen : ''}`}>
            {item.name}
          </span>
          {
            haveMenu
              ? (
                <span className={styles.menuList}>
                  {item.level !== 0
                    ? (
                      <AddTooltip text={<span>编辑</span>} placement="top">
                        <Icon type="form" className={styles.treeicon} onClick={(e) => { this.onEdit(e, item) }} />
                      </AddTooltip>
                    ) : null}
                  {item.level !== 0
                    ? (
                      <AddTooltip text={<span>删除</span>} placement="top">
                        <Icon type="delete" className={styles.delicon} onClick={(e) => { this.onDel(e, item) }} style={{ marginLeft: '5px' }} />
                      </AddTooltip>
                    ) : null}
                  {item.level !== 5
                    ? (
                      <AddTooltip text={<span>创建</span>} placement="top">
                        <Icon type="plus-circle" className={styles.createicon} onClick={(e) => { this.onCreate(e, item) }} style={{ marginLeft: '5px' }} />
                      </AddTooltip>
                    ) : null}
                </span>
              ) : null
          }
          {
            isCheckable && item.cloudParentId !== '0' ? (item.isOccupied && <span className={styles.matchedItem}>已匹配</span> || <Checkbox checked={item.isChecked} onClick={(e) => { this.onCheck(item, e) }} key={item.key} />) : null
          }
        </span>
      )
      item.title = title
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item} parentDeptId={item.parentDeptId} nodeName={item.deptName}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        )
      }
      return <TreeNode title={item.title} key={item.key} dataRef={item} parentDeptId={item.parentDeptId} nodeName={item.deptName} />
    })
  }

  // search框内容改变时
  onChangeSearch = (e) => {
    const { value } = e.target
    const { treeData } = this.state
    const expandedKeys = this.checkSearch(value, treeData)
    this.setState({
      expandedKeys,
      autoExpandParent: true,
    })
  }

  // 匹配对应的部门名称
  checkSearch = (value, list) => {
    const expandedKeys = []
    list.forEach((item) => {
      if (item.children) {
        expandedKeys.push(...this.checkSearch(value, item.children))
      }
      if (value && item.name.indexOf(value) > -1) {
        item.right = true
        expandedKeys.push(item.key)
      } else {
        item.right = false
      }
    })
    return expandedKeys
  }

  render () {
    const {
      expandedKeys, autoExpandParent, selectedKeys, editDepartNameVisible, createDepartmentVisible, itemData, treeData,
    } = this.state
    const {
      haveSearch, getOcDeptTree, treeStyles, haveRoot, setOCdeptName, OCdepartmentId,
    } = this.props
    const dataList = haveRoot ? treeData : this.props.treeData
    return (
      <div style={treeStyles} className={styles.treeselectindex}>
        {
          haveSearch ? <Search style={{ marginBottom: 8 }} placeholder="请输入部门名称搜索" onChange={this.onChangeSearch} /> : null
        }
        <Tree
          onExpand={this.onExpand}
          defaultExpandedKeys={[ '0' ]}
          autoExpandParent
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          onSelect={this.onSelect}
          selectedKeys={selectedKeys}
          className={styles.treeselect}
        >
          {dataList && dataList.length && this.renderTreeNodes(dataList)}
        </Tree>
        {
          editDepartNameVisible
            ? (
              <EditDepartName
                visible={editDepartNameVisible}
                onEdit={this.onEdit}
                itemData={itemData}
                getOcDeptTree={getOcDeptTree}
                setOCdeptName={setOCdeptName}
                OCdepartmentId={OCdepartmentId}
              />
            ) : null
        }
        {
          createDepartmentVisible
            ? (
              <CreateDepartment
                visible={createDepartmentVisible}
                onCreate={this.onCreate}
                itemData={itemData}
                getOcDeptTree={getOcDeptTree}
              />
            ) : null
        }
      </div>
    )
  }
}

export default TreeSelect
