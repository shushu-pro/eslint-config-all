import React, { PureComponent } from 'react'
import cx from 'classnames'
import styles from './index.less'

class Region extends PureComponent {
  render () {
    const { resList, activation, onSelect } = this.props
    if (!resList || !Array.isArray(resList)) {
      return null
    }
    return resList.map((item, index) => (
      <a
        key={item}
        onClick={() => {
          onSelect(item, index)
        }}
      >
        <div className={cx(styles.resList, activation && styles.active)}>
          <div>{item}</div>
        </div>
      </a>
    ))
  }
}

export default Region
