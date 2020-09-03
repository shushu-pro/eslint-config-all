/**
 * 项目编辑及新增
 */
import React from 'react'
import { connect } from 'dva'
import { Form } from 'antd'
import LeftTitle from '@/components/OperationCenter/LeftTitle'
import { InputItem } from '@/components/OperationCenter/FormItem'
import Department from '@/components/OperationCenter/ApplyFrom/Department'
import ProjectInfo from '@/components/OperationCenter/ApplyFrom/ProjectInfo'
import ProjectFileList from '@/components/OperationCenter/ApplyFrom/ProjectFileList'

@connect(({ user }) => ({
  deptName: user.userInfo.deptName,
  deptId: user.userInfo.deptId,
}))
class Project extends React.PureComponent {
  render () {
    const {
      formProps, initValue, deptName, deptId,
    } = this.props
    return (
      <div style={{ backgroundColor: '#fff', paddingLeft: 20, paddingTop: 20 }}>
        <LeftTitle title="基础信息" noDivider icon="icontab-zhangdanxiangqing">
          <Form>
            <InputItem
              {...formProps}
              id="name"
              label="项目名称"
              // disabled={isEdit}
              initialValue={initValue.name}
              extra="由中文、字母、数字、下划线组成，以大小写字母或中文开头，1-64个字符"
              validator={(rule, value, callback) => {
                const ruleType = /^[a-zA-Z\u4e00-\u9fa5][\u4e00-\u9fa5a-zA-Z0-9_]{0,63}$/
                if (value && !ruleType.test(value)) {
                  return callback(new Error('格式不正确'))
                }
                return callback()
              }}
            />
            <Department
              {...formProps}
              id="departmentId"
              label="部门"
              initialValue={initValue.deptName || deptName}
              initKey={initValue.deptId || deptId}
              disabled
            />
            <ProjectInfo {...formProps} initialValue={initValue} />
            <ProjectFileList {...formProps} initialValue={initValue.attachFileLinks} />
          </Form>
        </LeftTitle>
      </div>
    )
  }
}

export default Project
