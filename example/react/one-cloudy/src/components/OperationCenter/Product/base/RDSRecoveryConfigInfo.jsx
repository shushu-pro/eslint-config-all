/**
 * 异地灾备规格配置
 */
import React from 'react'
import {
  Form, Checkbox, Popover, Icon, message,
} from 'antd'
import { Number } from './index'
import { SelectItem, RadioButtonItem } from '../components'
import { PRODUCT_FIELDS as PF, optionData } from './_constant'
import styles from '../style.less'

class RDSRecoveryConfigInfo extends React.PureComponent {
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
    if (operateData.productCode !== record.productCode) {
      message.info('不同产品不能互相粘贴数据')
      return
    }
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
    operateData.productCode = record.productCode
    copyClick(operateData)
  };

  render () {
    const {
      form, formItemLayout, record, id, selectedData,
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
      <div style={{ marginLeft: -80, marginTop: 50 }}>
        <Form.Item label="备份策略" {...formItemLayout} required>
          <SelectItem
            id={
              record.disabled
                ? `backupOpenList.${id}.${PF.POLICY_TYE}`
                : `${PF.RESOURCE_DETAIL_LIST}.${id}.${PF.POLICY_TYE}`
            }
            placeholder="备份策略"
            form={form}
            optionData={optionData[PF.POLICY_TYE]}
            initialValue={optionData[PF.POLICY_TYE][0].key}
            disabled={!!record.disabled}
          />
        </Form.Item>
        <Form.Item required label="周期类型" {...formItemLayout}>
          <RadioButtonItem
            form={form}
            optionData={optionData[PF.PREFERRED_CYCLE_TYPE]}
            id={
              record.disabled
                ? `backupOpenList.${id}.${PF.PREFERRED_CYCLE_TYPE}`
                : `${PF.RESOURCE_DETAIL_LIST}.${id}.${PF.PREFERRED_CYCLE_TYPE}`
            }
            initialValue={optionData[PF.PREFERRED_CYCLE_TYPE][0].key}
          />
        </Form.Item>
        <Form.Item
          required
          className={styles.checkBoxWarning}
          label={(
            <span>
              {this.renderHelp()}
              备份日期
            </span>
          )}
          {...formItemLayout}
          style={{ marginLeft: -23 }}
        >
          {form.getFieldDecorator(
            record.disabled
              ? [ `backupOpenList.${id}.${PF.PREFERRED_BACK_UP_PERIOD}` ]
              : [ `${PF.RESOURCE_DETAIL_LIST}.${id}.${PF.PREFERRED_BACK_UP_PERIOD}` ],
            {
              initialValue: record.preferredBackupPeriod && record.preferredBackupPeriod.split(','),
              rules: [
                {
                  required: true,
                  message: '请选择备份日期',
                },
              ],
            },
          )(
            <Checkbox.Group style={{ width: '100%', marginLeft: 21 }} disabled={!!record.disabled}>
              {optionData[PF.PREFERRED_BACK_UP_PERIOD].map((item) => (
                <Checkbox key={item.key} value={item.key}>
                  {item.value}
                </Checkbox>
              ))}
            </Checkbox.Group>,
          )}
        </Form.Item>
        <Form.Item required label="备份时间" {...formItemLayout}>
          <SelectItem
            id={
              record.disabled
                ? `backupOpenList.${id}.${PF.PREFERRED_BACK_UP_TIME}`
                : `${PF.RESOURCE_DETAIL_LIST}.${id}.${PF.PREFERRED_BACK_UP_TIME}`
            }
            form={form}
            optionData={optionData[PF.PREFERRED_BACK_UP_TIME]}
            disabled={!!record.disabled}
            initialValue={record.preferredBackupTime}
          />
        </Form.Item>
        <Form.Item required label="保存类型" {...formItemLayout}>
          <RadioButtonItem
            form={form}
            optionData={optionData[PF.PREFERRED_BACK_UP_TYPE]}
            id={
              record.disabled
                ? `backupOpenList.${id}.${PF.PREFERRED_BACK_UP_TYPE}`
                : `${PF.RESOURCE_DETAIL_LIST}.${id}.${PF.PREFERRED_BACK_UP_TYPE}`
            }
            initialValue={optionData[PF.PREFERRED_BACK_UP_TYPE][0].key}
          />
        </Form.Item>
        <Number
          id={
            record.disabled
              ? `backupOpenList.${id}.${PF.BACK_UP_RETENTION_PERIOD}`
              : `${PF.RESOURCE_DETAIL_LIST}.${id}.${PF.BACK_UP_RETENTION_PERIOD}`
          }
          label="最长天数"
          form={form}
          formItemLayout={formItemLayout}
          tip="支持7-30"
          min={7}
          max={30}
          disabled={!!record.disabled}
          initialValue={record.backupRetentionPeriod}
        />
        <div style={{ float: 'right', marginRight: 20 }}>
          {' '}
          <a onClick={() => this.copyClick(id)}>
            <Icon type="copy" />
            复制设置参数
          </a>
          <a style={{ marginLeft: 20, color: '#656768' }} onClick={() => !record.disabled && this.pasteClick(id)}>
            <Icon type="copy" theme="filled" />
            粘贴设置参数
          </a>
        </div>
      </div>
    )
  }
}

export default RDSRecoveryConfigInfo
