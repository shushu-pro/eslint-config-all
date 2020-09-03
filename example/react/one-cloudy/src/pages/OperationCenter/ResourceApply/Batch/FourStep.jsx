
import React from 'react'
import router from 'umi/router'
import { Card } from 'antd'
import singleApply from '@/assets/submitSuccess.svg'

class Result extends React.PureComponent {
  onGoList = () => {
    router.push('/manage/operation-center/operation-order/list')
  };

  render () {
    const { location } = this.props
    const { state: s } = location
    const { applyId: val } = s
    return (
      <Card bordered={false} style={{ textAlign: 'center', padding: 120 }}>
        <img src={singleApply} alt="logo" width="230px" />
        <div style={{ marginTop: 80 }}>
          资源申请成功，申请单号为：
          {val}
          ，可在
          <a onClick={this.onGoList}>申请单列表</a>
          中查看
        </div>
      </Card>
    )
  }
}

export default Result
