// 编辑部门
import React from 'react';
import { connect } from 'dva';
import {
  Modal, Alert, Input, message
} from 'antd';
// import styles from './index.less';

@connect(({ ACdepartment, loading }) => ({
  ...ACdepartment,
  loading: !!loading.effects['ACdepartment/updateOcDept'],
}))

class EditDepartName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: (props.itemData && props.itemData.deptName) || '',
    };
  }

  handleOk = () => {
    const { searchValue, } = this.state;
    const {
      itemData, dispatch, getOcDeptTree, setOCdeptName, OCdepartmentId
    } = this.props;

    if (!searchValue) {
      message.error('请输入部门名称');
      return;
    }

    dispatch({
      type: 'ACdepartment/updateOcDept',
      payload: {
        ocDeptId: itemData.deptId,
        ocDeptName: searchValue
      },
      callback: (e) => {
        if (e.successful) {
          const { isSuccess } = e.resData;
          if (isSuccess) {
            message.success('修改成功');
            this.handleCancel();
            getOcDeptTree && getOcDeptTree();
            // 如果修改的当前选中的部门名称，修改匹配DT部门弹出框中的OC部门名称
            if (itemData.deptId === OCdepartmentId) {
              setOCdeptName && setOCdeptName(searchValue);
            }
          } else {
            message.error('修改失败');
          }
        }
      }
    });
  }

  handleCancel = () => {
    const { onEdit } = this.props;
    onEdit && onEdit();
  }

  onChangeInput = (e) => {
    const { value } = e.target;
    this.setState({
      searchValue: value
    });
  }

  render() {
    const { searchValue } = this.state;
    const { visible } = this.props;
    return (
      <Modal
        title="编辑部门"
        visible={visible}
        width="700px"
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        destroyOnClose
      >
        <div>
          <Alert
            showIcon
            message="目前仅支持编辑部门名称。更改一朵云部门名称，不会影响DT的对应部门名称。"
            type="info"
            style={{ margin: '0 0 24px' }}
          />
          部门名称：<Input placeholder="请输入部门名称" onChange={this.onChangeInput} value={searchValue} />
        </div>
      </Modal>
    );
  }
}
export default EditDepartName;