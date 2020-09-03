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

  onChangeDeptId = (deptId) => {
    const { options } = this.props
    const data = options.find((item) => item.deptId === deptId)
    this.setState({
      deptId,
      projectList: data ? data.projectList : [],
      projectId: undefined,
    })
  };

  onChangeProjectId = (projectId) => {
    const { queryList } = this.props
    const { deptId } = this.state
    this.setState({
      projectId,
    })
    projectId && queryList({ deptId, projectId })
  };

  render () {
    const { options } = this.props
    const { projectList, projectId } = this.state
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
              <Option key={item.deptId} value={item.deptId}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="项目" {...formItemLayout}>
          <Select
            value={projectId}
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
                <Option key={item.projectId} value={item.projectId}>
                  {item.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
      </Form>
    )
  }
}

export default SearchList
