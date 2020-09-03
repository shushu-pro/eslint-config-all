/**
 * OSS配置组件
 * 由于备份区域数据申请时由前端创造，因此在产品修改时需要由前端来做数据回填，
 *  OSSRecovData就是后端传过来的数据，中途截获存在redux，拿来次页面进行判断并进行数据回填
 */
import React from 'react'
import { connect } from 'dva'
import {
  Form, Switch,
} from 'antd'
import { Number } from '@/components/OperationCenter/Product/base'
import { SelectItem, RadioButtonItem } from '../../components'
import { PRODUCT_FIELDS, PRODUCT_FIELDS as PF, optionData } from '../_constant'
import styles from './index.less'

@connect(({ pageData }) => ({
  OSSRecovData: pageData.OSSRecovData,
}))
class OSSBackUpConfig extends React.Component {
  render () {
    const { form, formItemLayout, OSSRecovData } = this.props
    const isChecked = form.getFieldValue(PRODUCT_FIELDS.BACKUP_FLAG)
    const selectedRegion = form.getFieldValue(PRODUCT_FIELDS.REGION_ID)
    const isProperCloud = (selectedRegion === 2)
    return (
      <>
        <Form.Item label="是否开通异地备份" {...formItemLayout}>
          {
            form.getFieldDecorator(PRODUCT_FIELDS.BACKUP_FLAG, { valuePropName: 'checked' })(
              <Switch disabled={!isProperCloud} size="small" />,
            )
          }
          {!isProperCloud ? <span className={styles.ossBackUpTips}>OSS异地备份目前不支持主中心 - 公有云区</span> : null}
        </Form.Item>
        {isChecked
          ? (
            <>
              <Form.Item label="备份策略" {...formItemLayout} required>
                <SelectItem
                  id={PF.POLICY_TYE}
                  placeholder="备份策略"
                  form={form}
                  optionData={optionData[PF.POLICY_TYE]}
                  initialValue={optionData[PF.POLICY_TYE][0].key}
                />
              </Form.Item>
              <Number
                id={PF.BACKUP_TIME_INTERVAL}
                label="时间间隔"
                max={1825}
                form={form}
                formItemLayout={formItemLayout}
                unit="天备份一次"
                initialValue={OSSRecovData && OSSRecovData.backupTimeInterval}
              />
              <Form.Item required label="备份时间" {...formItemLayout}>
                <SelectItem
                  id={PF.PERFERRED_BACKUP_TIME}
                  form={form}
                  optionData={optionData[PF.PERFERRED_BACKUP_TIME]}
                  initialValue={OSSRecovData && OSSRecovData.preferredBackupTime}
                />
              </Form.Item>
              <Form.Item required label="保存类型" {...formItemLayout}>
                <RadioButtonItem
                  form={form}
                  optionData={optionData[PF.PERFERRED_BACKUP_TYPE]}
                  id={PF.PERFERRED_BACKUP_TYPE}
                  initialValue={optionData[PF.PERFERRED_BACKUP_TYPE][0].key}
                />
              </Form.Item>
              <Number
                id={PF.BACKUP_RETENTION_PERIOD}
                label="最长天数"
                form={form}
                formItemLayout={formItemLayout}
                tip="支持7-1825天"
                min={7}
                max={1825}
                initialValue={OSSRecovData && OSSRecovData.backupRetentionPeriod}
              />
            </>
          ) : null}
      </>
    )
  }
}

export default OSSBackUpConfig
