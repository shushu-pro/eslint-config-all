import React from 'react'
import { connect } from 'dva'
import { Form, Button } from 'antd'
import router from 'umi/router'
import ApplyInfoDetail from '@/components/OperationCenter/ApplyInfoDetail'

@connect(({ resourceApply, user }) => ({
  resourceList: resourceApply.resourceList,
  baseInfo: resourceApply.baseInfo,
  userList: user.userList,
}))
class ConfirmInfo extends React.PureComponent {
  // 上一步
  onPrevStep = () => {
    router.push('/manage/operation-center/resource-apply/resourcesInfo')
  };

  // 提交
  onNextStep = () => {
    const { resourceList, baseInfo, dispatch } = this.props
    dispatch({
      type: 'resourceApply/submitApply',
      payload: {
        baseInfo,
        resourceList,
      },
    })
  };

  render () {
    const {
      resourceList, baseInfo, userList, location,
    } = this.props
    if (!Array.isArray(userList)) {
      window.location.href = window.location.href.replace('confirmInfo', 'baseInfo')
    }
    return (
      <Form layout="horizontal">
        <ApplyInfoDetail resourceList={resourceList} baseInfo={baseInfo} location={location} />
        <Form.Item style={{ marginBottom: 8 }} label="">
          <Button onClick={this.onPrevStep}>上一步</Button>
          <Button style={{ marginLeft: 8 }} type="primary" onClick={this.onNextStep}>
            下一步
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

export default ConfirmInfo
