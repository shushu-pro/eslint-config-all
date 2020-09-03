import React from 'react';
import { connect } from 'dva';
import {
  Form, Select, Input, TreeSelect, Spin
} from 'antd';
import { withRouter } from 'umi';
import Upload from '@/components/AuthorityCenter/ProjectManage/Upload';
import styles from './index.less';

const { Option } = Select;
const { TextArea } = Input;
const formItemLayout = {
  labelCol: {
    span: 3,
  },
  labelAlign: 'left',
  wrapperCol: {
    span: 21,
  },
};
@connect(({ user, ACproject, loading }) => ({
  userInfo: user.userInfo,
  ...ACproject,
  loading: !!loading.effects['ACproject/ocprojectinfoUpdate']
   || !!loading.effects['ACproject/ocprojectinfoSave'] || !!loading.effects['ACproject/ocprojectinfoInfo'],
}))
@withRouter
class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      optionData: [],
      userData: [],
      initValue: {},
    };
    const { location } = this.props;
    const { id } = location.query;
    this.id = id;
  }

  componentDidMount() {
    this.getOptionData();
    this.getAlluserlist();
    this.id && this.getDetailInfo();
  }

  // 获取OC部门列表
  getOptionData = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'ACdepartment/getOcDeptTree',
      payload: {},
      callback: e => {
        if (e.successful) {
          const { list } = e.resData;
          const optionData = this.changeOcDeptTree(list);
          this.setState({
            optionData
          });
        }
      }
    });
  }

  // 获取用户列表信息
  getAlluserlist = () => {
    const { dispatch, userInfo } = this.props;
    dispatch({
      type: 'ACproject/alluserlist',
      payload: {
        userId: userInfo.userId
      },
      callback: e => {
        if (e.code === 200) {
          const { resData } = e;
          const userData = this.changeUserData(resData);
          this.setState({
            userData
          });
        }
      }
    });
  }

  // 将数组的字段名转换成组件需要的字段名
  changeOcDeptTree = list => {
    list && list.map(item => {
      item.title = item.deptName;
      item.key = item.deptId;
      item.value = item.deptId;
      item.children = item.childDeptList && this.changeOcDeptTree(item.childDeptList);
    });
    return list;
  }

  changeUserData = list => {
    list && list.map(item => {
      item.label = item.username;
      item.key = item.userId;
      item.value = item.userId;
    });
    return list;
  }


  // 获取项目详情信息
  getDetailInfo = () => {
    const { dispatch, } = this.props;
    dispatch({
      type: 'ACproject/ocprojectinfoInfo',
      payload: {
        projectId: this.id,
      },
      callback: e => {
        if (e.code === 200) {
          this.setState({
            initValue: e.resData,
          });
        }
      }
    });
  }

  render() {
    const {
      loading, form, deptId
    } = this.props;
    const { optionData, userData, initValue } = this.state;
    const { getFieldDecorator } = form;
    return (<Spin spinning={loading}>
      <Form className={styles.createProject}>
        <Form.Item key="name" {...formItemLayout} label="项目名称">
          {getFieldDecorator('name', {
            initialValue: initValue ? initValue.name : '',
            rules: [{ required: true, message: '项目名称!' }],
          })(
            <Input placeholder="请输入项目名称" />
          )}
        </Form.Item>

        <Form.Item key="deptId" {...formItemLayout} label="所属部门">
          {getFieldDecorator('deptId', {
            initialValue: (initValue && initValue.deptId) || deptId || '',
            rules: [{ required: true, message: '所属部门!' }],
          })(
            <TreeSelect
              style={{ width: 200 }}
              disabled={!!deptId}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeData={optionData}
              placeholder="请选择所属部门"
              treeDefaultExpandAll
              showSearch
              filterTreeNode={
              (inputValue, node) => inputValue && node.props.title.includes(inputValue)
            }
            />
          )}
        </Form.Item>

        <Form.Item key="chargeUserIds" {...formItemLayout} label="项目负责人">
          {getFieldDecorator('chargeUserIds', {
            initialValue: initValue ? initValue.chargeUserIds : '',
            rules: [{ required: true, message: '项目负责人!' }],
          })(
            <Select
              showSearch
              mode="multiple"
              style={{ width: 200 }}
              placeholder="请选择项目负责人"
              optionFilterProp="children"
              dropdownClassName="chargeUserIds"
            >
              {userData.length > 0
              && userData.map(item => (
                <Option key={item.userId} value={item.userId}>
                  {item.deptName}-{item.fullname}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item key="safeUserIds" {...formItemLayout} label="安全负责人">
          {getFieldDecorator('safeUserIds', {
            initialValue: initValue ? initValue.safeUserIds : '',
          })(
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="请选择安全负责人"
              mode="multiple"
              optionFilterProp="children"
              dropdownClassName="safeUserIds"
            >
              {userData.length > 0
              && userData.map(item => (
                <Option key={item.userId} value={item.userId}>
                  {item.deptName}-{item.fullname}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item key="membersUserIds" {...formItemLayout} label="项目成员">
          {getFieldDecorator('membersUserIds', {
            initialValue: initValue ? initValue.membersUserIds : '',
          })(
            <Select
              showSearch
              style={{ width: 400 }}
              placeholder="请选择项目成员"
              optionFilterProp="children"
              mode="multiple"
              dropdownClassName="membersUserIds"
            >
              {userData.length > 0
              && userData.map(item => (
                <Option key={item.userId} value={item.userId}>
                  {item.deptName}-{item.fullname}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>

        <Form.Item key="description" {...formItemLayout} label="项目描述">
          {getFieldDecorator('description', {
            initialValue: initValue ? initValue.description : '',
            rules: [{ required: true, message: '项目描述!' }],
          })(
            <TextArea
              rows={4}
              placeholder="请输入项目描述"
              style={{ width: 400 }}
            />
          )}
        </Form.Item>
        <Form.Item key="bidCompany" {...formItemLayout} label="中标公司">
          {getFieldDecorator('bidCompany', {
            initialValue: initValue ? initValue.bidCompany : '',
          })(
            <Input placeholder="请输入中标公司" />
          )}
        </Form.Item>

        <Upload
          label="项目附件"
          id="attachFileLinks"
          initialValue={initValue.attachFileLinks || []}
          form={form}
          formItemLayout={formItemLayout}
          maxLen={5}
          isEdit={this.id}
        />

      </Form>
    </Spin>);
  }
}

export default Project;