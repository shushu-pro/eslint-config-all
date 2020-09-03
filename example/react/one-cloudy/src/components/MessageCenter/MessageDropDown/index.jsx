import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Link } from 'umi'
import moment from 'moment'
import { Badge, Popover, Icon } from 'antd'
import MessageDetailModal from '../MessageDetailModal'
import styles from './index.less'

const mapStateToProps = ({ messageCenter }) => ({
  messageListSimple: messageCenter.messageListSimple,
  generatorContent: messageCenter.generatorContent,
})
const mapDispatchToProps = (dispatch) => ({
  getMessageList (payload) {
    return dispatch({
      type: 'messageCenter/getMessageList',
      payload,
    })
  },
  getMessageListSimple () {
    const payload = {
      getType: 'simple',
    }
    return dispatch({
      type: 'messageCenter/getMessageList',
      payload,
    })
  },
})
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class MessageDropDown extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      showDetail: false,
      detailId: null,
    }
  }

  componentDidMount () {
    this.getData()
  }

  getData = () => {
    const { getMessageListSimple } = this.props
    getMessageListSimple()
  };

  checkMessage = (record) => {
    this.setState({
      visible: false,
      showDetail: true,
      detailId: record.stateflowId,
      commit: record.commit,
    })
  };

  closeModal = () => {
    const { getMessageList } = this.props
    const { commit } = this.state
    this.setState({
      showDetail: false,
    })
    // 详情关闭之后未读的消息变已读，需要刷新列表
    if (!commit) {
      // 详情关闭之后未读的消息变已读，需要刷新列表,header上的数据也要刷新
      this.getData()
      getMessageList()
    }
  };

  onClickChange = (visible) => {
    this.setState({
      visible,
    })
  };

  onHidePopover = () => {
    this.setState({
      visible: false,
    })
  };

  render () {
    const { showDetail, detailId, visible } = this.state
    const { messageListSimple, generatorContent } = this.props
    if (!messageListSimple) {
      return null
    }
    const { list = [], unReadCount } = messageListSimple
    const content = (
      <div className={styles.messageList}>
        {list.length > 0 ? (
          <>
            <ul>
              {list.map((o) => (
                <li key={o.stateflowId + o.id} onClick={() => this.checkMessage(o)}>
                  <p>
                    {!o.commit && <Badge dot />}
                    {moment(o.createdDate).format('YYYY-MM-DD HH:mm:ss')}
                  </p>
                  {generatorContent(o)}
                </li>
              ))}
            </ul>
            <div className={styles.more}>
              <Link to="/manage/message-center" onClick={this.onHidePopover}>
                查看全部
                <Icon type="arrow-right" />
              </Link>
            </div>
          </>
        ) : (
          '暂无消息'
        )}
      </div>
    )
    return (
      <>
        <Popover
          placement="bottomRight"
          visible={visible}
          onVisibleChange={this.onClickChange}
          content={content}
          trigger="click"
        >
          <a className={styles.messageButton}>
            <Badge count={unReadCount > 99 ? '...' : unReadCount}>
              <Icon type="mail" />
            </Badge>
          </a>
        </Popover>
        <MessageDetailModal
          id={detailId}
          visible={showDetail}
          onOk={this.closeModal}
          onCancel={this.closeModal}
        />
      </>
    )
  }
}

export default MessageDropDown
