import React, { PureComponent } from 'react'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'

export default class StepForm extends PureComponent {
  render () {
    const { children } = this.props
    return <PageHeaderWrapper title="资源申请">{children}</PageHeaderWrapper>
  }
}
