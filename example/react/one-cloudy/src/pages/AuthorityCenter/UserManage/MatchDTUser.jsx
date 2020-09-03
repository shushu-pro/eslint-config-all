
// 项目管理-匹配DT项目
import React from 'react';
import { connect } from 'dva';
import {
  Modal, Button, Select, message, Spin
} from 'antd';
import AccountNameList from '@/components/AuthorityCenter/UserManage/AccountNameList';
import Pagation from '@/components/Pagation';
import { swicthData } from '../constant';
import styles from './index.less';

const { Option } = Select;

@connect(({ ACuser, loading }) => ({
  ...ACuser,
  loading: !!loading.effects['ACuser/getDtUserList'] || !!loading.effects['ACuser/getDtRegion'] || !!loading.effects['ACuser/createSysMapping'],
}))

class MatchDTUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maskOpacity: false,
      regionList: [],
      deptList: [],
      resData: {},
      newDisabled: false,
    };
  }

  componentDidMount() {
    this.getDtRegion();
  }

  getDtRegion = () => {
    const { dispatch, recordData } = this.props;
    dispatch({
      type: 'ACuser/getDtRegion',
      payload: {
        ocDeptId: recordData.deptId
      },
      callback: (e) => {
        if (e.code === 200) {
          if (e.resData.length) {
            const { resData } = e;
            const regionList = [];
            resData.length && resData.forEach((item) => {
              regionList.push({
                label: item.cloudName,
                value: item.cloud,
              });
            });

            this.setState({
              regionAndDeptList: e.resData, // 所有云区及其下级部门的列表
              regionList, // 云区列表，用于下拉框展示
              regionId: (regionList && regionList.length && regionList[0].value) || '',
            }, () => {
              if (regionList.length) {
                this.matchRegionAndDept(regionList[0].value);
              }
            });
          } else {
            this.setState({
              newDisabled: true
            });
            message.error('该用户所在部门尚未关联DT部门，请先关联');
          }
        }
      }
    });
  }

  matchRegionAndDept = (str) => {
    const { regionAndDeptList } = this.state;
    regionAndDeptList.forEach((item) => {
      if (item.cloud === str) {
        const cloudDeptId = (item.deptList && item.deptList.length && item.deptList[0].cloudDeptId) || '';
        this.setState({
          regionId: str,
          deptList: item.deptList,
          cloudDeptId
        }, () => {
          this.queryList();
        });
      }
    });
  }

  queryList = (params = {}) => {
    const { dispatch, recordData } = this.props;
    const { cloudDeptId, regionId, deptList } = this.state;
    const { page, limit } = params;

    dispatch({
      type: 'ACuser/getDtUserList',
      payload: {
        cloudDepartmentId: cloudDeptId,
        ocUserId: recordData.userId,
        cloud: regionId,
        cloudRegion: deptList[0] && deptList[0].cloudRegion,
        curPage: page || this.pagationRef.state.current || undefined,
        limit: limit || this.pagationRef.state.pageSize || undefined,
        cloudUserName: this.tableRef.state.objValue.username || undefined,
        cloudFullName: this.tableRef.state.objValue.fullname || undefined,
        mobile: this.tableRef.state.objValue.mobile || undefined,
        email: this.tableRef.state.objValue.email || undefined,
      },
      callback: (e) => {
        if (e.successful) {
          const { resData } = e;
          this.setState({
            resData,
            newDisabled: resData.mappingDtUser && resData.mappingDtUser
          });
        }
      }
    });
  }

  handleOk = () => {
    const { resData, maskOpacity } = this.state;
    const { mappingDtUser } = resData;
    const { checkedStatus, } = this.tableRef.state;
    const { userId, cloudDepartmentId } = this.tableRef.state.checkRecord;
    if (maskOpacity) {
      this.createDtUserByOcInfo();
    } else {
      // 有匹配用户时，先取消选中，然后选中
      if (mappingDtUser && (checkedStatus === '1')) {
        this.handleCancel();
        return;
      }

      // 没有匹配用户时，先选中，然后取消选中
      if (!mappingDtUser && (checkedStatus === '0')) {
        this.handleCancel();
        return;
      }
      // userId和cloudDepartmentId不存在时，表示用户进入匹配页面后没做任何操作，点击确认不发请求
      if (!userId && !cloudDepartmentId) {
        this.handleCancel();
        return;
      }
      this.createSysMapping();
    }
  }

  createSysMapping = () => {
    const { dispatch, recordData } = this.props;
    const { cloudDeptId, deptList } = this.state;

    let index;

    deptList.forEach((item, i) => {
      if (item.cloudDeptId === cloudDeptId) {
        index = i.toString();
      }
    });
    dispatch({
      type: 'ACuser/createSysMapping',
      payload: {
        userId: recordData.userId,
        cloudUserId: this.tableRef.state.checkRecord.userId || '',
        cloudDeptId: this.tableRef.state.checkRecord.cloudDepartmentId || '',
        cloud: (index && deptList[index].cloud) || undefined,
        cloudRegion: (index && deptList[index].cloudRegion) || undefined,
      },
      callback: (e) => {
        if (e.successful) {
          message.success(e.resData);
          this.handleCancel();
        }
      }
    });
  }

  createDtUserByOcInfo = () => {
    const { dispatch, recordData } = this.props;
    const { cloudDeptId, deptList } = this.state;
    let index;
    deptList.forEach((item, i) => {
      if (item.cloudDeptId === cloudDeptId) {
        index = i.toString();
      }
    });
    dispatch({
      type: 'ACuser/createDtUserByOcInfo',
      payload: {
        ocUserId: recordData.userId,
        cloudDeptId,
        cloud: (index && deptList[index].cloud) || undefined,
        cloudRegion: (index && deptList[index].cloudRegion) || undefined,
      },
      callback: (e) => {
        if (e.successful) {
          message.success(e.resData);
          this.handleCancel();
        }
      }
    });
  }

  handleCancel = () => {
    const { onMatch } = this.props;
    onMatch && onMatch();
  }

  onChangeCheck = (value) => {
    this.setState({
      cloudDeptId: value
    }, () => {
      this.queryList();
    });
  }

  createAndMatch = () => {
    const { maskOpacity, regionId, cloudDeptId } = this.state;
    if (!regionId || !cloudDeptId) {
      message.warn('请选择DT部门及云区');
    } else {
      this.setState({
        maskOpacity: !maskOpacity
      });
    }
  }

  render() {
    const {
      maskOpacity, regionList, deptList, regionId, cloudDeptId, resData, newDisabled
    } = this.state;
    const { visible, loading } = this.props;

    const { pageData = {}, mappingDtUser } = resData;
    const {
      current, records, total, size
    } = pageData;

    const wantedList = ['username', 'fullname', 'mobile', 'email', '匹配'];
    return (
      <Modal
        title="匹配DT用户"
        width="1200px"
        visible={visible}
        onCancel={this.handleCancel}
        footer={[
          <Button onClick={this.handleCancel}>
            取消
          </Button>,
          <Button type="primary" disabled={loading} onClick={this.handleOk}>
            确定
          </Button>,
        ]}
        destroyOnClose
        maskClosable={false}
        className={styles.matchDTUser}
      >
        <Spin spinning={loading}>
          <div className={styles.matchName}>
            请选择匹配的DT用户
          </div>
          <div className={styles.matcSelect}>
            <Select value={regionId} style={{ width: 240 }} onChange={this.matchRegionAndDept} placeholder="请选择DT云区" disabled={maskOpacity}>
              {
                regionList.length && regionList.map(item => (
                  <Option value={item.value} key={item.value}>{item.label}</Option>))
              }
            </Select>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }} className={styles.matcSelect}>
            <Select value={cloudDeptId} style={{ width: 240 }} onChange={this.onChangeCheck} placeholder="请选择DT部门" disabled={maskOpacity}>
              {
                deptList.length && deptList.map(item => (
                  <Option
                    value={item.cloudDeptId}
                    key={item.cloudDeptId}
                  >{item.cloudDeptName}
                  </Option>))
              }
            </Select>
            <Button
              disabled={newDisabled}
              onClick={this.createAndMatch}
              style={newDisabled ? {} : {
                border: '1px solid #1890ff',
                color: maskOpacity ? '#fff' : '#1890ff',
                background: maskOpacity ? '#1890ff' : '#fff'
              }}
            >
              在该部门下新建账号并匹配
            </Button>
          </div>
          <div className={styles.table}>
            {
              maskOpacity ? <div className={styles.mask}>11</div> : null
            }
            <AccountNameList
              wantedList={wantedList}
              records={swicthData(records)}
              onRef={(ref) => { this.tableRef = ref; }}
              matchUser
              style={{ opacity: maskOpacity ? '0.5' : '1' }}
              queryList={this.queryList}
              cloudDeptId={cloudDeptId}
              mappingDtUser={mappingDtUser}
            />
            <Pagation
              onRef={(ref) => { this.pagationRef = ref; }}
              queryList={this.queryList}
              total={total}
              pageSize={size}
              style={{ opacity: maskOpacity ? '0.5' : '1' }}
              current={current}
            />
          </div>
        </Spin>
      </Modal>
    );
  }
}
export default MatchDTUser;