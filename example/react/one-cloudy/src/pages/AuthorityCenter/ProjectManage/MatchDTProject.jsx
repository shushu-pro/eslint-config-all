
// 项目管理-匹配DT项目
import React from 'react';
import { connect } from 'dva';
import {
  Modal, Alert, Select, Spin, message, Button
} from 'antd';
import ProjectNameList from '@/components/AuthorityCenter/ProjectManage/ProjectNameList';
import Pagation from '@/components/Pagation';
import styles from './index.less';

const { Option } = Select;

@connect(({ ACproject, loading }) => ({
  ...ACproject,
  loading: !!loading.effects['ACproject/deptList'] || !!loading.effects['ACproject/list'] || !!loading.effects['ACproject/match'],
}))
class MatchDepartment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      regionList: [],
      deptList: [],
      resData: {},
    };
  }

  componentDidMount() {
    this.getDeptList();
  }

  switchStr = (str) => {
    switch (str) {
      case 'cloud-public':
        return '互联网';
      case 'cloud-private':
        return '专有云-政务';
      case 'cloud-industry-pub':
        return '行业政法-政法';
      case 'cloud-industry-secu':
        return '公安';


      default:
        return '';
    }
  }

  getDeptList = () => {
    const { dispatch, recordData } = this.props;
    dispatch({
      type: 'ACproject/deptList',
      payload: {
        ocDeptId: recordData.deptId
      },
      callback: (e) => {
        if (e.code === 200) {
          const { data } = e;
          if (data.length) {
            const regionList = [];
            data.length && data.forEach((item) => {
              regionList.push({
                value: item.cloudRegion,
                label: this.switchStr(item.cloudRegion),
              });
            });

            this.setState({
              regionAndDeptList: e.data, // 所有云区及其下级部门的列表
              regionList, // 云区列表，用于下拉框展示
              regionId: (regionList && regionList.length && regionList[0].value) || '',
            }, () => {
              if (regionList.length) {
                this.matchRegionAndDept(regionList[0].value);
              }
            });
          } else {
            message.error('该项目所在部门尚未关联DT部门，请先关联');
          }
        }
      }
    });
  }

  matchRegionAndDept = (str) => {
    const { regionAndDeptList } = this.state;
    regionAndDeptList.forEach((item) => {
      if (item.cloudRegion === str) {
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
    const { regionId, cloudDeptId } = this.state;
    const { dispatch, recordData } = this.props;
    const { page, limit } = params;

    dispatch({
      type: 'ACproject/list',
      payload: {
        region: regionId,
        ocDeptId: recordData.deptId,
        ocProjectId: recordData.projectId,
        cloudDeptId,
        current: page || this.pagationRef.state.current || undefined,
        pageSize: limit || this.pagationRef.state.pageSize || undefined,
        projectLeader: this.tableRef.state.objValue.projectLeader || undefined,
        projectName: this.tableRef.state.objValue.projectName || undefined,
      },
      callback: (e) => {
        if (e.code === 200) {
          this.setState({
            resData: e.data.pageData,
            matchedDtProjects: e.data.matchedDtProjects,
          });
        }
      }
    });
  }

  handleOk = () => {
    const { matchedDtProjects } = this.state;
    const { checkedStatus, } = this.tableRef.state;
    const { cloudProjectId } = this.tableRef.state.checkRecord;

    // 有匹配用户时，先取消选中，然后选中
    if (matchedDtProjects.length && checkedStatus) {
      this.handleCancel();
      return;
    }

    // 没有匹配用户时，先选中，然后取消选中
    if (!matchedDtProjects.length && !checkedStatus) {
      this.handleCancel();
      return;
    }
    // cloudProjectId不存在时，表示用户进入匹配页面后没做任何操作，点击确认不发请求
    if (!cloudProjectId) {
      this.handleCancel();
      return;
    }
    this.createSysMapping();
  }

  createSysMapping = () => {
    const { dispatch, recordData } = this.props;
    const { cloudDeptId, regionId } = this.state;
    const { checkRecord, checkedStatus } = this.tableRef.state;

    dispatch({
      type: 'ACproject/match',
      payload: {
        ocProjectId: recordData.projectId,
        bindCloudProjectId: checkedStatus ? checkRecord.cloudProjectId : undefined, // 绑定项目
        unbindCloudProjectId: !checkedStatus ? checkRecord.cloudProjectId : undefined, // 解绑项目
        cloudDeptId,
        cloudRegion: regionId,
      },
      callback: (e) => {
        if (e.code === 200) {
          message.success('操作成功');
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

  render() {
    const {
      regionList, deptList, resData, regionId, cloudDeptId, matchedDtProjects
    } = this.state;
    const { visible, loading } = this.props;
    const {
      current, records, total, size
    } = resData;

    const wantedList = ['匹配', 'projectName', 'projectLeader', 'membersusername', 'ocProjectName'];

    return (
      <Modal
        title="匹配DT项目"
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
      >
        <Alert
          message={
            <>
              <div>1.建立匹配关系后，可以在一朵云平台查看到对应DT项目的历史申请单、资源实例等。一朵云平台资源申请时，也会在对应的DT项目下创建资源。</div>
              <div>
                2.建立匹配将会单方面同步人员信息，一朵云项目中的人员信息在DT项目不存在时，将会按照人员匹配逻辑进行自动匹配或创建；
                DT部门下的用户在一朵云平台不存在时，不会同步到一朵云平台项目下。
              </div>
            </>
          }
          type="info"
          showIcon
        />
        <Spin spinning={loading}>
          <div className={styles.matcSelect}>
            <Select value={regionId} style={{ width: 240 }} onChange={this.matchRegionAndDept} placeholder="请选择DT云区">
              {
                regionList.length && regionList.map(item => (
                  <Option value={item.value} key={item.value}>{item.label}</Option>))
              }
            </Select>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }} className={styles.matcSelect}>
            <Select value={cloudDeptId} style={{ width: 240 }} onChange={this.onChangeCheck} placeholder="请选择DT部门">
              {
                deptList.length && deptList.map(item => (
                  <Option
                    value={item.cloudDeptId}
                    key={item.cloudDeptId}
                  >{item.cloudDeptName}
                  </Option>))
              }
            </Select>
          </div>
          <ProjectNameList
            wantedList={wantedList}
            records={records}
            chooseMatchProject
            onRef={(ref) => { this.tableRef = ref; }}
            queryList={this.queryList}
            matchedDtProjects={matchedDtProjects}
            matchProject
          />
          <Pagation
            onRef={(ref) => { this.pagationRef = ref; }}
            queryList={this.queryList}
            total={total}
            pageSize={size}
            current={current}
          />
        </Spin>


      </Modal>
    );
  }
}
export default MatchDepartment;