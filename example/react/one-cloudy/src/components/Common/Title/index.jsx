import React from 'react'
import styles from './index.less'

export default function Title ({ level, action, explain, children }) {
  return (
    <div className={styles.title}>
      <span className={styles[level]}>{children}</span>
      <span className={styles.subTitle}>{explain}</span>
      <span className={styles.action}>{action}</span>
    </div>
  )
}
