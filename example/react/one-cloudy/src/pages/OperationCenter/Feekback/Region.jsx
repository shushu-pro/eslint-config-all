import React, { PureComponent } from 'react'
import { Radio } from 'antd'
import styles from './index.less'

class Region extends PureComponent {
  render () {
    const { applyList, applyRegion, onApplyChange } = this.props
    if (!applyList || !Array.isArray(applyList)) {
      return null
    }
    return (
      <div className={styles.title}>
        <span className={styles.icon} />
        <h1>资源清单</h1>
        <div className={styles.content}>
          <Radio.Group onChange={onApplyChange} defaultValue={applyRegion}>
            {applyList.map((item) => {
              const len = item.regionName.length > 4
              return (
                <Radio.Button
                  style={{ fontSize: len ? '12px' : '14px' }}
                  value={item.regionId}
                  key={item.regionId}
                >
                  {item.regionName}
                </Radio.Button>
              )
            })}
          </Radio.Group>
        </div>
      </div>
    )
  }
}

export default Region
