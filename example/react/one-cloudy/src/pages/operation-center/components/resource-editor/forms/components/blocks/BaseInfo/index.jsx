import React from 'react'
import { connect } from 'dva'
import { withRouter } from 'umi'
import { Spin } from 'antd'
import { Other, User, File } from '@/components/OperationCenter/ProjectInfo'
import Upload from '@/components/OperationCenter/Product/components/Upload' // FIXME:重构
import { Department, ProjectName, ResourceUsers } from '@/components/OperationCenter/ApplyFrom' // FIXME:重构
import BasicInfo from '@/pages/AuthorityCenter/ProjectManage/BasicInfo'
import ICONS from '../constants/icons'
import FIELDS from '../constants/fields'
import Fieldset from '../../parts/Fieldset'
import styles from './index.less'
import propsRender from '../decorators/propsRender'

const mapStateToProps = ({ user, resourceApply, loading }) => ({
  userInfo: user.userInfo,
  resourceUserList: user.userList,
  projectList: resourceApply.projectList,
  ocDeptList: resourceApply.ocDeptList,
  projectInfo: resourceApply.projectInfo,
  selectedProjectInfo: resourceApply.selectedProjectInfo,
  loading: !!loading.effects['projectManage/queryInfo'],
})
const mapDispatchToProps = (dispatch) => ({
  // 获取所有的项目
  queryAllProjectList: (payload) => dispatch({
    type: 'resourceApply/queryAllProjectList',
    payload,
  }),

  // 获取部门下的资源使用人
  queryUserList: (payload) => dispatch({
    type: 'user/queryUserList',
    payload,
  }),

  // 资源申请部门接口（可选子部门）
  queryOcDeptList: (ocDeptId) => dispatch({
    type: 'resourceApply/queryOcDeptList',
    payload: {
      ocDeptId,
    },
  }),

  // 项目发生变更
  onProjectChange (that, props, state) {
    const { form } = props
    const { projectId } = state
    const newProjectId = form.getFieldValue(FIELDS.PROJECT_ID)
    if (!newProjectId || newProjectId === projectId) {
      return
    }

    that.setState({
      projectId: newProjectId,
    })
    dispatch({
      type: 'projectManage/queryInfo',
      payload: {
        projectId: newProjectId,
      },
    }).then((res) => {
      that.setState({
        proData: res,
      })
      dispatch({
        type: 'resourceApply/setter',
        payload: {
          projectInfo: res,
        },
      })
    })
  },

})
@propsRender
@withRouter
@connect(mapStateToProps, mapDispatchToProps)
class BaseInfo extends React.PureComponent {
  constructor (props) {
    super(props)
    // showProject是单个申请下是否显示项目
    // 只有location.query.isDepdProject === 'false'时showProject才为false
    // const showProject = location.query.isDepdProject !== 'false';
    const { location } = this.props
    // 目前功能所有产品都关联项目
    this.state = {
      showProject: location.query.isDepdProject !== 'false',
      proData: undefined,
    }
  }

  componentDidMount () {
    const {
      queryAllProjectList, queryUserList, queryOcDeptList, onProjectChange,
    } = this.props
    queryAllProjectList()
    queryUserList()
    queryOcDeptList(this.props.userInfo.deptId)
    onProjectChange(this, this.props, this.state)
  }

  UNSAFE_componentWillUpdate (nextProps, nextState) {
    this.props.onProjectChange(this, nextProps, nextState)
  }

  // 渲染部门
  renderDepartment () {
    const {
      onlyProject, form, formItemLayout, userInfo, ocDeptList,
    } = this.props
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
        initialValue={userInfo.deptName}
        initKey={userInfo.deptId}
      />
    )
  }

  // 渲染项目
  renderProject () {
    // noProject 表示改资源不能挂在某个项目下
    const {
      noProject, form, formItemLayout, projectList, selectedProjectInfo,
    } = this.props
    const { showProject } = this.state
    if (!showProject || noProject) {
      return null
    }
    const projectId = selectedProjectInfo &&
       selectedProjectInfo[FIELDS.COMMON_INFO] &&
      selectedProjectInfo[FIELDS.COMMON_INFO][FIELDS.PROJECT_ID]
    return (
      <>
        <ProjectName form={form} formItemLayout={formItemLayout} optionData={projectList} initialValue={projectId} />
        {this.renderProjectDetail()}
      </>
    )
  }

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
          {/* <User {...propsData} style={{ marginBottom: 24 }} />
          <Other {...propsData} style={{ marginBottom: 24 }} />
          <File
            {...propsData}
            style={{ marginBottom: 0 }}
            id={FIELDS.ATTACHMENT}
            label="项目附件"
          /> */}
          <BasicInfo {...propsData} />
        </Spin>
      </div>
    )
  }

  // 渲染资源申请人列表
  renderResourceUsers () {
    const {
      onlyProject, form, formItemLayout, resourceUserList, selectedProjectInfo,
    } = this.props
    if (onlyProject) {
      return null
    }

    const userList = selectedProjectInfo[FIELDS.RESOURCE_USER]
    return (
      <ResourceUsers
        form={form}
        formItemLayout={formItemLayout}
        initialValue={userList || []}
        userList={resourceUserList}
      />
    )
  }

  // 渲染附件
  renderAttachment () {
    const {
      onlyProject, form, formItemLayout, userInfo, selectedProjectInfo, noProject,
    } = this.props
    if (onlyProject || noProject) {
      return null
    }

    return (
      <Upload
        initialValue={selectedProjectInfo[FIELDS.ATTACHMENT]}
        formProps={{ form, formItemLayout }}
        orgType={userInfo.orgType}
      />
    )
  }

  render () {
    return (
      <Fieldset title="基础信息" icon={ICONS.BASE_INFO}>
        {this.renderDepartment()}
        {this.renderProject()}
        {this.renderResourceUsers()}
        {this.renderAttachment()}
      </Fieldset>
    )
  }
}

export default BaseInfo
