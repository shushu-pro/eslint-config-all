
import React, { Component } from 'react'
import { Modal } from 'antd'
import { connect } from 'dva'
import resourceFlowchartPng from '@/assets/resourceFlowchart.png'
import zfFlowchartPng from '@/assets/zfFlowchart.png'
import styles from './index.less'

@connect(({ user }) => ({
  orgType: user.userInfo.orgType,
}))

class ResourceFlowchart extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }


  render () {
    const { isShow, onRest, orgType } = this.props
    const isCheck = orgType && orgType.toString() === '1'
    const flowChartPng = isCheck ? resourceFlowchartPng : zfFlowchartPng
    return (
      <Modal
        title="资源申请办事流程图"
        width={1080}
        visible={isShow}
        onCancel={onRest}
        footer={false}
        className={styles.resourceFlowchart}
      >
        <div>
          {isCheck && (
            <div className={styles.contentDIV}>
              <span>申请材料：《浙江省XXX项目方案》</span>
              <br />
              <span>方案内需要内容：政务云服务部署架构、拟申请资源测算依据、项目安全负责人</span>
            </div>
          )}
          <div className={styles.imgDIV}>
            <img src={flowChartPng} alt="流程图" height="1162px" width="777px" />
          </div>
        </div>
      </Modal>
    )
  }
}

export default ResourceFlowchart
