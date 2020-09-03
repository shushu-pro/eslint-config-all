import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Department, ProjectName, ResourceUsers } from './index'

@connect(({ user, resourceApply }) => ({
  deptName: user.userInfo.deptName,
  unitId: user.unitId,
  projectList: resourceApply.projectList,
}))
class BaseInfo extends PureComponent {
  state = {};

  render () {
    const { form, formItemLayout, baseInfo, deptName, projectList } = this.props
    const formProps = {
      formItemLayout,
      form,
    }
    return (
      <div>
        <Department
          {...formProps}
          disabled
          initialValue={(baseInfo && baseInfo.deptName) || deptName}
        />
        <ProjectName
          {...formProps}
          initialValue={baseInfo && baseInfo.name}
          optionData={projectList}
        />
        <ResourceUsers {...formProps} />
      </div>
    )
  }
}

export default BaseInfo
