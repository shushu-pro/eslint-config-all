import React from 'react'
import { connect } from 'dva'
import {
  Form, Alert, Button,
} from 'antd'
import Modals from '@/components/Common/Modals'
import { InputItem } from '@/components/OperationCenter/FormItem'
import { RES_INFO, RES_INFO_TEXT, getDate } from '@/pages/BillCenter/constant'
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
  deptAllProjectList: billSend.deptAllProjectList,
  allDeptList: billSend.allDeptList,
  loading: !!loading.effects['billSend/submitUpdate'] || !!loading.effects['billCheck/submitUpdate'],
}))

class EditFormModal extends React.Component {
  onSubmitResult = async (isValidFutureBill) => {
    const {
      form, dispatch, data, onCancel, billNo, deptAllProjectList, allDeptList, isBillCheck, queryAllData,
    } = this.props
    const [ err, values ] = await validate(form)
    if (err) return
    values[RES_INFO.OPEN_TIME] = values[RES_INFO.OPEN_TIME].format('YYYY-MM-DD')
    data[RES_INFO.OPEN_TIME] = getDate(data[RES_INFO.OPEN_TIME])
    const value = {
      ...data,
      ...values,
    }
    delete value[RES_INFO.OPEN_TIME]
    if (data === value) {
      return onCancel()
    }
    const proData = deptAllProjectList.find((item) => values.projectInfoId === item.key)
    const deptData = allDeptList.find((item) => values.departmentId === item.key)
    dispatch({
      type: isBillCheck ? 'billCheck/submitUpdate' : 'billSend/submitUpdate',
      payload: {
        seqno: data.seqno,
        billNo,
        oldDepartmentId: data.departmentId,
        department: deptData ? deptData.value : data.department,
        projectName: proData ? proData.value : data.projectName,
        ...values,
        isValidFutureBill: String(Number(isValidFutureBill)),
      },
    }).then(() => {
      isBillCheck && queryAllData()
      onCancel()
    })
  }

  render () {
    const {
      visible, data, onCancel, form, loading, queryAllData, isBillCheck,
    } = this.props
    if (!visible) {
      return null
    }
    const restProps = {
      form,
      formItemLayout,
      data,
      proRequired: !!data[RES_INFO.PROJECT_INFO_ID],
      queryAllData,
      isBillCheck,
    }
    return Modals({
      bodyStyle: {
        padding: 0,
      },
      key: 'edit',
      width: 700,
      title: '编辑资源',
      confirmLoading: loading,
      content: (
        <div className={styles.editForm}>
          <Alert message="在账单中对资源的各个字段进行编辑，只会影响在账单中的显示，并不会调整该资源的实际配置情况；若调整资源的所属部门，系统会将资源账单发送到对应的部门。" type="info" />
          <FiledForm {...restProps}>
            <Form.Item
              required
              label={RES_INFO_TEXT[RES_INFO.PRODUCT_NAME]}
              {...formItemLayout}
            >
              {data[RES_INFO.PRODUCT_NAME]}
            </Form.Item>
            <Form.Item
              required
              label={RES_INFO_TEXT[RES_INFO.INSTANCE_ID]}
              {...formItemLayout}
            >
              {data[RES_INFO.INSTANCE_ID] || '-'}
            </Form.Item>
            <InputItem
              id={RES_INFO.INSTANCE_NAME}
              required={!!data[RES_INFO.INSTANCE_NAME]}
              label={RES_INFO_TEXT[RES_INFO.INSTANCE_NAME]}
              initialValue={data[RES_INFO.INSTANCE_NAME]}
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

export default EditFormModal
