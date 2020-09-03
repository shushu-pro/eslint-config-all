import React, { Component } from 'react'
import { connect } from 'dva'
import { withRouter, router } from 'umi'
import { Tabs } from 'antd'
import './style.less'

const { TabPane } = Tabs
@connect(({ user, quotaManage }) => ({
  roleList: user.roleList,
  subDeptList: quotaManage.subDeptList,
}))

@withRouter
class QuotaTab extends Component {
  static getDerivedStateFromProps (nextProps) {
    const { match } = nextProps
    return {
      activeKey: match.params.type,
    }
  }

  constructor (props) {
    super(props)
    const {
      match, roleList, subDeptList,
    } = props
    // tab权限
    const checkList = [ 'gaManager', 'zwManager', 'zfManager', 'deptManager' ]
    const check = roleList.some((a) => checkList.some((b) => a === b))
    const checkDeptMa = [ 'deptManager' ]
    const hasDeptMa = roleList.some((a) => checkDeptMa.some((b) => a === b))
    const isDeptMa = hasDeptMa && subDeptList && subDeptList.length > 0
    // 查询是否有子部门
    this.state = {
      activeKey: match.params.type,
    }
    this.routeList = [
      { tab: '配额查看', path: 'check' },
    ]
    // 有我的申请或者我的审批权限，则把入口放开
    check &&
      this.routeList.push(
        { tab: '配额申请', path: 'applyList' },
      )
    ;(check || isDeptMa) &&
      this.routeList.push(
        { tab: '配额分配', path: 'distribute' },
      )
    ;(check || isDeptMa) &&
    this.routeList.push(
      { tab: '下级配额查看', path: 'subordinateDeptCheck' },
    )
  }

  changeTabs = (activeKey) => {
    router.push(`./${activeKey}`)
    this.setState({ activeKey })
  };

  render () {
    const { activeKey } = this.state
    const ifShowTabs = !!~this.routeList.findIndex((o) => o.path === activeKey) // 用于配额申请
    return (
      <Tabs activeKey={activeKey} onChange={this.changeTabs}>
        {ifShowTabs && (
          this.routeList.map((o) => (
            <TabPane tab={o.tab} key={o.path} />
          ))
        )}
      </Tabs>

    )
  }
}

export default QuotaTab
