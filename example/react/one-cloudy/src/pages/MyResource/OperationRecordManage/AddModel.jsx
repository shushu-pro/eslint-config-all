import React from 'react'
import { connect } from 'dva'
import moment from 'moment'
import {
  Modal, Form, Divider, message,
} from 'antd'
import api from '@/api'
import TopInfo from './FormInfo/TopInfo'
import MiddleInfo from './FormInfo/MiddleInfo'
import BottomInfo from './FormInfo/BottomInfo'
import styles from './index.less'
import { PRODUCTNAME } from './constant'

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  labelAlign: 'right',
  wrapperCol: {
    span: 18,
  },
}
let instanceSpecData = []
let resourceData = {}
const hasInstanceSpec = {
  [PRODUCTNAME.ANTIDDOS]: true,
  [PRODUCTNAME.HSM]: false,
  [PRODUCTNAME.SKYEYE]: true,
  [PRODUCTNAME.DDOSIP]: true,
}
const hasDefendCapability = {
  [PRODUCTNAME.ANTIDDOS]: true,
  [PRODUCTNAME.HSM]: false,
  [PRODUCTNAME.SKYEYE]: false,
  [PRODUCTNAME.DDOSIP]: true,
}
const hasBandwidth = {
  [PRODUCTNAME.ANTIDDOS]: false,
  [PRODUCTNAME.HSM]: false,
  [PRODUCTNAME.SKYEYE]: false,
  [PRODUCTNAME.DDOSIP]: true,
}
const hasProtectDomainNameNumber = {
  [PRODUCTNAME.ANTIDDOS]: false,
  [PRODUCTNAME.HSM]: false,
  [PRODUCTNAME.SKYEYE]: false,
  [PRODUCTNAME.DDOSIP]: true,
}
const specListData = {
  DDOSIP: [
    { key: 'package_specification', specTypeGroupId: 'package_specification', groupsSpecTypeId: 'instanceSpec' },
    { key: 'defend_ability', specTypeGroupId: 'defend_ability', value: 'defendCapability' },
    { key: 'bandwidth', specTypeGroupId: 'bandwidth', value: 'bandwidth' },
    {
      key:
      'protect_domain_name_number',
      specTypeGroupId: 'protect_domain_name_number',
      value: 'protectDomainNameNumber',
    },
  ],
  AntiDDoS: [
    { key: 'instance_spec', specTypeGroupId: 'instance_spec', groupsSpecTypeId: 'instanceSpec' },
    { key: 'defend_capability', specTypeGroupId: 'defend_capability', groupsSpecTypeId: 'defendCapability' },
  ],
  SkyEye: [
    { key: 'cloud_sec_monitor_spec', specTypeGroupId: 'cloud_sec_monitor_spec', groupsSpecTypeId: 'instanceSpec' },
    { key: 'cloud_sec_monitor_asset_pack', specTypeGroupId: 'cloud_sec_monitor_asset_pack', value: 'monitorAssetPack' },
  ],
}
@connect(({ loading }) => ({
  loading: !!loading.effects['OperationRecordManage/instanceSave'],
}))

class AddModel extends React.Component {
  constructor (props) {
    super(props)
    const { recordDetail, isEdit } = props
    this.state = {
      userList: isEdit ? recordDetail.resourceUsers : [],
    }
  }

  componentDidMount () { }

  specTransform = (data, resource, values) =>
    // console.log('data', data, 'resource', resource, 'values', values, 'type', type);
    // if (type === PRODUCT_TYPE.SLB && values[PRODUCT_FIELDS.NETWORK_TYPE_NAME] === '专有网络') {
    //   return [];
    // }
    data.map((item) => {
      let { specTypeGroupId } = item
      if (resource[item.specTypeGroupId] || values[item.specTypeGroupId]) {
        specTypeGroupId = resource[item.specTypeGroupId]
          ? resource[item.specTypeGroupId].id
          : values[item.specTypeGroupId]
      }

      if (resource[item.key].dataType === 'select') {
        const selectValue = values[item.groupsSpecTypeId]
        const groupsSpecTypeId = resource[item.key].children.filter((i) => i.name === selectValue)[0].id
        return {
          ...item,
          specTypeGroupId,
          groupsSpecTypeId,
        }
      }

      if (resource[item.key].dataType === 'input') {
        return {
          ...item,
          specTypeGroupId,
          value: item.value && values[item.value],
        }
      }
      return {}
    })


  combineValue = (value, productValue, isEdit) => {
    const { recordDetail } = this.props
    let data = {}
    let specList = []
    if (productValue !== PRODUCTNAME.HSM) {
      specList = this.specTransform(specListData[productValue], resourceData, value)
    }

    switch (productValue) {
      case 'AntiDDoS':
        data = {
          commonInfo: {
            deptId: value.deptId,
            areaId: value.areaId,
            regionId: value.regionId,
            resourceType: productValue,
            ...isEdit ? { productInstanceId: recordDetail.cloudProductInstanceId } : {},
          },
          resourceUsers: value.resourceUserInfos || value.resourceUsers,
          antiDDosData: {
            areaId: value.deptId,
            regionId: value.regionId,
            deptId: value.deptId,
            productCode: productValue,
            instanceSpec: value.instanceSpec,
            cloudInstanceId: value.cloudInstanceId,
            defendCapability: value.defendCapability,
            defendUrl: value.url.join(','),
            cloudOpenTime: value.cloudOpenTime,
            specList,
          },
        }
        break
      case 'HSM':
        data = {
          commonInfo: {
            deptId: value.deptId,
            areaId: value.areaId,
            regionId: value.regionId,
            resourceType: productValue,
            ...isEdit ? { productInstanceId: recordDetail.cloudProductInstanceId } : {},
          },
          resourceUsers: value.resourceUserInfos || value.resourceUsers,
          hsmData: {
            areaId: value.deptId,
            regionId: value.regionId,
            deptId: value.deptId,
            productCode: productValue,
            cloudInstanceId: value.cloudInstanceId,
            cloudOpenTime: value.cloudOpenTime,
          },
        }
        break
      case 'SkyEye':
        data = {
          commonInfo: {
            deptId: value.deptId,
            areaId: value.areaId,
            regionId: value.regionId,
            resourceType: productValue,
            ...isEdit ? { productInstanceId: recordDetail.cloudProductInstanceId } : {},
          },
          resourceUsers: value.resourceUserInfos || value.resourceUsers,
          skyEyeData: {
            areaId: value.deptId,
            regionId: value.regionId,
            deptId: value.deptId,
            productCode: productValue,
            cloudInstanceId: value.cloudInstanceId,
            monitorSpec: value.instanceSpec,
            monitorAssetPack: value.monitorAssetPack,
            cloudOpenTime: value.cloudOpenTime,
            specList,
          },
        }
        break
      case 'DDOSIP':
        data = {
          commonInfo: {
            deptId: value.deptId,
            areaId: value.areaId,
            regionId: value.regionId,
            resourceType: productValue,
            ...isEdit ? { productInstanceId: recordDetail.cloudProductInstanceId } : {},
          },
          resourceUsers: value.resourceUserInfos || value.resourceUsers,
          ddosIpData: {
            areaId: value.deptId,
            regionId: value.regionId,
            deptId: value.deptId,
            productCode: productValue,
            packageSpecification: value.instanceSpec,
            defendAbility: value.defendCapability,
            cloudInstanceId: value.cloudInstanceId,
            cloudInstanceName: value.cloudInstanceName,
            bandwidth: value.bandwidth,
            extendBandwidth: value.extendBandwidth,
            protectDomainNameNumber: value.protectDomainNameNumber,
            extendDomain: value.extendDomain,
            logStorage: value.logStorage,
            isEnhance: value.isEnhance ? 1 : 0,
            cloudOpenTime: value.cloudOpenTime,
            specList,
          },
        }
        break
      default:
        data = {}
    }
    return data
  }

  onCancel = () => {
    const { onEdit } = this.props
    // form.setFieldsValue({
    //   instanceSpec: undefined,
    // });
    instanceSpecData = []
    // form.resetFields(`instanceSpec`,[]);
    onEdit(false)
    // const instanceSpec = form.getFieldValue('instanceSpec');
  }

  onOk = () => {
    const {
      form, dispatch, productValue, isEdit, onEdit, queryList,
    } = this.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      values.protocol = values.protocol && values.protocol.join(',')
      values.cloudOpenTime = values.cloudOpenTime && moment(values.cloudOpenTime).format('YYYY-MM-DD HH:mm:SS')
      const payload = this.combineValue(values, productValue, isEdit)
      dispatch({
        type: 'OperationRecordManage/instanceSave',
        payload,
        callback: (e) => {
          if (e.code === 200) {
            message.success(`${isEdit ? '编辑' : '新增'}成功`)
            onEdit && onEdit(false)
            queryList && queryList()
          }
        },
      })
    })
  }

  render () {
    const {
      form, visible, isEdit, productValue, recordDetail,
    } = this.props
    const { userList } = this.state
    const formProps = {
      form,
      formItemLayout,
      productValue,
    }
    return (
      <Modal
        destroyOnClose
        maskClosable={false}
        width={1200}
        title={`${isEdit ? '编辑' : '新增'}实例-${productValue}`}
        visible={visible}
        onCancel={this.onCancel}
        onOk={this.onOk}
      >
        <Form className={styles.addmodelStyles}>
          <TopInfo {...formProps} userList={userList} isEdit={isEdit} recordDetail={recordDetail} />
          <Divider />
          <MiddleInfo {...formProps} instanceSpecData={instanceSpecData} isEdit={isEdit} recordDetail={recordDetail} />
          <Divider />
          <BottomInfo {...formProps} isEdit={isEdit} recordDetail={recordDetail} />
        </Form>
      </Modal>
    )
  }
}

export default Form.create(
  {
    onValuesChange (props, changedValues, allValues) {
      if (changedValues.regionId !== undefined) {
        const sendData = {
          productType: props.productValue,
          cloudRegionId: changedValues.regionId,
        }
        api.queryRegion(sendData).then((data) => {
          instanceSpecData = data.productSpecs
          resourceData = data
          if (hasDefendCapability[props.productValue]) {
            props.form.setFieldsValue({
              instanceSpec: data.productSpecs[0].name,
              defendCapability: data.productSpecs[0].specTypeGroup.defend_capability.children[0].label,
            })
          } else if (hasInstanceSpec[props.productValue]) {
            props.form.setFieldsValue({
              instanceSpec: data.productSpecs[0].name,
            })
          }
        })
      }

      if (changedValues.instanceSpec !== undefined && hasDefendCapability[props.productValue]) {
        const sendData = {
          productType: props.productValue,
          cloudRegionId: allValues.regionId || props.recordDetail.regionId,
        }
        api.queryRegion(sendData).then((data) => {
          if (hasDefendCapability[props.productValue]) {
            props.form.setFieldsValue({
              defendCapability: instanceSpecData.length === 0 ? undefined
                : data.productSpecs.filter((item) => item.name === changedValues.instanceSpec)[0].specTypeGroup.defend_capability.children[0].label,
            })
          }

          if (hasBandwidth[props.productValue]) {
            props.form.setFieldsValue({
              bandwidth: instanceSpecData.length === 0 ? undefined
                : data.productSpecs.filter(
                  (item) => item.name === changedValues.instanceSpec,
                )[0].specTypeGroup.bandwidth.children[0].label,
            })
          }

          if (hasProtectDomainNameNumber[props.productValue]) {
            props.form.setFieldsValue({
              protectDomainNameNumber: instanceSpecData.length === 0 ? undefined
                : data.productSpecs.filter((item) => item.name === changedValues.instanceSpec)[0].specTypeGroup.protect_domain_name_number.children[0].label,
            })
          }
        })
      }
    },
  },
)(AddModel)
