import React from 'react'
import { FIELD_MAP } from './constant'
import styles from './index.less'

export default class MultipleData extends React.PureComponent {
  static defaultProps = {
    data: {},
  };

  render () {
    const { data, id, label, nothing, unit } = this.props
    if (id.every((o) => !data[o])) {
      return nothing
        ? (
          <div className={styles.config}>
            <span className={styles.configvalue}>{nothing}</span>
          </div>
        )
        : null
    }

    let string = id.map((item, index) => {
      if (!data[item]) return ''
      return (index === 0 ? '' : ', ') + data[item]
    })
    string = string.join('')
    const realLabel = label || FIELD_MAP[id[0]]
    return (
      <div className={styles.config}>
        <span className={styles.label}>{realLabel && `${realLabel}： `}</span>
        <span className={styles.configvalue} title={string || ''}>
          {string}
          {unit}
        </span>
      </div>
    )
  }
}
