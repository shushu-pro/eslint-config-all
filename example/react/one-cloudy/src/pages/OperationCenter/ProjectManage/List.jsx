import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Input, Button, Card, Select } from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import StackPanel from '@/components/Common/StackPanel'
import TableList from './TableList'
import styles from './index.less'

const { Search } = Input
const { Option } = Select
// const {pathName} = '/manage/operation-center/projectManage/operateProject';
@connect(({ projectManage, user }) => ({
  deptlist: projectManage.deptlist,
  roleList: user.roleList,
}))
class OrderList extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {

    }
    this.queryList()
    props.dispatch({
      type: 'projectManage/queryDeptlist',
    })
    props.dispatch({
      type: 'projectManage/setter',
      payload: {
        pageNo: 1,
        pageSize: 10,
      },
    })
  }

  // 查询接口
  queryList = (params) => {
    const { dispatch } = this.props
    const { name, deptId } = this.state
    dispatch({
      type: 'projectManage/queryList',
      payload: {
        name,
        deptId,
        ...params,
      },
    })
  };

  // 查询详情
  queryInfo = (projectId) => {
    const { dispatch } = this.props
    return dispatch({
      type: 'projectManage/queryInfo',
      payload: {
        projectId,
      },
    })
  };

  // 查询部门
  onChange = (value) => {
    const { name } = this.state
    this.queryList({
      name,
      deptId: value,
      pageNo: 1,
    })
    this.setState({ deptId: value })
  };

  // 查询项目名称
  onSearch = (val) => {
    const { deptId } = this.state
    this.queryList({
      deptId,
      name: val,
      pageNo: 1,
    })
    this.setState({ name: val })
  };

  // 新增及编辑
  onShow = (record) => {
    const { history } = this.props
    if (record && record.projectId) {
      this.queryInfo(record.projectId).then((resData) => {
        history.push({
          pathname: '/manage/operation-center/projectManage/operateProject',
          state: { title: '编辑项目', initValue: resData },
        })
      })
      return
    }
    history.push({
      pathname: '/manage/operation-center/projectManage/operateProject',
      state: { title: '新建项目', initValue: {} },
    })
  };


  render () {
    const { deptlist, roleList } = this.props
    const hasApply = roleList.indexOf('resourceApply') > -1
    return (
      <PageHeaderWrapper title="项目管理">
        <Card bordered={false} className={styles.projectManage}>
          <StackPanel>
            <div>
              项目名称：
              <Search
                placeholder="请输入项目名称"
                style={{ width: 200 }}
                onSearch={this.onSearch}
              />
            </div>
            <div style={{ marginRight: 40 }}>
              部门：
              <Select
                style={{ width: 200 }}
                placeholder="请选择部门"
                optionFilterProp="children"
                onChange={this.onChange}
                allowClear
                showSearch
              >
                {deptlist &&
                  deptlist.map((item) => (
                    <Option key={item.deptId} value={item.deptId}>
                      {item.name}
                    </Option>
                  ))}
              </Select>
            </div>
            {hasApply && (
              <StackPanel.RightAlice>
                <Button
                  type="primary"
                  onClick={() => {
                    this.onShow()
                  }}
                >
                  新建项目
                </Button>
              </StackPanel.RightAlice>
            )}
          </StackPanel>
          <TableList onShow={this.onShow} queryInfo={this.queryInfo} queryList={this.queryList} />

        </Card>
      </PageHeaderWrapper>
    )
  }
}

export default OrderList
