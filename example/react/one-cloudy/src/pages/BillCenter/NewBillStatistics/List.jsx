

import React from 'react'
import { router } from 'umi'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import { Tabs, Icon } from 'antd'
import styles from '../index.less'
import style from './index.less'
import OperationsList from '@/components/BillCenter/BillSend/OperationsList'
import DataStatic from './DataStatic'
const { TabPane } = Tabs
class List extends React.Component {
  constructor (props) {
    super(props)
    const { match } = props
    const { type } = match.params
    this.state = {
      selectKey: type || 'datastatic',
    }
  }

  onChange = key => {
    const { selectKey } = this.state
    if (selectKey !== key) {
      router.push(`./${key}`)
      this.setState({
        selectKey: key,
      })
    }
  };

  render () {
    const { children } = this.props
    const { selectKey } = this.state
    return (
      <PageHeaderWrapper
        title='账单统计'
      >
        <div className={`${styles.tabPage} ${style.tabStyle}`}>
          <Tabs defaultActiveKey={selectKey} onChange={this.onChange} activeKey={selectKey}>
            <TabPane
              tab={
                <span>
                  <Icon type="container" />
                  数据统计
                </span>
              }
              key="datastatic"
            />
            <TabPane
              tab={
                <span>
                  <Icon type="calendar" />
                  报表下载
                </span>
              }
              key="download"
            />
          </Tabs>
          {children}
        </div>
      </PageHeaderWrapper>
    )
  }
}

export default List
