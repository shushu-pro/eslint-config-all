import React, { Component } from 'react'
import NumberInput from '@/components/Common/Form/Number'
import ProductContainer from '../ProductContainer'
import { API_PARAMS } from '../../constant'
import NoQuotaPage from '../NoQuotaPage'
import './style.less'

const {
  QUOTA_LIST,
  PRODUCTNAME,
  QUOTA_NAME,
  QUOTA_UNIT,
  QUOTA_ASSIGN,
  QUOTA_USED,
  ACTUAL_PRODUCTID,
  QUOTA_TOTAL,
  SPEC_TYPE_ID,
} = API_PARAMS
class ProductEdit extends Component {
  formItemLayout = {
    style: {
      marginBottom: 0,
    },
    labelCol: {
      span: 10,
    },
    wrapperCol: {
      span: 14,
    },
  };

  render () {
    const { form, data } = this.props
    const { quotaList } = data
    return (
      <ProductContainer title={data[PRODUCTNAME]}>
        {quotaList.length > 0
          ? (
            <ul className="quota-product-edit">
              {data[QUOTA_LIST].map((item, index) => {
                const min = item[QUOTA_ASSIGN] + item[QUOTA_USED]
                if (item[QUOTA_TOTAL] < 0) {
                  item[QUOTA_TOTAL] = 0
                }
                return (
                  <li className="edit-item" key={index}>
                    <NumberInput
                      required
                      initialValue={item.quantity}
                      formItemLayout={this.formItemLayout}
                      form={form}
                      label={`${item[QUOTA_NAME]} (${item[QUOTA_UNIT]})`}
                      id={`${item[ACTUAL_PRODUCTID]}.${item[SPEC_TYPE_ID]}-`}
                      min={min}
                      size="small"
                      style={{ width: '120px' }}
                    />
                  </li>
                )
              })}
            </ul>
          )
          : (
            <NoQuotaPage
              size="small"
              text={'该产品暂不支持配额管理功能，\n该产品的申请与开通不受影响，\n需要审批人手动审批'}
            />
          )}
      </ProductContainer>
    )
  }
}
export default ProductEdit
