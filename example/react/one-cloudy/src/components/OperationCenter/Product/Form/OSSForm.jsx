/**
 * OSS-产品组件
 */
import React from 'react'
import _ from 'lodash'
import LeftTitle from '@/components/OperationCenter/LeftTitle'
import {
  Region, BaseInfo, Number, OSSConfig, OSSBackUpConfig,
} from '@/components/OperationCenter/Product/base'
import { IDENTIFIED_KEY, getData, FORM_ICON } from '../base/_constant'
import FormComment from './base/FormComment'

function OSSForm ({ formProps, batch, resourceData }) {
  return (
    <>
      <LeftTitle title="区域" icon={FORM_ICON.REGION}>
        <Region {...formProps} />
      </LeftTitle>
      {!batch && (
        <LeftTitle title="基础信息" icon={FORM_ICON.BASE_INFO}>
          <BaseInfo {...formProps} />
        </LeftTitle>
      )}
      <LeftTitle title="配置" icon={FORM_ICON.CONFIG}>
        <OSSConfig
          {...formProps}
          basePackageList={getData(resourceData, IDENTIFIED_KEY.BASE_PACKAGE)}
          downPackageList={
            _.isEmpty(resourceData[IDENTIFIED_KEY.DOWN_PACKAGE])
              ? undefined
              : getData(resourceData, IDENTIFIED_KEY.DOWN_PACKAGE)
          }
          permissionList={getData(resourceData, IDENTIFIED_KEY.PRIORITY)}
        />
      </LeftTitle>
      <LeftTitle title="数量" icon={FORM_ICON.QUANTITY}>
        <Number {...formProps} tip="最多可批量创建10台OSS" max={10} label="申请台数" />
      </LeftTitle>
      <LeftTitle title="异地备份" icon={FORM_ICON.BACK_UP}>
        <OSSBackUpConfig {...formProps} />
      </LeftTitle>
      <FormComment {...formProps} />
    </>
  )
}

export default OSSForm
