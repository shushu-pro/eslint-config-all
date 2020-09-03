/**
 * 权限判断
 */

import React from 'react'
import Exception403 from '@/pages/Exception/403'

export const getPermissions = (currentPermissions, pathname) => (WrappedComponent) => {
  if (pathname === '/manage' || pathname === '/manage/home') {
    return WrappedComponent
  }
  if (!currentPermissions) {
    return <Exception403 />
  }
  return WrappedComponent
}
