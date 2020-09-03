import React from 'react'
import { connect } from 'dva'
import { Link } from 'umi'
import { Card } from 'antd'
import Title from '@/components/Common/Title'
import batchApply from '../../../assets/batchApply.svg'
import singleApply from '../../../assets/singleApply.svg'
import styles from './index.less'

const mapDispatchToProps = (dispatch) => ({
  resetProduct: () => dispatch({
    type: 'resourceApply/resetProduct',
  }),
})
@connect(
  null,
  mapDispatchToProps,
)
class SelectWay extends React.PureComponent {
  componentDidMount () {
    const { resetProduct } = this.props
    // 清空表单域
    resetProduct()
  }

  render () {
    return (
      <Card bordered={false} style={{ textAlign: 'center' }}>
        <Link to="/manage/operation-center/resource-apply/batch" className={styles.selectWay}>
          <img src={batchApply} alt="logo" />
          <div>
            <Title level="h2">批量资源申请</Title>
            <div className={styles.tip}>在同一项目下，批量申请多种资源</div>
            <div className={styles.tip}>（无法申请非项目类资源，如NAT等）</div>
          </div>
        </Link>
        <Link to="/manage/operation-center/resource-apply/single" className={styles.selectWay}>
          <img src={singleApply} alt="logo" />
          <div>
            <Title level="h2">单个资源申请</Title>
            <div className={styles.tip}>申请单个资源，支持全部类型的资源申请</div>
          </div>
        </Link>
      </Card>

    )
  }
}

export default SelectWay
