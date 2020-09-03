import React from 'react'
import { Tooltip } from 'antd'
function AddTooltip ({ ...rest }) {
  const { children, text, placement } = rest
  return (
    <Tooltip placement={placement || 'topLeft'} title={text}>
      {children}
    </Tooltip>
  )
}

export default AddTooltip
