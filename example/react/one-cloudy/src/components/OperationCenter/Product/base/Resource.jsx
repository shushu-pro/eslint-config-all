/**
 * 其他产品的资源列表
 * 目前该文件已经废弃
 */
import React from 'react'
import { connect } from 'dva'
import { Form } from 'antd'
import { SelectItem } from '../components'
import { PRODUCT_FIELDS } from './_constant'

const mapStateToProps = (dispatch) => ({
  getOtherProductlist: () => dispatch({
    type: 'resourceApply/getOtherProductlist',
  }),
})
@connect(
  ({ resourceApply }) => ({
    otherProductList: resourceApply.otherProductList,
  }),
  mapStateToProps,
)
class Resource extends React.PureComponent {
  componentDidMount () {
    const { getOtherProductlist } = this.props
    getOtherProductlist()
  }

  render () {
    const { form, formItemLayout, otherProductList } = this.props
    return (
      <Form.Item label="资源" {...formItemLayout} required>
        <SelectItem
          id={[ PRODUCT_FIELDS.RESOURCE_ID, PRODUCT_FIELDS.RESOURCE_NAME ]}
          form={form}
          optionData={otherProductList}
        />
      </Form.Item>
    )
  }
}

export default Resource
