/**
 * 项目关联申请单 - 页面组件
 * 包含： 项目信息和该项目关联的所有申请单
 */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import OrderList from '@/components/OperationCenter/OrderList';
import LeftTitle from '@/components/OperationCenter/LeftTitle';
import ResProjectInfo from '@/components/OperationCenter/ResProjectInfo';

const mapDispatchToProps = dispatch => ({
  queryInfo(payload) {
    return dispatch({
      type: 'projectManage/queryInfo',
      payload,
    });
  },
  queryOrderList(payload) {
    return dispatch({
      type: 'operationOrder/queryOrderList',
      payload,
    });
  }
});

@connect(({ user, operationOrder }) => ({
  unitId: user.unitId,
  detailInfo: operationOrder.detailInfo,
}), mapDispatchToProps)
class ProjectDetail extends PureComponent {
  state={
    proData: {},
    projectId: '',
  }

  componentDidMount() {
    this.queryInfo();
  }

  // 查询详情
  queryInfo = payload => {
    const {
      queryInfo, projectId, detailInfo, queryOrderList
    } = this.props;
    const proId = projectId || detailInfo.projectDetail && detailInfo.projectDetail.projectId;
    queryInfo({
      ...payload,
      projectId: proId,
    }).then(res => {
      this.setState({
        proData: res,
        projectId: proId
      });
    });
    queryOrderList({
      pageNo: 1,
      pageSize: 10,
      projectId: proId,
    });
  }

  render() {
    const { unitId } = this.props;
    const { proData, projectId } = this.state;
    const threeFormItemLayout = {
      labelCol: {
        span: 5,
      },
      wrapperCol: {
        span: 19,
      },
    };
    const propsData = {
      baseInfo: proData,
      formItemLayout: threeFormItemLayout,
      unitId,
    };
    return (
      <>
        {proData && (
          <ResProjectInfo {...propsData} style={{ padding: '0 60px' }} />
        )}
        <>
          <LeftTitle title="申请单信息" noDivider icon="iconshenqingdan" />
          <OrderList projectId={projectId} />
        </>
      </>
    );
  }
}

export default ProjectDetail;
