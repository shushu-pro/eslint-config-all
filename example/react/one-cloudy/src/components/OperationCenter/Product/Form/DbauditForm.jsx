/**
 * 数据库审计-产品组件
 */
import React from 'react'
import BastionHostForm from './BastionHostForm'
import { PRODUCT_TYPE } from '../base/_constant'

function DbauditForm (props) {
  return (
    <BastionHostForm {...props} type={PRODUCT_TYPE.DBAUDIT} />
  )
}

export default DbauditForm
