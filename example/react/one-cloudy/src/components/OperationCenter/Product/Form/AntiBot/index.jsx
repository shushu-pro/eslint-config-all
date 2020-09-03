/**
 * SkyNet开发
 * SkyNet产品可选区为：主中心-公有云区、专有云区、行业云区（政法）
 * SkyNet属于安全产品大类
 * 原型图：https://yuque.antfin-inc.com/toqer1/zz2gg3/moudmb#9nvaJ
 */
import React from 'react'
import LeftTitle from '@/components/OperationCenter/LeftTitle'
import {
  IDENTIFIED_KEY,
} from '@/pages/OperationCenter/ResourceApply/constant'
import {
  Region, BaseInfo, InstanceName,
} from '@/components/OperationCenter/Product/base'
import { FORM_ICON, getData } from '../../base/_constant'
import FormComment from '../base/FormComment'
import SpecConfig from './SpecConfig'

class AntiBotForm extends React.Component {
  UNSAFE_componentWillMount () {
  }

  render () {
    const {
      formProps, batch, resourceData, initData,
    } = this.props
    const infos = {
      ...formProps, initData,
    }
    const resourceDataList = getData(resourceData, IDENTIFIED_KEY.ANTIBOT_PKG_SPEC)
    return (
      <>
        <LeftTitle title="区域" icon={FORM_ICON.REGION}>
          <Region {...formProps} />
        </LeftTitle>
        {!batch && (
          <LeftTitle title="基础信息" icon={FORM_ICON.BASE_INFO}>
            <BaseInfo {...infos} />
          </LeftTitle>
        )}
        <LeftTitle title="配置" icon={FORM_ICON.CONFIG}>
          <InstanceName
            {...formProps}
            instanceType="ECS"
          />
          <SpecConfig resourceData={resourceData} {...infos} optionList={resourceDataList} />
        </LeftTitle>
        <FormComment {...formProps} />
      </>
    )
  }
}
export default AntiBotForm
