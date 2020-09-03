import React from 'react'
import styles from './index.less'
export default function RightAlice ({ children }) {
  return <div className={styles.rightAlign}>{children}</div>
}
