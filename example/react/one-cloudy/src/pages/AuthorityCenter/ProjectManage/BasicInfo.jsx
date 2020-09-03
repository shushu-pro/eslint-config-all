// 项目具体信息页面-基础信息
import React from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import FormItem from '@/components/Common/FormItem';
import StackPanel from '@/components/Common/StackPanel';


@connect(({ ACproject, loading }) => ({
  ...ACproject,
  loading: !!loading.effects['ACproject/ocprojectinfoInfo'],
}))

class BasicInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deptId: props.deptId,
      resData: {},
    };
  }

  componentDidMount() {
    const { deptId } = this.state;
    if (deptId) {
      this.getDetailInfo(deptId);
    }
    console.log(this.props);
    // this.getDetailInfo();
  }

  // 获取项目详情信息
  getDetailInfo = deptId => {
    const { dispatch, } = this.props;
    dispatch({
      type: 'ACproject/ocprojectinfoInfo',
      payload: {
        projectId: deptId,
      },
      callback: e => {
        if (e.code === 200) {
          const { resData } = e;
          this.setState({
            resData,
          });
        }
      }
    });
  }

  render() {
    const { resData } = this.state;
    const { loading, data } = this.props;
    const projectInfo = data || resData;
    const dataList = [
      {
        label: '项目名称',
        value: 'name',
      },
      {
        label: '部门',
        value: 'deptName',
      },
    ];
    const userData = [
      {
        label: '项目负责人',
        value: 'chargeUserInfoIds',
      },
      {
        label: '安全负责人',
        value: 'safeUserInfoIds',
      },
      {
        label: '项目成员',
        value: 'membersUserInfoIds',
      },
    ];

    const bidData = [
      {
        label: '中标公司',
        value: 'bidCompany',
      },
      {
        label: '项目描述',
        value: 'description',
      },
    ];

    return (
      <div style={{ paddingTop: 30, overflow: 'hidden' }}>
        <Spin spinning={loading}>
          {dataList.map(item => (
            <FormItem
              key={item.value}
              label={item.label}
              value={projectInfo[item.value] || '-'}
            />
          ))}
          {userData.map(items => (
            <FormItem
              key={items.value}
              label={items.label}
              value={projectInfo[items.value]
                && projectInfo[items.value].length && projectInfo[items.value].length > 0
                ? projectInfo[items.value].map(item => (
                  <StackPanel key={item.fullName}>
                    <div style={{ width: 200 }}>
                      {item.fullName}
                    </div>
                    {item.mobile && (
                      <div>
                        <i className="icon iconfont">&#xe64b;</i>
                        {item.mobile}
                      </div>
                    )}
                    {item.email && (
                      <div>
                        <i className="icon iconfont">&#xe65f;</i>
                        {item.email}
                      </div>
                    )}
                  </StackPanel>
                ))
                : '-'
              }
            />
          ))}
          {bidData.map(item => (
            <FormItem
              key={item.value}
              label={item.label}
              value={projectInfo[item.value] || '-'}
            />
          ))}
          {(
            <FormItem
              label="项目附件"
              value={
                projectInfo.attachFileLinks && projectInfo.attachFileLinks.length > 0
                  ? projectInfo.attachFileLinks.map(item => (
                    <a key={item.fileId} href={item.url} download={item.fileName}>
                      <i className="icon iconfont">&#xe64c;</i>
                      {item.fileName}
                    </a>
                  ))
                  : ''
              }
            />
          )}
        </Spin>
      </div>
    );
  }
}
export default BasicInfo;
