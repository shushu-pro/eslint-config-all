import React, { useState, useEffect } from 'react'
import { connect } from 'dva'
import moment from 'moment'
import { Modal, Row, Col, Spin } from 'antd'
import styles from './index.less'

const mapStateToProps = ({ messageCenter }) => ({
  generatorContent: messageCenter.generatorContent,
})
const mapDispatchToProps = (dispatch) => ({
  getMessageDetail (payload) {
    return dispatch({
      type: 'messageCenter/getMessageDetail',
      payload,
    })
  },
})
function MessageDetailModal ({ id, visible, onOk, onCancel, getMessageDetail, generatorContent }) {
  const [ loading, setLoading ] = useState(false)
  const [ messageDetail, setMessageDetail ] = useState({})

  // 关闭浮层时把数据清空，防止下次点击没有返回数据显示上一条的数据
  useEffect(() => {
    if (!visible) {
      setMessageDetail({})
    }
  }, [ visible ])
  useEffect(() => {
    if (visible) {
      setLoading(true)
      getMessageDetail({ stateFlowId: id })
        .then(({ resData }) => {
          setMessageDetail(resData)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [ visible, id ])
  return (
    <Modal
      title="消息详情"
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      cancelButtonProps={{ style: { display: 'none' } }}
      className={styles.messageModal}
    >
      <Spin spinning={loading} delay={300}>
        {messageDetail.stateflowId ? (
          <>
            <Row>
              <Col span={3}>时间：</Col>
              <Col span={21}>{moment(messageDetail.createdDate).format('YYYY-MM-DD HH:mm:ss')}</Col>
            </Row>
            <Row>
              <Col span={3}>内容：</Col>
              <Col span={21}>{generatorContent(messageDetail)}</Col>
            </Row>
          </>
        ) : (
          <Row>
            <Col span={24}>{loading ? '加载中...' : '加载失败'}</Col>
          </Row>
        )}
      </Spin>
    </Modal>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MessageDetailModal)
