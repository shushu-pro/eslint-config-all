import React from 'react'
import { connect } from 'dva'
import {
  Form, Alert, Button, Checkbox,
} from 'antd'
import Modals from '@/components/Common/Modals'
import { InputItem, SelectItem } from '@/components/OperationCenter/FormItem'
import { RES_INFO, RES_INFO_TEXT } from '@/pages/BillCenter/constant'
import { validate } from '@/utils/formx'
import FiledForm from './FiledForm'
import styles from './index.less'

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 10,
  },
}
@Form.create()
@connect(({ billSend, loading }) => ({
  allProductNameList: billSend.allProductNameList,
  deptAllProjectList: billSend.deptAllProjectList,
  loading: !!loading.effects['billSend/submitAdd'] || !!loading.effects['billCheck/submitAdd'],
}))


class AddFormModal extends React.Component {
  state = {
    instanceId: false,
  }

  componentDidUpdate () {
    const { form } = this.props
    const { instanceId } = this.state
    const name = form.getFieldValue(RES_INFO.INSTANCE_NAME)
    const id = form.getFieldValue(RES_INFO.INSTANCE_ID)
    if (instanceId && name !== id) {
      form.setFieldsValue({
        [RES_INFO.INSTANCE_ID]: name,
      })
    }
  }

  // 无实例ID时需要将实例名称作为实例ID
  onChange = (e) => {
    const { form } = this.props
    this.setState({
      instanceId: e.target.checked,
    })
    if (e.target.checked) {
      const name = form.getFieldValue(RES_INFO.INSTANCE_NAME)
      form.setFieldsValue({
        [RES_INFO.INSTANCE_ID]: name,
      })
    } else {
      form.setFieldsValue({
        [RES_INFO.INSTANCE_ID]: '',
      })
    }
  }

  onSubmitResult = async (isValidFutureBill) => {
    const {
      form, dispatch, billNo, departmentId, deptAllProjectList, onCancel, isBillCheck, queryAllData,
    } = this.props
    const { department } = this.filedForm.state
    const [ err, values ] = await validate(form)
    if (err) return
    values[RES_INFO.OPEN_TIME] = values[RES_INFO.OPEN_TIME].format('YYYY-MM-DD')
    const proData = deptAllProjectList.find((item) => values.projectInfoId === item.key)
    dispatch({
      type: isBillCheck ? 'billCheck/submitAdd' : 'billSend/submitAdd',
      payload: {
        projectName: proData && proData.value,
        billNo,
        department,
        departmentId,
        ...values,
        isValidFutureBill: String(Number(isValidFutureBill)),
      },
    }).then(() => {
      isBillCheck && queryAllData()
      onCancel()
      this.setState({
        instanceId: '',
      })
    })
  }

  render () {
    const {
      visible,
      onCancel,
      form,
      department,
      departmentId,
      allProductNameList = [],
      loading,
      sendOrCheck,
    } = this.props
    const { instanceId } = this.state
    if (!visible) {
      return null
    }
    const restProps = {
      form,
      formItemLayout,
      data: {
        department,
        departmentId,
      },
      proRequired: false,
    }
    return Modals({
      bodyStyle: {
        padding: 0,
      },
      key: 'addModals',
      width: 700,
      title: '新增资源',
      confirmLoading: loading,
      content: (
        <div className={styles.editForm}>
          <Alert message="新增计费资源只会在账单中新增并展示，不会发起实际的资源申请。" type="info" />
          <FiledForm deptdisabled {...restProps} sendOrCheck={sendOrCheck} onRef={(ref) => { this.filedForm = ref }}>
            <SelectItem
              id={RES_INFO.PRODUCT_NAME}
              label={RES_INFO_TEXT[RES_INFO.PRODUCT_NAME]}
              optionData={allProductNameList}
              {...restProps}
            />
            <InputItem
              id={RES_INFO.INSTANCE_NAME}
              label={RES_INFO_TEXT[RES_INFO.INSTANCE_NAME]}
              {...restProps}
            />
            <InputItem
              id={RES_INFO.INSTANCE_ID}
              label={RES_INFO_TEXT[RES_INFO.INSTANCE_ID]}
              disabled={instanceId}
              extra={
                <Checkbox onChange={this.onChange}>无实例ID</Checkbox>
              }
              {...restProps}
            />
          </FiledForm>
        </div>
      ),
      visible,
      onCancel,
      footer: [
        <Button key="cancel" onClick={onCancel}>取消</Button>,
        <Button key="save" type="primary" style={{ marginRight: 8 }} onClick={() => this.onSubmitResult(false)} loading={loading}>仅保存至本期账单</Button>,
        <Button key="allSave" type="primary" onClick={() => this.onSubmitResult(true)} loading={loading}>保存并影响后续账单</Button>,
      ],
    })
  }
}

export default AddFormModal
