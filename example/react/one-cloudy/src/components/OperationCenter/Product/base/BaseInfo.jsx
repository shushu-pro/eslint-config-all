/**
 * 基础信息
 */
import React from 'react'
import { connect } from 'dva'
import { withRouter } from 'umi'
import { Spin, Form } from 'antd'
import { Department, ProjectName, ResourceUsers } from '@/components/OperationCenter/ApplyFrom'
import { Other, User, File } from '@/components/OperationCenter/ProjectInfo'
import { PRODUCT_FIELDS } from '@/components/OperationCenter/Product/base/_constant'
import BasicInfo from '@/pages/AuthorityCenter/ProjectManage/BasicInfo'
import { Upload, SelectItem } from '../components'
import styles from '../style.less'
import { subscribeFormChange, unSubscribeFormChange } from '../index'
import BaseInfoRegion from './BaseInfoRegion/index'

const noProjectProducts = [
  'HSM', 'DataSmart', 'ENCR', 'WAF', 'SkyNet', 'SkyEye', 'DisasterRecovery', 'BackUp',
] // 无项目的产品

@connect(({
  user, resourceApply, operationOrder, loading,
}) => ({
  userInfo: user.userInfo,
  resourceUserList: user.userList,
  projectList: resourceApply.projectList,
  projectInfo: resourceApply.projectInfo,
  ocDeptList: resourceApply.ocDeptList,
  ocProjectList: resourceApply.ocProjectList,
  selectedProjectInfo: resourceApply.selectedProjectInfo,
  loading: !!loading.effects['projectManage/queryInfo'],
  productEditDetail: operationOrder.productEditDetail,
}))
@withRouter
class BaseInfo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      proData: undefined,
      showProject: props.location.query.isDepdProject !== 'false',
    }
  }

  componentDidMount () {
    const { userInfo } = this.props
    this.onSetData(this.props, this.state)
    this.queryUserList()
    this.getOcProjectList({ deptId: userInfo.deptId })
    subscribeFormChange(this.onFormChange)
  }

  UNSAFE_componentWillUpdate (nextProps, nextState) {
    this.onSetData(nextProps, nextState)
  }

  // 获取所有的项目
  queryAllProjectList = (payload) => {
    const { dispatch } = this.props
    return dispatch({
      type: 'resourceApply/queryAllProjectList',
      payload,
    })
  };

  // 获取部门下的资源使用人
  queryUserList = (payload) => {
    const { dispatch } = this.props
    return dispatch({
      type: 'user/queryUserList',
      payload,
    })
  };

  // 资源申请部门接口（可选子部门）
  queryOcDeptList = (payload) => {
    const { dispatch, userInfo } = this.props
    return dispatch({
      type: 'resourceApply/queryOcDeptList',
      payload: {
        ocDeptId: userInfo.deptId,
      },
    })
  };

  getOcProjectList = ({ deptId }) => {
    if (!deptId) {
      return
    }
    const { dispatch } = this.props
    return dispatch({
      type: 'resourceApply/getOcProjectList',
      payload: {
        deptId,
      },
    })
  };

  onSetData = (props = this.props, state = this.state) => {
    const { dispatch, form } = props
    const { proId } = state
    const projectId = form.getFieldValue(PRODUCT_FIELDS.PROJECT_ID)
    if (!projectId || proId === projectId) {
      return false
    }
    this.setState({
      proId: projectId,
    })
    dispatch({
      type: 'projectManage/queryInfo',
      payload: {
        projectId,
      },
    }).then((res) => {
      this.setState({
        proData: res,
      })
      dispatch({
        type: 'resourceApply/setter',
        payload: {
          projectInfo: res,
        },
      })
    })
  };

  onFormChange = (changedValues, changeFieldName) => {
    const { form } = this.props
    const { getOcProjectList } = this
    const { productType } = this.props
    switch (changeFieldName) {
      // oc部门发生变化
      case 'deptId': {
        form.setFieldsValue({ projectId: undefined })
        getOcProjectList({ deptId: changedValues[changeFieldName] })
        break
      }
    }
    // console.info('onFormChange', { changedValues, changeFieldName });
  }

  UNSAFE_componentWillUnmount () {
    unSubscribeFormChange(this.onFormChange)
  }

  renderPro = () => {
    const {
      userInfo, formItemLayout, loading,
    } = this.props
    const { proData } = this.state
    if (!proData) {
      return null
    }
    const propsData = {
      data: proData,
      formItemLayout,
      unitId: userInfo.unitId,
    }
    return (
      <div className={styles.baseInfo}>
        <Spin spinning={loading} className={styles.proData}>
          <User {...propsData} style={{ marginBottom: 24 }} />
          <Other {...propsData} style={{ marginBottom: 24 }} />
          <File
            {...propsData}
            style={{ marginBottom: 0 }}
            id={PRODUCT_FIELDS.ATTACHMENT}
            label="项目附件"
          />
        </Spin>
      </div>
    )
  };


  // 渲染部门
  renderDepartment () {
    const {
      onlyProject, form, formItemLayout, userInfo, ocDeptList, useFor,
    } = this.props

    // 批量申请项下，创建新产品和编辑模式下批量添加新产品，不需要部门字段
    if (useFor === 'batch-modify' || useFor === 'batch-create') {
      return
    }

    if (onlyProject) {
      return null
    }

    return (
      <Department
        form={form}
        formItemLayout={formItemLayout}
        style={{ width: '200px' }}
        disabled={false}
        options={ocDeptList}
        initialValue={userInfo.deptId}
      />
    )
  }

  // 渲染项目
  renderProject () {
    // noProject 表示改资源不能挂在某个项目下
    const {
      noProject, form, formItemLayout, ocProjectList, selectedProjectInfo,
      useFor,
      productType,
    } = this.props

    // 不存在项目信息的产品
    if (noProjectProducts.includes(productType)) {
      return null
    }

    // 批量申请项下，创建新产品和编辑模式下批量添加新产品，不需要项目
    if (useFor === 'batch-modify' || useFor === 'batch-create') {
      return
    }

    const { showProject } = this.state
    if (!showProject || noProject) {
      return null
    }
    const projectId = selectedProjectInfo &&
      selectedProjectInfo.commonInfo &&
      selectedProjectInfo.commonInfo.projectId
    return (
      <>
        <ProjectName form={form} formItemLayout={formItemLayout} optionData={ocProjectList} initialValue={projectId} />
        {this.renderProjectDetail()}
      </>
    )
  }

  // 项目详情
  renderProjectDetail () {
    const { userInfo, formItemLayout, loading } = this.props
    const { proData } = this.state
    if (!proData) {
      return null
    }

    const propsData = {
      data: proData,
      formItemLayout,
      unitId: userInfo.unitId,
    }
    return (
      <div className={styles.baseInfo}>
        <Spin spinning={loading} className={styles.proData}>
          <BasicInfo {...propsData} />
          {/* <User {...propsData} style={{ marginBottom: 24 }} />
          <Other {...propsData} style={{ marginBottom: 24 }} />
          <File
            {...propsData}
            style={{ marginBottom: 0 }}
            id="attachFileLinks"
            label="项目附件"
          /> */}
        </Spin>
      </div>
    )
  }

  // dt部门选择
  renderDtDepartment () {
    const { useFor, productType } = this.props
    // 批量申请下，项目详情中不显示dt部门选择
    if (useFor === 'batch-project-info' || useFor === 'batch-project-info-update') {
      return null
    }
    const { form, formItemLayout } = this.props
    return <BaseInfoRegion form={form} formItemLayout={formItemLayout} productType={productType} />
  }

  // 渲染资源申请人列表
  renderResourceUsers () {
    const {
      useFor, onlyProject, form, formItemLayout, resourceUserList, resourceUsers,
    } = this.props

    // 批量申请和修改
    if (useFor === 'batch-create' || useFor === 'batch-modify') {
      return null
    }

    if (onlyProject) {
      return null
    }
    const userList = resourceUsers || []
    // const userList = (productEditDetail && productEditDetail.resourceInfo.resourceUsers) || [];
    if (useFor === 'single-create') {
      userList.length = 0
    }

    return (
      <ResourceUsers
        form={form}
        formItemLayout={formItemLayout}
        initialValue={userList}
        userList={resourceUserList}
      />
    )
  }

  // 渲染附件
  renderAttachment () {
    const {
      useFor, onlyProject, form, formItemLayout, userInfo, selectedProjectInfo, noProject,
    } = this.props
    if (useFor === 'batch-modify' || useFor === 'batch-project-info-update' || useFor === 'batch-create') {
      return null
    }

    if (onlyProject || noProject) {
      return null
    }

    return (
      <Upload
        initialValue={selectedProjectInfo.attachment}
        formProps={{ form, formItemLayout }}
        orgType={userInfo.orgType}
      />
    )
  }

  render () {
    return (
      <>
        {this.renderDepartment()}
        {this.renderProject()}
        {this.renderDtDepartment()}
        {this.renderResourceUsers()}
        {this.renderAttachment()}
      </>
    )
  }
}

export default BaseInfo
