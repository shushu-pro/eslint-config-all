import React, { Component } from 'react'
import FloatList from '@/components/Common/FloatList'
import NoQuotaPage from '../NoQuotaPage'
import ProductDetail from '../ProductDetail'
import DistributeModal from '../DistributeModal'
import { API_PARAMS, QUOTA_TYPE } from '../../constant'

class ProductList extends Component {
  state = {
    selectItem: {},
    visible: false,
  };

  onDistribute = (item) => {
    this.setState({
      visible: true,
      selectItem: item,
    })
  };

  closeModal = () => {
    this.setState({
      visible: false,
    })
  };

  render () {
    const { visible, selectItem } = this.state
    const {
      distribute, type, data, searchKey, regionId, regionName, deptId,
    } = this.props
    const noDataText = type === QUOTA_TYPE.SUBORDINATE_DEPT && !deptId ? '请选择部门进行配额查看' : '暂无数据'
    return (
      <>
        {data.length > 0 ? (
          <FloatList className="quota-product-list">
            {data.map((item, index) => (
              <ProductDetail
                className={
                  searchKey &&
                  item[API_PARAMS.PRODUCTNAME].toUpperCase().includes(searchKey.toUpperCase())
                    ? 'active'
                    : ''
                }
                key={index}
                data={item}
                distribute={distribute}
                onDistribute={this.onDistribute}
              />
            ))}
          </FloatList>
        ) : (
          <NoQuotaPage text={noDataText} />
        )}
        {distribute && (
          <DistributeModal
            visible={visible}
            data={selectItem}
            onCloseModal={this.closeModal}
            regionId={regionId}
            regionName={regionName}
            type={type}
          />
        )}
      </>
    )
  }
}
export default ProductList
