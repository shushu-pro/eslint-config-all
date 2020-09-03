/**
 * 批量申请 - 第一步 - 填写项目信息
 */
import React from 'react'
import { connect } from 'dva'
import router from 'umi/router'
import { Form, Button } from 'antd'
import { BaseInfo } from '@/components/OperationCenter/Product/base'
import { FORM_ITEM_BASE_LAYOUT } from '@/components/OperationCenter/Product/base/_constant'
import StackPanel from '@/components/Common/StackPanel'
import FooterComfire from '@/components/Common/FooterComfire'
import Title from '@/components/Common/Title'
import { PRODUCT_FIELDS, getUserList } from '../constant'
import styles from './index.less'

const mapDispatchToProps = (dispatch) => ({
  getOcProjectList: (payload) => dispatch({
    type: 'resourceApply/getOcProjectList',
    payload: {
      deptId: payload.deptId,
    },
  }),
  selectedProjectInfo: (payload) => dispatch({
    type: 'resourceApply/setter',
    payload: {
      selectedProjectInfo: payload.params,
    },
  }),
})
@connect(null, mapDispatchToProps)
@Form.create({
  onValuesChange: (props, changedValues) => {
    const { form, getOcProjectList } = props
    // 改变部门id，重新获取oc项目列表
    if ('deptId' in changedValues) {
      form.setFieldsValue({ projectId: undefined })
      getOcProjectList({ deptId: changedValues.deptId })
    }
  },
})

class FristStep extends React.PureComponent {
  state = {};

  // 上一步
  onPrev = () => {
    router.push('/manage/operation-center/resource-apply/selectWay')
  };

  // 下一步
  onNext = () => {
    const { form, dispatch, onNextStep } = this.props
    form.validateFields((err, values) => {
      if (!err) {
        // 对资源使用人进行筛选，剔除undefined
        const userList = getUserList(values)
        const params = {
          [PRODUCT_FIELDS.RESOURCE_USER]: userList, // 资源使用人
          [PRODUCT_FIELDS.COMMON_INFO]: {
            [PRODUCT_FIELDS.DEPARTMENT_ID]: values[PRODUCT_FIELDS.DEPARTMENT_ID], // 部门
            [PRODUCT_FIELDS.DEPARTMENT_NAME]: values[PRODUCT_FIELDS.DEPARTMENT_NAME], // 部门名称
            [PRODUCT_FIELDS.PROJECT_ID]: values[PRODUCT_FIELDS.PROJECT_ID], // 项目id
            [PRODUCT_FIELDS.PROJECT_NAME]: values[PRODUCT_FIELDS.PROJECT_NAME], // 项目名称
          },
          [PRODUCT_FIELDS.ATTACHMENT]: values[PRODUCT_FIELDS.ATTACHMENT], // 附件
        }
        this.props.selectedProjectInfo({
          params,
        })
        onNextStep()
      }
    })
  };

  render () {
    const { form } = this.props
    const formProps = {
      form,
      formItemLayout: FORM_ITEM_BASE_LAYOUT,
      useFor: 'batch-project-info',
    }
    return (
      <Form className={styles.firstStep}>
        <Title level="h3">基础信息</Title>
        <div className={styles.form}>
          <BaseInfo {...formProps} />
        </div>
        <FooterComfire>
          <StackPanel>
            <StackPanel.RightAlice>
              <Button onClick={this.onPrev}>取消</Button>
              <Button onClick={this.onNext} type="primary">
                下一步
              </Button>
            </StackPanel.RightAlice>
          </StackPanel>
        </FooterComfire>
      </Form>
    )
  }
}

export default FristStep
