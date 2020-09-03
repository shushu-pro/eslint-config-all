/**
 * 实例名称组件
 */
import React from 'react'
import { Form, Input } from 'antd'
import { connect } from 'dva'
// import getIPRange from 'get-ip-range';
import getIPAddressCount from '@/utils/getIPAddressCount'
import { InputItem } from '../../FormItem'
import { INSTANCE_NAME_RULE, PRODUCT_FIELDS, FIELD_MAP } from './_constant'
import styles from '../style.less'

@connect(({ resourceApply }) => ({
  hostNum: resourceApply.hostNum || 32,
}))
class InstanceName extends React.PureComponent {
  componentDidMount () {
    const { form, dispatch } = this.props
    const ip = form.getFieldValue(PRODUCT_FIELDS.PODNETCIDR)
    if (ip) {
      const hostNum = Math.ceil(getIPAddressCount(ip) / 128)
      dispatch({
        type: 'resourceApply/getACSHostNum',
        payload: {
          hostNum,
        },
      })
      form.setFieldsValue({
        [PRODUCT_FIELDS.MAINFRAMENUM]: hostNum,
      })
    }
  }

  changeIP (e) {
    const { isACS, dispatch, form } = this.props
    if (!isACS) {
      return
    }
    // 校验ip段和子网掩码是否允许
    const regexp = INSTANCE_NAME_RULE.ACSPOD.rlue
    const { value } = e.target
    if (!regexp.test(value)) {
      dispatch({
        type: 'resourceApply/getACSHostNum',
        payload: {
          hostNum: '-',
        },
      })
    } else {
      const hostNum = Math.ceil(getIPAddressCount(value) / 128)
      dispatch({
        type: 'resourceApply/getACSHostNum',
        payload: {
          hostNum,
        },
      })
      form.setFieldsValue({
        [PRODUCT_FIELDS.MAINFRAMENUM]: hostNum,
      })
    }
  }


  render () {
    const {
      form,
      formItemLayout,
      label,
      productType = '',
      instanceType,
      id,
      maxLength,
      text,
      disabled,
      className,
      isACS,
      defaultValue,
      hostNum,
    } = this.props
    const ruleType = instanceType && INSTANCE_NAME_RULE[instanceType]
    const realLabel = label ||
      FIELD_MAP[productType + PRODUCT_FIELDS.INSTANCE_NAME] ||
      FIELD_MAP[PRODUCT_FIELDS.INSTANCE_NAME]
    return (
      <Form.Item required label={realLabel} {...formItemLayout}>
        <InputItem
          disabled={disabled}
          className={className || 'product-item'}
          id={id || PRODUCT_FIELDS.INSTANCE_NAME}
          form={form}
          validator={(rule, value, callback) => {
            if (!ruleType) return callback()
            const pattern = ruleType.rlue
            if (value && !pattern.test(value)) {
              return callback(new Error('格式不正确'))
            }
            return callback()
          }}
          placeholder={realLabel}
          // 实例名称校验中最长的长度为256，后端的实例名称默认最大长度是255，默认取最大的长度
          maxLength={maxLength || 255}
          initialValue={defaultValue}
          onChange={(e) => this.changeIP(e)}
        />
        {isACS &&
          form.getFieldDecorator(PRODUCT_FIELDS.MAINFRAMENUM, {
            initialValue: hostNum,
          })(<Input type="hidden" />)}
        {!isACS && ruleType && <span className={styles.tip}>{ruleType.text}</span>}
        {text && <span className={styles.tip}>{text}</span>}
        {isACS ? (
          <div className={styles.tipsBelow}>
            <span>
              请填写有效的私有网段，即以下网段及其子网：10.0.0.0/8，172.16-31.0.0/12-16，192.168.0.0/16
            </span>
            <span>
              不能与VPC及VPC内已有Kubernetes集群使用的网段重复，
              <span className={styles.emphasize}>创建成功后不能修改</span>
            </span>
            <span>集群网络规划请参考：VPC下Kubernetes的网络地址段规划</span>
            <span>
              当前配置下，集群内最多可允许部署
              {' '}
              <span className={styles.hostNum}>{hostNum}</span>
              {' '}
              台主机
            </span>
          </div>
        ) : null}
      </Form.Item>
    )
  }
}

export default InstanceName
