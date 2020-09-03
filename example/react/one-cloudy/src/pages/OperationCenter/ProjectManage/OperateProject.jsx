/**
 * 项目操作
 */
import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Button, message, Form } from 'antd'
import { router } from 'umi'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import StackPanel from '@/components/Common/StackPanel'
import FooterComfire from '@/components/Common/FooterComfire'
import ProjectOperation from '@/components/OperationCenter/ProjectOperation'
import { baseFormItemLayout } from '@/contants'

// const {pathName}='/manage/operation-center/projectManage/list';
@connect(({ projectManage, user }) => ({
  deptlist: projectManage.deptlist,
  roleList: user.roleList,
  deptName: user.userInfo.deptName,
  deptId: user.userInfo.deptId,
}))

@Form.create()
class OperateProject extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  // 取消
  onCancle = () => {
    router.push('/manage/operation-center/projectManage/list')
  }

  // 创建新项目
  onSubmitProject = () => {
    const { form } = this.props
    form.validateFields((err, values) => {
      if (!err) {
        this.onSubmit('submitProjectData', values)
      }
    })
  };

  // 编辑项目
  onSubmitUpdate = () => {
    const { form } = this.props
    form.validateFields((err, values) => {
      if (!err) {
        this.onSubmit('submitUpdate', values)
      }
    })
  };

  // 新建及修改 type为接口，value为提交的参数
  onSubmit = (Interface, value) => {
    const { dispatch, location } = this.props
    const { initValue } = location.state
    dispatch({
      type: `projectManage/${Interface}`,
      payload: {
        ...value,
        projectId: initValue.projectId,
      },
    }).then(() => {
      this.onCancle()
      message.success('提交成功')
    })
  };

  render () {
    const { loading, form, location } = this.props
    const { initValue, title } = location.state
    const formProps = {
      form,
      formItemLayout: baseFormItemLayout,
    }
    return (
      <PageHeaderWrapper
        title={title}
        breadcrumbList={[ {
          title: '项目管理',
          href: '/manage/operation-center/projectManage/list',
        } ]}
      >
        <ProjectOperation formProps={formProps} initValue={initValue} />
        <FooterComfire>
          <StackPanel>
            <StackPanel.RightAlice>
              <Button onClick={this.onCancle}>取消</Button>
              <Button
                type="primary"
                loading={loading}
                onClick={() => {
                  JSON.stringify(initValue) !== '{}'
                    ? this.onSubmitUpdate()
                    : this.onSubmitProject()
                }}
              >
                保存
              </Button>
            </StackPanel.RightAlice>
          </StackPanel>
        </FooterComfire>
      </PageHeaderWrapper>

    )
  }
}

export default OperateProject
