import React from 'react'
import { Col, Row, Divider } from 'antd'
import styles from './style.less'

export default function LeftTitle ({
  icon, title, children, noDivider,
}) {
  if (title === '区域') {
    return null
  }
  return (
    <Row>
      <Col span={3}>
        <div className={styles['left-title']}>
          <i className={`icon iconfont ${icon}`} />
          <h1>{title}</h1>
        </div>
      </Col>
      <Col span={21}>
        <div className={styles.content}>{children}</div>
      </Col>
      {!noDivider && <Divider style={{ marginBottom: '24px' }} />}
    </Row>
  )
}
