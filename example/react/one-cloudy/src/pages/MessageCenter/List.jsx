import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Table, Card } from 'antd'
import moment from 'moment'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import MessageDetailModal from '@/components/MessageCenter/MessageDetailModal'
import styles from './List.less'

const mapStateToProps = ({ messageCenter }) => ({
  messageList: messageCenter.messageList,
  messageDetail: messageCenter.messageDetail,
  generatorContent: messageCenter.generatorContent,
  page: messageCenter.page,
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
  setPage (payload) {
    return dispatch({
      type: 'messageCenter/setter',
      payload,
    })
  },
})
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class MessageList extends PureComponent {
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

  refresh = () => {
    this.getData()
  };

  getData = () => {
    const { getMessageList } = this.props
    getMessageList()
  };

  checkMessage = (record) => {
    this.setState({
      showDetail: true,
      detailId: record.stateflowId,
      commit: record.commit,
    })
  };

  closeModal = () => {
    const { getMessageListSimple } = this.props
    const { commit } = this.state
    this.setState({
      showDetail: false,
    })
    if (!commit) {
      // 详情关闭之后未读的消息变已读，需要刷新列表,header上的数据也要刷新
      this.refresh()
      getMessageListSimple()
    }
  };

  render () {
    const { showDetail, detailId } = this.state
    const { messageList, generatorContent, setPage } = this.props
    const { list = [], totalCount, pageSize, currPage } = messageList
    const columns = [
      {
        title: '',
        dataIndex: 'commit',
        key: 'commit',
        width: 80,
        render: (text) => (text ? null : <span className={styles.new}>new</span>),
      },
      {
        title: '消息',
        dataIndex: 'message',
        key: 'message',
        render: (text, record) => (
          <a onClick={() => this.checkMessage(record)}>{generatorContent(record)}</a>
        ),
      },
      {
        title: '接收时间',
        dataIndex: 'createdDate',
        key: 'createdDate',
        width: 300,
        render: (text) => <span>{text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : '-'}</span>,
      },
    ]
    return (
      <PageHeaderWrapper title="消息中心">
        <Card bordered={false}>
          <Table
            rowKey={(record) => record.stateflowId + record.id}
            columns={columns}
            dataSource={list}
            pagination={
              totalCount <= pageSize
                ? false
                : {
                  pageSize: pageSize || 10,
                  total: totalCount,
                  current: currPage || 1,
                  // showSizeChanger: false,
                  onChange: (pageIndex) => {
                    setPage({ page: pageIndex })
                    this.getData()
                  },
                }
            }
          />
        </Card>
        <MessageDetailModal
          id={detailId}
          visible={showDetail}
          onOk={this.closeModal}
          onCancel={this.closeModal}
        />
      </PageHeaderWrapper>
    )
  }
}

export default MessageList
