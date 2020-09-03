import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { router } from 'umi';
import { Card } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import InstanceTable from '@/components/BillCenter/InstanceTable';
import ProjectInfo from './ProjectInfo';
import LeftTitle from '@/components/OperationCenter/LeftTitle';
import { DEPT_PRO_MAP } from '../breadcrumbConstant';
import { SEAERCH_FILED_MAP, SEAERCH_FILED_MAP_TEXT } from '../constant';

const searchList = [
  {
    key: SEAERCH_FILED_MAP.INSTANCE_NAME,
    value: SEAERCH_FILED_MAP_TEXT[SEAERCH_FILED_MAP.INSTANCE_NAME],
  },
  {
    key: SEAERCH_FILED_MAP.INSTANCE_ID,
    value: SEAERCH_FILED_MAP_TEXT[SEAERCH_FILED_MAP.INSTANCE_ID],
  },
  {
    key: SEAERCH_FILED_MAP.PRODUCT_NAME,
    value: SEAERCH_FILED_MAP_TEXT[SEAERCH_FILED_MAP.PRODUCT_NAME],
  },
];

@connect(({ billCenter, loading }) => ({
  ...billCenter,
  loading: !!loading.effects['billCenter/queryProjectList'],
}))
class ProjectIndex extends PureComponent {
  constructor(props) {
    super(props);
    const { match } = props;
    const { projectName } = match.params;
    this.state = {
      projectName,
    };
  }

  componentDidMount() {
    this.queryList();
  }

  queryList = params => {
    const { dispatch, match } = this.props;
    const { departmentId, projectId, billNo } = match.params;
    this.setState({
      ...params,
    });
    dispatch({
      type: 'billCenter/queryProjectList',
      payload: {
        departmentId,
        projectId,
        billNo,
        ...params,
      },
    });
  };

  queryProjectListExport = () => {
    const { dispatch, match } = this.props;
    const { departmentId, projectId, billNo } = match.params;
    dispatch({
      type: 'billCenter/queryProjectListExport',
      payload: {
        ...this.state,
        departmentId,
        projectId,
        billNo,
      },
    });
  };

  render() {
    const { match, location, loading, projectResource = {} } = this.props;
    const { projectName } = this.state;
    const { billNo, seqno, department, departmentId, unitId } = match.params;
    const { pathname } = location;
    const pathnameSplit = pathname.split('/');
    let goBackUrl = `/manage/bill-center/myBill/details/${billNo}/${seqno}/${departmentId}`;
    if (pathnameSplit[3] === 'list') {
      goBackUrl = `/manage/bill-center/list/department/${billNo}/${seqno}/${departmentId}/${department}/detail`;
    }
    if (unitId === '2') {
      goBackUrl = `/manage/bill-center/list/department/${billNo}/${seqno}/${departmentId}/${department}/detail/${unitId}`;
    }

    const propsData = {
      optionList: searchList,
      loading,
      tableData: projectResource,
      queryList: this.queryList,
      onExport: this.queryProjectListExport,
    };
    return (
      <PageHeaderWrapper
        title={projectName}
        breadcrumbList={DEPT_PRO_MAP(match.params)}
        goBack={() => router.push(goBackUrl)}
      >
        <Card bordered={false}>
          <LeftTitle title="项目信息" icon="icontab-zhangdanxiangqing">
            <ProjectInfo {...this.props} />
          </LeftTitle>
          <LeftTitle title="项目账单信息" icon="icontab-zhangdanxiangqing" noDivider />
          <InstanceTable {...propsData} />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ProjectIndex;
