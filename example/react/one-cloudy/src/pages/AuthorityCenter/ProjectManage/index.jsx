import React from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { connect } from 'dva';
import {
  Button, Modal, Icon, Spin
} from 'antd';
import { router } from 'umi';
import ProjectNameList from '@/components/AuthorityCenter/ProjectManage/ProjectNameList';
import Pagation from '@/components/Pagation';
import styles from './index.less';
import { hasAuth, OPER_AUTH } from './constant';

@connect(({ ACproject, loading, user }) => ({
  ...ACproject,
  roleList: user.roleList,
  loading: !!loading.effects['ACproject/ocprojectinfoList'],
}))


class ProjectManage extends React.Component {
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
    const { dispatch, } = this.props;
    const { page, limit } = params;
    dispatch({
      type: 'ACproject/ocprojectinfoList',
      payload: {
        page: page || this.pagationRef.state.current,
        limit: limit || this.pagationRef.state.pageSize,
        name: this.tableRef.state.objValue.projectName || undefined,
        deptName: this.tableRef.state.objValue.dtDeptName || undefined,
        chargeUserName: this.tableRef.state.objValue.projectLeader || undefined,
        contactusername: this.tableRef.state.objValue.contactusername || undefined,
      },
      callback: e => {
        if (e.code === 200) {
          this.setState({
            resData: e.resData
          });
        }
      }
    });
  }

  createProject = () => {
    // this.warning();
    router.push('/manage/operation-center/projectmanage/createproject');
  }

  warning = () => {
    Modal.warning({
      title: '当前部门下不可创建项目',
      content: '请先将本部门与DT平台的部门建立对应关系，才可以在部门下创建项目。所创建的项目将会自动同步至对应DT项目下的所有region下。',
    });
  }

  render() {
    const { resData } = this.state;
    const { loading, roleList } = this.props;
    const {
      list, totalCount, pageSize, currPage,
    } = resData;
    const wantedList = ['projectName', 'dtDeptName', 'projectLeader', 'membersusername', 'id'];
    // 权限控制
    const isAuth = hasAuth(roleList, OPER_AUTH);
    return (
      <PageHeaderWrapper title="项目管理">
        <div className={styles.pageIndex}>
          <Spin spinning={loading}>
            {isAuth && (<div style={{ textAlign: 'right' }}>
              <Button
                onClick={this.createProject}
                style={{ color: '#1890ff', borderColor: '#1890ff' }}
              >
                <Icon type="plus" style={{ color: '#1890ff' }} />新建项目
              </Button>
            </div>)}
            <ProjectNameList
              wantedList={wantedList}
              records={list}
              queryList={this.queryList}
              hasOperAuth={isAuth}
              onRef={ref => { this.tableRef = ref; }}
              resData={resData}
            />
            <Pagation
              onRef={ref => { this.pagationRef = ref; }}
              queryList={this.queryList}
              total={totalCount}
              pageSize={pageSize}
              current={currPage}
            />
          </Spin>
        </div>
      </PageHeaderWrapper>
    );
  }
}
export default ProjectManage;