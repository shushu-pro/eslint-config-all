import React, { Component } from 'react'
import { connect } from 'dva'
import { withRouter, router } from 'umi'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import PageLoading from '@/components/PageLoading'
import QuotaTab from './QuotaTab'
import './style.less'

@connect(({ loading }) => ({
  loading: !!loading.effects['quotaManage/getSubDeptList'],
}))

@withRouter
class QuotaManage extends Component {
  static getDerivedStateFromProps (nextProps) {
    const { match } = nextProps
    return {
      activeKey: match.params.type,
    }
  }

  changeTabs = (activeKey) => {
    router.push(`./${activeKey}`)
    this.setState({ activeKey })
  };

  render () {
    const { activeKey } = this.state
    const { children, loading } = this.props
    return (
      <PageHeaderWrapper title="配额管理">
        <div className="quota" style={{ backgroundColor: '#fff', padding: '0 20px 20px' }}>
          {!loading ? <QuotaTab activeKey={activeKey} /> : <PageLoading />}
          {children}
        </div>
      </PageHeaderWrapper>
    )
  }
}

export default QuotaManage
