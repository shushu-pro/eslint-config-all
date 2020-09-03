// 变更归属

import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { router } from 'umi'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import {
  Card, Input, Form, Button, Divider, Table,
} from 'antd'
import StackPanel from '@/components/Common/StackPanel'
import FooterComfire from '@/components/Common/FooterComfire'
import RecordDetailRow from '../OperationRecord/RecordDetailRow'
import UploadItem from './Upload'
import { RES_INSTANCE } from './contant'
import styles from './changeSet.less'
import './index.less'

const { TextArea } = Input
@Form.create()

@connect(({ resourceInstance }) => ({
  ...resourceInstance,
  resourceDetail: resourceInstance.resourceDetail,
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
    this.getCurrentDeptList()
    this.getProjectList()
  }

  // 获取当前部门列表
  getCurrentDeptList = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'resourceInstance/queryCurrentDeptList',
      payload: {},
      callback: (e) => {
        if (e.code === 200) {
          // console.log('dept --->', e);
        }
      },
    })
  }

  // 查询部门下的所有项目
  getProjectList = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'resourceInstance/queryAllProjectlist',
      payload: {
        deptId: '57',
      },
      callback: (e) => {
        if (e.code === 200) {
          // console.log('project -->', e);
        }
      },
    })
  }


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

  // 变更归属提交
  onSubmit = (v) => {
    v.preventDefault()
    const { dataSource, ticketId, isChange } = this.state
    const { form } = this.props
    form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        const { dispatch } = this.props
        const payload = {
          attachFileLinks: values.attachFileLinks,
          remark: values.remark,
          operateType: 'recycle',
          instanceInfoList: dataSource,
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
                  // eslint-disable-next-line react/destructuring-assignment
                  typeName: '变更归属',
                  ticketId: e.ticketId,
                },
              })
            }
          },
        })
      }
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
    const { dataSource, isChange } = this.state
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
        title: '实例/ID名称',
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
          <span>
            {record.areaName}
            -
            {_}
          </span>
        ),
      },
      {
        title: '部门',
        dataIndex: 'deptName',
        key: 'deptName',
        width: 160,
        render: (_, record) => (
          <span>
            {_}
          </span>
        ),
      },
      {
        title: '项目',
        dataIndex: 'projectName',
        key: 'projectName',
        width: 160,
        render: (_, record) => (
          <span>
            {_}
          </span>
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
        fixed: isChange ? null : 'right',
        render: (_) => (isChange ? _ : _.slice(0, 11)),
      },
    ]
    return (
      <div>
        <div style={{ paddingBottom: 18, color: '#999' }}>操作实例:</div>
        <Table
          scroll={{ x: 100 }}
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    )
  }

  renderFormBottom = () => {
    const { attachEntityList, defaultRemark } = this.state
    const { form } = this.props
    const { getFieldDecorator } = form
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 20 },
    }
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

  render () {
    return (
      <PageHeaderWrapper
        title="变更归属"
        breadcrumbList={[ RES_INSTANCE ]}
      >
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
      </PageHeaderWrapper>
    )
  }
}

export default RecoveryContainer
