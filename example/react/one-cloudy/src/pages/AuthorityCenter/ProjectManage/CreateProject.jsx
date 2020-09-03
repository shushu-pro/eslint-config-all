// 项目管理页面-创建新项目
import React from 'react';
import { connect } from 'dva';
import {
  Alert, Form, Button, message
} from 'antd';
import { router, withRouter } from 'umi';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import FooterComfire from '@/components/Common/FooterComfire';
import StackPanel from '@/components/Common/StackPanel';
import { PROJECT_PATH } from '../breadcrumbConstant';
import styles from './index.less';
import Project from './Project';


@connect(({ user, ACproject, loading }) => ({
  userInfo: user.userInfo,
  ...ACproject,
  loading: !!loading.effects['ACproject/ocprojectinfoUpdate']
   || !!loading.effects['ACproject/ocprojectinfoSave'] || !!loading.effects['ACproject/ocprojectinfoInfo'],
}))
@withRouter
class CreateProject extends React.Component {
  constructor(props) {
    super(props);
    const { location } = this.props;
    const { id } = location.query;
    this.id = id;
  }

  handleSubmit = e => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: this.id ? 'ACproject/ocprojectinfoUpdate' : 'ACproject/ocprojectinfoSave',
          payload: {
            ...values,
            projectId: this.id || undefined,
          },
          callback: ev => {
            if (ev.code === 200) {
              message.success(this.id ? '编辑成功' : '新增成功');
              router.goBack();
            }
          }
        });
      }
    });
  }

  onPrev = () => {
    router.goBack();
  }

  render() {
    const { form, loading } = this.props;
    return (
      <PageHeaderWrapper title={this.id ? '编辑项目' : '新建项目'} breadcrumbList={[PROJECT_PATH]}>
        <div className={styles.pageIndex}>
          <Alert
            message={
              <>
                <div>1.该项目创建为一朵云项目，如需与DT平台建立对应关系，请手动进行匹配</div>
                <div>
                  2.未与DT平台建立对应关系的项目，当以此申请资源时，系统会自动推送至对应的DT区域进行匹配：DT区域下具有同名项目的则自动建立匹配关系，无同名项目则会新建项目。
                </div>
              </>
            }
            type="info"
            showIcon
          />
          <Project form={form} loading={loading} thisId={this.id} />
        </div>
        <FooterComfire>
          <StackPanel>
            <StackPanel.RightAlice>
              <div className={styles.footerToolbar}>
                <Button key="cancel" onClick={this.onPrev}>取消</Button>
                <Button type="primary" onClick={this.handleSubmit}>
                  {this.id ? '保存' : '创建'}
                </Button>
              </div>
            </StackPanel.RightAlice>
          </StackPanel>
        </FooterComfire>
      </PageHeaderWrapper>
    );
  }
}
export default Form.create()(CreateProject);