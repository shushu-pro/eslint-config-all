import React from 'react'
import { Popconfirm, Button, Icon } from 'antd'

class DropItem extends React.Component {
  confirm (e) {
    this.props.onConfirm(e)
  }

  render () {
    const {
      buttonName = '添加',
      icon,
      overlayClassName = '',
      buttonType = 'link',
      buttonIcon = 'plus-circle',
      DomReact,
    } = this.props
    return (
      <div className="bbbccc">
        <Popconfirm
          placement="bottomLeft"
          overlayClassName={overlayClassName}
          title={DomReact}
          onConfirm={(e) => this.confirm(e)}
          okText="确定"
          icon={icon}
          cancelText="取消"
        >
          <Button style={{ color: '#1890ff' }} type={buttonType}>
            <Icon type={buttonIcon} />
            {buttonName}
          </Button>
        </Popconfirm>
      </div>
    )
  }
}

export default DropItem
