/**
 * 网络组件
 * @param { boolean } isPrivate 是否是专有网络
 */
import React from 'react'
import { connect } from 'dva'
import { Form, Col } from 'antd'
import { InstanceName } from '@/components/OperationCenter/Product/base'
import {
  // SecurityGroup,
  RadioButtonItem,
  Vm,
  Vpc,
  CheckboxItem,
} from '../components'
import { FIELD_MAP, PRODUCT_FIELDS, networkTypeList as networkTypeListAll } from './_constant'

@connect(({ resourceApply }) => ({
  selectedProjectInfo: resourceApply.selectedProjectInfo,
}))
class Net extends React.Component {
  constructor (props) {
    super(props)
    // 是否只有专有网络
    const { isPrivateOnly } = props
    const optionList = isPrivateOnly ? networkTypeListAll.slice(0, 1) : networkTypeListAll
    this.state = {
      optionList: props.optionList ? optionList.concat(props.optionList) : optionList,
    }
  }

  componentDidMount () {
    this.setInitValue()
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    const { form, isNAT } = nextProps
    if (!isNAT && !form.getFieldValue(PRODUCT_FIELDS.NETWORK_TYPE)) {
      this.setInitValue()
    }
  }

  setInitValue = () => {
    const { form, initNet } = this.props
    const { optionList } = this.state
    form.setFieldsValue({ [PRODUCT_FIELDS.NETWORK_TYPE]: initNet || optionList[0].key })
  };

  render () {
    const { optionList } = this.state
    const {
      form,
      // securityGroup,
      tip,
      formItemLayout,
      label,
      batch,
      selectedProjectInfo,
      isNAT,
      isACS,
      productType,
    } = this.props
    // 批量则从redux里面取出projectId，否则从表单取出
    // const selectedProject = batch
    //   ? selectedProjectInfo.commonInfo[PRODUCT_FIELDS.PROJECT_ID]
    //   : form.getFieldValue(PRODUCT_FIELDS.PROJECT_ID);
    // 批量则从redux里面取出deptId，否则从表单取出
    const deptId = batch
      ? selectedProjectInfo.commonInfo[PRODUCT_FIELDS.DEPARTMENT_ID]
      : form.getFieldValue('deptId')
    // 判断是专有网络还是经典网络
    const networkType = form.getFieldValue(PRODUCT_FIELDS.NETWORK_TYPE)
    const isPrivate = networkType === optionList[0].key // list第一个是专有网络
    const regionId = form.getFieldValue(PRODUCT_FIELDS.REGION_ID)
    const selectedVpc = form.getFieldValue(PRODUCT_FIELDS.VPC_ID)
    const dtDeptId = form.getFieldValue('dtDeptId')
    return (
      <>
        <Form.Item required={!isNAT} label={label || '网络类型'} {...formItemLayout}>
          {!isNAT && (
            <Col span={24}>
              <RadioButtonItem
                form={form}
                optionData={optionList}
                id={[ PRODUCT_FIELDS.NETWORK_TYPE, PRODUCT_FIELDS.NETWORK_TYPE_NAME ]}
                tip={tip}
              />
            </Col>
          )}
          {(isPrivate || isNAT) && (
            <Vpc
              form={form}
              deptId={deptId}
              regionId={regionId}
              productType={productType}
              dtDeptId={dtDeptId}
            />
          )}
          {isPrivate && !isNAT && (
            <Vm form={form} selectedVpc={selectedVpc} selectedRegion={regionId} productType={productType} />
          )}
        </Form.Item>
        {isACS ? (
          <div>
            {selectedVpc ? (
              <InstanceName
                form={form}
                formItemLayout={formItemLayout}
                productType={productType}
                instanceType="ACSPOD"
                label={FIELD_MAP[PRODUCT_FIELDS.PODNETCIDR]}
                className="product-item-acs"
                id={PRODUCT_FIELDS.PODNETCIDR}
                isACS={isACS}
                defaultValue="172.20.0.0/20"
              />
            ) : null}
            <Form.Item required label="配置SNAT" {...formItemLayout}>
              <CheckboxItem
                id={PRODUCT_FIELDS.CHECK_SNAT}
                form={form}
                value="为专有网络配置SNAT"
                disabled
              />
            </Form.Item>
            <Form.Item required label="公网SLB" {...formItemLayout}>
              <CheckboxItem
                id={PRODUCT_FIELDS.CHECK_SLB}
                form={form}
                value="用公网SLB暴露API SERVER"
                disabled
              />
            </Form.Item>
            <Form.Item required label="SSH登录" {...formItemLayout}>
              <CheckboxItem
                id={PRODUCT_FIELDS.CHECK_SSH}
                form={form}
                value="开放公网SSH登录"
                disabled
              />
            </Form.Item>
          </div>
        ) : null}

        {/* {!isNAT && securityGroup && isPrivate && (
          <SecurityGroup
            formItemLayout={formItemLayout}
            form={form}
            selectedVpc={selectedVpc}
            selectedRegion={selectedRegion}
            selectedProject={selectedProject}
          />
        )} */}
      </>
    )
  }
}

export default Net
