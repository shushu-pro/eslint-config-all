// 资源实例回收

import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { router } from 'umi'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import {
  Card, Alert, Input, Form, Button, Divider, Table, message, Spin,
} from 'antd'
import StackPanel from '@/components/Common/StackPanel'
import AddTooltip from '@/components/Common/AddTooltip'
import FooterComfire from '@/components/Common/FooterComfire'
import RecordDetailRow from '../OperationRecord/RecordDetailRow'
import ResourceUsers from './ResourceUsers/index'
import UploadItem from './Upload'
import { RES_INSTANCE } from './contant'
import styles from './changeSet.less'
import './index.less'

const { TextArea } = Input
@Form.create()

@connect(({ resourceInstance, user, loading }) => ({
  ...resourceInstance,
  resourceUserList: user.userList,
  resourceDetail: resourceInstance.resourceDetail,
  loading: !!loading.effects['resourceInstance/ticketApply'],
}))

class RecoveryContainer extends PureComponent {
  constructor (props) {
    super(props)
    const { location } = props
    const { idList, isChange, ticketId } = location.query
    this.state = {
      dataSource: [],
      idList,
      ticketId,
      isChange: !!isChange,
      attachEntityList: null,
      defaultRemark: undefined,
      inputResourceUsers: [],
    }
  }

  componentDidMount () {
    const { isChange } = this.state
    // 判断是否是修改记录
    if (isChange) {
      this.getInstanceChangeInfo()
    } else {
      this.queryResourceList()
    }
    this.queryUserList()
  }

  // 获取部门下的资源使用人
  queryUserList = () => {
    const { dispatch } = this.props
    return dispatch({
      type: 'user/queryUserList',
      payload: {},
    })
  };

  // 修改 操作记录申请
  getInstanceChangeInfo = () => {
    const { ticketId } = this.state
    const { dispatch } = this.props
    dispatch({
      type: 'OperationRecord/getInstanceChangeInfo',
      payload: {
        ticketId,
      },
      callback: (e) => {
        // console.log('aaaa', e);
        if (e.code === 200) {
          // console.log('aas', e.resData.ticketEntityList.map(item => item.beforeData));
          this.setState({
            defaultRemark: e.resData.remark,
            inputResourceUsers: e.resData.resourceUsers || [],
            attachEntityList: e.resData.attachEntityList || [],
            dataSource: e.resData.ticketEntityList.map((item) => item.beforeData),
          })
        }
      },
    })
  }

  queryResourceList = () => {
    const { dispatch } = this.props
    const { idList } = this.state
    dispatch({
      type: 'resourceInstance/queryResourceList',
      payload: {
        type: 1,
        cloudInstanceIdList: idList,
        limit: 100,
      },
      callback: (e) => {
        if (e.code === 200) {
          // console.log('e', e.resData);
          this.setState({
            dataSource: e.resData.list.map((item) => ({ ...item, key: item.cloudInstanceId })),
          })
        }
      },
    })
  }

  // 上一步
  onPrev = () => {
    router.goBack()
  };

  // 回收提交  recycle 释放
  onSubmit = (v) => {
    v.preventDefault()
    const {
      dataSource, ticketId, isChange,
    } = this.state
    const { form } = this.props
    form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        let resourceUsers = []
        values.resourceUserInfos
          ? resourceUsers = [ ...resourceUsers, ...values.resourceUserInfos ] : null
        values.resourceUsers ? resourceUsers = [ ...resourceUsers, ...values.resourceUsers ] : null
        const { dispatch } = this.props
        const payload = {
          attachFileLinks: values.attachFileLinks,
          remark: values.remark,
          operateType: 'recycle',
          instanceInfoList: dataSource,
          projectId: dataSource[0].projectId,
          resourceUsers: resourceUsers.filter((item) => !!item),
        }
        // console.log('payload', payload);
        if (isChange) {
          payload.ticketId = ticketId
          payload.editType = 'edit'
        }
        dispatch({
          type: 'resourceInstance/ticketApply',
          payload,
          callback: (e) => {
            if (e.code === 200) {
              router.replace({
                pathname: '/manage/myresource/resourceinstance/success',
                query: {
                  typeName: '资源回收',
                  ticketId: e.ticketId,
                },
              })
            }
          },
        })
      }
    })
  }

  handleDelete = (v) => {
    const { dataSource } = this.state
    this.setState({
      dataSource: dataSource.filter((item) => item.cloudProductInstanceId !== v),
    })
  }

  renderSize = (before, productCode) => (
    <RecordDetailRow
      beforeData={before}
      afterData={{}}
      productType={productCode}
    />
  )

  renderTitleDetail = () => {
    const { dataSource } = this.state
    const columns = [
      {
        title: '资源',
        dataIndex: 'productCode',
        key: 'productCode',
        fixed: 'left',
        width: 100,
        render: (_) => _ || '-',
      },
      {
        title: '实例ID/名称',
        dataIndex: 'cloudInstanceName',
        key: 'cloudInstanceName',
        width: '240px',
        render: (_, record) => (
          <span>
            <div style={{ color: '#1890ff' }}>{record.cloudInstanceId}</div>
            <div>{record.cloudInstanceName}</div>
          </span>
        ),
      },
      {
        title: '区域',
        dataIndex: 'regionName',
        key: 'regionName',
        width: 160,
        render: (_, record) => (
          <AddTooltip text={`${record.areaName}-${_}` || '-'}>
            {record.areaName}
            -
            {_ || '-'}
          </AddTooltip>
        ),
      },
      {
        title: '规格',
        dataIndex: 'cpuMemory',
        key: 'cpuMemory',
        width: 400,
        render: (_, record) => this.renderSize(
          record,
          record.productCode,
        ),
      },
      {
        title: '开通时间',
        dataIndex: 'cloudOpenTime',
        key: 'cloudOpenTime',
        width: '160px',
        render: (_) => (_ || '-'),
      },
    ]
    if (dataSource.length === 1) {
      columns.push({
        title: '操作',
        fixed: 'right',
        dataIndex: 'cloudProductInstanceId',
        key: 'cloudProductInstanceId',
        width: '80px',
        render: () => (
          <span>-</span>
        ),
      })
    } else if (dataSource.length > 1) {
      columns.push({
        title: '操作',
        fixed: 'right',
        dataIndex: 'cloudProductInstanceId',
        key: 'cloudProductInstanceId',
        width: '80px',
        render: (v) => (
          <span
            onClick={() => this.handleDelete(v)}
            style={{ cursor: 'pointer', color: '#1890ff' }}
          >
            移除
          </span>
        ),
      })
    }
    return (
      <div>
        <div style={{ paddingBottom: 18, color: '#999' }}>回收实例:</div>
        <Table
          scroll={{ x: 1300 }}
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    )
  }

  renderFormBottom = () => {
    const { attachEntityList, defaultRemark, inputResourceUsers } = this.state
    const { form, resourceUserList } = this.props
    const { getFieldDecorator } = form
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    }
    const formProps1 = { form, formItemLayout }
    const formProps = {
      formItemLayout,
      form,
      id: 'attachFileLinks',
      label: '附件',
      required: false,
      initialValue: attachEntityList,
      maxLen: 5,
      accept: '.doc, .docx, .jpg, .png, .jpeg, .pdf, .xls, .xlsx, .ppt, .pptx, .zip, .7z',
    }
    return (
      <div className={styles.item_container}>
        <div className={styles.item_content}>
          <ResourceUsers
            {...formProps1}
            initialValue={inputResourceUsers || []}
            userList={resourceUserList}
          />
          <Form.Item {...formItemLayout} label="备注">
            {getFieldDecorator('remark', {
              initialValue: defaultRemark,
            })(
              <TextArea rows={4} />,
            )}
          </Form.Item>
          <UploadItem {...formProps} />
        </div>
      </div>
    )
  }

  renderAlert = () => {
    const { idList } = this.state
    let text = ''
    switch (idList[0] && idList[0].productCode) {
      case 'ECS':
        text = '释放ECS时,默认同事释放系统盘、数据盘、EIP。如有特殊需求,请在备注中注明或提工单。'
        break
      // case 'OSS':
      //   text = '释放OSS时,默认同事释放系统盘、数据盘、EIP。如有特殊需求,请在备注中注明或提工单。';
      //   break;
      // case 'RDS':
      //   text = '释放RDS时,默认同事释放系统盘、数据盘、EIP。如有特殊需求,请在备注中注明或提工单。';
      //   break;
      // case 'SLB':
      //   text = '释放SLB时,默认同事释放系统盘、数据盘、EIP。如有特殊需求,请在备注中注明或提工单。';
      //   break;
      default:
        break
    }
    return (
      <Alert
        showIcon
        message={text}
        type="info"
        style={{ margin: '0 0 24px' }}
      />
    )
  }

  render () {
    const { loading } = this.props
    // const { idList } = this.state;
    return (
      <PageHeaderWrapper
        title="资源回收"
        breadcrumbList={[ RES_INSTANCE ]}
      >
        <Spin spinning={loading}>
          <Card bordered={false}>
            {/* {idList[0].productCode === 'ECS' ? this.renderAlert() : null} */}
            {this.renderTitleDetail()}
            <Divider />
            {this.renderFormBottom()}
            <FooterComfire>
              <StackPanel>
                <StackPanel.RightAlice>
                  <div className={styles.footerToolbar}>
                    <Button key="cancel" onClick={this.onPrev}>
                      取消
                    </Button>
                    <Button type="primary" htmlType="submit" onClick={this.onSubmit}>
                      确认提交
                    </Button>
                  </div>
                </StackPanel.RightAlice>
              </StackPanel>
            </FooterComfire>
          </Card>
        </Spin>
      </PageHeaderWrapper>
    )
  }
}

export default RecoveryContainer
