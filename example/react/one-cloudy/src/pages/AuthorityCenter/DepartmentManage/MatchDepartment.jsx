
// 匹配DT部门
import React from 'react';
import { connect } from 'dva';
import { Modal, message } from 'antd';
import TreeAndDetail from './TreeAndDetail';
// import styles from './index.less';

@connect(({ ACdepartment, loading }) => ({
  ...ACdepartment,
  loading: !!loading.effects['ACdepartment/getDtDeptTree'],
}))

class MatchDepartment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cloudid: '1',
      treeData: [],
      chosenList: [],
      ocDeptList: [],
    };
  }

  componentDidMount() {
    this.getDtDeptTree();
  }

  getDtDeptTree = (cloudid) => {
    const { dispatch, OCdepartmentId } = this.props;
    const cloud = cloudid || '1';
    dispatch({
      type: 'ACdepartment/getDtDeptTree',
      payload: {
        ocDeptId: OCdepartmentId,
        cloud,
      },
      callback: (e) => {
        if (e.successful) {
          const { list, deptFinanceMappingList, ocDeptDtDeptMappingList } = e.resData;
          const treeData = this.changeOcDeptTree(list);
          const chosenList = this.changeOcDeptTree(deptFinanceMappingList);
          const ocDeptList = this.changeOcDeptTree(ocDeptDtDeptMappingList);
          this.setState({
            cloudid: cloud,
            treeData,
            chosenList,
            ocDeptList,
          });
        }
      }
    });
  }

  // 将列表参数转换成tree组件需要的参数格式
  changeOcDeptTree = (list) => {
    list && list.map((item) => {
      item.name = item.cloudDeptName;
      item.key = item.cloudDeptId;
      item.isChecked = item.isRelated;
      item.children = item.childDeptList && this.changeOcDeptTree(item.childDeptList);
    });
    return list;
  }

  handleOk = () => {
    const { cloudid, ocDeptList } = this.state;
    const {
      dispatch, OCdepartmentId, OCdeptName, parentDeptId, queryList
    } = this.props;
    const list = this.treeAndDetailRef.state.newAddList;

    const bindDtDeptList = [];
    const bindFinanceList = [];

    // flag：判断每一项的财务主体是否都已选择
    let flag = true;

    list.forEach((item) => {
      bindDtDeptList.push({
        cloud: item.cloud,
        cloudRegion: item.cloudRegion,
        cloudDeptId: item.cloudDeptId,
        cloudDeptName: item.cloudDeptName,
      });
      bindFinanceList.push({
        cloud: item.cloud,
        cloudRegion: item.cloudRegion,
        cloudDeptId: item.cloudDeptId,
        ocFinanceDepartmentId: item.ocFinanceDepartmentId,
      });
      if (!item.ocFinanceDepartmentId) {
        flag = false;
      }
    });

    if (!flag) {
      message.error('请选择财务主体');
      return;
    }

    // 右侧匹配的财务主体列表原本没有数据且用户没有选中任何一项时，直接关闭
    if (!ocDeptList.length && !bindDtDeptList.length) {
      this.handleCancel();
      return;
    }

    dispatch({
      type: 'ACdepartment/saveOcDtDeptRelationFinance',
      payload: {
        ocDeptId: OCdepartmentId,
        ocDeptName: OCdeptName,
        ocParentDeptId: parentDeptId,
        cloud: cloudid,
        bindDtDeptList,
        bindFinanceList,
      },
      callback: (e) => {
        if (e.successful) {
          message.success('操作成功');
          queryList && queryList();
          this.handleCancel();
        } else {
          message.error('操作失败');
        }
      }
    });
  }

  handleCancel = () => {
    const { changeMatchDepartmentVisible } = this.props;
    changeMatchDepartmentVisible && changeMatchDepartmentVisible();
  }

  render() {
    const { visible, OCdepartmentId, OCdeptName, } = this.props;
    const { treeData, chosenList, ocDeptList, } = this.state;
    return (
      <Modal
        title="匹配DT部门"
        width="1050px"
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        destroyOnClose
      >
        <div>
          一朵云部门名称：{OCdeptName}
        </div>
        <TreeAndDetail
          onRef={(ref) => { this.treeAndDetailRef = ref; }}
          treeData={treeData}
          chosenList={chosenList}
          OCdepartmentId={OCdepartmentId}
          getDtDeptTree={this.getDtDeptTree}
          ocDeptList={ocDeptList}
        />
      </Modal>
    );
  }
}
export default MatchDepartment;