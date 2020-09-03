import React, { Component } from 'react'
import FloatList from '@/components/Common/FloatList'
import ProductEdit from '../ProductEdit'


function ProductList (props) {
  const { data, form } = props
  return (
    <div className="clearfix">
      <FloatList className="quota-product-list">
        {data.map((item, index) => (
          <ProductEdit form={form} key={index} data={item} />
        ))}
      </FloatList>
    </div>
  )
}

export default ProductList
