import React from 'react'
import { connect } from 'dva'
import { Steps } from 'antd'
import StackPanel from '@/components/Common/StackPanel'
import cx from 'classnames'
import { parseUrlParams } from './utils'
import {
  STATUS_MAP_TEXT,
  FLOW_MAP_REFUSE,
  NEXT_FLOW_MAP_TEXT,
  FLOW_MAP_TEXT,
  STATUS_MAP,
} from './constant'
import styles from './index.less'

const { Step } = Steps
@connect(({ OperationRecord, loading }) => ({
  queryList: OperationRecord.deptBillDetail,
  loading: !!loading.effects['OperationRecord/listRegions'],
}))
class RecordInfo extends React.Component {
  constructor (props) {
    super(props)
    const res = parseUrlParams()
    this.state = {
      currentFlow: [],
      ticketId: res.ticketId,
      nextFlow: [],
    }
  }

  componentDidMount () {
    this.queryDetail()
  }

  queryDetail = () => {
    const { dispatch } = this.props
    const { ticketId } = this.state
    dispatch({
      type: 'OperationRecord/getOperateDetail',
      payload: {
        ticketId,
      },
      callback: (e) => {
        if (e.code === 200) {
          this.setState({
            currentFlow: e.currentFlow || [],
            nextFlow: e.nextFlow || [],
          })
        }
      },
    })
  };

  render () {
    const { currentFlow, nextFlow } = this.state
    return (
      <div className={`${styles.recordinfo} ${styles.flowList}`}>
        <Steps progressDot current={(currentFlow.length) - 1} direction="vertical">
          {currentFlow && currentFlow.map((item, index) => {
            const isRefuse = currentFlow.some((key) => FLOW_MAP_REFUSE[item.state] === key.state)
            return (
              <Step
                key={`${item.state}-${index}`}
                title={FLOW_MAP_TEXT[item.state]}
                className={isRefuse ? styles.refuseColor : styles.passColor}
                description={
                  (
                    <div style={{ marginTop: 5 }}>
                      <StackPanel>
                        <span>{item.createdDate}</span>
                        <span>{item.processor}</span>
                        <span className={cx(styles.status, styles[item.state])}>
                          {item.state !== STATUS_MAP.CANCELING && STATUS_MAP_TEXT[item.state]}
                        </span>
                      </StackPanel>
                      <div className={styles.remark}>
                        说明:
                        {' '}
                        {item.comment || '-'}
                      </div>
                    </div>
                  )
                }
              />
            )
          })}
          {nextFlow.map((item, index) => (
            <Step
              key={`${item.state}-${index}`}
              title={NEXT_FLOW_MAP_TEXT[item.state]}
            />
          ))}
        </Steps>
      </div>
    )
  }
}


export default RecordInfo
