import React, { PureComponent } from 'react';
import { Form, Tag } from 'antd';
import { connect } from 'dva';
import { baseFormItemLayout } from '../../../contants';
import styles from '../index.less';

@connect(({ billCenter }) => ({
  projectInfo: billCenter.projectInfo,
}))
class ProjectInfo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    const { projectId, regionId } = match.params;
    dispatch({
      type: 'billCenter/queryInfo',
      payload: {
        projectId,
        regionId,
      },
    }).then(result => {
      if (result) {
        this.setState({ projectInfo: result });
      }
    });
  }

  renderTag = data => {
    if (!data || !Array.isArray(data)) {
      return '-';
    }
    if (!data.length) {
      return '_';
    }
    // const list = data.split(',');
    return data.map(item => (
      <Tag key={item} color="blue">
        {item.deptName}-{item.userName}
      </Tag>
    ));
  };

  render() {
    const { projectInfo } = this.state;
    if (!projectInfo) {
      return null;
    }
    const infoData = [
      {
        key: 'deptName',
        label: '部门',
      },
      {
        key: 'name',
        label: '项目名称',
      },
      {
        key: 'description',
        label: '项目描述',
      },
    ];
    return (
      <div className={styles.projectInfo}>
        {projectInfo &&
          infoData.map(item => (
            <Form.Item {...baseFormItemLayout} label={item.label} key={item.key}>
              {projectInfo[item.key] || '-'}
            </Form.Item>
          ))}
        <Form.Item {...baseFormItemLayout} label="项目负责人">
          {this.renderTag(projectInfo.chargeUserInfoIds)}
        </Form.Item>
        <Form.Item {...baseFormItemLayout} label="项目联系人">
          {this.renderTag(projectInfo.contactUserInfoIds)}
        </Form.Item>
        <Form.Item {...baseFormItemLayout} label="解决方案">
          {projectInfo.attachFileLinks && projectInfo.attachFileLinks.length
            ? projectInfo.attachFileLinks.map(item => (
                <a key={item.ossurl} href={item.url} download={item.fileName}>
                  {item.fileName}
                </a>
              ))
            : '-'}
        </Form.Item>
      </div>
    );
  }
}

export default ProjectInfo;
