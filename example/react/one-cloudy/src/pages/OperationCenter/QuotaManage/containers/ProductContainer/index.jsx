import React from 'react'
import './style.less'

function ProductContainer ({ onDistribute, children, title, className }) {
  return (
    <div className={`quota-product-container ${className || ''}`}>
      <div className="title">
        {onDistribute &&
          <a style={{ float: 'right' }} onClick={onDistribute}>分配</a>}
        <h3>{title}</h3>
      </div>
      {children}
    </div>
  )
}

export default ProductContainer
