import React from 'react'
import RightAlice from './RightAlice'
import styles from './index.less'

class StackPanel extends React.Component {
  state = {};

  render () {
    const {
      children,
      otherClass,
      style,
    } = this.props
    return <div className={`${styles.stackPanel} ${otherClass}`} style={style}>{children}</div>
  }
}

export default StackPanel
StackPanel.RightAlice = RightAlice
