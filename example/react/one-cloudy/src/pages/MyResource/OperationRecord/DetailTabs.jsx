import React from 'react'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import { Tabs, Icon } from 'antd'
import RecordDetail from './RecordDetail'
import RecordInfo from './RecordInfo'
import { OPERATION_RECORD } from './constant'
import styles from './index.less'

const { TabPane } = Tabs
class DetailTabs extends React.Component {
  constructor (props) {
    super(props)
    const { location } = this.props
    const { ticketId } = location.query
    this.state = {
      ticketId,
      selectKey: 'detail',
    }
  }

  onChange = (key) => {
    const { selectKey } = this.state
    if (selectKey !== key) {
      this.setState({
        selectKey: key,
      })
    }
  };

  render () {
    const { selectKey, ticketId } = this.state
    return (
      <PageHeaderWrapper
        title={`详情${ticketId}`}
        breadcrumbList={[ OPERATION_RECORD ]}
      >
        <div className={styles.pageIndex}>
          <Tabs defaultActiveKey={selectKey} onChange={this.onChange} activeKey={selectKey}>
            <TabPane
              tab={(
                <span>
                  <Icon type="container" />
                  详情
                </span>
              )}
              key="detail"
            >
              <RecordDetail />
            </TabPane>
            <TabPane
              tab={(
                <span>
                  <Icon type="calendar" />
                  流程信息
                </span>
              )}
              key="info"
            >
              <RecordInfo />
            </TabPane>
          </Tabs>
        </div>
      </PageHeaderWrapper>
    )
  }
}

export default DetailTabs
