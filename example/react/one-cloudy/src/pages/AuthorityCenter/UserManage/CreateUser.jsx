// 项目管理页面-创建新项目
import React from 'react';
import { connect } from 'dva';
import {
  Alert, Form, Button, Input, Switch, TreeSelect, message
} from 'antd';
import { router } from 'umi';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import FooterComfire from '@/components/Common/FooterComfire';
import StackPanel from '@/components/Common/StackPanel';
import { USER_PATH } from '../breadcrumbConstant';
import styles from './index.less';

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  labelAlign: 'right',
  wrapperCol: {
    span: 18,
  },
};

@connect(({ ACuser, loading }) => ({
  ...ACuser,
  loading: !!loading.effects['ACuser/addUser'],
}))

class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      optionData: [],
    };
  }

  componentDidMount() {
    this.getOptionData();
  }

  // 获取OC部门列表
  getOptionData = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'ACdepartment/getOcDeptTree',
      payload: {},
      callback: (e) => {
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

  // 将数组的字段名转换成组件需要的字段名
  changeOcDeptTree = (list) => {
    list && list.map((item) => {
      item.title = item.deptName;
      item.key = item.deptId;
      item.value = item.deptId;
      item.children = item.childDeptList && this.changeOcDeptTree(item.childDeptList);
    });
    return list;
  }

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      return callback(new Error('两次输入密码不一致!'));
    } else {
      return callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    const confirmPassword = form.getFieldValue('confirmPassword');
    if (confirmPassword) {
      form.validateFields(['confirmPassword'], { force: true });
      return callback();
    }
    return callback();
  };

  commonRuleMobile = (rule, value, callback) => {
    const mobile = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (value && !mobile.test(value)) {
      return callback(new Error('请输入正确的格式'));
    }
    return callback();
  };

  commonRuleEmail = (rule, value, callback) => {
    const email = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
    if (value && !email.test(value)) {
      return callback(new Error('请输入正确的格式'));
    }
    return callback();
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { form, dispatch } = this.props;

    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      values.temporaryPassword = values.temporaryPassword ? '1' : '0';
      dispatch({
        type: 'ACuser/addUser',
        payload: {
          ...values
        },
        callback: (ev) => {
          if (ev.successful) {
            message.success('新增成功！');
            router.goBack();
          }
        }
      });
    });
  }

  onPrev = () => {
    router.goBack();
  }

  render() {
    const { form, } = this.props;
    const { getFieldDecorator } = form;
    const { optionData, } = this.state;

    return (
      <PageHeaderWrapper title="新建用户" breadcrumbList={[USER_PATH]}>
        <div className={styles.pageIndex}>
          <Alert
            message="新建用户仅新建在一朵云平台，或当该用户加入项目或申请资源时，系统将自动匹配或同步至DT平台用户。"
            type="info"
            showIcon
          />
          <Form className={styles.createUser}>

            <div className={styles.createUserRow}>
              <Form.Item key="username" {...formItemLayout} label="用户名称" className={styles.createUserForm}>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: '用户名称!' }],
                })(
                  <Input />
                )}
              </Form.Item>
              <div className={styles.createUserTips}>
                由中文、字母、数字、下划线组成，以大小写字母和中文开头，1-64个字符
              </div>
            </div>

            <div className={styles.createUserRow}>
              <Form.Item key="password" {...formItemLayout} label="登录密码" className={styles.createUserForm}>
                {getFieldDecorator('password', {
                  rules: [
                    { required: true, message: '登录密码!' },
                    {
                      validator: this.validateToNextPassword,
                    }
                  ],
                })(
                  <Input />
                )}
              </Form.Item>
              <div className={styles.createUserTips}>
                支持6-64字符，由
              </div>
            </div>

            <div className={styles.createUserRow}>
              <Form.Item key="confirmPassword" {...formItemLayout} label="密码确认" className={styles.createUserForm}>
                {getFieldDecorator('confirmPassword', {
                  rules: [
                    { required: true, message: '密码确认!' },
                    {
                      validator: this.compareToFirstPassword,
                    }
                  ],
                })(
                  <Input />
                )}
              </Form.Item>
              <div className={styles.createUserTips}>
                请再次输入密码，并保持一致
              </div>
            </div>

            <div className={styles.createUserRow}>
              <Form.Item key="temporaryPassword" {...formItemLayout} label="临时密码" className={styles.createUserForm}>
                {getFieldDecorator('temporaryPassword', {
                  initialValue: true,
                  rules: [{ required: true, message: '临时密码!' }],
                })(
                  <Switch defaultChecked />
                )}
              </Form.Item>
              <div className={styles.createUserTips}>
                如果启用，用户在下次登录时须更改密码
              </div>
            </div>

            <div className={styles.createUserRow}>
              <Form.Item key="fullname" {...formItemLayout} label="显示名" className={styles.createUserForm}>
                {getFieldDecorator('fullname', {
                  rules: [{ required: true, message: '显示名!' }],
                })(
                  <Input />
                )}
              </Form.Item>
              <div className={styles.createUserTips}>
                在一朵云平台及跳转平台系统中显示的姓名，由XXXX组成
              </div>
            </div>

            <div className={styles.createUserRow}>
              <Form.Item key="mobile" {...formItemLayout} label="联系方式" className={styles.createUserForm}>
                {getFieldDecorator('mobile', {
                  rules: [
                    { required: true, message: '联系方式!' },
                    {
                      validator: this.commonRuleMobile,
                    }
                  ],
                })(
                  <Input />
                )}
              </Form.Item>
              <div className={styles.createUserTips}>
                资源申请验证、钉钉认证、消息通知等情况下需要，请如实填写
              </div>
            </div>

            <div className={styles.createUserRow}>
              <Form.Item key="email" {...formItemLayout} label="邮件地址" className={styles.createUserForm}>
                {getFieldDecorator('email', {
                  rules: [
                    { required: true, message: '邮件地址!' },
                    {
                      validator: this.commonRuleEmail,
                    }
                  ],
                })(
                  <Input />
                )}
              </Form.Item>
              <div className={styles.createUserTips}>
                资源反馈、消息通知等情况下需要，请如实填写
              </div>
            </div>

            <div className={styles.createUserRow}>
              <Form.Item key="deptId" {...formItemLayout} label="所属部门" className={styles.createUserForm}>
                {getFieldDecorator('deptId', {
                  rules: [{ required: true, message: '所属部门!' }],
                })(
                  <TreeSelect
                    style={{ width: '100%' }}
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
            </div>

          </Form>
        </div>
        <FooterComfire>
          <StackPanel>
            <StackPanel.RightAlice>
              <div className={styles.footerToolbar}>
                <Button key="cancel" onClick={this.onPrev}>取消</Button>
                <Button type="primary" onClick={this.handleSubmit}>
                  创建
                </Button>
              </div>
            </StackPanel.RightAlice>
          </StackPanel>
        </FooterComfire>
      </PageHeaderWrapper>
    );
  }
}
export default Form.create()(CreateUser);