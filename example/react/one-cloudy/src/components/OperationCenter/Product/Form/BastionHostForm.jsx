/**
 * 堡垒机-产品组件
 */
import React from 'react'
import _ from 'lodash'
import { connect } from 'dva'
import LeftTitle from '@/components/OperationCenter/LeftTitle'
import {
  Region,
  Net,
  MirrorBH,
  Number,
  BastionHostConfig,
  BaseInfo,
  StorageBH,
  DbauditEipConfig,
} from '@/components/OperationCenter/Product/base'
import {
  IDENTIFIED_KEY,
  getData,
  getName,
  FORM_ICON,
  PRODUCT_TYPE,
  getProcesData,
  PRODUCT_FIELDS,
  SUBMIT_FIELD,
} from '../base/_constant'
import { subscribeFormChange, unSubscribeFormChange } from '../index'
import FormComment from './base/FormComment'

@connect()
class BastionHostForm extends React.Component {
  state = {
    resData: {},
  }

  componentDidMount () {
    subscribeFormChange(this.onFormChange)
  }

  componentWillUnmount () {
    unSubscribeFormChange(this.onFormChange)
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    const { resData } = this.state
    const { resourceData, formProps } = this.props
    const { form } = formProps
    if (!_.isEqual(nextProps.resourceData, resourceData) && nextProps.resourceData !== resData) {
      const packageId = form.getFieldValue(PRODUCT_FIELDS.PACKAGE_SPEC_ID)
      this.setResData(packageId, nextProps.resourceData)
    }
  }

  onFormChange = (changedValues, changeField, has) => {
    const { resourceData, formProps } = this.props
    const { form } = formProps
    const value = changedValues[changeField]
    if (has(PRODUCT_FIELDS.PACKAGE_SPEC_ID) && value) {
      const resData = this.setResData(value, resourceData)
      const sysDiskList = getData(resData, IDENTIFIED_KEY.SYS_DISK_TYPE)
      const imageVersionList = getProcesData(getData(resData, IDENTIFIED_KEY.IMAGE_VERSION))
      const imageList = getData(resData, IDENTIFIED_KEY.IMAGE_TYPE)
      const eipList = getData(resData, IDENTIFIED_KEY.EIP_BANDWIDTH)
      SUBMIT_FIELD[PRODUCT_TYPE.FORTRESSAIRCRAFT].forEach((item) => {
        if (!item.specTypeGroupId) {
          item.specTypeGroupId = imageVersionList[0] ? imageVersionList[0].specTypeGroupId : undefined
        }
      })
      // 设置镜像的值
      form.setFieldsValue({
        [PRODUCT_FIELDS.MIRROR_TYPE_ID]: imageList[0] ? imageList[0].key : undefined,
        [PRODUCT_FIELDS.MIRROR_NAME_ID]: imageList[0] ? imageList[0].children[0].id : undefined,
        [PRODUCT_FIELDS.MIRROR_VERSION_ID]: imageVersionList[0] ? imageVersionList[0].key : undefined,
        [PRODUCT_FIELDS.SYSTEM_DISK_TYPE_ID]: sysDiskList[0] && sysDiskList[0].id,
        [PRODUCT_FIELDS.SYSTEM_DISK_TYPE]: sysDiskList[0] && sysDiskList[0].label,
        [PRODUCT_FIELDS.SYSTEM_DISK_SIZE]: sysDiskList[0] &&
          sysDiskList[0].children &&
          sysDiskList[0].children[0] &&
          sysDiskList[0].children[0].label,
        [PRODUCT_FIELDS.EIPBAND_WIDTH]: eipList[0] ? eipList[0].label : undefined,
        dataDiskKeys: [ 0 ],
      })
    }
  };

  setResData = (value, resourceData) => {
    let resData = {}
    const speList = getProcesData(resourceData[IDENTIFIED_KEY.PRODUCT_SPECS])
    const speData = speList.find((item) => item.key === value)
    if (speData) {
      resData = {
        ...resourceData,
        ...speData.specTypeGroup,
      }
      speData.subProductSpecs.map((item) => {
        resData = {
          ...resData,
          ...item.specTypeGroup,
        }
      })
    } else {
      resData = resourceData
    }
    this.setState({
      resData,
    })
    return resData
  }

  render () {
    const { formProps, batch, type = PRODUCT_TYPE.FORTRESSAIRCRAFT } = this.props
    const { resData } = this.state
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
        <LeftTitle title="网络" icon={FORM_ICON.NET}>
          <Net {...formProps} securityGroup batch={batch} isPrivateOnly />
        </LeftTitle>
        <LeftTitle title="配置" icon={FORM_ICON.CONFIG}>
          <BastionHostConfig
            type={type}
            {...formProps}
            optionList={getData(resData, IDENTIFIED_KEY.INSTANCE_TYPE)}
            comSpecisList={getProcesData(resData[IDENTIFIED_KEY.PRODUCT_SPECS])}
          />
        </LeftTitle>
        <LeftTitle title="镜像" icon={FORM_ICON.MIRROR}>
          <MirrorBH
            {...formProps}
            type={type}
            optionList={getData(resData, IDENTIFIED_KEY.IMAGE_TYPE)}
            imageVersionList={getProcesData(getData(resData, IDENTIFIED_KEY.IMAGE_VERSION))}
          />
        </LeftTitle>
        <LeftTitle title="存储" icon={FORM_ICON.STORAGE}>
          <StorageBH {...formProps} optionList={resData} type={type} />
        </LeftTitle>
        <LeftTitle title="EIP" icon={FORM_ICON.EIP}>
          <DbauditEipConfig
            type={type}
            eipWidthList={getProcesData(getData(resData, IDENTIFIED_KEY.EIP_BANDWIDTH))}
            {...formProps}
          />
        </LeftTitle>
        <LeftTitle title="数量" icon={FORM_ICON.QUANTITY}>
          <Number
            {...formProps}
            tip={`最多可批量创建50台${getName(type)}`}
            max={50}
            label="申请台数"
          />
        </LeftTitle>
        <FormComment {...formProps} />
      </>
    )
  }
}

export default BastionHostForm
