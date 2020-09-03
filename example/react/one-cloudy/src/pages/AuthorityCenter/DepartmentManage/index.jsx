import React from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TreeSelect from '@/components/TreeSelect';
import SelectTabs from '@/components/SelectTabs';
import styles from './index.less';
import PlatformDocking from './PlatformDocking';
import Project from './Project';
import User from './User';
// import UserGroup from './UserGroup';


@connect(({ ACdepartment, loading }) => ({
  ...ACdepartment,
  loading: !!loading.effects['ACdepartment/getOcDeptTree'],
}))

class DepartmentManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectTabsRight: '-100%',
      treeData: []
    };
  }

  componentDidMount() {
    this.getOcDeptTree();
  }

  getOcDeptTree = () => {
    const { dispatch } = this.props;
    const { treeData } = this.state;
    dispatch({
      type: 'ACdepartment/getOcDeptTree',
      payload: {},
      callback: (e) => {
        if (e.successful) {
          const { list } = e.resData;
          const childrenTreeData = this.changeOcDeptTree(list);
          treeData.children = childrenTreeData;
          this.setState({
            treeData: childrenTreeData
          });
        }
      }
    });
  }

  // 将数组的字段名转换成组件需要的字段名
  changeOcDeptTree = (list) => {
    list && list.map((item) => {
      item.name = item.deptName;
      item.key = item.deptId;
      item.level = item.level;
      item.children = item.childDeptList && this.changeOcDeptTree(item.childDeptList);
    });
    return list;
  }

  showSelectTreeDepart = () => {
    this.setState({
      selectTabsRight: '0',
    });
  }

  closeSelectTreeDepart = () => {
    this.setState({
      selectTabsRight: '-100%',
    });
  }

  // 选择组织树后的回调函数
  getTheChosenTreeNode = (node) => {
    const key = node.selectedNodes.length && node.selectedNodes[0].key;

    let name = '';
    let parentDeptId = '';

    if (node.selectedNodes.length) {
      name = node.selectedNodes[0].props && node.selectedNodes[0].props.nodeName;
      parentDeptId = node.selectedNodes[0].props && node.selectedNodes[0].props.parentDeptId;
    }

    if (key) {
      this.setState({
        departmentId: key,
        deptName: name,
        parentDeptId,
      });
    }
  }

  // 关闭页面时，取消树的选中效果
  onResetSelectedKeys = () => {
    this.treeSelect && this.treeSelect.onResetSelectedKeys();
  }

  setOCdeptName = (name) => {
    this.setState({
      deptName: name,
    });
  }

  render() {
    const { loading } = this.props;
    const {
      selectTabsRight, treeData, departmentId, deptName, parentDeptId
    } = this.state;
    const OCdeptInfo = {
      OCdepartmentId: departmentId,
      OCdeptName: deptName,
      parentDeptId,
    };
    const tabList = [
      {
        id: '平台对接',
        name: '平台对接',
        component: <PlatformDocking {...OCdeptInfo} />
      },
      {
        id: '项目',
        name: '项目',
        component: <Project {...OCdeptInfo} />
      },
      {
        id: '用户',
        name: '用户',
        component: <User {...OCdeptInfo} />
      },
      // {
      //     id:'用户组',
      //     name:'用户组',
      //     component:<UserGroup OCdepartmentId={departmentId} />
      // },
    ];

    const selectTabsStyles = {
      width: '70%',
      right: selectTabsRight,
    };

    return (
      <PageHeaderWrapper title="部门组织管理">
        <div className={styles.pageIndex}>
          <Spin spinning={loading}>
            <TreeSelect
              onRef={(ref) => { this.treeSelect = ref; }}
              showSelectTreeDepart={this.showSelectTreeDepart}
              haveMenu
              haveRoot
              treeData={treeData}
              getTheChosenTreeNode={this.getTheChosenTreeNode}
              closeSelectTreeDepart={this.closeSelectTreeDepart}
              getOcDeptTree={this.getOcDeptTree}
              treeStyles={{ height: '700px' }}
              // 下面2项用于保证匹配DT部门页面左上的OC部门名字和修改组织树后的名字相同
              setOCdeptName={this.setOCdeptName}
              {...OCdeptInfo}
            />
          </Spin>
          <SelectTabs
            list={tabList}
            selectTabsStyles={selectTabsStyles}
            closeSelectTreeDepart={this.closeSelectTreeDepart}
            departmentId={departmentId}
            onResetSelectedKeys={this.onResetSelectedKeys}
          />
        </div>
      </PageHeaderWrapper>
    );
  }
}
export default DepartmentManage;