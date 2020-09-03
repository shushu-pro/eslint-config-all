/**
 * VPC组件
 */
import React from 'react'
import { connect } from 'dva'
import _ from 'lodash'
import api from '@/api'
import SelectItem from './Select'
import { PRODUCT_FIELDS, transform } from '../base/_constant'
import { subscribeFormChange, unSubscribeFormChange } from '../index'

const mapDispatchToProps = (dispatch) => ({
  getVpc: (payload) => dispatch({
    type: 'resourceApply/getVpc',
    payload,
  }),
})
@connect(
  ({ resourceApply }) => ({
    formEdit: resourceApply.formEdit,
    selectedProjectInfo: resourceApply.selectedProjectInfo,
  }),
  mapDispatchToProps,
)
class Vpc extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      optionList: [],
    }
  }

  componentDidMount () {
    subscribeFormChange(this.onFormChange)
    setTimeout(() => this.setOptionList())
  }

  componentWillUnmount () {
    unSubscribeFormChange(this.onFormChange)
  }

  onFormChange = (changedValues, changeFieldId) => {
    const { form } = this.props

    // dt部门发生变更
    if (changeFieldId === 'dtDeptId' || changeFieldId === 'deptId') {
      setTimeout(() => this.setOptionList())
    }
    if (changeFieldId === PRODUCT_FIELDS.NETWORK_TYPE) {
      form.setFieldsValue({ [PRODUCT_FIELDS.VPC_ID]: undefined })
    }
  };

  // 根据参数获取并设置optionList
  setOptionList = (props = this.props) => {
    const {
      form, productType, selectedProjectInfo,
    } = props
    const deptId = form.getFieldValue('deptId') || selectedProjectInfo.commonInfo.deptId
    const dtDeptId = form.getFieldValue('dtDeptId')
    const regionId = form.getFieldValue('regionId')
    if (dtDeptId && deptId) {
      const params = {
        // areaId: form.getFieldValue(PRODUCT_FIELDS.AREA_ID),
        regionId,
        deptId,
        dtDeptId,
        productType,
      }
      // getVpc(params).then(({ resData = [] }) => {
      //   let list = [];
      //   list = transform(resData);
      //   this.setState({
      //     optionList: list,
      //   });
      // });
      api.getVpcByDt(params).then((data) => {
        let list = []
        list = transform(data)
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
  };

  render () {
    const { optionList } = this.state
    const { form } = this.props
    return (
      <SelectItem
        required={false}
        id={[ PRODUCT_FIELDS.VPC_ID, PRODUCT_FIELDS.VPC_NAME ]}
        placeholder="VPC"
        form={form}
        optionData={optionList}
      />
    )
  }
}

export default Vpc
