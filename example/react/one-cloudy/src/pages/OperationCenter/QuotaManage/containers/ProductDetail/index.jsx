import React from 'react'
import { Progress } from 'antd'
import ProductContainer from '../ProductContainer'
import NoQuotaPage from '../NoQuotaPage'
import { API_PARAMS } from '../../constant'
import { assignedPercent, usedPercent } from '../../utils.jsx'
import './style.less'

export default function ProductDetail ({
  distribute,
  onDistribute: propsOnDistribute,
  data,
  className,
  children = <ProductDetailContent data={data} />,
}) {
  const onDistribute = () => {
    propsOnDistribute && propsOnDistribute(data)
  }
  const canDistribute = data[API_PARAMS.QUOTA_LIST].length > 0 // 能否分配的条件
  const distrubuteParam = distribute && canDistribute ? { onDistribute } : {} // 是否展示分配按钮（根据页面和数据区分）
  return (
    <ProductContainer
      className={className}
      title={data[API_PARAMS.PRODUCTNAME]}
      {...distrubuteParam}
    >
      {children}
    </ProductContainer>
  )
}

export function ProductDetailContent ({ type, data }) {
  const list = data[API_PARAMS.QUOTA_LIST] || []
  return (
    <ul className={`quota-product-detail ${type || ''} clearfix`}>
      {list.length > 0 ? (
        list.map((item, index) => (
          <li className="detail-item" key={index}>
            <div className="detail-item-content">
              <h4>{`${item[API_PARAMS.QUOTA_NAME]} (${item[API_PARAMS.QUOTA_UNIT]})`}</h4>
              <div>
                <p>
                  配额：
                  {item[API_PARAMS.QUOTA_TOTAL] > 0 ? item[API_PARAMS.QUOTA_TOTAL] : 0}
                </p>
                <p>
                  使用情况：
                  {`${item[API_PARAMS.QUOTA_USED]}/${item[API_PARAMS.QUOTA_ASSIGN]}/${
                    item[API_PARAMS.QUOTA_REMAIN]
                  }`}
                </p>
                <Progress
                  percent={assignedPercent(item)}
                  successPercent={usedPercent(item)}
                  showInfo={false}
                />
              </div>
            </div>
          </li>
        ))
      ) : (
        <NoQuotaPage
          size="small"
          text={'该产品暂不支持配额管理功能，\n该产品的申请与开通不受影响，\n需要审批人手动审批'}
        />
      )}
    </ul>
  )
}
