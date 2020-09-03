import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Checkbox, Modal, Button } from 'antd'
import styles from './index.less'

@connect(({ resourceApply }) => ({
  isRead: resourceApply.isRead,
}))
class DescriptionModal extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      visible: false, // modal窗口开关
      title: '', // modal标题
      protpcolData: '', // modal内容
    }
  }

  // checkbox勾选
  onChange=(e) => {
    const { dispatch } = this.props
    dispatch({
      type: 'resourceApply/readDocState',
      payload: {
        isRead: e.target.checked,
      },
    })
  }

  // 关闭窗口
  onRead = () => {
    this.setState({
      visible: false,
    })
  };

  // 显示窗口
  openModal = (e) => {
    const title = e.target.getAttribute('value')
    const paramKey = e.target.getAttribute('params')
    const { dispatch } = this.props
    dispatch({
      type: 'resourceApply/getDescription',
      payload: {
        paramKey,
      },
    }).then((res) => {
      this.setState({
        visible: true,
        title,
        protpcolData: res,
      })
    })
  };

  render () {
    const { visible, protpcolData, title } = this.state
    const { isRead, isText } = this.props
    return (
      <div className={styles.readDoc}>
        <div className={styles.descriptionBtn}>
          { !isText
            ? (
              <div>
                <Checkbox onChange={this.onChange} checked={isRead} />
                <span className={styles.readTitle}>
                  我已知晓并同意
                  <a
                    className={styles.document}
                    params="SAFETY_RESPONSIBILITY_DESC"
                    value="浙江省政务一朵云安全责任说明"
                    onClick={(e) => this.openModal(e)}
                  >
                    《浙江省政务一朵云安全责任说明》

                  </a>
                  与
                  <a
                    className={styles.document}
                    params="RESOURCE_USE_RESPONSIBILITY_DESC"
                    value="浙江省政务一朵云云资源使用责任说明"
                    onClick={(e) => this.openModal(e)}
                  >
                    《浙江省政务一朵云云资源使用责任说明》

                  </a>
                </span>
              </div>
            )
            : (
              <div className={styles.textInfo}>
                <span>当一个申请单中存在多类产品，请审批自己管理范围内的资源信息，其他类别的产品会依次流转到相应的负责人审批</span>
              </div>
            ) }
        </div>
        <Modal
          width={800}
          title={title}
          closable={false}
          visible={visible}
          onCancel={this.onHide}
          maskClosable={false}
          className={styles.modal}
          // eslint-disable-next-line react/jsx-boolean-value
          destroyOnClose={true}
          footer={(
            <Button type="primary" onClick={this.onRead}>
              我已知晓
            </Button>
          )}
        >
          <div dangerouslySetInnerHTML={{ __html: protpcolData }} />
        </Modal>
      </div>
    )
  }
}

export default connect()(DescriptionModal)
