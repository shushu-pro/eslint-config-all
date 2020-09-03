import React from 'react';
import { connect } from 'dva';
import {
  Button, Modal, Icon, Spin
} from 'antd';
import { router } from 'umi';
import AccountNameList from '@/components/AuthorityCenter/UserManage/AccountNameList';
import Pagation from '@/components/Pagation';
// import styles from './index.less';

@connect(({ ACuser, loading }) => ({
  ...ACuser,
  loading: !!loading.effects['ACuser/getUserList'],
}))

class SystemUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resData: {}
    };
  }

  componentDidMount() {
    this.queryList();
  }

  queryList = (params = {}) => {
    const { dispatch } = this.props;
    const { page, limit } = params;
    const current = page || this.pagationRef.state.current;
    const pageSize = limit || this.pagationRef.state.pageSize;
    dispatch({
      type: 'ACuser/getUserList',
      payload: {
        page: current,
        limit: pageSize,
        username: this.tableRef.state.objValue.username || undefined,
        fullname: this.tableRef.state.objValue.fullname || undefined,
        ocDeptName: this.tableRef.state.objValue.ocDeptName || undefined,
        mobile: this.tableRef.state.objValue.mobile || undefined,
        email: this.tableRef.state.objValue.email || undefined,
        statusList: this.tableRef.state.filters.status || undefined,
      },
      callback: (e) => {
        if (e.successful) {
          const { resData } = e;
          this.pagationRef.setData && this.pagationRef.setData(current, pageSize);
          this.setState({
            resData
          });
        }
      }
    });
  }

  createUser = () => {
    // this.warning();
    router.push('/manage/authority-center/usermanage/createuser');
  }

  warning = () => {
    Modal.warning({
      title: '当前项目下不可创建用户',
      content: '请先将本项目与DT平台的项目建立对应关系，才可以在项目下创建用户。',
    });
  }

  render() {
    const { resData } = this.state;
    const { loading } = this.props;
    const {
      totalCount, pageSize, currPage, list
    } = resData;

    const wantedList = ['username', 'ocDeptName', 'fullname', 'mobile', 'email', 'roleList', 'status', 'id'];

    return (
      <div>
        <div style={{ textAlign: 'right' }}>
          {/* <span>切换至目录到视图</span> */}
          <Button
            onClick={this.createUser}
            style={{ color: '#1890ff', borderColor: '#1890ff' }}
          >
            <Icon type="plus" style={{ color: '#1890ff' }} />新建用户
          </Button>
        </div>
        <Spin spinning={loading}>
          <AccountNameList
            onRef={(ref) => { this.tableRef = ref; }}
            wantedList={wantedList}
            records={list}
            queryList={this.queryList}
            resData={resData}
          />
          <Pagation
            onRef={(ref) => { this.pagationRef = ref; }}
            queryList={this.queryList}
            total={totalCount}
            pageSize={pageSize}
            current={currPage}
          />
        </Spin>

      </div>
    );
  }
}
export default SystemUser;