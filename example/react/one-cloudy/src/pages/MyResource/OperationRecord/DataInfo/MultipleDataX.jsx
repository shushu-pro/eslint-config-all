import React, { PureComponent } from 'react'
import _ from 'lodash'
import StackPanel from '@/components/Common/StackPanel'
import { Icon } from 'antd'
import styles from '@/components/OperationCenter/ResourceInfo/index.less'

export default class MultipleData extends PureComponent {
  static defaultProps = {
    data: {},
  };

  isObjEqual = (o1, o2) => {
    const props1 = Object.getOwnPropertyNames(o1)
    const props2 = Object.getOwnPropertyNames(o2)
    if (props1.length !== props2.length) {
      return false
    }
    for (let i = 0, max = props1.length; i < max; i++) {
      const propName = props1[i]
      if (o1[propName] !== o2[propName]) {
        return false
      }
    }
    return true
  }

  render () {
    const {
      data, id, render, label, after,
    } = this.props
    if (!data[id]) return null
    if (!render) return new Error('paramter \'render\' is required but not found!')
    const list = data[id]
    if (!Array.isArray(list)) {
      return new Error('data[id] must be array')
    }
    if (!list.length) {
      return null
    }
    if (after[id] && after[id].length) {
      after[id] = after[id].filter((item) => item.diskType !== 'sys')
    }
    return (
      <div className={styles.config}>
        <StackPanel>
          <div>{label && `${label}： `}</div>
          <div className={styles.configvalue}>
            {list.map((keys, index) => (
              <div key={index}>
                {render(keys, index)}
              </div>
            ))}
          </div>
          {
            (after[id] && !(_.isEqual(after[id], data[id]))) ? (
              <>
                <Icon type="arrow-right" style={{ margin: '0 5px 0 -2px' }} />
                <span style={{ color: 'red' }}>
                  {after[id].map((keys, index) => (
                    <div key={index}>
                      {render(keys, index)}
                    </div>
                  ))}
                </span>
              </>
            ) : ''
          }
        </StackPanel>
      </div>
    )
  }
}
