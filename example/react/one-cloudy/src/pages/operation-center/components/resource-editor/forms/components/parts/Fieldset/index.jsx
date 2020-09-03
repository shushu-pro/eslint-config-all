import React from 'react'
import { Col, Row, Divider } from 'antd'
import styles from './index.less'

export default function Fieldset ({
  icon, title, children, noDivider, topTitle,
}) {
  if (topTitle) {
    return (
      <>
        <div className={styles.title}>
          <i className={`icon iconfont ${icon}`} />
          <h3>{title}</h3>
        </div>
        <Row>
          <Col span={3} />
          <Col span={21}>
            <div className={styles.content}>{children}</div>
          </Col>
          {!noDivider && <Divider style={{ marginBottom: '24px' }} />}
        </Row>
      </>
    )
  }
  return (
    <Row>
      <Col span={3}>
        <div className={styles.title}>
          <i className={`icon iconfont ${icon}`} />
          <h3>{title}</h3>
        </div>
      </Col>
      <Col span={21}>
        <div className={styles.content}>{children}</div>
      </Col>
      {!noDivider && <Divider style={{ marginBottom: '24px' }} />}
    </Row>
  )
}
