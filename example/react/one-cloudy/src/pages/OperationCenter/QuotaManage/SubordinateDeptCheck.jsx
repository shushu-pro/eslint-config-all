import React from 'react'
import Check from './Check'
import { QUOTA_TYPE } from './constant'

export default function Distribute () {
  return (
    <Check
      type={QUOTA_TYPE.SUBORDINATE_DEPT}
    />
  )
}
