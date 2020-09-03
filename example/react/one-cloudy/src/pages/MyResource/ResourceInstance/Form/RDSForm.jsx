
/**
 * RDS-升降配表单
 */
import React, { Fragment } from 'react'
import { connect } from 'dva'
import {
  Form, Divider, Select, InputNumber,
} from 'antd'
import { FORM_ICON } from '@/components/OperationCenter/Product/base/_constant'
import { getTargetState, getCpuMemoryList } from '../contant'
import styles from '../changeSet.less'

const { Option } = Select
@connect()
class RDSForm extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      initData: props.initData || {},
      resourceData: props.resourceData,
      dbTypeList: [], // 数据库类型列表
      engineVersionList: [], // 数据库版本列表
      cpuMemoryList: [],
      changeUnable: false,
    }
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.resourceData !== prevState.resourceData) {
      return {
        resourceData: nextProps.resourceData,
        dbTypeList: nextProps.resourceData.db_type ? nextProps.resourceData.db_type.children : [],
        engineVersionList: getTargetState(nextProps.resourceData, 'db_type', nextProps.initData.engine),
        cpuMemoryList: getCpuMemoryList(getTargetState(nextProps.resourceData, 'db_type', nextProps.initData.engine),
          nextProps.initData.engineVersion),
      }
    }
    if (nextProps.initData !== prevState.initData) {
      return {
        initData: nextProps.initData,
      }
    }
    return null
  }

  // 获取数据库版本列表
  handleGetEngineVersion = (e) => {
    const { dbTypeList } = this.state
    const { form } = this.props
    form.setFieldsValue({ engineVersion: undefined })
    this.setState({
      engineVersionList: dbTypeList.find((item) => item.label === e).children,
    })
  }

  handleGetCpuMemoryList = (e) => {
    const { engineVersionList } = this.state
    const { form } = this.props
    form.setFieldsValue({ cpuMemory: undefined })
    this.setState({
      cpuMemoryList: getCpuMemoryList(engineVersionList, e),
    })
  }

  // 改变规格
  handleChangeCpu = (v) => {
    const { form } = this.props
    if (v.includes('GB')) {
      form.setFieldsValue({
        storage: v.split(',')[1].replace('GB', '') * 1,
      })
    } else {
      form.setFieldsValue({
        storage: undefined,
      })
    }
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
          <Form.Item {...formItemLayout} label={<span className={styles.text_left}>部门</span>}>
            {initData.deptName}
          </Form.Item>
          <Form.Item {...formItemLayout} label={<span className={styles.text_left}>区域</span>}>
            {initData.regionName}
          </Form.Item>
          <Form.Item {...formItemLayout} label={<span className={styles.text_left}>项目</span>}>
            {initData.projectName}
          </Form.Item>
          <Form.Item {...formItemLayout} label={<span className={styles.text_left}>IP</span>}>
            {initData.ipAddress}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label={<span className={styles.text_left}>VPC ID/名称</span>}
          >
            {initData.vpcId}
            {' '}
            /
            {' '}
            {initData.vpcName}
          </Form.Item>
        </div>
      </div>
    )
  }

  renderForm = () => {
    const {
      initData, dbTypeList, engineVersionList, cpuMemoryList, changeUnable,
    } = this.state
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
    }
    const formItemLayout1 = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
    }
    const { form } = this.props
    const { getFieldDecorator } = form
    return (
      <div className={styles.item_container}>
        <div className={styles.item_title}>
          <i className={`icon iconfont ${FORM_ICON.CONFIG}`} />
          配置
        </div>
        <div className={styles.item_content}>
          <Form.Item {...formItemLayout1} style={{ marginBottom: 0 }} label="数据库类型">
            <span className={styles.doubItem}>
              <Form.Item>
                {getFieldDecorator('engine', {
                  initialValue: initData.engine,
                  rules: [ { required: true, message: '请选择数据库类型' } ],
                })(
                  <Select disabled onChange={(e) => this.handleGetEngineVersion(e)} placeholder="请选择数据库类型">
                    {
                      dbTypeList.map((item) => (
                        <Option key={item.id} value={item.label}>{item.label}</Option>
                      ))
                    }
                  </Select>,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('engineVersion', {
                  initialValue: initData.engineVersion,
                  rules: [ { required: true, message: '请选择版本' } ],
                })(
                  <Select disabled onChange={this.handleGetCpuMemoryList} placeholder="请选择版本">
                    {
                      engineVersionList.map((item) => (
                        <Option key={item.label} value={item.label}>{item.label}</Option>
                      ))
                    }
                  </Select>,
                )}
              </Form.Item>
            </span>
          </Form.Item>
          <Form.Item {...formItemLayout} label="规格">
            {getFieldDecorator('cpuMemory', {
              initialValue: initData.cpuMemory,
              rules: [ { required: true, message: '请选择规格!' } ],
            })(
              <Select onSelect={this.handleChangeCpu} placeholder="请选择版本">
                {
                  cpuMemoryList.map((item) => (
                    <Option key={item.label} value={item.label}>{item.label}</Option>
                  ))
                }
              </Select>,
            )}
            {/* <span style={{ paddingLeft: 20, color: '#999' }}>通用型与独享型不能互相变更</span> */}
          </Form.Item>
          <Form.Item {...formItemLayout} label="存储容量">
            {getFieldDecorator('storage', {
              initialValue: initData.storage ? initData.storage * 1 : undefined,
              rules: [
                { required: true, message: '请选择存储容量!' },
                {
                  validator: (rule, value, callback) => {
                    const pattern = /^[0-9]+$/
                    if (value && !pattern.test(value)) {
                      return callback(new Error('只能输入正整数'))
                    }
                    if (value && value % 5 === 0) {
                      return callback()
                    }
                    return callback(new Error('数值应为5的倍数'))
                  },
                },
              ],
            })(
              <InputNumber
                disabled={
                  !!form.getFieldValue('cpuMemory').includes('独享型') ||
                   !!form.getFieldValue('cpuMemory').includes('独占物理机')
                }
                style={{ width: '200px', marginRight: 5 }}
                min={!!form.getFieldValue('cpuMemory').includes('独享型') || !!form.getFieldValue('cpuMemory').includes('独占物理机') ? 1 : 5}
                max={!!form.getFieldValue('cpuMemory').includes('独享型') || !!form.getFieldValue('cpuMemory').includes('独占物理机') ? 1000000 : 2000}
                placeholder="请填写存储容量"
              />,
            )}
            GB
            {
              !!form.getFieldValue('cpuMemory').includes('独享型') || !!form.getFieldValue('cpuMemory').includes('独占物理机')
                ? null
                : <span style={{ paddingLeft: 10, color: '#999' }}>范围5-2000,且为5的倍数</span>
            }
          </Form.Item>
        </div>
      </div>
    )
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

export default RDSForm
