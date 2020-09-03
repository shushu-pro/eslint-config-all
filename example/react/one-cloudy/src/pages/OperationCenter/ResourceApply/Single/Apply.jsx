import React from 'react'
import { connect } from 'dva'
import { router } from 'umi'
import ProductList from '../ProductList'
import styles from './index.less'

@connect()
class Apply extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {}
  }

  onChangeProduct = (item) => {
    const { productTypeEnum: type, name, isDepdProject } = item
    router.push(
      `/manage/operation-center/resource-apply/product/${type}/${name}?isDepdProject=${isDepdProject}`,
    )
  };

  render () {
    return (
      <div className={styles.singleApply}>
        <div className={styles.tip}>请选择需要申请的资源：</div>
        <div className={styles.tabPage}>
          <ProductList onChangeProduct={this.onChangeProduct} />
        </div>
      </div>
    )
  }
}

export default Apply
