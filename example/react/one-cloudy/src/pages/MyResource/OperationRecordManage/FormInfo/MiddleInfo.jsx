import React from 'react'
import {
  Form, Input, InputNumber, Switch, Checkbox, Button, Icon, Radio,
} from 'antd'
import Vpc from '@/components/OperationCenter/Product/components/Vpc'
import { PRODUCT_FIELDS } from '@/components/OperationCenter/Product/base/_constant'
import {
  PRODUCTNAME,
} from '../constant'
import styles from './formInfo.less'

let id = 1
class MiddleInfo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      // allList所有formitem的项目，顺序和render中对应
      allList: [ '实例ID', '实例名称', '专有网络',
        '基础套餐', '域名拓展包',
        '拓展业务QPS', 'Bot流量保护',
        '防护能力', '业务带宽', '扩展业务带宽', '防护域名数', '域名扩展包',
        '全量日志分析存储包', '是否开启增强规格', '应用域名', '应用项目名称', '回源IP地址', '回源端口', '对外协议', '升级增强规格', '防护地址', '监控规格', '监控资产包' ],
      visibleList: [],
      wantedList: {
        [PRODUCTNAME.ANTIDDOS]: [ '实例ID', '基础套餐', '防护能力', '防护地址' ],
        [PRODUCTNAME.HSM]: [ '实例ID' ],
        [PRODUCTNAME.SKYEYE]: [ '实例ID', '监控规格', '监控资产包' ],
        [PRODUCTNAME.DDOSIP]: [
          '实例ID', '实例名称', '基础套餐',
          '防护能力', '业务带宽', '扩展业务带宽', '防护域名数', '域名扩展包', '全量日志分析存储包', '是否开启增强规格',
        ],
      },
    }
  }

  componentDidMount () {
    const { wantedList, allList } = this.state
    const { productValue, form, recordDetail } = this.props
    const visibleList = []
    allList.forEach((allItem, index) => {
      wantedList[productValue].forEach((item) => {
        if (allItem === item) {
          visibleList[index] = true
        }
      })
    })
    this.setState({
      visibleList,
    })
    form.setFieldsValue({
      instanceSpec: recordDetail.instanceSpec,
    })
  }

  remove = (k) => {
    const { form } = this.props
    const defendUrl = form.getFieldValue('defendUrl')
    if (defendUrl.length === 1) {
      return
    }

    form.setFieldsValue({
      defendUrl: defendUrl.filter((key) => key !== k),
    })
  };

  add = () => {
    const { form } = this.props
    const defendUrl = form.getFieldValue('defendUrl')
    const nextKeys = defendUrl.concat(id++)
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      defendUrl: nextKeys,
    })
  };

  render () {
    const { visibleList } = this.state
    const {
      form, formItemLayout, productValue, instanceSpecData = [], isEdit, recordDetail,
    } = this.props
    const { getFieldDecorator, getFieldValue } = form
    const radioGroup = instanceSpecData.map((item) => (
      <Radio.Button key={item.name} value={item.name}>{item.name}</Radio.Button>
    ))
    const formItemLayoutWithOutLabel = {
      labelAlign: 'right',
      wrapperCol: {
        offset: 6,
        span: 18,
      },
    }
    const urls = recordDetail.defendUrl ? recordDetail.defendUrl.split(',') : []
    const urlList = isEdit ? urls : []
    const urlNumList = isEdit ? urlList.map((_, index) => index) : [ 0 ]
    getFieldDecorator('defendUrl', { initialValue: urlNumList })
    const defendUrl = getFieldValue('defendUrl')
    const formItems = visibleList[20] ? defendUrl.map((k, index) => (
      <Form.Item
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index === 0 ? '防护地址' : ''}
        key={k}
      >
        {getFieldDecorator(`url[${k}]`, {
          initialValue: isEdit ? urlList[k] : undefined,
          validateTrigger: [ 'onChange', 'onBlur' ],
          rules: [
            {
              pattern: /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)(\/\d{1,})?$/,
              required: true,
              whitespace: true,
              message: '请填写正确的ip地址',
            },
          ],
        })(<Input className={styles['my-input']} placeholder="请输入" style={{ marginRight: 8 }} />)}
        {defendUrl.length > 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => this.remove(k)}
          />
        ) : null}
      </Form.Item>
    )) : null
    const selectedDepartment = form.getFieldValue(PRODUCT_FIELDS.DEPARTMENT_ID)
    const selectedRegion = form.getFieldValue(PRODUCT_FIELDS.REGION_ID)
    return (
      <div className={styles.middleInfo}>
        {
          visibleList[0] ? (
            <Form.Item key="cloudInstanceId" {...formItemLayout} label="实例ID">
              {getFieldDecorator('cloudInstanceId', {
                initialValue: isEdit ? recordDetail.cloudInstanceId : undefined,
              })(
                <Input className={styles['my-input']} placeholder="请输入" />,
              )}
            </Form.Item>
          ) : null
        }
        {
          visibleList[1] ? (
            <Form.Item key="cloudInstanceName" {...formItemLayout} label="实例名称">
              {getFieldDecorator('cloudInstanceName', {
                initialValue: isEdit ? recordDetail.cloudInstanceName : undefined,
                rules: [
                  { required: true, message: '实例名称不能为空' },
                ],
              })(
                <Input className={styles['my-input']} placeholder="请输入" />,
              )}
            </Form.Item>
          ) : null
        }
        {
          visibleList[2] ? (
            <Form.Item key="专有网络" {...formItemLayout} label="专有网络">
              {getFieldDecorator([ 'vpcId', 'vpcName' ], {
                rules: [
                  { required: true, message: '专有网络不能为空' },
                ],
              })(
                <Vpc
                  form={form}
                  selectedDepartment={selectedDepartment}
                  selectedRegion={selectedRegion}
                  productType={productValue}
                />,
              )}
            </Form.Item>
          ) : null
        }
        {
          visibleList[3] ? (
            <Form.Item key="instanceSpec" {...formItemLayout} label="基础套餐">
              {getFieldDecorator('instanceSpec', {
                initialValue: isEdit ? recordDetail.instanceSpec : undefined,
                rules: [
                  { required: true, message: '请选择基础套餐' },
                ],
              })(
                <Radio.Group>
                  {radioGroup}
                </Radio.Group>,
              )}
            </Form.Item>
          ) : null
        }
        {
          visibleList[4] ? (
            <Form.Item key="域名拓展包" {...formItemLayout} label="域名拓展包">
              {getFieldDecorator('域名拓展包', {
                rules: [
                  { required: true, message: '域名拓展包不能为空' },
                ],
              })(
                <InputNumber className={styles['my-input']} placeholder="请输入" />,
              )}
            </Form.Item>
          ) : null
        }
        {
          visibleList[5] ? (
            <Form.Item key="拓展业务QPS" {...formItemLayout} label="拓展业务QPS">
              {getFieldDecorator('拓展业务QPS', {
                rules: [
                  { required: true, message: '拓展业务QPS不能为空' },
                ],
              })(
                <InputNumber className={styles['my-input']} placeholder="请输入" />,
              )}
            </Form.Item>
          ) : null
        }
        {
          visibleList[6] ? (
            <Form.Item key="Bot流量保护" {...formItemLayout} label="Bot流量保护">
              {getFieldDecorator('Bot流量保护', {
                rules: [
                  { required: true, message: 'Bot流量保护!' },
                ],
              })(
                <Switch />,
              )}
            </Form.Item>
          ) : null
        }
        {
          visibleList[7] ? (
            <Form.Item key="defendCapability" {...formItemLayout} label="防护能力">
              {getFieldDecorator('defendCapability', {
                initialValue: isEdit ? recordDetail.defendCapability : undefined,
                rules: [
                  { required: true, message: '防护能力不能为空' },
                ],
              })(
                <Input className={styles['my-input']} placeholder="请输入" disabled />,
              )}
              <span className={styles['input-unit']}>GB</span>
            </Form.Item>
          ) : null
        }
        {
          visibleList[8] ? (
            <Form.Item key="bandwidth" {...formItemLayout} label="业务带宽">
              {getFieldDecorator('bandwidth', {
                initialValue: isEdit ? recordDetail.bandwidth : undefined,
                rules: [
                  { required: true, message: '业务带宽不能为空' },
                ],
              })(
                <Input className={styles['my-input']} placeholder="请输入" disabled />,
              )}
              <span className={styles['input-unit']}>Mps</span>
            </Form.Item>
          ) : null
        }
        {
          visibleList[9] ? (
            <Form.Item key="extendBandwidth" {...formItemLayout} label="扩展业务带宽">
              {getFieldDecorator('extendBandwidth', {
                initialValue: isEdit ? recordDetail.extendBandwidth : undefined,
                rules: [
                  {
                    required: true,
                    validator: (rule, value, callback) => {
                      if (rule.required && !value) {
                        return callback(new Error('扩展业务带宽不能为空'))
                      }
                      if (value && value % 100 !== 0) {
                        return callback(new Error('数值应为100的整数倍'))
                      }
                      return callback()
                    },
                  },
                ],
              })(
                <InputNumber className={styles['my-input']} placeholder="请输入" min={100} step={100} />,
              )}
              <span className={styles['input-unit']}>Mps</span>
              <span className={styles['input-desc']}>数字应为100的整数倍</span>
            </Form.Item>
          ) : null
        }
        {
          visibleList[10] ? (
            <Form.Item key="protectDomainNameNumber" {...formItemLayout} label="防护域名数">
              {getFieldDecorator('protectDomainNameNumber', {
                initialValue: isEdit ? recordDetail.protectDomainNameNumber : undefined,
                rules: [
                  { required: true, message: '防护域名数不能为空' },
                ],
              })(
                <Input className={styles['my-input']} placeholder="请输入" disabled />,
              )}
              <span className={styles['input-unit']}>个</span>
              <span className={styles['input-desc']}>每10个域名配置限制支持1个一级域名</span>
            </Form.Item>
          ) : null
        }
        {
          visibleList[11] ? (
            <Form.Item key="extendDomain" {...formItemLayout} label="域名扩展包">
              {getFieldDecorator('extendDomain', {
                initialValue: isEdit ? recordDetail.extendDomain : undefined,
                rules: [
                  { required: true, message: '域名扩展包不能为空' },
                ],
              })(
                <InputNumber className={styles['my-input']} placeholder="请输入" min={1} step={1} />,
              )}
              <span className={styles['input-unit']}>个</span>
              <span className={styles['input-desc']}>每个扩展包包含10个域名，每10个域名配置限制支持1个一级域名</span>
            </Form.Item>
          ) : null
        }
        {
          visibleList[12] ? (
            <Form.Item key="logStorage" {...formItemLayout} label="全量日志分析存储包">
              {getFieldDecorator('logStorage', {
                initialValue: isEdit ? recordDetail.logStorage : undefined,
                rules: [
                  {
                    required: true,
                    validator: (rule, value, callback) => {
                      if (rule.required && !value) {
                        return callback(new Error('全量日志分析存储包不能为空'))
                      }
                      if (value && value % 3 !== 0) {
                        return callback(new Error('数值应为3的整数倍'))
                      }
                      return callback()
                    },
                  },
                ],
              })(
                <InputNumber className={styles['my-input']} placeholder="请输入" min={3} step={3} />,
              )}
              <span className={styles['input-unit']}>T</span>
              <span className={styles['input-desc']}>数值应为3的整数倍</span>
            </Form.Item>
          ) : null
        }
        {
          visibleList[13] ? (
            <Form.Item key="isEnhance" {...formItemLayout} label="是否开启增强规格">
              {getFieldDecorator('isEnhance', {
                initialValue: isEdit ? (recordDetail.isEnhance === 1) : undefined,
                valuePropName: 'checked',
                rules: [
                  { required: true, message: '是否开启增强规格！' },
                ],
              })(
                <Switch />,
              )}
            </Form.Item>
          ) : null
        }
        {
          visibleList[14] ? (
            <Form.Item key="domainapp" {...formItemLayout} label="应用域名">
              {getFieldDecorator('domainapp', {
                initialValue: isEdit ? recordDetail.domainapp : undefined,
                rules: [
                  { required: true, message: '应用域名不能为空' },
                ],
              })(
                <Input className={styles['my-input']} />,
              )}
            </Form.Item>
          ) : null
        }
        {
          visibleList[15] ? (
            <Form.Item key="appName" {...formItemLayout} label="应用项目名称">
              {getFieldDecorator('appName', {
                initialValue: isEdit ? recordDetail.appName : undefined,
                rules: [
                  { required: true, message: '应用项目名称不能为空' },
                ],
              })(
                <Input className={styles['my-input']} />,
              )}
            </Form.Item>
          ) : null
        }
        {
          visibleList[16] ? (
            <Form.Item key="ip" {...formItemLayout} label="回源IP地址(SLB地址)">
              {getFieldDecorator('ip', {
                initialValue: isEdit ? recordDetail.ip : undefined,
                rules: [
                  { required: true, message: '回源IP地址不能为空' },
                ],
              })(
                <Input className={styles['my-input']} />,
              )}
            </Form.Item>
          ) : null
        }
        {
          visibleList[17] ? (
            <Form.Item key="port" {...formItemLayout} label="回源端口(80/443/...)">
              {getFieldDecorator('port', {
                initialValue: isEdit ? recordDetail.port : undefined,
                rules: [
                  { required: true, message: '回源端口不能为空' },
                ],
              })(
                <Input className={styles['my-input']} />,
              )}
            </Form.Item>
          ) : null
        }
        {
          visibleList[18] ? (
            <Form.Item key="protocol" {...formItemLayout} label="对外协议">
              {getFieldDecorator('protocol', {
                initialValue: isEdit ? recordDetail.protocol : undefined,
                rules: [
                  { required: true, message: '对外协议!' },
                ],
              })(
                <Checkbox.Group
                  options={[
                    { label: 'HTTP', value: 'HTTP' },
                    { label: 'HTTPS', value: 'HTTPS' },
                  ]}
                />,
              )}
            </Form.Item>
          ) : null
        }
        {
          visibleList[19] ? (
            <Form.Item key="升级增强规格" {...formItemLayout} label="升级增强规格">
              {getFieldDecorator('升级增强规格', {
                rules: [
                  { required: true, message: '升级增强规格!' },
                ],
              })(
                <Switch />,
              )}
            </Form.Item>
          ) : null
        }
        {
          visibleList[20] ? (
            <>
              {formItems}
              <Form.Item {...formItemLayoutWithOutLabel}>
                <Button type="dashed" onClick={this.add} style={{ width: 224 }}>
                  <Icon type="plus-circle" />
                  {' '}
                  增加防护地址
                </Button>
              </Form.Item>
            </>
          ) : null
        }
        {
          visibleList[21] ? (
            <Form.Item key="instanceSpec" {...formItemLayout} label="监控规格">
              {getFieldDecorator('instanceSpec', {
                initialValue: isEdit ? recordDetail.instanceSpec : undefined,
                rules: [
                  { required: true, message: '请选择监控规格' },
                ],
              })(
                <Radio.Group>
                  {radioGroup}
                </Radio.Group>,
              )}
            </Form.Item>
          ) : null
        }
        {
          visibleList[22] ? (
            <Form.Item key="monitorAssetPack" {...formItemLayout} label="监控资产包">
              {getFieldDecorator('monitorAssetPack', {
                initialValue: isEdit ? recordDetail.monitorAssetPack : undefined,
                rules: [
                  { required: true, message: '监控资产包不能为空' },
                ],
              })(
                <InputNumber className={styles['my-input']} placeholder="请输入" min={1} />,
              )}
              <span className={styles['input-unit']}>个</span>
              <span className={styles['input-desc']}>一个资源包含50个监控实例</span>
            </Form.Item>
          ) : null
        }
      </div>
    )
  }
}

export default Form.create()(MiddleInfo)
