import React, { PureComponent } from 'react'
import { connect } from 'dva'
import ResDetail from '@/components/OperationCenter/ResDetail'

@connect(({ operationOrder, user }) => ({
  detailInfo: operationOrder.detailInfo,
  userInfo: user.userInfo,
}))
class OrderDetail extends PureComponent {
  state = {};

  render () {
    const { detailInfo, match, projectDetail } = this.props
    const data = { ...detailInfo, projectDetail }
    return <ResDetail data={data} match={match} />
  }
}

export default OrderDetail
