import React from 'react'
import FormComment from '@/components/OperationCenter/Product/Form/base/FormComment'
import { Alert } from 'antd'
// import Region from '../components/blocks/Region';
// import BaseInfo from '../components/blocks/BaseInfo';
import {
  BaseInfo,
} from '@/components/OperationCenter/Product/base'
import Config from './Config'
import ODPSSetting from './ODPSSetting'

function ODPSForm ({
  initData, formProps, batch = false, dataWorksIsSingle, hasProject,
}) {
  formProps.formItemLayout = {
    labelCol: { span: 4 },
    style: { marginBottom: 24 },
    wrapperCol: { span: 20 },
  }
  return (
    <>
      <Alert
        style={{ marginBottom: 20 }}
        message="该产品的自动开通正在开发中，请将资源配置信息以文字形式录入，运维人员会根据信息进行人工开通。"
        type="info"
        showIcon
      />
      {<BaseInfo {...formProps} render={!batch} noProject />}
      {<Config {...formProps} /> }
      <ODPSSetting
        {...formProps}
        initData={initData}
        batch={batch}
        dataWorksIsSingle={dataWorksIsSingle}
        hasProject={hasProject}
      />
      <FormComment {...formProps} />
    </>
  )
}


export default ODPSForm
