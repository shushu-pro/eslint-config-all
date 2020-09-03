import React from 'react'
import { Modal } from 'antd'
function Modals ({ content, ...rest }) {
  return (
    <Modal
      maskClosable={false}
      {...rest}
    >
      {content}
    </Modal>
  )
}

export default Modals
