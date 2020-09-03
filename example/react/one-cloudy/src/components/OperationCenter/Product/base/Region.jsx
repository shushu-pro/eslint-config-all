import React from 'react'
import { connect } from 'dva'
import { Form, Icon, Col } from 'antd'
import { SelectItem } from '../components'
import { PRODUCT_FIELDS, PRODUCT_FIELDS_NAME } from './_constant'
import { subscribeFormChange, unSubscribeFormChange } from '../index'
import styles from '../style.less'

const mapDispatchToProps = (dispatch) => ({
  queryRegion: ({ ...payload }) => dispatch({
    type: 'resourceApply/queryRegion',
    payload,
  }),
})
@connect(
  ({ resourceApply }) => ({
    regionData: resourceApply.regionData,
    dtDeptList: resourceApply.dtDeptList,
  }),
  mapDispatchToProps,
)

class Region extends React.PureComponent {
  render () {
    return null
  }
}

export default Region
