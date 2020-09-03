
// 添加项目
import React from 'react';
import { connect } from 'dva';
import { Modal, message, Spin } from 'antd';
import AddItem from '@/components/AuthorityCenter/UserManage/AddItem';
import styles from './index.less';

@connect(({ ACuser, loading }) => ({
  ...ACuser,
  loading: !!loading.effects['ACuser/getProjectList'],
}))
class AddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      all: [],
    };
  }

  componentDidMount() {
    this.getProjectList();
  }

  getProjectList = () => {
    const { dispatch, id, ocDeptId } = this.props;
    dispatch({
      type: 'ACuser/getProjectList',
      payload: {
        userId: id,
        deptId: ocDeptId
      },
      callback: (e) => {
        if (e.successful) {
          const { resData } = e;
          if (resData.length) {
            resData.forEach((item) => {
              item.id = item.projectId;
              item.name = item.projectName;
            });
          }
          this.setState({
            all: resData,
          });
        }
      }
    });
  }

  handleOk = () => {
    const { all } = this.state;
    const projectIds = [];
    all.forEach((item) => {
      if (item.select) {
        projectIds.push(item.id);
      }
    });

    this.onClickExit(projectIds);
  }

  onClickExit = (list) => {
    const { dispatch, id, queryList } = this.props;
    dispatch({
      type: 'ACuser/addUserProject',
      payload: {
        userId: id,
        projectIds: list,
      },
      callback: (e) => {
        if (e.successful) {
          message.success(e.resData);
          this.handleCancel();
          queryList && queryList();
        }
      }
    });
  }

  handleCancel = () => {
    const { onClickAdd } = this.props;
    onClickAdd && onClickAdd();
  }

  // 切换对应项目的选中状态
  changeMatchProject = (item, checked) => {
    const { all } = this.state;

    all.forEach((listItem) => {
      if (item.id === listItem.id) {
        listItem.select = checked;
      }
    });

    this.setState({
      all: JSON.parse(JSON.stringify(all))
    });
  }

  // 显示右侧已选中的内容
  renderCheckedItem = () => {
    const { all } = this.state;

    if (all && all.length) {
      return all.filter(item => item.select).map(item => (
        <div key={item.id} className={styles.checkItem}>{item.name}</div>));
    }
    return '';
  }

  render() {
    const { visible, loading } = this.props;
    const { all } = this.state;
    return (
      <Modal
        title="添加项目"
        width="954px"
        bodyStyle={{ height: '700px' }}
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        destroyOnClose
        maskClosable={false}
      >
        <Spin spinning={loading}>
          <div className={styles.addModal}>
            <div className={styles.allProject}>
              <span className={styles.title}>
                所有项目:
                </span>
              <div className={styles.content}>
                <AddItem
                  placeholder="请输入项目名称搜索"
                  list={all}
                  changeMatchProject={this.changeMatchProject}
                />
              </div>
            </div>
            <div className={styles.joinedProject}>
              <span className={styles.title}>
                已加入的项目:
                </span>
              <div className={styles.content}>
                {this.renderCheckedItem()}
              </div>
            </div>
          </div>
        </Spin>


      </Modal>
    );
  }
}
export default AddModal;