// 升降配

import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { router } from 'umi'
import _ from 'lodash'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import {
  Card, Input, Form, Button, Divider, message, Tabs, Spin,
} from 'antd'
import StackPanel from '@/components/Common/StackPanel'
import FooterComfire from '@/components/Common/FooterComfire'
import { FORM_ICON } from '@/components/OperationCenter/Product/base/_constant'
import ResourceUsers from './ResourceUsers/index'
import UploadItem from './Upload'
import {
  RES_INSTANCE, getInstanceInfo, TypeTabs, isSame, difference,
} from './contant'
import product from './Form'
import styles from './changeSet.less'
import './index.less'

const { TextArea } = Input
const { TabPane } = Tabs
@Form.create({})

@connect(({ resourceInstance, user, loading }) => ({
  ...resourceInstance,
  resourceUserList: user.userList,
  loading: !!loading.effects['resourceInstance/ticketApply'],
}))

class ChangeSetContainer extends PureComponent {
  constructor (props) {
    super(props)
    const { location } = props
    const {
      idList, isChange, ticketId,
    } = location.query
    // console.log('location', location);
    this.state = {
      idList, // 选中的资源实例id
      ticketId, // 操作记录ID
      isChange, // 提交状态 true 修改  false 申请
      dataList: [], // 表单数据
      resourceData: {}, // 资源数据
      attachEntityList: null, // 公共附件
      defaultRemark: undefined, // 公共备注
      staticDataList: [], // 原始数据
      inputResourceUsers: [], // 输入框填写的资源申请人 数据
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

  // 新增提交升降配时 获取所有资源实例操作列表
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
          this.setState({
            selectKey: e.resData.list[0].cloudInstanceId,
            dataList: [ ...e.resData.list ],
            staticDataList: [ ...e.resData.list ],
          }, () => {
            this.querySpecList(e.resData.list[0])
          })
        }
      },
    })
  }

  // 操作记录修改升降配 获取操作资源实例列表
  getInstanceChangeInfo = () => {
    const { ticketId } = this.state
    const { dispatch } = this.props
    dispatch({
      type: 'OperationRecord/getInstanceChangeInfo',
      payload: {
        ticketId,
      },
      callback: (e) => {
        if (e.code === 200) {
          this.setState({
            defaultRemark: e.resData.remark,
            attachEntityList: e.resData.attachEntityList || [],
            selectKey: e.resData.ticketEntityList[0].afterData.cloudInstanceId,
            dataList: [ ...e.resData.ticketEntityList.map((item) => item.afterData) ],
            staticDataList: [ ...e.resData.ticketEntityList.map((item) => item.beforeData) ],
            inputResourceUsers: e.resData.resourceUsers || [],
          }, () => {
            this.querySpecList(e.resData.ticketEntityList[0].beforeData)
          })
        }
      },
    })
  }

  // 获取规格列表
  querySpecList = (item) => {
    const { dispatch } = this.props
    const sendData = {
      productType: item.productCode,
      cloudRegionId: item.regionId,
    }
    dispatch({
      type: 'resourceInstance/queryProductSpec',
      payload: sendData,
      callback: (e) => {
        if (e.code === 200) {
          this.setState({
            resourceData: e.resData,
          })
        }
      },
    })
  }

  // 上一步
  onPrev = () => {
    router.goBack()
  };

  // 编辑tab
  onEditTab = (targetKey, action) => {
    this[action](targetKey)
  };

  // 删除tab 操作修改原始数据 及  表单数据
  remove = (targetKey) => {
    let { selectKey } = this.state
    const { dataList, staticDataList } = this.state
    let lastIndex
    dataList.forEach((item, i) => {
      if (item.cloudInstanceId === targetKey) {
        lastIndex = i - 1
      }
    })
    const dataRes = dataList.filter((pane) => pane.cloudInstanceId !== targetKey)
    const staticRes = staticDataList.filter((pane) => pane.cloudInstanceId !== targetKey)
    if (dataRes.length && selectKey === targetKey) {
      if (lastIndex >= 0) {
        selectKey = dataRes[lastIndex].cloudInstanceId
      } else {
        selectKey = dataRes[0].cloudInstanceId
      }
    }
    const changedFormData = staticDataList.find((item) => item.cloudInstanceId === selectKey)
    this.querySpecList(changedFormData)
    this.setState({
      dataList: dataRes,
      selectKey,
      staticDataList: staticRes,
    })
  };

  // 切换产品Tab表单
  onChangeTab = (v) => {
    const {
      dataList, selectKey, staticDataList, defaultRemark,
    } = this.state
    const { form } = this.props
    // 切换前的tab表单数据
    const targetFormData = dataList.find((item) => item.cloudInstanceId === selectKey)
    // 切换前的tab原始数据
    const staticFormData = staticDataList.find((item) => item.cloudInstanceId === selectKey)
    // 切换后的tab原始数据
    const changedFormData = staticDataList.find((item) => item.cloudInstanceId === v)
    form.validateFields((err, values) => {
      if (!err) {
        let instanceInfo = _.cloneDeep(targetFormData)
        instanceInfo = getInstanceInfo(values, targetFormData)
        // console.log('values ==>', values);
        // if (!targetFormData.remark) {
        //   delete instanceInfo.remark;
        // }
        // 判断两个对象属性值是否相同
        const isEqual = _.isEqual(instanceInfo, staticFormData)
        // console.log('isEqual',
        //   isEqual, difference(instanceInfo, staticFormData, _), instanceInfo, staticFormData);
        if (isEqual) {
          message.warn('请先修改当前配置表单后操作!')
          return
        }
        // 更新修改后的表单数据
        const changedDataList = dataList
          .map((item) => (item.cloudInstanceId === selectKey ? instanceInfo : item))
        const novalues = {
          resourceUserInfos: values.resourceUserInfos,
          resourceKeys: values.resourceKeys,
          resourceUsers: values.resourceUsers,
          resourceUserIds: values.resourceUserIds,
        }
        // 重置表单
        form.resetFields()
        // 回填公共的表单数据
        form.setFieldsValue({
          attachFileLinks: values.attachFileLinks,
          remark: defaultRemark,
          ...novalues,
        })
        this.querySpecList(changedFormData)
        this.setState({
          selectKey: v,
          dataList: changedDataList,
          inputResourceUsers: values.resourceUsers,
        })
      }
    })
  }

  // 提交/修改  recycle 释放  reconfig 变更
  onSubmit = (v) => {
    v.preventDefault()
    const {
      dataList, selectKey, staticDataList,
    } = this.state
    const { form } = this.props
    const targetFormData = dataList.find((item) => item.cloudInstanceId === selectKey)
    const staticFormData = staticDataList.find((item) => item.cloudInstanceId === selectKey)
    form.validateFields((err, values) => {
      if (!err) {
        // console.log('values', values);
        let instanceInfo = _.cloneDeep(targetFormData)
        instanceInfo = getInstanceInfo(values, targetFormData)
        // if (!targetFormData.remark) {
        //   delete instanceInfo.remark;
        // }
        // 判断两个对象属性值是否相同
        const isEqual = _.isEqual(instanceInfo, staticFormData)
        if (isEqual) {
          message.warn('请修改配置后再提交申请!')
          return
        }
        // console.log('isEqual',
        //   isEqual, difference(instanceInfo, staticFormData, _), instanceInfo, staticFormData);
        let resourceUsers = []
        values.resourceUserInfos
          ? resourceUsers = [ ...resourceUsers, ...values.resourceUserInfos ] : null
        values.resourceUsers ? resourceUsers = [ ...resourceUsers, ...values.resourceUsers ] : null
        // console.log('resourceUsers', resourceUsers);
        const changedDataList = dataList
          .map((item) => (item.cloudInstanceId === selectKey ? instanceInfo : item))
        this.setState({
          dataList: changedDataList,
          attachEntityList: values.attachFileLinks,
          resourceUsers,
        }, () => this.handleSubmitApply())
      }
    })
  }

  // 提交
  handleSubmitApply = () => {
    const { dispatch } = this.props
    const {
      dataList, isChange, ticketId, staticDataList,
      defaultRemark, attachEntityList, resourceUsers,
    } = this.state
    // 判断 更新后的所有产品表单数据是否和原始数据 一致
    const bool = isSame(staticDataList, dataList, _)
    if (bool) {
      message.warn('请更新完成所有表单后提交!')
      return
    }
    const payload = {
      attachFileLinks: attachEntityList,
      operateType: 'reconfig',
      instanceInfoList: dataList,
      remark: defaultRemark,
      projectId: dataList[0].projectId,
      resourceUsers: resourceUsers.filter((item) => !!item),
    }
    // eslint-disable-next-line no-console
    console.log('payload ==>', payload)
    const loadUrl = 'resourceInstance/ticketApply'
    if (isChange) {
      payload.ticketId = ticketId
      payload.editType = 'edit'
    }
    dispatch({
      type: loadUrl,
      payload,
      callback: (e) => {
        if (e.code === 200) {
          router.replace({
            pathname: '/manage/myresource/resourceinstance/success',
            query: {
              typeName: '升降配',
              ticketId: e.ticketId,
            },
          })
        }
      },
    })
  }

  // target表单
  renderForm = (item) => {
    const {
      resourceData, isChange, staticDataList,
    } = this.state
    const {
      form,
    } = this.props
    const initData = item
    let beforeDataDiskList = []
    if (item.productCode === 'ECS') {
      beforeDataDiskList = staticDataList
        .find((t) => t.cloudInstanceId === item.cloudInstanceId).dataDiskList.filter((v) => v.diskType === 'data') || []
    }
    const TargetForm = product[item.productCode]
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
    }
    const formProps = {
      form,
      formItemLayout,
    }
    // console.log('initData', initData, beforeDataDiskList);
    return (
      item.productCode
        ? (
          <TargetForm
            key={item.cloudInstanceId}
            {...formProps}
            isChange={isChange}
            resourceData={resourceData}
            beforeDataDiskList={beforeDataDiskList}
            initData={initData}
          />
        ) : null
    )
  }

  // 公共表单
  renderFormCommon = () => {
    const { attachEntityList, defaultRemark, inputResourceUsers } = this.state
    const { form, resourceUserList } = this.props
    const { getFieldDecorator } = form
    const formItemLayout = {
      labelCol: { span: 4 },
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
    const formProps1 = { form, formItemLayout }
    return (
      <div className={styles.item_container}>
        <div className={styles.item_title}>
          <i className={`icon iconfont ${FORM_ICON.REMARK}`} />
          备注
        </div>
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
              <TextArea onChange={(e) => this.setState({ defaultRemark: e.target.value })} rows={4} />,
            )}
          </Form.Item>
          <UploadItem {...formProps} />
        </div>
      </div>
    )
  }

  render () {
    const { loading } = this.props
    const { selectKey, dataList, staticDataList } = this.state
    return (
      <PageHeaderWrapper
        title="升降配"
        breadcrumbList={[ RES_INSTANCE ]}
      >
        <Spin spinning={loading}>
          <Card bordered={false}>
            {staticDataList.length === 1
              ? this.renderForm(dataList[0])
              : (
                <Tabs
                  hideAdd
                  type={dataList.length === 1 ? 'card' : 'editable-card'}
                  onEdit={this.onEditTab}
                  defaultActiveKey={selectKey}
                  onChange={this.onChangeTab}
                  activeKey={selectKey}
                >
                  {
                    dataList.map((item) => (
                      <TabPane
                        tab={`${TypeTabs.find((t) => t.value === item.productCode).name} ${item.cloudInstanceId}`}
                        key={item.cloudInstanceId}
                      >
                        {selectKey === item.cloudInstanceId ? this.renderForm(item) : null}
                      </TabPane>
                    ))
                  }
                </Tabs>
              )}
            <Divider />
            {this.renderFormCommon()}
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

export default ChangeSetContainer
