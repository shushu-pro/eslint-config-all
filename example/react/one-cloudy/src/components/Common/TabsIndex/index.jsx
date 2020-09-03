import React from 'react'
import { Tabs } from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import styles from './index.less'

const { TabPane } = Tabs
class TabsIndex extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectKey: props.tabList && props.tabList.length > 0 && props.tabList[0].key,
    }
  }


  render () {
    const { tabList, title, goBack } = this.props
    const { selectKey } = this.state
    return (
      <PageHeaderWrapper title={title} goBack={goBack}>
        <div className={styles.tabPage}>
          <Tabs defaultActiveKey={selectKey} onChange={this.onChange}>
            {tabList.map((item) => (
              <TabPane tab={item.name} key={item.key}>
                {item.children}
              </TabPane>
            ))}
          </Tabs>
        </div>
      </PageHeaderWrapper>
    )
  }
}

export default TabsIndex
