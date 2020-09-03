// 项目模块
import React from 'react';
import { Icon, Spin } from 'antd';
import { connect } from 'dva';
import { router } from 'umi';
import ProjectNameList from '@/components/AuthorityCenter/ProjectManage/ProjectNameList';
import Pagation from '@/components/Pagation';
import { DEFAULT_COLOR } from '../constant';
import styles from './index.less';

@connect(({ ACproject, loading }) => ({
  ...ACproject,
  loading: !!loading.effects['ACproject/ocprojectinfoList'],
}))

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resData: {},
      ocDeptId: props.OCdepartmentId || '',
    };
  }

  componentDidMount() {
    this.getProjectList();
  }

  UNSAFE_componentWillReceiveProps(prevProps) {
    if (prevProps.OCdepartmentId !== this.props.OCdepartmentId) {
      this.setState({
        ocDeptId: prevProps.OCdepartmentId
      }, () => {
        this.getProjectList();
      });
    }
  }

  getProjectList = () => {
    const { ocDeptId } = this.state;
    const { dispatch, } = this.props;
    dispatch({
      type: 'ACproject/ocprojectinfoList',
      payload: {
        deptId: ocDeptId,
        page: this.pagationRef.state.current,
        limit: this.pagationRef.state.pageSize,
      },
      callback: (e) => {
        if (e.code === 200) {
          this.setState({
            resData: e.resData
          });
        }
      }
    });
  }

  render() {
    const { resData } = this.state;
    const { loading } = this.props;
    const {
      list, totalCount, pageSize, currPage,
    } = resData;

    const wantedList = ['projectName', 'projectLeader', 'description', 'id'];

    return (
      <div className={styles.selectTabs}>
        <Spin spinning={loading}>
          <div className={`${styles.tabTitle} ${styles.flexTitle}`}>
            <div>
              <Icon type="bars" style={{ color: DEFAULT_COLOR, marginRight: '6px' }} />
              <span>项目</span>
            </div>
            <div>
              <span onClick={() => { router.push('projectmanage'); }} style={{ cursor: 'pointer' }}>
                转到项目管理页面<Icon type="arrow-right" style={{ margin: '0 10px' }} />
              </span>
            </div>
          </div>
          <ProjectNameList
            wantedList={wantedList}
            records={list}
            noSearchIcon
          />
          <Pagation
            onRef={(ref) => { this.pagationRef = ref; }}
            queryList={this.getProjectList}
            total={totalCount}
            pageSize={pageSize}
            current={currPage}
          />

        </Spin>

      </div>
    );
  }
}
export default Project;