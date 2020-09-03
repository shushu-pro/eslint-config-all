// onResetSelectedKeys 关闭selectTabs页面时，取消treeSelect树的选中效果


import React from 'react'
import { Icon } from 'antd'
import styles from './index.less'


class SelectTabs extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      component: '',
      activeKey: 0,
    }
  }

  componentDidMount () {
    const { list, onRef } = this.props
    onRef && onRef(this)
    if (list && list.length > 0) {
      this.setState({
        component: list[0].component,
      })
    }
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    const { activeKey } = prevState
    const { list } = nextProps
    return {
      component: list[activeKey].component,
    }
  }

    changeTabItem = (item, index) => {
      this.setState({
        component: item.component,
        activeKey: index,
      })
    }

    closeTabs = () => {
      const { closeSelectTreeDepart, onResetSelectedKeys } = this.props
      closeSelectTreeDepart && closeSelectTreeDepart()
      onResetSelectedKeys && onResetSelectedKeys()
    }


    renderUl = () => {
      const { list } = this.props
      const { activeKey } = this.state
      return list && list.map((item, index) => (
        <li key={item.name} onClick={() => { this.changeTabItem(item, index) }}>
          <div className={`${styles.slopingside} ${activeKey === index ? styles.slopingsideactive : ''}`}>
            {item.name}
          </div>
          <div className={`${styles.linear} ${activeKey === index ? styles.linearactive : ''}`} />
        </li>
      ))
    }


    render () {
      const { component } = this.state
      const { selectTabsStyles } = this.props
      return (
        <div className={styles.selectTabs} style={selectTabsStyles}>
          <ul className={styles.selectTabsUl}>
            {this.renderUl()}
          </ul>
          <div onClick={this.closeTabs} style={{ textAlign: 'right' }}>
            <Icon type="close" style={{ cursor: 'pointer' }} />
          </div>
          {component}
        </div>

      )
    }
}

export default SelectTabs
