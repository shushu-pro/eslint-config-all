import React from 'react'
import { connect } from 'dva'
import { Card, Button } from 'antd'
import StackPanel from '@/components/Common/StackPanel'
import FooterComfire from '@/components/Common/FooterComfire'
import ResourceDetail from '@/components/OperationCenter/ResDetail'
import ResProjectInfo from '@/components/OperationCenter/ResProjectInfo'
import SmsAuthenModal from '@/components/SmsAuthen'
import DescriptionModal from '@/components/descriptionModal'
import styles from './index.less'

@connect(({ resourceApply, user }) => ({
  unitId: user.unitId,
  selectedProjectInfo: resourceApply.selectedProjectInfo,
  projectInfo: resourceApply.projectInfo,
  previewData: resourceApply.previewData,
  isRead: resourceApply.isRead,
}))
class Result extends React.PureComponent {
  state = {
    sending: false,
  };

  onRef = (ref) => {
    this.child = ref
  }

  // 验证短信内容，提交表单
  smsOnSubmit = () => {
    this.child.onShow()
  }

  onSubmit = () => {
    this.setState({
      sending: true,
    })
    const { onNextStep, dispatch, location } = this.props
    dispatch({
      type: 'resourceApply/submitApply',
      payload: {
        applyType: 'batch',
      },
    })
      .then((res) => {
        location.getChildrenMsg(this, res.applyId)
        onNextStep()
      })
      .finally(() => {
        this.setState({
          sending: false,
        })
      })
  };

  render () {
    const { sending } = this.state
    const {
      onPrevStep, selectedProjectInfo, previewData, projectInfo, unitId, isRead,
    } = this.props
    const productDetailList = previewData.map((item) => `${item.resourceName}1个`)
    const smsContent = `【浙江省政务一朵云】您的验证码：$code$，有效时间为15分钟。此次申请的实例明细：${productDetailList.join('，')}。千万不要把验证码告诉别人哦。`
    const data = {
      resourceUsers: selectedProjectInfo.resourceUser,
      projectDetail: {
        ...selectedProjectInfo.commonInfo,
        ...projectInfo,
      },
      resourceItems: previewData,
      attachFileLinks: selectedProjectInfo.attachFileLinks, // 附件
    }
    const propsData = {
      baseInfo: data.projectDetail,
      formItemLayout: {
        labelCol: {
          span: 5,
        },
        wrapperCol: {
          span: 19,
        },
      },
      unitId,
      style: {
        padding: '0px 45px',
      },
    }
    return (
      <Card bordered={false}>
        <ResProjectInfo {...propsData} />
        <ResourceDetail data={data} />
        <FooterComfire>
          <StackPanel>
            <StackPanel.RightAlice>
              <div className={styles.footerToolbar}>
                <DescriptionModal />
                <Button onClick={onPrevStep}>上一步</Button>
                <Button onClick={this.smsOnSubmit} loading={sending} type="primary" disabled={!isRead}>
                  提交
                </Button>
              </div>
            </StackPanel.RightAlice>
          </StackPanel>
        </FooterComfire>
        <SmsAuthenModal
          onRef={this.onRef}
          smsContent={smsContent}
          action={this.onSubmit}
        />
      </Card>
    )
  }
}

export default Result
