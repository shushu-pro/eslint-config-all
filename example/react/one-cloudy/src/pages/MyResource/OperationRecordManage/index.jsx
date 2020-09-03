// 非DT资源实例管理

import React from 'react'
import { TabsIndex } from '@/components/Common'
import CloudSecurityProducts from './CloudSecurityProducts'

class OperationRecordManageIndex extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <TabsIndex
        title="非DT资源实例管理"
        tabList={[
          {
            name: '云安全产品',
            key: 'cloudsecurityproducts',
            children: <CloudSecurityProducts />,
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

export default OperationRecordManageIndex
