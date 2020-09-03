/**
 * VPC组件
 */
import React from 'react';
import { connect } from 'dva';
import _ from 'lodash';
import SelectItem from './Select';
import { PRODUCT_FIELDS, transform } from '../base/_constant';
import { subscribeFormChange, unSubscribeFormChange } from '../index';

const mapDispatchToProps = dispatch => ({
  queryDtDeptList: ({ ...payload }) =>
    dispatch({
      type: 'resourceApply/queryDtDeptList',
      payload,
    }),
});
@connect(
  ({ resourceApply }) => ({
    formEdit: resourceApply.formEdit,
  }),
  mapDispatchToProps
)
class DtSelect extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      optionList: [],
    };
  }

  componentDidMount() {
    subscribeFormChange(this.onFormChange);
    this.setOptionList();
  }

  componentWillUnmount() {
    unSubscribeFormChange(this.onFormChange);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { selectedDepartment, selectedRegion } = nextProps;
    const {
      selectedDepartment: oldSelectedDepartment,
      selectedRegion: oldSelectedRegion,
    } = this.props;
    // 入参发生变化则重新处理列表
    if (
      !_.isEqual(selectedDepartment, oldSelectedDepartment) ||
      !_.isEqual(selectedRegion, oldSelectedRegion)
    ) {
      this.setOptionList(nextProps);
    }
  }

  onFormChange = (changedValues, changeField) => {
    const { form } = this.props;
    if (changeField === PRODUCT_FIELDS.NETWORK_TYPE) {
      form.setFieldsValue({ [PRODUCT_FIELDS.VPC_ID]: undefined });
    }
    
  };

  // 根据参数获取并设置optionList
  setOptionList = (props = this.props) => {
    const { selectedDepartment, selectedRegion, getVpc, form, productType } = props;
    if (selectedRegion && selectedDepartment) {
      const params = {
        areaId: form.getFieldValue(PRODUCT_FIELDS.AREA_ID),
        regionId: selectedRegion,
        deptId: selectedDepartment,
        productType
      };
      getVpc(params).then(({ resData = [] }) => {
        let list = [];
        list = transform(resData);
        this.setState({
          optionList: list,
        });
      });
    } else {
      // 入参有一个编程undefined则清空列表
      this.setState({
        optionList: [],
      });
    }
  };

  render() {
    const { optionList } = this.state;
    const { form } = this.props;
    return (
      <SelectItem
        required={false}
        id={[PRODUCT_FIELDS.VPC_ID, PRODUCT_FIELDS.VPC_NAME]}
        placeholder="VPC"
        form={form}
        optionData={optionList}
      />
    );
  }
}

export default DtSelect;
