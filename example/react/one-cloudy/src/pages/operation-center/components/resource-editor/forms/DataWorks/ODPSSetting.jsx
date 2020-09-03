// "iconODPS"


import React from 'react'
import {
  Form, Col, Row, Modal, Icon, Input,
} from 'antd'
import { connect } from 'dva'
import { Comment } from '@/components/OperationCenter/Product/base/index'
import { PRODUCT_FIELDS, FIELD_MAP } from '@/components/OperationCenter/Product/base/_constant'
import { Number, InstanceName } from '@/components/OperationCenter/Product/base/'
import { SelectItem } from '@/components/OperationCenter/Product/components'
import { Department, ProjectName, ResourceUsers } from '@/components/OperationCenter/ApplyFrom' // FIXME:重构
import { subscribeFormChange, unSubscribeFormChange } from '@/components/OperationCenter/Product'
import Fieldset from '../components/parts/Fieldset'
import ICONS from '../components/blocks/constants/icons'
import FIELDS from '../components/blocks/constants/fields'
import ResourceUsersPicker from '../components/parts/ResourceUsersPicker'

const mapStateToProps = ({ resourceApply, user }) => ({
  projectMode: resourceApply.DataWork_ProjectMode,
  resourceApply,
  resourceData: resourceApply.resourceData,
  selectedProductList: resourceApply.selectedProductList,
  deptId: user.deptId,
  maxcomputeProjectList: resourceApply.maxcomputeProjectList,
  projectList: resourceApply.projectList,
})
const mapDispatchToProps = (dispatch) => ({
  getMaxcomputeProjectList (payload) {
    return dispatch({
      type: 'resourceApply/getMaxcomputeProjectList',
      payload,
    })
  },
  // 获取所有的项目
  queryAllProjectList (payload) {
    return dispatch({
      type: 'resourceApply/queryAllProjectList',
      payload,
    })
  },
})
function initialState () {
  return {
    standardForDev: { // 标准模式 - 开发环境
      key: 'standardForDev',
      formVisible: false,
      title: '开发环境',
      userType: '个人身份',
      initialValue: {
        instanceName: '_dev',
      },
    },
    standardForProd: { // 标准模式 - 生产环境
      key: 'standardForProd',
      formVisible: false,
      title: '生产环境',
      userType: '计算引擎指定账号',
      initialValue: {
        instanceName: '_prod',
      },
    },
    simpleForNormal: { // 简单模式 - 标准环境
      key: 'simpleForNormal',
      formVisible: false,
      title: '',
      odpsNameValue: '',
      odpsNameValueEnabled: true,
      userType: '个人身份',
      initialValue: {
        instanceName: '',
      },
    },
  }
}

@connect(mapStateToProps, mapDispatchToProps)

class Config extends React.Component {
  state = {
    initDataUsed: false,
    projectMode: undefined, // 控制项目模式实现表单项切换
    ...initialState(),
    fieldsConfig: {
      projectModeField: {
        label: '模式',
        key: 'pattern',
        type: 'select',
        options: [],
      }, // 模式表单配置项
    },
    instanceName: '',
  }

  // "devName":"标准模式开发项目名称",
  // "devIdentity":"开发个人账号",


  static getDerivedStateFromProps (nextProps, prevState) {
    const { project_pattern: pattern } = nextProps.resourceData
    if (pattern) {
      const projectModeField = {
        label: pattern.label,
        key: pattern.instanceFieldName,
        type: pattern.dataType,
        options: [],
      }
      const standardForDev = {
        ...prevState.standardForDev,
        projectOptions: [],
        userTypeOptions: [],
      }
      const standardForProd = {
        ...prevState.standardForProd,
        projectOptions: [],
        userTypeOptions: [],
      }
      const simpleForNormal = {
        ...prevState.simpleForNormal,
        projectOptions: [],
        userTypeOptions: [],
      }
      const projectModeOptions = projectModeField.options
      const standardForDevUserTypeOptions = standardForDev.userTypeOptions
      const standardForProdUserTypeOptions = standardForProd.userTypeOptions
      const simpleForNormalUserTypeOptions = simpleForNormal.userTypeOptions
      pattern.children.forEach((item) => {
        projectModeOptions.push({ key: item.name, value: item.name })
        if (item.name === '标准模式') {
          item.dependSpecTypeGroups.prd_env.children.forEach((userType) => {
            standardForProdUserTypeOptions.push({ key: userType.name, value: userType.name })
          })
          item.dependSpecTypeGroups.dev_env.children.forEach((userType) => {
            standardForDevUserTypeOptions.push({ key: userType.name, value: userType.name })
          })
        }
        if (item.name === '简单模式') {
          const { children } = item.dependSpecTypeGroups.prd_env
          children.forEach((userType) => {
            simpleForNormalUserTypeOptions.push({ key: userType.name, value: userType.name })
          })
        }
      })

      // 数据回填
      const { initData } = nextProps
      let { projectMode, instanceName, initDataUsed } = prevState
      if (initData && !initDataUsed) {
        const { pattern } = initData
        if (pattern === '标准模式') {
          const { devId, prdId, maxComputeList } = initData
          maxComputeList.forEach((item) => {
            if (devId && item.id == devId || item.mcFlag === 'dev') {
              standardForDev.formVisible = true
              standardForDev.initialValue = {
                ...item,
                instanceName: '_dev',
              }
            } else if (prdId && item.id == prdId || item.mcFlag === 'prd') {
              standardForProd.formVisible = true
              standardForProd.initialValue = {
                ...item,
                instanceName: '_prod',
              }
            }
          })
        }

        if (pattern === '简单模式') {
          const { simpleMcId, maxComputeList } = initData
          maxComputeList.some((item) => {
            if (simpleMcId && item.id == simpleMcId || item.mcFlag === 'simple') {
              simpleForNormal.formVisible = true
              simpleForNormal.initialValue = {
                ...item,
              }
              // simpleForNormal.odpsNameValue = item.instanceName
              return true
            }
          })
        }

        projectMode = pattern
        instanceName = initData.instanceName
        initDataUsed = true
      }

      // // 需要重置错误的表单
      // if (prevState.projectMode === '标准模式') {
      //   const { form } = nextProps;
      //   form.setFieldsValue({
      //     'simpleForNormal.name': undefined
      //   });
      // }


      return ({
        initDataUsed,
        projectMode,
        fieldsConfig: {
          projectModeField,
        },
        standardForDev,
        standardForProd,
        simpleForNormal,
        lockProps: false,
        instanceName,
      })
    }
    return {}
  }

  componentDidMount () {
    this.props.queryAllProjectList()
    subscribeFormChange(this.onFormChange)
  }

  componentWillUnmount () {
    unSubscribeFormChange(this.onFormChange)
  }

  onFormChange = (values, key, has) => {
    const newState = {}
    // 项目模式变更
    if (has('pattern')) {
      const projectMode = values.pattern
      newState.lockProps = true
      if (!projectMode || projectMode !== this.state.projectMode) {
        newState.lockProps = true
        Object.assign(newState, initialState())
      }
      newState.projectMode = projectMode
    }

    if (has('instanceName')) {
      newState.lockProps = true
      newState.instanceName = values.instanceName
      const { form } = this.props
      form.resetFields([ 'standardForProd.instanceName', 'standardForDev.instanceName' ])
    }


    this.setState(newState)
    if (values.regionId != null) {
      this.props.getMaxcomputeProjectList({
        deptId: this.props.deptId,
        regionId: values.regionId,
        productCode: 'MaxCompute',
        projectId: this.getProjectId(),
      })
    }
  }

  getProjectId () {
    let projectId
    const { batch } = this.props
    const { projectInfo } = this.props.resourceApply
    // 批量模式下，使用项目id进行查询
    if (batch && projectInfo) {
      ({ projectId } = projectInfo)
    }
    return projectId
  }

  render () {
    const { form, formItemLayout } = this.props
    const { projectMode } = this.state
    const { projectModeField } = this.state.fieldsConfig
    return (
      <>
        <Fieldset title="面向 Maxcompute（ODPS）" icon={ICONS.ODPS} topTitle>
          {projectModeField &&
            (
              <Form.Item required label={projectModeField.label} {...formItemLayout}>
                <SelectItem
                  id={projectModeField.key}
                  placeholder=""
                  form={form}
                  optionData={projectModeField.options || []}
                  width={200}
                  initialValue={projectMode}
                />
              </Form.Item>
            )}
          {projectMode === '标准模式' && this.renderNormal()}
          {projectMode === '简单模式' && this.renderSimple() }
          {/* <ResourceUsersPicker
            form={form}
            formItemLayout={formItemLayout}
            initialValue={[]}
            dataKey="testResourceUserKey"
          /> */}
        </Fieldset>
      </>
    )
  }

  renderNormal () {
    const { standardForDev, standardForProd } = this.state
    return (
      <>
        {this.renderMeForm(standardForDev)}
        {this.renderMeForm(standardForProd)}
      </>
    )
  }

  renderSimple () {
    const { simpleForNormal } = this.state
    return this.renderMeForm(simpleForNormal)
  }

  renderMeForm (config) {
    const { form, formItemLayout } = this.props
    const { title, formVisible, key } = config
    return (
      <div style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute', left: '-100px', lineHeight: '40px', color: '#1890FF',
        }}
        >
          {title}
        </div>
        <Form.Item required label="Maxcompute项目名称" {...formItemLayout}>
          <SelectItem
            required
            placeholder=""
            id={`${key}.name`}
            form={form}
            optionData={this.getMaxcomputeProjectOptions()}
            initialValue={undefined}
            disabled={formVisible}
            style={{ width: 200, marginBottom: 0 }}
          />
          <div style={{ float: 'left', marginLeft: '28px' }}>
            <span style={{ color: '#999', marginRight: '6px' }}>无对应的Maxcompute项目时可以</span>
            <a onClick={() => this.showCreateProjectDialog(config)}>新建项目</a>
          </div>
          <br />
          {formVisible && this.renderCreateODPSResource(config)}
        </Form.Item>
        <Form.Item required label="Maxcompute访问身份" {...formItemLayout}>
          <SelectItem
            required
            disabled
            placeholder=""
            id={`${key}.identity`}
            form={form}
            optionData={config.userTypeOptions}
            initialValue={config.userType}
            style={{ width: 200, marginBottom: 0 }}
          />
        </Form.Item>
      </div>
    )
  }


  renderCreateODPSResource (config) {
    const {
      form, formItemLayout,
    } = this.props
    const { key, initialValue } = config
    const isLockProjectName = !!this.props.resourceApply.selectedProjectInfo.commonInfo.projectId
    const { instanceName } = this.state
    return (
      <div style={{
        marginTop: '24px',
        padding: '8px 20px',
        overflow: 'hidden',
        wordBreak: 'break-all',
        background: '#f9f9f9',
        border: '1px solid #d9d9d9',
        borderRadius: '4px',
      }}
      >
        <h4>
          Maxcompute（ODPS）
          <Icon onClick={() => this.closeCreateProjectDialog(config)} type="minus-circle" theme="twoTone" style={{ float: 'right', marginTop: '12px' }} />
        </h4>
        {
          form.getFieldDecorator(`${key}.id`, {
            initialValue: initialValue.id,
          })(
            <Input type="hidden" />,
          )
        }
        <InstanceName
          label="ODPS名称"
          required
          form={form}
          formItemLayout={{ ...formItemLayout, required: true }}
          text="3-32字符，以字母开头，支持字母、数字、下划线"
          instanceType={`${key}.instanceName`}
          id={`${key}.instanceName`}
          disabled={!config.odpsNameValueEnabled}
          defaultValue={key === 'simpleForNormal' ? initialValue.instanceName : instanceName + initialValue.instanceName}
        />

        <Form.Item required label="项目" {...formItemLayout}>
          <SelectItem
            required
            placeholder=""
            id={`${key}.projectId`}
            form={form}
            optionData={this.getProjectOptions()}
            initialValue={initialValue.projectId || this.getProjectId()}
            style={{ marginBottom: 0 }}
            disabled={isLockProjectName}
          />
        </Form.Item>

        <ResourceUsersPicker
          form={form}
          formItemLayout={formItemLayout}
          initialValue={(initialValue.resourceUsers || []).map((item) => ({ ...item }))}
          dataKey={key}
          required={false}
        />
        {/* <ResourceUsersPicker form={form} formItemLayout={formItemLayout} customValue={[]} presetValue={[]} dataKey={key} />
    */}
        <Number
          label="CU个数"
          form={form}
          formItemLayout={formItemLayout}
          id={`${key}.${FIELDS.CU_COUNT}`}
          min={20}
          unit="CU"
          tip="CU个数至少为20"
          initialValue={initialValue.cuCount}
        />
        <Number
          label="存储空间"
          form={form}
          formItemLayout={formItemLayout}
          id={`${key}.${FIELDS.ODPS_CAPACITY}`}
          min={1024}
          unit="GB"
          tip="存储空间至少为1024GB"
          initialValue={initialValue.capacity}
        />
      </div>
    )
  }

  // 显示创建项目表单
  showCreateProjectDialog (config) {
    if (config.formVisible) {
      return
    }

    const { form } = this.props
    const { key } = config
    form.setFieldsValue({
      [`${key}.name`]: '新建的Maxcompute实例',
    })
    this.setState((prevState) => ({
      lockProps: true,
      [key]: {
        ...prevState[key],
        formVisible: true,
      },
    }))
  }

  // 关闭创建项目表单
  closeCreateProjectDialog (config) {
    const { key } = config
    const { form } = this.props
    form.setFieldsValue({
      [`${key}.name`]: undefined,
      [`${key}.${FIELDS.CU_COUNT}`]: undefined,
      [`${key}.${FIELDS.capacity}`]: undefined,
    }, () => {
      this.setState((prevState) => ({
        lockProps: true,
        [key]: {
          ...prevState[key],
          formVisible: false,
          initialValue: {
            instanceName: key === 'simpleForNormal' ? '' : config.initialValue.instanceName,
            cuCount: undefined,
            capacity: undefined,
          },
        },
      }))
    })
  }

  getProjectModeOptions (children) {
    return children.map((item) => ({
      key: item.name,
      value: item.name,
    }))
  }

  getMaxcomputeProjectOptions () {
    const { maxcomputeProjectList } = this.props
    return maxcomputeProjectList.map((item) => ({
      key: [ item.cloudInstanceName, item.cloudInstanceId ].join('#*#'),
      value: item.cloudInstanceName,
    }))
  }

  getProjectOptions () {
    return this.props.projectList.map((item) => ({
      key: item.projectId,
      value: item.name,
    }))
  }
}


export default Config
