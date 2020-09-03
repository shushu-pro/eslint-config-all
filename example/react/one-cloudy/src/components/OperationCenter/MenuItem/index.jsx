import React from 'react'
import { Menu } from 'antd'

class MenuItem extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      selectMenu: props.initialValue || props.menuList[0] || '',
    }
  }

  // 选择资源类型
  handleClick = (e) => {
    const { onUpdateData } = this.props
    this.setState({
      selectMenu: e.key,
    })
    onUpdateData(e.key)
  };

  render () {
    const { selectMenu } = this.state
    const { menuList, menuListMap } = this.props
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[ selectMenu ]}
        mode="horizontal"
        style={{ marginBottom: 16 }}
      >
        {menuList.map((item) => (
          <Menu.Item key={item}>{menuListMap[item]}</Menu.Item>
        ))}
      </Menu>
    )
  }
}

export default MenuItem
