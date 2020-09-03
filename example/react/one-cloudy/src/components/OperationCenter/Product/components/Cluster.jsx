/**
 * 安全组组件
 */
import React from 'react'
import { connect } from 'dva'
import { Form } from 'antd'
import _ from 'lodash'
import SelectItem from './Select'
import { PRODUCT_FIELDS, transform } from '../base/_constant'

const mapDispatchToProps = (dispatch) => ({
  getClusterList: (payload) => dispatch({
    type: 'resourceApply/getClusterList',
    payload,
  }),
})
@connect(
  null,
  mapDispatchToProps,
)
class Cluster extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      optionList: [],
    }
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    const { selectedRegion, selectedDepartment, getClusterList, form } = nextProps
    const {
      selectedRegion: oldSelectedRegion,
      selectedDepartment: oldSelectedDepartment,
    } = this.props
    // 入参发生变化则重新处理列表
    if (
      !_.isEqual(selectedRegion, oldSelectedRegion) ||
      !_.isEqual(selectedDepartment, oldSelectedDepartment)
    ) {
      if (selectedRegion && selectedDepartment) {
        const params = {
          areaId: form.getFieldValue(PRODUCT_FIELDS.AREA_ID),
          regionId: selectedRegion,
          deptId: selectedDepartment,
        }
        getClusterList(params).then(({ resData = [] }) => {
          let list = []
          list = transform(resData)
          this.setState({
            optionList: list,
          })
        })
      } else {
        // 入参有一个编程undefined则清空列表
        this.setState({
          optionList: [],
        })
      }
    }
  }

  render () {
    const { optionList } = this.state
    const { form, formItemLayout } = this.props
    return (
      <Form.Item required label="集群" {...formItemLayout}>
        <SelectItem
          placeholder="集群"
          id={[ PRODUCT_FIELDS.CLUSTER_ID, PRODUCT_FIELDS.CLUSTER_NAME ]}
          form={form}
          optionData={optionList}
        />
      </Form.Item>
    )
  }
}

export default Cluster
