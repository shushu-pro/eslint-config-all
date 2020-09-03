/**
 * 虚拟交换机组件
 */
import React from 'react'
import { connect } from 'dva'
import _ from 'lodash'
import SelectItem from './Select'
import { PRODUCT_FIELDS, transform } from '../base/_constant'
import { subscribeFormChange, unSubscribeFormChange } from '../index'

const mapDispatchToProps = (dispatch) => ({
  getVm: (payload) => dispatch({
    type: 'resourceApply/getVm',
    payload,
  }),
})
@connect(
  ({ resourceApply }) => ({
    vmList: resourceApply.vmList,
    formEdit: resourceApply.formEdit,
  }),
  mapDispatchToProps,
)
class Vm extends React.PureComponent {
  state = {
    optionList: [],
  };

  componentDidMount () {
    subscribeFormChange(this.onFormChange)
    setTimeout(() => this.setOptionList())
  }

  componentWillUnmount () {
    unSubscribeFormChange(this.onFormChange)
  }

  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   const { selectedVpc, selectedRegion } = nextProps;
  //   const { selectedVpc: oldSelectedVpc, selectedRegion: oldSelectedRegion } = this.props;
  //   // 入参发生变化则重新处理列表
  //   if (!_.isEqual(selectedVpc, oldSelectedVpc) || !_.isEqual(selectedRegion, oldSelectedRegion)) {

  //     this.setOptionList(nextProps);
  //   }
  // }

  // 根据参数获取并设置optionList
  setOptionList = (props = this.props) => {
    const {
      selectedVpc, getVm, form, productType,
    } = props
    const dtDeptId = form.getFieldValue('dtDeptId')
    const regionId = form.getFieldValue('regionId')
    if (selectedVpc && regionId && dtDeptId) {
      const params = {
        areaId: form.getFieldValue(PRODUCT_FIELDS.AREA_ID),
        regionId,
        dtDeptId,
        vpcId: selectedVpc,
        productType,
      }
      getVm(params).then((data) => {
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
  }

  onFormChange = (changedValues, changeFieldId) => {
    const { form } = this.props
    if (changeFieldId === PRODUCT_FIELDS.VPC_ID) {
      form.setFieldsValue({ [PRODUCT_FIELDS.VIRTUAL_SWITCH_ID]: undefined })
      setTimeout(() => this.setOptionList())
    }
  };

  render () {
    const { optionList } = this.state
    const { form } = this.props
    return (
      <SelectItem
        required={false}
        id={[ PRODUCT_FIELDS.VIRTUAL_SWITCH_ID, PRODUCT_FIELDS.VIRTUAL_SWITCH_NAME ]}
        placeholder="虚拟交换机"
        form={form}
        optionData={optionList}
      />
    )
  }
}

export default Vm
