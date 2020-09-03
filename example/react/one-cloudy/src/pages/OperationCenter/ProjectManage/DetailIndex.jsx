/**
 * 项目详情
 */
import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Form, Spin, Card } from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import ProjectDetail from '../OperationOrder/ProjectDetail'

@Form.create()
@connect(({ loading }) => ({
  loading: loading.effects['projectManage/queryInfo'],
}))
class DetailsIndex extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { match, loading, location } = this.props
    const { projectName } = location.query
    const { orderId } = match.params
    return (
      <PageHeaderWrapper
        title={projectName}
        breadcrumbList={[ {
          title: '项目列表',
          href: '/manage/operation-center/projectManage/list',
        } ]}
      >
        <Spin spinning={loading}>
          <Card bordered={false}>
            <ProjectDetail
              match={match}
              projectId={orderId}
              backUrl={`/manage/operation-center/projectManage/details/${orderId}/detail?projectName=${projectName}`}
            />
          </Card>
        </Spin>
      </PageHeaderWrapper>
    )
  }
}

export default DetailsIndex
