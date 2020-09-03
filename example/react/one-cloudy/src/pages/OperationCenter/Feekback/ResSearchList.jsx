import React from 'react'
import { Form, Select } from 'antd'
import { connect } from 'dva'

const { Option } = Select
const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 10,
  },
}
@Form.create()
@connect(({ operationOrder }) => ({
  deptProjectList: operationOrder.deptProjectList,
}))
class SearchList extends React.PureComponent {
  state = {
    projectList: [],
  };

  onChangeDeptId = (dtDeptId) => {
    const { options } = this.props
    const data = options.find((item) => item.dtDeptId === dtDeptId)
    this.setState({
      dtDeptId,
      projectList: data ? data.dtProjects : [],
      dtProId: undefined,
    })
  };

  onChangeProjectId = (dtProId) => {
    const { queryList } = this.props
    const { dtDeptId } = this.state
    this.setState({
      dtProId,
    })
    dtProId && queryList({ deptId: dtDeptId, projectId: dtProId })
  };

  render () {
    const { options } = this.props
    const { projectList, dtProId } = this.state
    return (
      <Form>
        <Form.Item label="部门" {...formItemLayout}>
          <Select
            placeholder="请选择部门"
            style={{ width: 200 }}
            onChange={this.onChangeDeptId}
            allowClear
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {options.map((item) => (
              <Option key={item.dtDeptId} value={item.dtDeptId}>
                {item.dtDeptName}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="项目" {...formItemLayout}>
          <Select
            value={dtProId}
            placeholder="请选择项目"
            style={{ width: 200 }}
            onChange={this.onChangeProjectId}
            allowClear
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {projectList.length > 0 &&
              projectList.map((item) => (
                <Option key={item.dtProId} value={item.dtProId}>
                  {item.dtProjectName}
                </Option>
              ))}
          </Select>
        </Form.Item>
      </Form>
    )
  }
}

export default SearchList
