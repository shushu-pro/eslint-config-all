import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Icon, Spin } from 'antd';
import StackPanel from '@/components/Common/StackPanel';
import ProjectBillList from '@/components/BillCenter/Project/ProjectBillList';

@connect(({ billCenter, loading }) => ({
  ...billCenter,
  loading: !!loading.effects['billCenter/queryDeptMonthBillList'],
}))
class Resource extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.queryList();
    this.queryDeptMonthBillListExport();
  }

  queryList = params => {
    const { dispatch, match } = this.props;
    const { billNo, departmentId } = match.params;
    dispatch({
      type: 'billCenter/queryDeptMonthBillList',
      payload: {
        billNo,
        departmentId,
        ...params,
      },
    });
  };

  queryDeptMonthBillListExport = () => {
    const { dispatch, match } = this.props;
    const { billNo, departmentId } = match.params;
    dispatch({
      type: 'billCenter/queryDeptMonthBillListExport',
      payload: {
        billNo,
        departmentId,
      },
    });
  };

  render() {
    const { loading, match, deptProjectList = {}, deptProjectListUrl = {} } = this.props;
    return (
      <Spin spinning={loading}>
        <StackPanel>
          <StackPanel.RightAlice>
            <a
              href={deptProjectListUrl.url}
              download={deptProjectListUrl.fileName}
              style={{ marginTop: '20px' }}
            >
              <Icon type="download" style={{ marginRight: 8 }} />
              导出表格
            </a>
          </StackPanel.RightAlice>
        </StackPanel>
        <ProjectBillList
          pageData={deptProjectList}
          match={match}
          loading={loading}
          queryList={this.queryList}
        />
      </Spin>
    );
  }
}

export default Resource;
