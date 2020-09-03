import React from 'react'
import { Modal, Table } from 'antd'
import styles from '@/components/BillCenter/RejectModal/index.less'

class ModalCard extends React.Component {
  handleCancel = (e) => {
    const { onHandleCancel } = this.props
    onHandleCancel(e)
  };

  render () {
    const {
      stateVisible, columns, data, footer = null, modalTitle, showHeader = true,
    } = this.props
    return (
      <div>
        <Modal
          className={styles.moadl}
          title={modalTitle}
          width="60%"
          footer={footer}
          onCancel={this.handleCancel}
          visible={stateVisible}
        >
          <Table dataSource={data} showHeader={showHeader} columns={columns} pagination={false} />
        </Modal>
      </div>
    )
  }
}

export default ModalCard
