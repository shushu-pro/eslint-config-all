import React, { PureComponent } from 'react'
import cx from 'classnames'
import { Row, Col } from 'antd'
import styles from './index.less'

class Region extends PureComponent {
  renderORow = () => {
    const { resInfoList, activeKey, activation, onAction } = this.props
    return resInfoList.map((item, index) => (
      <div
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        className={cx(
          styles.applyCard,
          index === activeKey && activation && styles.applyCardActive,
        )}
      >
        <Row style={{ padding: '20px' }}>
          <Col span={6}>{item.resourceType}</Col>
          <Col span={6}>{item.instanceName || '-'}</Col>
          <Col span={6}>-</Col>
          <a
            style={{ width: '25%' }}
            className={styles.action}
            onClick={() => {
              onAction(item, index)
            }}
          >
            {!item.feekbackData ? '添加反馈' : '取消反馈'}
          </a>
        </Row>
        {item.feekbackData && (
          <div className={styles.feekbackCard}>{item.feekbackData.value}</div>
        )}
      </div>
    ))
  };

  render () {
    const { resInfoList } = this.props
    if (!resInfoList || !Array.isArray(resInfoList)) {
      return null
    }

    return (
      <div>
        <Row style={{ padding: '20px' }}>
          <Col span={6}>资源</Col>
          <Col span={6}>实例名称</Col>
          <Col span={6}>配置</Col>
        </Row>
        {this.renderORow()}
      </div>
    )
  }
}

export default Region
