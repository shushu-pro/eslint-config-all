// 资源实例

import React, { PureComponent } from 'react'
import { router } from 'umi'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import {
  Card,
} from 'antd'
import singleApply from '@/assets/submitSuccess.svg'
import { RES_INSTANCE } from './contant'
import './index.less'

class SuccessContainer extends PureComponent {
  constructor (props) {
    super(props)
    const { location } = props
    const { ticketId } = location.query
    this.state = {
      ticketId,
    }
  }

  // 跳转
  onLink = () => {
    router.push('/manage/myresource/operationrecord')
  };

  render () {
    const { ticketId } = this.state
    return (
      <PageHeaderWrapper
        title="升降配"
        breadcrumbList={[ RES_INSTANCE ]}
      >
        <Card bordered={false} style={{ textAlign: 'center', padding: 120 }}>
          <img src={singleApply} alt="logo" width="230px" />
          <div style={{ marginTop: 80 }}>
            资源操作成功,操作单号为:
            {' '}
            {ticketId}
            , 请前往
            <span onClick={this.onLink} style={{ color: '#1890ff', cursor: 'pointer' }}>资源实例操作记录</span>
            中查看
          </div>
        </Card>
      </PageHeaderWrapper>
    )
  }
}

export default SuccessContainer
