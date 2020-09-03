import React, { PureComponent } from 'react'
import { connect } from 'dva'
import ProjectDesc from './ProjectDesc'
import BdCompany from './BdCompany'
import BidPrice from './BidPrice'
import ProjectContacts from './ProjectContacts'
import ProjectOwner from './ProjectOwner'

@connect(({ user }) => ({
  unitId: user.unitId,
  userList: user.userList,
}))
class ProjectInfo extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { form, formItemLayout, unitId, userList, initialValue } = this.props
    const formProps = {
      formItemLayout,
      form,
    }
    const { description, bidCompany, bidPrice, chargeUserIds, contactUserIds } = initialValue
    return (
      <div>
        <ProjectDesc
          {...formProps}
          initialValue={description}
          validator={(rule, value, callback) => {
            if (value && value.length > 200) {
              return callback(new Error('字符长度不能超过200'))
            }
            return callback()
          }}
        />
        {(unitId === 2 || unitId === '2') && <BdCompany {...formProps} initialValue={bidCompany} />}
        {(unitId === 2 || unitId === '2') && <BidPrice {...formProps} initialValue={bidPrice} />}
        <ProjectContacts {...formProps} optionData={userList} initialValue={contactUserIds || []} />
        <ProjectOwner {...formProps} optionData={userList} initialValue={chargeUserIds || []} />
      </div>
    )
  }
}

export default ProjectInfo
