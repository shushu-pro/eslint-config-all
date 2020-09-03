/**
 * 网站涉黄恐暴政内容检测服务
 * ① 可选区域：主中心-公有云区
 * ② 属于安全产品大类
 * 原型图：https://yuque.antfin-inc.com/toqer1/zz2gg3/zrrang#OULjG
*/
import React from 'react'
import LeftTitle from '@/components/OperationCenter/LeftTitle'
import { Region, BaseInfo } from '@/components/OperationCenter/Product/base'
import { FORM_ICON } from '../../base/_constant'
import YellowConfig from './YellowConfig'
import FormComment from '../base/FormComment'

class GreenNetworkForm extends React.PureComponent {
  render () {
    const { formProps, batch, resourceData } = this.props
    return (
      <>
        <LeftTitle title="区域" icon={FORM_ICON.REGION}>
          <Region {...formProps} />
        </LeftTitle>
        {!batch && (
          <LeftTitle title="基础信息" icon={FORM_ICON.BASE_INFO}>
            <BaseInfo {...formProps} resourceData={resourceData} />
          </LeftTitle>
        )}
        <LeftTitle title="配置" icon={FORM_ICON.CONFIG}>
          <YellowConfig {...formProps} />
        </LeftTitle>
        <FormComment {...formProps} />
      </>
    )
  }
}
export default GreenNetworkForm
