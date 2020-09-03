import React from 'react'
import {
  Form,
  Select,
  TreeSelect,
  Tooltip,
  message,
} from 'antd'
import { connect } from 'dva'
import ResourceUsers from '@/components/OperationCenter/ApplyFrom/ResourceUsers'
import { Region2 } from '@/components/OperationCenter/Product/base'
import {
  PRODUCTNAME,
} from '../constant'
import styles from '../index.less'

const { Option } = Select
@connect(({ user, resourceApply }) => ({
  resourceUserList: user.userList,
  userInfo: user.userInfo,
  projectList: resourceApply.projectList,
}))
class TopInfo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      allList: [ '所属部门', '部署区域', '资源使用人', '项目' ],
      visibleList: [],
      deptId: null,
      wantedList: {
        [PRODUCTNAME.ANTIDDOS]: [ '所属部门', '部署区域', '资源使用人' ],
        [PRODUCTNAME.HSM]: [ '所属部门', '部署区域', '资源使用人' ],
        [PRODUCTNAME.SKYEYE]: [ '所属部门', '部署区域', '资源使用人' ],
        [PRODUCTNAME.DDOSIP]: [ '所属部门', '部署区域', '资源使用人' ],
      },
      allDeptList: [],
    }
  }

  componentDidMount () {
    const { wantedList, allList } = this.state
    const { productValue, form, dispatch } = this.props
    const visibleList = []
    allList.forEach((allItem, index) => {
      wantedList[productValue].forEach((item) => {
        if (allItem === item) {
          visibleList[index] = true
        }
      })
    })
    this.setState({
      visibleList,
    })
    this.queryAllDept()
    this.queryUserList()
    if (wantedList[productValue].indexOf('项目') > -1) {
      this.queryAllProjectList()
    }

    const { isEdit, recordDetail } = this.props
    if (isEdit) {
      dispatch({
        type: 'resourceApply/queryRegion',
        payload: { productType: productValue, deptId: recordDetail && recordDetail.deptId },
      }).then(() => {
        form.setFieldsValue({
          areaId: recordDetail.areaId,
          regionId: recordDetail.regionId,
        })
      })
    }
  }

  // 获取所有的部门
  queryAllDept = async () => {
    const { dispatch } = this.props
    return dispatch({
      type: 'resourceInstance/queryCurrentDeptList',
      callback: (e) => {
        if (e.code === 200) {
          const { list = [] } = e.resData
          const treeData = this.changeOcDeptTree(list)
          this.setState({
            allDeptList: treeData,
          })
        } else {
          message.error(e.msg)
        }
      },
    })
  }

  changeOcDeptTree = (list) => {
    list && list.map((item) => {
      item.title = item.deptName
      item.key = item.deptId
      item.value = item.deptId
      item.children = item.childDeptList && this.changeOcDeptTree(item.childDeptList)
    })
    return list
  }

  // 获取部门下的资源使用人
  queryUserList = (payload) => {
    const { dispatch } = this.props
    return dispatch({
      type: 'user/queryUserList',
      payload,
    })
  };

  // 获取所有的项目
  queryAllProjectList = (payload) => {
    const { dispatch } = this.props
    return dispatch({
      type: 'resourceApply/queryAllProjectList',
      payload,
    })
  };

  dispatchRegion = (payload) => {
    const { dispatch } = this.props
    dispatch({
      type: 'resourceApply/queryRegion',
      payload,
    })
  }


  onChangeDept = (deptId) => {
    const { productValue } = this.props
    this.setState({
      deptId,
    })
    this.dispatchRegion({ productType: productValue, deptId })
  }

  render () {
    const { visibleList, allDeptList, deptId } = this.state
    const {
      form, formItemLayout, resourceUserList, userInfo, projectList, userList, recordDetail, isEdit, productValue,
    } = this.props
    const { getFieldDecorator } = form
    console.log('deptId formItemLayout', userInfo)
    return (
      <div className={styles.topInfo}>
        <Form.Item key="deptId" {...formItemLayout} label="所属部门">
          {getFieldDecorator('deptId', {
            initialValue: isEdit ? recordDetail.deptId : (userInfo && userInfo.deptId) || '',
            rules: [ { required: true, message: '所属部门!' } ],
          })(
            <TreeSelect
              style={{ width: 200 }}
              disabled={!!(userInfo && userInfo.deptId)}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeData={allDeptList}
              placeholder="请选择所属部门"
              treeDefaultExpandAll
              showSearch
              onChange={this.onChangeDept}
              filterTreeNode={
                (inputValue, node) => inputValue && node.props.title.includes(inputValue)
              }
            />,
          )}
        </Form.Item>
        {
          visibleList[1] ? (
            <div style={{ marginBottom: '10px' }} className={styles.regionInfo}>
              <Region2
                form={form}
                isEdit={isEdit}
                deptId={(recordDetail && recordDetail.deptId) || (userInfo && userInfo.deptId)}
                formItemLayout={formItemLayout}
                productType={productValue}
              />
            </div>
          ) : null
        }
        {
          visibleList[2] ? (
            <div className={styles.ResourceUsers}>
              <ResourceUsers
                form={form}
                formItemLayout={formItemLayout}
                initialValue={userList || []}
                userList={resourceUserList}
              />
            </div>
          ) : null
        }
        {
          visibleList[3] ? (
            <Form.Item key="projectId" {...formItemLayout} label="所属项目">
              {getFieldDecorator('projectId', {
                rules: [
                  { required: true, message: '所属项目!' },
                ],
              })(
                <Select
                  allowClear
                  showSearch
                  style={{ minWidth: '200px' }}
                  placeholder="请选择所属所属项目"
                >
                  {projectList && projectList.length > 0 &&
                    projectList.map((item) => (
                      <Option key={item.projectId} value={item.projectId}>
                        {item.name.length > 8 ? (
                          <Tooltip placement="topLeft" title={item.name}>
                            <div>{item.name}</div>
                          </Tooltip>
                        ) : item.name}
                      </Option>
                    ))}
                </Select>,
              )}
            </Form.Item>
          ) : null
        }
      </div>
    )
  }
}

export default Form.create()(TopInfo)
