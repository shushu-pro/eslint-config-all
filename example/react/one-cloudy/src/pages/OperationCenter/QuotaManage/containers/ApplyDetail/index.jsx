import React, { Component } from 'react'
import FloatList from '@/components/Common/FloatList'
import ProductDetail from '../ProductDetail'
import NoQuotaPage from '../NoQuotaPage'
import { API_PARAMS } from '../../constant'
import '../ProductDetail/style.less'

const { ADJUSTED_QUOTA, ORIGINAL_QUOTA, QUOTA_LIST } = API_PARAMS
export default class ApplyDeatil extends React.PureComponent {
  render () {
    const { data = [] } = this.props
    return (
      <FloatList className="quota-product-list">
        {data.map((list, i) => (
          <ProductDetail key={i} data={list}>
            {list.quotaList.length > 0 ? (
              <ul className="quota-product-detail clearfix">
                {list[QUOTA_LIST].map((item, index) => (
                  <li className="detail-item" key={index}>
                    <div className="detail-item-content clearfix">
                      <h4 style={{ float: 'left' }}>
                        {`${item[API_PARAMS.QUOTA_NAME]} (${
                          item[API_PARAMS.QUOTA_UNIT]
                        })`}
                      </h4>
                      <div style={{ float: 'right' }}>
                        <p>
                          {item[ADJUSTED_QUOTA] === item[ORIGINAL_QUOTA] ||
                          (item.originalQuota < 0 && item.adjustedQuota === 0)
                            ? '不变'
                            : `由${item.originalQuota < 0 ? 0 : item.originalQuota}调整为${item[ADJUSTED_QUOTA]}`}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <NoQuotaPage
                size="small"
                text="未改变"
              />
            )}
          </ProductDetail>
        ))}
      </FloatList>
    )
  }
}
