/**
 * 安全组组件
 */
import React from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import _ from 'lodash';
import SelectItem from './Select';
import { PRODUCT_FIELDS } from '../base/_constant';

const mapDispatchToProps = dispatch => ({
      getSecurityGroup: payload =>
    dispatch({
      type: 'resourceApply/getSecurityGroup',
      payload,
    }),
  resetList: list =>
    dispatch({
      type: 'resourceApply/setter',
      payload: {
        [list]: [],
      },
    }),
});
@connect(
  ({ resourceApply }) => ({
    securityGroupList: resourceApply.securityGroupList,
    formEdit: resourceApply.formEdit,
  }),
  mapDispatchToProps
)
class SecurityGroup extends React.PureComponent {
  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      selectedVpc,
      selectedRegion,
      selectedProject,
      resetList,
      getSecurityGroup,
      form,
      formEdit,
    } = nextProps;
    const {
      selectedVpc: oldSelectedVpc,
      selectedRegion: oldSelectedRegion,
      selectedProject: oldSelectedProject,
    } = this.props;
    // 入参发生变化则重新处理列表
    if (
      !_.isEqual(selectedVpc, oldSelectedVpc) ||
      !_.isEqual(selectedRegion, oldSelectedRegion) ||
      !_.isEqual(selectedProject, oldSelectedProject)
    ) {
      if (!formEdit) {
        form.setFieldsValue({ [PRODUCT_FIELDS.SECURITY_GROUP_ID]: undefined });
      }
      if (selectedVpc && selectedRegion && selectedProject) {
        const params = {
          areaId: form.getFieldValue(PRODUCT_FIELDS.AREA_ID),
          regionId: selectedRegion,
          vpcId: selectedVpc,
          projectId: selectedProject,
        };
        getSecurityGroup(params);
      } else {
        // 入参有一个编程undefined则清空列表
        resetList('securityGroupList');
      }
    }
  }

  render() {
    const { form, formItemLayout, securityGroupList } = this.props;
    return (
      <Form.Item required label="安全组" {...formItemLayout}>
        <SelectItem
          placeholder="安全组"
          id={[PRODUCT_FIELDS.SECURITY_GROUP_ID, PRODUCT_FIELDS.SECURITY_GROUP_NAME]}
          form={form}
          optionData={securityGroupList}
        />
      </Form.Item>
    );
  }
}

export default SecurityGroup;
