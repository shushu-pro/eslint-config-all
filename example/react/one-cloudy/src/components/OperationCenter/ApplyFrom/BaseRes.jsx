import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { ProjectContacts, ProjectOwner } from './index'

@connect(({ user }) => ({
  userList: user.userList,
}))
class BaseRes extends PureComponent {
  render () {
    const { form, formItemLayout, baseInfo, userList } = this.props
    const formProps = {
      formItemLayout,
      form,
    }
    return (
      <div>
        <ProjectContacts
          {...formProps}
          optionData={userList}
          initialValue={baseInfo && baseInfo.projectContactUserList}
        />
        <ProjectOwner
          {...formProps}
          optionData={userList}
          initialValue={baseInfo && baseInfo.projectChargedUserList}
        />
      </div>
    )
  }
}

export default BaseRes
