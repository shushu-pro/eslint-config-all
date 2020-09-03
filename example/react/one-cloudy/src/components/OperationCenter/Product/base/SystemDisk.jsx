/**
 * 系统盘 - 通用组件
 */
import React from 'react'
import _ from 'lodash'
import { Form } from 'antd'
import EBSItem from './EBSItem'
import styles from './DiskSelectItem.less'
import { PRODUCT_FIELDS, IDENTIFIED_KEY } from './_constant'

class SystemDisk extends React.PureComponent {
  constructor (props) {
    super(props)
    const initIdData = {
      diskTypeId: (props.idData && props.idData.diskTypeId) || PRODUCT_FIELDS.SYSTEM_DISK_TYPE_ID,
      diskType: (props.idData && props.idData.diskType) || PRODUCT_FIELDS.SYSTEM_DISK_TYPE,
      diskStorage: (props.idData && props.idData.diskStorage) || PRODUCT_FIELDS.SYSTEM_DISK_SIZE,
    }
    this.state = {
      selectStorage: 40, // defaultValue
      selectType: undefined, // defaultValue
      selectTypeId: undefined,
      idData: props.idData || initIdData,
    }
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    const { selectStorage, idData } = this.state
    const { diskTypeList, form } = nextProps
    const { diskTypeList: oldDiskTypeList } = this.props
    const selectedType = form.getFieldValue(idData.diskType)
    if (!_.isEqual(oldDiskTypeList, diskTypeList) && !selectedType) {
      const newSelectType = diskTypeList[0] ? diskTypeList[0].value : undefined
      const newSelectTypeId = diskTypeList[0] ? diskTypeList[0].id : undefined
      // 如果selectedType不存在，则设置默认值（比如改变区域的时候）
      form.setFieldsValue({
        [idData.diskType]: newSelectType,
        [idData.diskTypeId]: newSelectTypeId,
        [idData.diskStorage]: selectStorage,
      })
    }
  }

  render () {
    const {
      form, otherChild, diskTypeList, disabled = true, idData, maxStorage,
    } = this.props
    const { selectStorage, selectType, selectTypeId } = this.state
    const selectTypeItem = diskTypeList.find((o) => o.value === selectType)
    const max = maxStorage || (selectTypeItem && selectTypeItem[IDENTIFIED_KEY.CHILDREN][0]
      ? Number(selectTypeItem[IDENTIFIED_KEY.CHILDREN][0].value)
      : undefined)
    // console.log('EBSItemidData',idData)
    return (
      <Form.Item style={{ marginBottom: 0 }}>
        <EBSItem
          form={form}
          id={
            idData || {
              diskTypeId: PRODUCT_FIELDS.SYSTEM_DISK_TYPE_ID,
              diskType: PRODUCT_FIELDS.SYSTEM_DISK_TYPE,
              diskStorage: PRODUCT_FIELDS.SYSTEM_DISK_SIZE,
            }
          }
          selectStorage={selectStorage}
          selectTypeId={selectTypeId}
          selectType={selectType}
          maxStorage={max}
          otherChild={<div className={styles.col}>{otherChild}</div>}
          diskTypeList={diskTypeList}
          disabled={disabled}
        />
      </Form.Item>
    )
  }
}

export default SystemDisk
