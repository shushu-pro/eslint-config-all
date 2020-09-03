/**
 * 内容安全服务（互联网安全服务）-产品组件
 */
import React from 'react'
import LeftTitle from '@/components/OperationCenter/LeftTitle'
import { Region, BaseInfo, ContentSecurityConfig } from '@/components/OperationCenter/Product/base'
import { FORM_ICON, getData, IDENTIFIED_KEY } from '../base/_constant'
import FormComment from './base/FormComment'

function ContentSecurityFrom ({
  formProps, batch, resourceData,
}) {
  return (
    <>
      <LeftTitle title="区域" icon={FORM_ICON.REGION}>
        <Region {...formProps} />
      </LeftTitle>
      {!batch && (
        <LeftTitle title="基础信息" icon={FORM_ICON.BASE_INFO}>
          <BaseInfo {...formProps} isShowUpload />
        </LeftTitle>
      )}
      <LeftTitle title="配置" icon={FORM_ICON.CONFIG}>
        <ContentSecurityConfig
          {...formProps}
          optionList={getData(resourceData, IDENTIFIED_KEY.CHECK_CONTENT_QUANTITY)}
        />
      </LeftTitle>
      <FormComment {...formProps} />
    </>
  )
}

export default ContentSecurityFrom
