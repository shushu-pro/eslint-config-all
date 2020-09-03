/**
 * 基础信息
 */
import React from 'react'
import { connect } from 'dva'
import { withRouter } from 'umi'
import { Department } from '@/components/OperationCenter/ApplyFrom'
import { PRODUCT_FIELDS } from '@/components/OperationCenter/Product/base/_constant'
import { Upload } from '../components'

@connect(({ user, resourceApply, loading }) => ({
  userInfo: user.userInfo,
  selectedProjectInfo: resourceApply.selectedProjectInfo,
  loading: !!loading.effects['projectManage/queryInfo'],
}))
@withRouter
class RecoveryBaseInfo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      proData: undefined,
    }
  }

  componentDidMount () {
    this.onSetData(this.props, this.state)
  }

  UNSAFE_componentWillUpdate (nextProps, nextState) {
    this.onSetData(nextProps, nextState)
  }

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
    })
  };

  render () {
    const { form, formItemLayout, userInfo, selectedProjectInfo } = this.props
    const formProps = { form, formItemLayout }
    return (
      <>
        <Department
          {...formProps}
          style={{ width: '200px' }}
          disabled
          initialValue={userInfo.deptName}
          initKey={userInfo.deptId}
        />
        <Upload
          initialValue={selectedProjectInfo[PRODUCT_FIELDS.ATTACHMENT]}
          formProps={formProps}
        />
      </>
    )
  }
}

export default RecoveryBaseInfo
