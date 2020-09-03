/**
 * 项目名称
 */
import PropTypes from 'prop-types'
import { connect } from 'dva'
import React, { PureComponent } from 'react'
import { Form, message } from 'antd'
import { PRODUCT_FIELDS } from '@/components/OperationCenter/Product/base/_constant'
import { hasAuth } from '@/pages/AuthorityCenter/ProjectManage/constant'
import { SelectItem } from '../Product/components'
import AddNameModal from '../AddNameModal'

const FormItem = Form.Item
@connect(({ user }) => ({
  roleList: user.roleList,
}))

class ProjectName extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
    }
  }

  // 查询用户信息列表
  queryUserList = (payload) => {
    const { dispatch } = this.props
    return dispatch({
      type: 'user/queryUserList',
      payload,
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

  onShow = () => {
    const { roleList } = this.props
    const hasAuthCreate = hasAuth(roleList)
    if (!hasAuthCreate) {
      message.error('暂无新建项目的权限')
      return
    }
    this.queryUserList().then(() => {
      this.setState({
        visible: true,
      })
    })
  };

  onHide = () => {
    this.childRef && this.childRef.resetFields()
    this.setState({
      visible: false,
    })
  };

  onSubmitProject = (value) => {
    const { dispatch } = this.props
    const { deptId } = value
    dispatch({
      type: 'ACproject/ocprojectinfoSave',
      payload: { ...value },
    }).then((res) => {
      if (res && res.code === 200) {
        this.onHide()
        dispatch({
          type: 'resourceApply/getOcProjectList',
          payload: {
            deptId,
          },
        })
      }
    })
  };

  render () {
    const {
      form, formItemLayout, required, optionData, initialValue,
    } = this.props
    const { visible } = this.state
    const optionList = optionData
    // .map(o => ({
    //   key: o.projectId,
    //   value: o.name,
    // }));
    return (
      <FormItem key="formItem-name" required={required} {...formItemLayout} label="项目名称">
        <SelectItem
          required={required}
          id={[ PRODUCT_FIELDS.PROJECT_ID, PRODUCT_FIELDS.PROJECT_NAME ]}
          placeholder="项目名称"
          form={form}
          optionData={optionList}
          initialValue={initialValue}
          style={{ width: 200, marginBottom: 0 }}
        />
        <div style={{ color: '#999', float: 'left' }}>
          <span>
            <span>无法匹配已有项目时可以</span>
            <a onClick={this.onShow}>新建项目</a>

          </span>
          {visible && (
            <AddNameModal
              title="新建项目"
              visible={visible}
              onCancel={this.onHide}
              onOk={(value) => {
                this.onSubmitProject(value)
              }}
              ref={this.childRef}
              initValue={{}}
            />
          )}
        </div>
      </FormItem>
    )
  }
}

export default ProjectName
ProjectName.defaultProps = {
  required: true,
}
ProjectName.propTypes = {
  form: PropTypes.object.isRequired,
  formItemLayout: PropTypes.object.isRequired,
  required: PropTypes.bool,
}
