import React from 'react'
import { connect } from 'dva'
import { Form } from 'antd'
import moment from 'moment'
import {
  FORM_ITEM_BASE_LAYOUT,
  PRODUCT_FIELDS,
  throttle,
} from '@/components/OperationCenter/Product/base/_constant'
import getIPAddressCount from '@/utils/getIPAddressCount'
import forms from '@/pages/operation-center/components/resource-editor/forms'
import product from './Form'

// form出发onChange事件时调用的订阅函数队列
let formChangeFn = []
export const subscribeFormChange = (fn) => {
  if (typeof fn === 'function') {
    formChangeFn.push(fn)
  }
}
export const unSubscribeFormChange = (fn) => {
  if (typeof fn === 'function') {
    formChangeFn = formChangeFn.filter((o) => o !== fn)
  }
}
const mapDispatchToProps = (dispatch) => ({
  submitApply: (payload) => dispatch({
    type: 'resourceApply/submitApply',
    payload,
  }),
  setForm: (params) => dispatch({
    type: 'resourceApply/setter',
    payload: {
      form: params,
    },
  }),
  queryResouce: (payload) => dispatch({
    type: 'resourceApply/queryResouce',
    payload,
  }),
  setFormEdit: (params) => dispatch({
    type: 'resourceApply/setter',
    payload: {
      formEdit: params,
    },
  }),
  setHostNum: (params) => {
    dispatch({
      type: 'resourceApply/getACSHostNum',
      payload: {
        hostNum: Math.ceil(getIPAddressCount(params) / 128),
      },
    })
  },
  getOSSRecovData: (params) => {
    dispatch({
      type: 'pageData/getOSSRecovData',
      payload: {
        OSSRecovData: params,
      },
    })
  },
})
@connect(({ resourceApply }) => ({
  sfTime: resourceApply.sfTime,
}), mapDispatchToProps)
@Form.create({
  // 通过onChange获取到当前表单改变的是哪个字段
  onValuesChange: (props, changedValues) => {
    const changeFields = Object.keys(changedValues)
    const changeField = changeFields.length === 1 ? changeFields[0] : changeFields
    // 判断onchange是否含有fields
    const has = (fields) => changeFields.findIndex((o) => o === fields) > -1
    formChangeFn.forEach((fn) => {
      fn(changedValues, changeField, has)
    })
  },
})
class Product extends React.PureComponent {
  state = {
    resourceData: {},
  };

  async componentDidMount () {
    const { setForm, form } = this.props
    subscribeFormChange(this.onFormChange)
    await setForm(form)
    await this.setFormData()
  }

  componentWillUnmount () {
    const { productType } = this.props
    productType !== 'other' && unSubscribeFormChange(this.onFormChange)
  }

  onFormChange = (changedValues, changeField, has) => {
    const { queryResouce, productType } = this.props
    const value = changedValues[PRODUCT_FIELDS.REGION_ID]
    if (has(PRODUCT_FIELDS.REGION_ID) && value) {
      // const data = regionData[0].regions.find(item => item.id === value);
      const sendData = {
        // reginId: data ? data.dictId : '',
        // productName: productType,
        productType,
        cloudRegionId: value,
      }
      // 发请求之前把数据清空，等到请求成功之后再把返回的数据渲染到页面上
      this.setState({
        resourceData: {},
      })
      queryResouce(sendData).then(({ resData = {} }) => {
        this.setState({
          resourceData: resData,
        })
      })
    }
  };

  // 表单默认值设置（资源修改）
  setFormData = async () => {
    const {
      form, initData, setHostNum, getOSSRecovData, sfTime,
    } = this.props
    if (!initData) {
      return
    }
    let dataDiskKeys = []
    let switchDetailKeyList = []
    let inputKeys = []
    // 清除资源使用人
    initData.resourceUserIds = undefined
    initData.resourceKeys = initData.resourceUsers ? initData.resourceUsers.map((item, i) => i) : undefined
    initData.resourceUserInfos = undefined
    getOSSRecovData(initData)
    if (initData) {
      // console.log('initData', initData, sfTime);
      if (initData.ifTempRes) {
        initData.releaseDate = initData.releaseDate ? moment(initData.releaseDate) : moment(sfTime)
      }
      form.setFieldsValue({ ...initData })
      if (initData.dataDiskList) {
        dataDiskKeys = initData.dataDiskList.map((o, index) => index)
        await form.setFieldsValue({ dataDiskKeys })
      }
      if (initData.switchDetailList) {
        switchDetailKeyList = initData.switchDetailList.map((o, index) => index)
        await form.setFieldsValue({ switchDetailKeyList })
        await form.setFieldsValue({ switchDetailLists: initData.switchDetailList })
      }
      // 设置ACS产品中docker版本号的值
      if (initData.dockerVersion) {
        await form.setFieldsValue({ [PRODUCT_FIELDS.DOCKER_VERSION_ID]: initData.dockerVersion })
      }
      if (initData.podNetCidr) {
        setTimeout(() => {
          form.setFieldsValue({ [PRODUCT_FIELDS.PODNETCIDR]: initData.podNetCidr })
          form.setFieldsValue({ [PRODUCT_FIELDS.MAINFRAMENUM]: initData.mainFrameNum })
          setHostNum(initData.podNetCidr)
        }, 0)
      }

      // ESS首先移出
      if (initData.removalStrategy) {
        await form.setFieldsValue({
          [PRODUCT_FIELDS.REMOVAL_STRATEGY_ID]: initData.removalStrategy,
        })
      }
      // ESS在结果中移出
      if (initData.removalStrategyStepSecond) {
        await form.setFieldsValue({
          [PRODUCT_FIELDS.REMOVAL_STRATEGY_STEPSECOND_ID]: initData.removalStrategyStepSecond,
        })
      }
      // 设置Topic列表的数据
      if (initData.topicList) {
        let topicKeysList = []
        topicKeysList = initData.topicList.map((o, index) => index)
        // await form.setFieldsValue({
        //   topicKeysList,
        //   topicLists: initData.topicList,
        // });
        setTimeout(() => {
          form.setFieldsValue({
            topicKeysList,
            topicLists: initData.topicList,
          })
        }, 0)
      }
      if (initData.eipBandwidth) {
        setTimeout(() => {
          form.setFieldsValue({
            [PRODUCT_FIELDS.EIP_BAND_WIDTH]: initData.eipBandwidth,
          })
        }, 0)
      }
      if (initData.resourceType === 'DataWorks') {
        //  setTimeout(() => {
        const { pattern } = initData
        const fieldValues = { pattern }
        await form.setFieldsValue({ pattern })
        if (pattern === '简单模式') {
          fieldValues['simpleForNormal.name'] = [ initData.simpleMcName, initData.simpleMcId ].join(
            '#*#',
          )
        } else if (pattern === '标准模式') {
          fieldValues['standardForDev.name'] = [ initData.devName, initData.devId ].join('#*#')
          fieldValues['standardForProd.name'] = [ initData.prdName, initData.prdId ].join('#*#')
        }

        await form.setFieldsValue(fieldValues)
        // 执行回填
      }
      if (initData.resourceType === 'DNS') {
        inputKeys = initData.lanDomainName.map((o, index) => index)
        await form.setFieldsValue({ inputKeys })
      }
      await form.setFieldsValue({ ...initData, dataDiskKeys })
    }
  };

  render () {
    const { resourceData } = this.state
    const {
      productType, form, batch, initData, dataWorksIsSingle, hasProject, useFor,
    } = this.props
    const ProductComponent = forms[productType] || product[productType]
    const formProps = {
      form,
      formItemLayout: FORM_ITEM_BASE_LAYOUT,
      productType,
      useFor,
      initData,
      batch,
    }
    return (
      // batch 判断是否是批量
      <div className="product-form">
        <ProductComponent
          formProps={formProps}
          batch={false}
          dataWorksIsSingle={dataWorksIsSingle}
          resourceData={resourceData}
          initData={initData}
          hasProject={hasProject}
        />
      </div>
    )
  }
}

export default Product
