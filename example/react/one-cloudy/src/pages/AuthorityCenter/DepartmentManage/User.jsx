// 用户模块
import React from 'react';
import { Icon, Spin } from 'antd';
import { connect } from 'dva';
import { router } from 'umi';
import AccountNameList from '@/components/AuthorityCenter/UserManage/AccountNameList';
import Pagation from '@/components/Pagation';
import { DEFAULT_COLOR } from '../constant';
import styles from './index.less';

@connect(({ ACdepartment, loading }) => ({
  ...ACdepartment,
  loading: !!loading.effects['ACdepartment/getOcDeptRelatedUserList'],
}))

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resData: {},
      ocDeptId: props.OCdepartmentId || '',
    };
  }

  componentDidMount() {
    this.getUserList();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.OCdepartmentId !== this.props.OCdepartmentId) {
      this.setState({
        ocDeptId: nextProps.OCdepartmentId
      }, () => {
        this.getUserList();
      });
    }
  }

  getUserList = () => {
    const { ocDeptId } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'ACdepartment/getOcDeptRelatedUserList',
      payload: {
        ocDeptId,
        current: this.pagationRef.state.current || undefined,
        size: this.pagationRef.state.pageSize || undefined,
        statusList: this.tableRef.state.filters.status || undefined,
      },
      callback: (e) => {
        if (e.code === 200) {
          this.setState({
            resData: e.resData,
          });
        }
      }
    });
  }

  render() {
    const { loading } = this.props;
    const { resData } = this.state;
    const {
      list, totalCount, pageSize, currPage
    } = resData;

    const wantedList = ['username', 'fullname', 'mobile', 'email', 'status'];

    return (
      <div className={styles.selectTabs}>
        <Spin spinning={loading}>
          <div className={`${styles.tabTitle} ${styles.flexTitle}`}>
            <div>
              <Icon type="bars" style={{ color: DEFAULT_COLOR, marginRight: '6px' }} />
              <span>用户</span>
            </div>
            <div>
              <span onClick={() => { router.push('usermanage'); }} style={{ cursor: 'pointer' }}>
                转到用户管理页面<Icon type="arrow-right" style={{ margin: '0 10px' }} />
              </span>
            </div>
          </div>
          <AccountNameList
            onRef={(ref) => { this.tableRef = ref; }}
            wantedList={wantedList}
            records={list}
            queryList={this.getUserList}
            noSearchIcon
          />
          <Pagation
            onRef={(ref) => { this.pagationRef = ref; }}
            queryList={this.getUserList}
            total={totalCount}
            pageSize={pageSize}
            current={currPage}
          />
        </Spin>


      </div>
    );
  }
}
export default User;