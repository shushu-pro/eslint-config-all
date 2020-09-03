
/**
 * ECS-升降配表单
 */
import React, { Fragment } from 'react'
import { connect } from 'dva'
import {
  Form, Divider, Select, InputNumber, Radio, Button, Icon, Input,
} from 'antd'
import { FORM_ICON } from '@/components/OperationCenter/Product/base/_constant'
import { getTargetState, getImageVersionList } from '../contant'
import styles from '../changeSet.less'

const { Option } = Select
let addSum = 0
@connect()
class ECSForm extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      isChange: props.isChange, // 判断修改/新增 申请
      initData: props.initData, // 资源实例表单数据
      resourceData: props.resourceData, // 所有资源数据
      beforeDataDiskList: props.beforeDataDiskList, // 原始实例的数据盘
      instanceTypeList: [], // 实例规格列表
      imageTypeList: [], // 公共镜像类型列表
      sysDiskTypeList: [], // 系统盘类型列表
      dataDiskTypeList: [], // 数据盘类型列表
      imageVersionList: [], // 镜像版本列表
    }
    // console.log('props', props.initData);
  }

  componentDidMount () {
    this.handleSetDefaultForm()
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.resourceData !== prevState.resourceData) {
      // console.log('nextProps.resourceData', nextProps.resourceData, nextProps);
      return {
        resourceData: nextProps.resourceData,
        instanceTypeList: getTargetState(
          nextProps.resourceData,
          'instance_type',
          nextProps.initData.instanceType,
        ), // 实例规格列表
        imageTypeList: getTargetState(nextProps.resourceData, 'image_type', nextProps.initData.imageType), // 公共镜像类型列表
        sysDiskTypeList: nextProps.resourceData.sys_disk_type
          ? nextProps.resourceData.sys_disk_type.children : [], // 系统盘类型列表
        dataDiskTypeList: nextProps.resourceData.data_disk_type
          ? nextProps.resourceData.data_disk_type.children : [], // 数据盘类型列表
        imageVersionList: getImageVersionList(
          getTargetState(nextProps.resourceData, 'image_type', nextProps.initData.imageType),
          nextProps.initData.imageName,
        ),
      }
    }
    if (nextProps.isChange !== prevState.isChange) {
      return {
        isChange: nextProps.isChange,
      }
    }
    return null
  }

  handleGetImageVersionList = (e) => {
    const { imageTypeList } = this.state
    const { form } = this.props
    form.setFieldsValue({ imageVersion: undefined })
    this.setState({
      imageVersionList: getImageVersionList(imageTypeList, e),
    })
  }

  renderTitleDetail = () => {
    const { initData } = this.state
    const { formItemLayout } = this.props
    return (
      <div className={styles.item_container}>
        <div className={styles.item_title}>
          <i className={`icon iconfont ${FORM_ICON.BASE_INFO}`} />
          实例信息
        </div>
        <div className={styles.item_title_content}>
          <Form.Item {...formItemLayout} label={<span className={styles.text_left}>实例ID</span>}>
            {initData.cloudInstanceId}
          </Form.Item>
          <Form.Item {...formItemLayout} label={<span className={styles.text_left}>实例名称</span>}>
            {initData.cloudInstanceName}
          </Form.Item>
          <Form.Item {...formItemLayout} label={<span className={styles.text_left}>区域</span>}>
            {initData.regionName}
          </Form.Item>
          <Form.Item {...formItemLayout} label={<span className={styles.text_left}>部门</span>}>
            {initData.deptName}
          </Form.Item>
          <Form.Item {...formItemLayout} label={<span className={styles.text_left}>项目</span>}>
            {initData.projectName}
          </Form.Item>
          <Form.Item {...formItemLayout} label={<span className={styles.text_left}>网络类型</span>}>
            {initData.networkType}
          </Form.Item>
          <Form.Item {...formItemLayout} label={<span className={styles.text_left}>VPC</span>}>
            {initData.vpcId}
          </Form.Item>
          <Form.Item {...formItemLayout} label={<span className={styles.text_left}>交换机</span>}>
            {initData.vSwitchId}
          </Form.Item>
        </div>
      </div>
    )
  }


  // 设置数据盘默认表单数据
  handleSetDefaultForm = () => {
    const { initData } = this.state
    const { form } = this.props
    const { setFieldsValue, getFieldValue } = form
    // console.log('initData', initData);
    // 回填默认系统盘表单
    const defaultList = initData.dataDiskList.filter((item) => item.diskType === 'data')
    // 回填新增的系统盘表单
    const addList = initData.dataDiskList.filter((item) => !item.diskType)
    const defaultDataDiskList = getFieldValue('defaultDataDiskList')
    const addDataDiskList = getFieldValue('addDataDiskList')
    // console.log('t', t);
    if (defaultList.length && defaultDataDiskList && defaultDataDiskList.length) {
      defaultDataDiskList.forEach((k) => {
        setFieldsValue({
          [`defaultTypeId[${k}]`]: defaultList[k].cloudProductInstanceId,
          [`defaultTypeName[${k}]`]: defaultList[k].typeName,
          [`defaultStorageMax[${k}]`]: defaultList[k].storageMax,
        })
      })
    }
    if (addList.length && addDataDiskList && addDataDiskList.length) {
      addDataDiskList.forEach((k) => {
        setFieldsValue({
          [`typeName[${k}]`]: addList[k].typeName,
          [`storageMax[${k}]`]: addList[k].storageMax,
        })
      })
    }
  }

  // 新增数据盘
  add = () => {
    const { form } = this.props
    // can use data-binding to get
    const addDataDiskList = form.getFieldValue('addDataDiskList')
    const nextKeys = addDataDiskList.concat(addSum++)
    // console.log('nextKeys', nextKeys);
    form.setFieldsValue({
      addDataDiskList: nextKeys,
    })
  };

  // 移除数据盘
  remove = (k) => {
    const { form } = this.props
    // can use data-binding to get
    const addDataDiskList = form.getFieldValue('addDataDiskList')
    // We need at least one passenger
    // if (dataDiskList.length === 1) {
    //   return;
    // }

    // can use data-binding to set
    form.setFieldsValue({
      addDataDiskList: addDataDiskList.filter((key) => key !== k),
    })
  };

  renderForm = () => {
    const {
      initData, instanceTypeList, imageTypeList, sysDiskTypeList, imageVersionList,
    } = this.state
    const { formItemLayout, form } = this.props
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    }
    const addDataDiskList = form.getFieldValue('addDataDiskList') || []
    const defaultDataDiskList = form.getFieldValue('defaultDataDiskList') || []
    const sum = 15 - [ ...addDataDiskList, ...defaultDataDiskList ].length
    const { getFieldDecorator } = form
    return (
      <div className={styles.item_container}>
        <div className={styles.item_title}>
          <i className={`icon iconfont ${FORM_ICON.CONFIG}`} />
          配置
        </div>
        <div className={styles.item_content}>
          <Form.Item {...formItemLayout} label="实例类型">
            {getFieldDecorator('instanceType', {
              initialValue: initData.instanceType,
              rules: [ { required: true, message: '请选择实例类型!' } ],
            })(
              <Radio.Group>
                <Radio.Button value="通用型">通用型</Radio.Button>
              </Radio.Group>,
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="实例规格">
            {getFieldDecorator('specification', {
              initialValue: initData.specification,
              rules: [ { required: true, message: '请选择实例规格!' } ],
            })(
              <Select placeholder="请选择实例规格">
                {
                  instanceTypeList.map((item) => (
                    <Option key={item.id} value={item.label}>{item.label}</Option>
                  ))
                }
              </Select>,
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="镜像类型">
            {getFieldDecorator('imageType', {
              initialValue: initData.imageType,
              rules: [ { required: true, message: '请选择镜像类型!' } ],
            })(
              <Radio.Group>
                <Radio.Button value={initData.imageType}>{initData.imageType}</Radio.Button>
              </Radio.Group>,
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} style={{ marginBottom: 0 }} label="公共镜像">
            <span className={styles.doubItem}>
              <Form.Item>
                {getFieldDecorator('imageName', {
                  initialValue: initData.imageName,
                  rules: [ { required: true, message: '请选择公共镜像类型' } ],
                })(
                  <Select disabled onChange={this.handleGetImageVersionList} placeholder="请选择公共镜像类型">
                    {
                      imageTypeList.map((item) => (
                        <Option key={item.id} value={item.label}>{item.label}</Option>
                      ))
                    }
                  </Select>,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('imageVersion', {
                  initialValue: initData.imageVersion,
                  rules: [ { required: true, message: '请选择镜像版本' } ],
                })(
                  <Select disabled placeholder="请选择镜像版本">
                    {
                      imageVersionList.map((item) => (
                        <Option key={item.id} value={item.label}>{item.label}</Option>
                      ))
                    }
                  </Select>,
                )}
              </Form.Item>
            </span>
          </Form.Item>
          <Form.Item {...formItemLayout} style={{ marginBottom: 0 }} label="系统盘">
            <span className={styles.doubItem}>
              <Form.Item>
                {getFieldDecorator('systemDiskType', {
                  initialValue: initData.systemDiskType,
                  rules: [ { required: true, message: '请选择系统盘类型!' } ],
                })(
                  <Select disabled placeholder="请选择系统盘类型">
                    {
                      sysDiskTypeList.map((item) => (
                        <Option key={item.id} value={item.label}>{item.label}</Option>
                      ))
                    }
                  </Select>,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('systemDiskSize', {
                  initialValue: initData.systemDiskSize,
                  rules: [
                    { required: true, message: '请选择系统容量!' },
                    {
                      validator: (rule, value, callback) => {
                        const pattern = /^[0-9]+$/
                        if (value && !pattern.test(value)) {
                          return callback(new Error('只能输入正整数'))
                        }
                        return callback()
                      },
                    },
                  ],
                })(
                  <InputNumber
                    disabled
                    style={{ width: '200px', marginRight: 5 }}
                    min={1}
                    max={1000000}
                    placeholder="请填写系统盘内容量"
                  />,
                )}
                <span>GB</span>
              </Form.Item>
            </span>
          </Form.Item>
          {initData.dataDiskList && this.renderDefaultDataDiskFields()}
          {this.renderAddFields()}
          {
            sum > 0
              ? (
                <Form.Item {...formItemLayoutWithOutLabel}>
                  <Button type="dashed" onClick={this.add} style={{ width: '200px' }}>
                    <Icon type="plus" />
                    增加数据盘
                  </Button>
                  <span
                    style={{ paddingLeft: 20, color: '#999' }}
                  >
                    您还可以选配
                    <span style={{ color: '#1890ff' }}>{sum}</span>
                    块数据盘
                  </span>
                </Form.Item>
              )
              : null
          }
        </div>
      </div>
    )
  }

  // ECS 设置默认的数据盘表单
  renderDefaultDataDiskFields = () => {
    const { dataDiskTypeList, beforeDataDiskList, initData } = this.state
    const { form } = this.props
    const { getFieldDecorator, getFieldValue } = form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    }
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    }
    // 默认的系统盘列表
    const defaultList = initData.dataDiskList.filter((item) => item.diskType === 'data')
    getFieldDecorator('defaultDataDiskList', { initialValue: defaultList ? defaultList.map((item, index) => index) : [] })
    const defaultDataDiskList = getFieldValue('defaultDataDiskList')
    const defaultFormItems = defaultDataDiskList.map((k, index) => (
      <Form.Item
        style={{ marginBottom: 0 }}
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index === 0 ? '数据盘' : ''}
        required={false}
        key={k}
      >
        <span className={styles.doubItem}>
          {getFieldDecorator(`defaultTypeId[${k}]`, {
          })(
            <Input style={{ display: 'none' }} />,
          )}
          <Form.Item>
            {getFieldDecorator(`defaultTypeName[${k}]`, {
              rules: [ { required: true, message: '请选择数据盘类型!' } ],
            })(
              <Select disabled placeholder="请选择数据盘类型">
                {
                  dataDiskTypeList.map((item) => (
                    <Option key={item.id} value={item.label}>{item.label}</Option>
                  ))
                }
              </Select>,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator(`defaultStorageMax[${k}]`, {
              rules: [
                { required: true, message: '请填写数据盘内存!' },
                {
                  validator: (rule, value, callback) => {
                    const pattern = /^[0-9]+$/
                    if (value && !pattern.test(value)) {
                      return callback(new Error('只能输入正整数'))
                    }
                    return callback()
                  },
                },
              ],
            })(
              <InputNumber
                style={{ width: '200px', marginRight: 5 }}
                min={beforeDataDiskList.length ? beforeDataDiskList[k].storageMax : 1}
                max={1000000}
                placeholder="请填写数据盘内容量"
              />,
            )}
            <span>GB</span>
          </Form.Item>
        </span>
      </Form.Item>
    ))
    return defaultFormItems
  }

  // 新增数据盘表单控件
  renderAddFields = () => {
    const { dataDiskTypeList, initData } = this.state
    const { form } = this.props
    const { getFieldDecorator, getFieldValue } = form
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    }
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    }
    // 默认新增的系统盘列表
    const addList = initData.dataDiskList.filter((item) => !item.diskType)
    getFieldDecorator('addDataDiskList', { initialValue: addList ? addList.map((item, index) => index) : [] })
    const dataDiskList = getFieldValue('addDataDiskList')
    const defaultDataDiskList = getFieldValue('defaultDataDiskList')
    addSum = dataDiskList.length
    const formItems = dataDiskList.map((k, index) => (
      <Form.Item
        style={{ marginBottom: 0 }}
        {...(index === 0 && defaultDataDiskList.length === 0
          ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index === 0 && defaultDataDiskList.length === 0 ? '数据盘' : ''}
        required={false}
        key={k}
      >
        <span className={styles.doubItem}>
          <Form.Item>
            {getFieldDecorator(`typeName[${k}]`, {
              rules: [ { required: true, message: '请选择磁盘类型!' } ],
            })(
              <Select placeholder="请选择磁盘类型">
                {
                  dataDiskTypeList.map((item) => (
                    <Option key={item.id} value={item.label}>{item.label}</Option>
                  ))
                }
              </Select>,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator(`storageMax[${k}]`, {
              rules: [
                { required: true, message: '请填写数据盘内存!' },
                {
                  validator: (rule, value, callback) => {
                    const pattern = /^[0-9]+$/
                    if (value && !pattern.test(value)) {
                      return callback(new Error('只能输入正整数'))
                    }
                    return callback()
                  },
                },
              ],
            })(
              <InputNumber
                style={{ width: '200px', marginRight: 5 }}
                min={1}
                max={1000000}
                placeholder="请填写系统盘内容量"
              />,
            )}
            <span>GB</span>
          </Form.Item>
          <Icon
            className={styles.dynamicDeletebutton}
            type="minus-circle-o"
            onClick={() => this.remove(k)}
          />
        </span>
      </Form.Item>
    ))
    return formItems
  }

  render () {
    return (
      <>
        {this.renderTitleDetail()}
        <Divider />
        {this.renderForm()}
      </>
    )
  }
}

export default ECSForm
