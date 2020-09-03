/**
 * 存储
 */
import React from 'react'
import { Form } from 'antd'
import SystemDisk from './SystemDisk'
import { IDENTIFIED_KEY, PRODUCT_TYPE, getData } from './_constant'
import DataDisk from './DataDisk'

class Storage extends React.PureComponent {
  // getOptionLst = (i) => {
  //   const { optionList } = this.props;
  //   return optionList[i] ? optionList[i][IDENTIFIED_KEY.CHILDREN] : [];
  // }

  render () {
    const {
      form,
      formItemLayout,
      type,
      optionList,
      dataDiskRequired = false,
      disabled = true,
    } = this.props
    const formProps = { form, formItemLayout }
    // 堡垒机中， 数据盘为必填项
    // 其他产品（如ECS），数据盘为非必填项
    const required = type && type !== PRODUCT_TYPE.ECS
    return (
      <>
        <Form.Item required label="系统盘" {...formItemLayout}>
          <SystemDisk
            {...formProps}
            diskTypeList={getData(optionList, IDENTIFIED_KEY.SYS_DISK_TYPE)}
            disabled={disabled}
          />
        </Form.Item>
        <Form.Item required={required} label="数据盘" {...formItemLayout}>
          <DataDisk
            {...formProps}
            diskTypeList={getData(optionList, IDENTIFIED_KEY.DATA_DISK_TYPE)}
            required={dataDiskRequired || required}
          />
        </Form.Item>
      </>
    )
  }
}

export default Storage
