// 操作记录

import React from 'react'
import { TabsIndex } from '@/components/Common'
import MyOperation from './MyOperation'

class OperationRecordIndex extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <TabsIndex
        title="资源实例操作记录"
        tabList={[
          {
            name: '我的操作',
            key: 'myoperation',
            children: <MyOperation />,
          },
          // {
          //   name: "我的审批",
          //   key: "my111",
          //   children: <div>11</div>,
          // },
        ]}
      />
    )
  }
}

export default OperationRecordIndex
