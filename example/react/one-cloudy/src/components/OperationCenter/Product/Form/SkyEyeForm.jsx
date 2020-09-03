/**
 * ENCForm-加密机组件
 */
import React from 'react'
import LeftTitle from '@/components/OperationCenter/LeftTitle'
import { PRODUCT_FIELDS, FIELD_MAP } from '@/pages/OperationCenter/ResourceApply/constant'
import {
  Region,
  BaseInfo,
  Number,
  ModelCard,
  SkyEyeConfig,
} from '@/components/OperationCenter/Product/base'
import { FORM_ICON } from '../base/_constant'
import { DATA, columns } from './SkyEyeConstant'
import FormComment from './base/FormComment'

const AREA_TIPS = (
  <div>
    1.此处的区域选择关系到资源审批流程和计费流向。互联网区/专有云区会按照政务单位流程进行审批和计费汇总，行业云区/公安云区会按照政法单位流程进行审批和计费汇总。
    <br />
    2.如需要对多个区域的资源实例同时进行监控，请在备注中进行说明。
  </div>
)
class SkyEyeForm extends React.Component {
  state = {
    stateVisible: false,
  };

  // componentWillMount() {
  //   console.log(this.props);
  // }

  updateChildState () {
    this.setState({ stateVisible: true })
  }

  handleClose () {
    this.setState({ stateVisible: false })
  }

  render () {
    const { formProps, batch, resourceData = {} } = this.props
    const { stateVisible } = this.state
    const remarks = '如需对指定的VPC/项目/资源实例进行监控，或对多个区域资源实例进行监控，请在此备注'
    const infos = { ...resourceData, ...formProps }
    const HELP_DOM = (
      <a style={{ marginLeft: '20px' }} onClick={(e) => this.updateChildState('abc', e)}>
        <i className={`icon iconfont ${FORM_ICON.VIEW_FORM}`} />
        查看版本与功能介绍
      </a>
    )
    return (
      <>
        <LeftTitle title="区域" icon={FORM_ICON.REGION}>
          <Region {...formProps} isNewLine tip={AREA_TIPS} />
        </LeftTitle>
        {!batch && (
          <LeftTitle title="基础信息" icon={FORM_ICON.BASE_INFO}>
            <BaseInfo {...infos} isWAF="true" />
          </LeftTitle>
        )}
        <LeftTitle title="配置" icon={FORM_ICON.CONFIG}>
          <>
            <SkyEyeConfig HELP_DOM={HELP_DOM} {...formProps} resourceData={resourceData} />
            <Number
              {...formProps}
              min={1}
              max={2}
              resourceData={resourceData}
              id={PRODUCT_FIELDS.MONITOR_ASSET_PACK}
              label={FIELD_MAP[PRODUCT_FIELDS.MONITOR_ASSET_PACK]}
              unit="个"
              tip="一个资源包含50个监控实例，如果您的云上外部资产(EIP地址总数+经典网络SLB地址总数+NAT地址总数)总数＜50个，请申请1个资源包，≥50个请申请2个资源包（2个资源包封顶)"
            />
          </>
        </LeftTitle>
        <FormComment {...formProps} placeholder={remarks} />
        <ModelCard
          data={DATA}
          columns={columns}
          showHeader={false}
          modalTitle="版本与功能介绍"
          stateVisible={stateVisible}
          onHandleCancel={() => this.handleClose()}
        />
      </>
    )
  }
}
export default SkyEyeForm
