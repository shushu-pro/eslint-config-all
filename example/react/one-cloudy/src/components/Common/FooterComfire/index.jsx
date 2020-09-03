import React, { PureComponent } from 'react'
import { connect } from 'dva'
import styles from './index.less'
@connect(({ global }) => ({
  collapsed: global.collapsed,
}))
class FooterComfire extends PureComponent {
  render () {
    const { collapsed, children } = this.props
    return (
      <div
        className={styles.btnGroup}
        style={{
          left: 0,
          paddingLeft: collapsed ? '128px' : '305px',
        }}
      >
        {children}
      </div>
    )
  }
}

export default FooterComfire
