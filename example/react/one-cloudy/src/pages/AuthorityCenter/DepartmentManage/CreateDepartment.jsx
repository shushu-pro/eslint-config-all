
// 新建部门
import React from 'react';
import { connect } from 'dva';
import {
  Modal, Input, Radio, message
} from 'antd';
import TreeAndDetail from './TreeAndDetail';
import styles from './index.less';

@connect(({ ACdepartment, loading }) => ({
  ...ACdepartment,
  loading: !!loading.effects['ACdepartment/saveOcDtDeptRelationFinance'],
}))

class CreateDepartment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      radioValue: 1,
      treeData: [],
      cloudid: '',
      levelRadioValue: 1, // 部门级别
      levelList: [
        {
          key: 1,
          value: 1,
          label: '省级',
          disabled: false,
        },
        {
          key: 2,
          value: 2,
          label: '市级',
          disabled: false,
        },
        {
          key: 3,
          value: 3,
          label: '县级',
          disabled: false,
        },
      ],
    };
  }

  componentDidMount() {
    this.getDtDeptTree();
    this.setLevelRadio();
  }

  setLevelRadio = () => {
    const { itemData } = this.props;
    // 此处通过粗暴的判断来进行处理，后续进行优化，isBranch = 1标记此级部门是否是科室，只能创建与自己同级的科室
    if (itemData.isBranch === 0) {
      if (itemData.orgType === 0 || itemData.orgType === 1) {
        this.setState({
          levelRadioValue: 1,
          levelList: [
            {
              key: 1,
              value: 1,
              label: '省级',
              disabled: false,
            },
            {
              key: 2,
              value: 2,
              label: '市级',
              disabled: false,
            },
            {
              key: 3,
              value: 3,
              label: '县级',
              disabled: false,
            },
          ],
        });
      } else if (itemData.orgType === 2) {
        this.setState({
          levelRadioValue: 2,
          levelList: [
            {
              key: 1,
              value: 1,
              label: '省级',
              disabled: true,
            },
            {
              key: 2,
              value: 2,
              label: '市级',
              disabled: false,
            },
            {
              key: 3,
              value: 3,
              label: '县级',
              disabled: false,
            },
          ],
        });
      } else if (itemData.orgType === 3) {
        this.setState({
          levelRadioValue: 3,
          levelList: [
            {
              key: 1,
              value: 1,
              label: '省级',
              disabled: true,
            },
            {
              key: 2,
              value: 2,
              label: '市级',
              disabled: true,
            },
            {
              key: 3,
              value: 3,
              label: '县级',
              disabled: false,
            },
          ],
        });
      } else if (itemData.orgType === 0) {
        this.setState({
          levelRadioValue: 0,
          levelList: [
            {
              key: 1,
              value: 1,
              label: '省级',
              disabled: false,
            },
            {
              key: 2,
              value: 2,
              label: '市级',
              disabled: false,
            },
            {
              key: 3,
              value: 3,
              label: '县级',
              disabled: false,
            },
          ],
        });
      }
    } else if (itemData.isBranch === 1) {
      if (itemData.orgType === 1) {
        this.setState({
          levelRadioValue: 1,
          levelList: [
            {
              key: 1,
              value: 1,
              label: '省级',
              disabled: false,
            },
            {
              key: 2,
              value: 2,
              label: '市级',
              disabled: true,
            },
            {
              key: 3,
              value: 3,
              label: '县级',
              disabled: true,
            },
          ],
        });
      } else if (itemData.orgType === 2) {
        this.setState({
          levelRadioValue: 2,
          levelList: [
            {
              key: 1,
              value: 1,
              label: '省级',
              disabled: true,
            },
            {
              key: 2,
              value: 2,
              label: '市级',
              disabled: false,
            },
            {
              key: 3,
              value: 3,
              label: '县级',
              disabled: true,
            },
          ],
        });
      } else if (itemData.orgType === 3) {
        this.setState({
          levelRadioValue: 3,
          levelList: [
            {
              key: 1,
              value: 1,
              label: '省级',
              disabled: true,
            },
            {
              key: 2,
              value: 2,
              label: '市级',
              disabled: true,
            },
            {
              key: 3,
              value: 3,
              label: '县级',
              disabled: false,
            },
          ],
        });
      }
    }
  }

  handleOk = () => {
    const { dispatch, itemData, getOcDeptTree } = this.props;
    const {
      inputValue, radioValue, cloudid, levelRadioValue
    } = this.state;
    if (!inputValue) {
      message.error('请输入部门名称');
      return;
    }
    if (!levelRadioValue) {
      message.error('请选择部门级别');
      return;
    }
    const bindDtDeptList = [];
    const bindFinanceList = [];

    // flag：判断每一项的财务主体是否都已选择
    let flag = true;

    if (radioValue === 2) {
      const list = this.treeAndDetailRef.state.newAddList;
      list.forEach(item => {
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
    }
    if (!flag) {
      message.error('请选择财务主体');
      return;
    }
    dispatch({
      type: 'ACdepartment/saveOcDtDeptRelationFinance',
      payload: {
        ocDeptName: inputValue,
        ocParentDeptId: itemData.deptId,
        cloud: radioValue === 2 ? cloudid : '0',
        bindDtDeptList: radioValue === 2 ? bindDtDeptList : undefined,
        bindFinanceList: radioValue === 2 ? bindFinanceList : undefined,
        orgType: levelRadioValue,
      },
      callback: e => {
        if (e.successful) {
          const { isSuccess } = e.resData;
          if (isSuccess) {
            message.success('新增成功');
            getOcDeptTree && getOcDeptTree();
            this.handleCancel();
          } else {
            message.error('新增失败');
          }
        }
      }
    });
  }

  handleCancel = () => {
    const { onCreate } = this.props;
    onCreate && onCreate();
  }

  onChangeRadio = e => {
    this.setState({
      radioValue: e.target.value,
    });
  };

  onChangeLevel = e => {
    this.setState({
      levelRadioValue: e.target.value,
    });
  }

  changeInputValue = e => {
    const { value } = e.target;
    this.setState({
      inputValue: value
    });
  }

  getDtDeptTree = cloudid => {
    const { dispatch, itemData } = this.props;

    dispatch({
      type: 'ACdepartment/getDtDeptTree',
      payload: {
        ocDeptId: itemData.deptId,
        cloud: cloudid || '1',
      },
      callback: e => {
        if (e.successful) {
          const { list } = e.resData;
          const treeData = this.changeOcDeptTree(list);
          this.setState({
            cloudid,
            treeData,
          });
        }
      }
    });
  }

  // 将列表参数转换成tree组件需要的参数格式
  changeOcDeptTree = list => {
    list && list.map(item => {
      item.name = item.cloudDeptName;
      item.key = item.cloudDeptId;
      item.level = item.deptLevel;
      item.children = item.childDeptList && this.changeOcDeptTree(item.childDeptList);
    });
    return list;
  }

  render() {
    const { visible, itemData } = this.props;
    const {
      radioValue, treeData, inputValue, levelList, levelRadioValue
    } = this.state;
    return (
      <Modal
        title="创建部门"
        width="1200px"
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        className={styles.createDept}
        destroyOnClose
      >
        <div className={styles.deptName}>
          <span>
            部门名称：
          </span>
          <Input placeholder="请输入" value={inputValue} onChange={this.changeInputValue} />
        </div>
        <div className={styles.deptName}>
          <span>
            部门级别：
          </span>
          <Radio.Group onChange={this.onChangeLevel} value={levelRadioValue}>
            {levelList.map(item => (
              <Radio.Button value={item.value} key={item.key} disabled={item.disabled}>{item.label}</Radio.Button>
            ))}
          </Radio.Group>
          <p className={styles.levelTips}>
            当在某级部门下新建一个同级组织时，会被认定为一个科室。如：某市级部门下新建一个市级组织，系统会认定该新建的部门为一个科室。当在某级部门下新建一个下级组织时，会被认定为一个部门。如：某市级部门下新建一个县级组织，系统会认定该新建的部门为一个部门。科室下只能新建科室，即科室部门下只能新建同级组织。如：某市级科室下新建组织，只能选择市级组织，无法再新建县级组织。
          </p>
        </div>
        <div className={styles.matchdept}>
          <span>
            匹配DT部门：
          </span>
          <Radio.Group onChange={this.onChangeRadio} value={radioValue}>
            <Radio value={1}>我先创建项目，后进行匹配</Radio>
            <Radio value={2}>我现在就要匹配DT项目</Radio>
          </Radio.Group>
        </div>
        {radioValue === 2
          ? <TreeAndDetail
            treeData={treeData}
            getDtDeptTree={this.getDtDeptTree}
            OCdepartmentId={itemData.deptId}
            onRef={ref => { this.treeAndDetailRef = ref; }}
          />
          : null
        }

      </Modal>
    );
  }
}
export default CreateDepartment;
