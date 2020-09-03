/**
 * 异地灾备规格配置
 */
import React from 'react'
import {
  Form, Checkbox, Popover, Icon,
} from 'antd'
import { Number } from './index'
import { SelectItem, RadioButtonItem } from '../components'
import RDSRecoveryConfigInfo from './RDSRecoveryConfigInfo'
import OSSRecoveryConfigInfo from './OSSRecoveryConfigInfo'
import { PRODUCT_FIELDS as PF, optionData } from './_constant'
import styles from '../style.less'

class RecoveryConfigInfo extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {}
  }

  renderHelp = () => (
    <Popover>
      <Icon
        type="question-circle"
        theme="filled"
        style={{ marginRight: '8px', color: '#1890ff' }}
      />
    </Popover>
  );

  pasteClick = (id) => {
    const {
      form, record, operateData, changeState,
    } = this.props
    const listName = record.disabled ? 'backupOpenList' : PF.RESOURCE_DETAIL_LIST
    form.setFieldsValue({
      [`${listName}.${id}.${PF.PREFERRED_BACK_UP_PERIOD}`]: operateData[
        PF.PREFERRED_BACK_UP_PERIOD
      ],
      [`${listName}.${id}.${PF.PREFERRED_BACK_UP_TIME}`]: operateData[PF.PREFERRED_BACK_UP_TIME],
      [`${listName}.${id}.${PF.BACK_UP_RETENTION_PERIOD}`]: operateData[
        PF.BACK_UP_RETENTION_PERIOD
      ],
    })
    const newData = {
      ...operateData,
      otherData: record,
    }
    changeState({ [id]: newData })
  };

  copyClick = (id) => {
    const { form, record, copyClick } = this.props
    const operateData = {}
    const listName = record.disabled ? 'backupOpenList' : PF.RESOURCE_DETAIL_LIST
    operateData[PF.PREFERRED_BACK_UP_PERIOD] = form.getFieldValue(
      `${listName}.${id}.${PF.PREFERRED_BACK_UP_PERIOD}`,
    )
    operateData[PF.PREFERRED_BACK_UP_TIME] = form.getFieldValue(
      `${listName}.${id}.${PF.PREFERRED_BACK_UP_TIME}`,
    )
    operateData[PF.BACK_UP_RETENTION_PERIOD] = form.getFieldValue(
      `${listName}.${id}.${PF.BACK_UP_RETENTION_PERIOD}`,
    )
    copyClick(operateData)
  };

  render () {
    const {
      form, formItemLayout, record, id, selectedData, copyClick, changeState, operateData, ...formProps
    } = this.props
    const deldata = selectedData[record.cloudInstanceId]
    if (deldata) {
      record.preferredBackupTime = deldata.preferredBackupTime
      record.preferredBackupPeriod = Array.isArray(deldata.preferredBackupPeriod)
        ? deldata.preferredBackupPeriod.join(',')
        : deldata.preferredBackupPeriod
      record.backupRetentionPeriod = deldata.backupRetentionPeriod
      deldata.otherData = record
      deldata[PF.TARGET_INSTANCE_ID] = record.targetInstanceId
      deldata[PF.TARGET_PRODUCT_CODE] = record.productCode
      deldata[PF.POLICY_TYE] = optionData[PF.POLICY_TYE][0].key
      deldata[PF.PREFERRED_CYCLE_TYPE] = optionData[PF.PREFERRED_CYCLE_TYPE][0].key
      deldata[PF.PREFERRED_BACK_UP_TYPE] = optionData[PF.PREFERRED_BACK_UP_TYPE][0].key
    }
    return (
      <>
        <RDSRecoveryConfigInfo
          id={id}
          record={record}
          form={form}
          copyClick={copyClick}
          formItemLayout={formItemLayout}
          changeState={changeState}
          operateData={operateData}
          {...formProps}
        />
      </>
    )
  }
}

export default RecoveryConfigInfo
