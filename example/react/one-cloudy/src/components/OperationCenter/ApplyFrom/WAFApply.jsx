/**
 * WAF规格配置
 */
import React from 'react'
import { Form, Checkbox } from 'antd'
import LeftTitle from '@/components/OperationCenter/LeftTitle'
import InputItem from '../FormItem/InputItem'
import { PRODUCT_FIELDS } from '../Product/base/_constant'
import styles from './WAFApply.less'

const agreementOptions = [ { label: 'HTTP', value: 'HTTP' }, { label: 'HTTPS', value: 'HTTPS' } ]
class WAFApply extends React.PureComponent {
  render () {
    const { form, formItemLayout, id, initData } = this.props
    return (
      <div
        className={styles.wafApply}
        style={{
          padding: 10,
          wordBreak: 'break-all',
          background: '#f9f9f9',
          border: '1px solid #d9d9d9',
          borderRadius: 4,
          marginBottom: 24,
        }}
      >
        <LeftTitle title={`实例${id + 1}配置`} noDivider>
          <Form.Item {...formItemLayout} label="应用域名" required>
            <InputItem
              id={`${PRODUCT_FIELDS.WAF_DETAIL_LIST}.${id}.${PRODUCT_FIELDS.APPLICATION_DOMAIN}`}
              placeholder=" "
              form={form}
              initialValue={initData[PRODUCT_FIELDS.APPLICATION_DOMAIN] || null}
              validator={(rule, value, callback) => {
                const ruleType = /([\u4E00-\u9FA5])|([\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5])|^(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)$/ // 中文标点符号
                if (value && ruleType.test(value)) {
                  return callback(new Error('格式不正确'))
                }
                return callback()
              }}
            />
            <div
              style={{
                marginTop: -65,
                marginLeft: 220,
                color: '#999',
                fontSize: 14,
                float: 'left',
              }}
            >
              不支持IP地址
            </div>
          </Form.Item>
          <Form.Item {...formItemLayout} label="应用系统名称" required>
            <InputItem
              id={`${PRODUCT_FIELDS.WAF_DETAIL_LIST}.${id}.${PRODUCT_FIELDS.APPLICATION_PROJECT_NAME}`}
              placeholder=" "
              form={form}
              initialValue={initData[PRODUCT_FIELDS.APPLICATION_PROJECT_NAME] || null}
            />
          </Form.Item>
          <Form.Item {...formItemLayout} label="回源IP地址(SLB地址)" required>
            <InputItem
              id={`${PRODUCT_FIELDS.WAF_DETAIL_LIST}.${id}.${PRODUCT_FIELDS.RETURN_SOURCE_IP}`}
              placeholder=" "
              form={form}
              initialValue={initData[PRODUCT_FIELDS.RETURN_SOURCE_IP] || null}
              validator={(rule, value, callback) => {
                const ruleType = /^(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)$/
                if (value && !ruleType.test(value)) {
                  return callback(new Error('格式不正确'))
                }
                return callback()
              }}
            />
          </Form.Item>
          <Form.Item
            key="formItem-departmentId"
            {...formItemLayout}
            label="回源端口(80/443/...)"
            required
          >
            <InputItem
              id={`${PRODUCT_FIELDS.WAF_DETAIL_LIST}.${id}.${PRODUCT_FIELDS.RETURN_SOURCE_HOST}`}
              placeholder=" "
              form={form}
              initialValue={initData[PRODUCT_FIELDS.RETURN_SOURCE_HOST] || null}
              validator={(rule, value, callback) => {
                const ruleType = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{4}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/
                if (value && !ruleType.test(value)) {
                  return callback(new Error('格式不正确'))
                }
                return callback()
              }}
            />
          </Form.Item>
          <Form.Item {...formItemLayout} label="对外协议" required>
            {form.getFieldDecorator(
              `${PRODUCT_FIELDS.WAF_DETAIL_LIST}.${id}.${PRODUCT_FIELDS.EXTERNAL_AGREEMENTS}`,
              {
                initialValue:
                  initData[PRODUCT_FIELDS.EXTERNAL_AGREEMENTS] &&
                  typeof initData[PRODUCT_FIELDS.EXTERNAL_AGREEMENTS] === 'string'
                    ? initData[PRODUCT_FIELDS.EXTERNAL_AGREEMENTS].split(',')
                    : initData[PRODUCT_FIELDS.EXTERNAL_AGREEMENTS],
                rules: [
                  {
                    required: true,
                    message: '请选择对外协议类型',
                  },
                ],
              },
            )(
              <Checkbox.Group defaultValue={[]} style={{ width: '100%' }}>
                {agreementOptions.map((item) => (
                  <Checkbox key={item.value} value={item.value}>
                    {item.label}
                  </Checkbox>
                ))}
              </Checkbox.Group>,
            )}
          </Form.Item>
        </LeftTitle>
      </div>
    )
  }
}

export default WAFApply
