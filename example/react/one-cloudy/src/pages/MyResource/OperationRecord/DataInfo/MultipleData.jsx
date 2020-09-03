import React from 'react'
import { FIELD_MAP } from '@/components/OperationCenter/ResourceInfo/constant'
import { Icon } from 'antd'
import _ from 'lodash'
import styles from '@/components/OperationCenter/ResourceInfo/index.less'

export default class MultipleData extends React.PureComponent {
  static defaultProps = {
    data: {},
  };

  render () {
    const {
      data, id, label, nothing, unit, afterData,
    } = this.props
    if (id.every((o) => !data[o])) {
      return nothing ? (
        <div className={styles.config}>
          <span className={styles.configvalue}>{nothing}</span>
        </div>
      ) : null
    }

    let string = id.map((item, index) => {
      if (!data[item]) return ''
      return (index === 0 ? '' : ', ') + data[item]
    })
    string = string.join('')
    const realLabel = label || FIELD_MAP[id[0]]
    let afterString = id.map((item, index) => {
      if (!afterData[item]) return ''
      return (index === 0 ? '' : ', ') + afterData[item]
    })
    afterString = afterString.join('')
    return (
      <div className={styles.config}>
        <span className={styles.label}>{realLabel && `${realLabel}： `}</span>
        <span className={styles.configvalue} title={string || ''}>
          {string}
          {unit}
        </span>
        {
          afterData[id] && !(_.isEqual(afterData[id], data[id])) ? (
            <span>
              <Icon type="arrow-right" style={{ margin: '0 5px' }} />
              <span style={{ color: 'red' }} title={afterString || ''}>
                {afterString}
              </span>
            </span>
          ) : null
        }
      </div>
    )
  }
}
