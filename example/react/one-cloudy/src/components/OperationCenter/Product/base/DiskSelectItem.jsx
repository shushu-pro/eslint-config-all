/**
 * 数据盘 - 通用组件
 */
import React from 'react'
import _ from 'lodash'
import { Form } from 'antd'
import EBSItem from './EBSItem'
import { PRODUCT_FIELDS } from './_constant'
// import styles from './DiskSelectItem.less';

class DiskSelectItem extends React.PureComponent {
  constructor (props) {
    super(props)
    const { diskTypeList, disabled } = this.props
    const selectType = diskTypeList[0] ? diskTypeList[0].value : undefined
    const selectStorage =
      disabled && diskTypeList[0] && diskTypeList[0].children && diskTypeList[0].children[0]
        ? diskTypeList[0].children[0].label
        : 40
    this.state = {
      // 默认选择的容量
      selectStorage,
      // 默认选择的云盘类型
      selectType,
      // 默认选择的数量
      // selectNum: 1,
    }
  }

  componentDidMount () {
    const { diskTypeList, form, id } = this.props
    const selectedType = form.getFieldValue(`${id}.${PRODUCT_FIELDS.DISK_TYPE}`)
    if (diskTypeList.length && !selectedType) {
      this.setInitValue(diskTypeList)
    }
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    const { diskTypeList, disabled } = nextProps
    const { diskTypeList: oldDiskTypeList } = this.props
    if (!_.isEqual(oldDiskTypeList, diskTypeList) && disabled) {
      this.setInitValue(diskTypeList)
    }
  }

  setInitValue = (diskTypeList) => {
    const { form, id, disabled } = this.props
    const newSelectType = diskTypeList[0] ? diskTypeList[0].value : undefined
    const newSelectTypeId = diskTypeList[0] ? diskTypeList[0].id : undefined
    const newSelectStorage =
      disabled && diskTypeList[0] && diskTypeList[0].children && diskTypeList[0].children[0]
        ? diskTypeList[0].children[0].label
        : 40
    // 如果selectedType不存在，则设置默认值（比如改变区域的时候）
    form.setFieldsValue({
      [`${id}.${PRODUCT_FIELDS.DISK_TYPE}`]: newSelectType,
      [`${id}.${PRODUCT_FIELDS.DISK_TYPE_ID}`]: newSelectTypeId,
      [`${id}.${PRODUCT_FIELDS.DISK_STORAGE_MAX}`]: newSelectStorage,
    })
  };

  render () {
    const { id, form, diskTypeList, disabled, otherChild } = this.props
    const { selectStorage, selectType } = this.state
    const selectTypeItem = diskTypeList.find((o) => o.key === selectType)
    const max = selectTypeItem ? selectTypeItem.key : undefined
    return (
      <Form.Item style={{ marginBottom: 0 }}>
        <EBSItem
          disabled={disabled}
          form={form}
          id={{
            diskTypeId: `${id}.${PRODUCT_FIELDS.DISK_TYPE_ID}`,
            diskType: `${id}.${PRODUCT_FIELDS.DISK_TYPE}`,
            diskStorage: `${id}.${PRODUCT_FIELDS.DISK_STORAGE_MAX}`,
            itemKey: `${id}.data`,
          }}
          selectStorage={selectStorage}
          maxStorage={max}
          // selectType={selectType}
          diskTypeList={diskTypeList}
          // otherChild={
          //   <div className={styles.col}>
          //     <span style={{ marginRight: 8 }}>数量</span>
          //     <div className={styles.col}>
          //       <Form.Item>
          //         {form.getFieldDecorator(`${id}.${PRODUCT_FIELDS.DISK_NUM}`, {
          //           initialValue: selectNum,
          //           rules: [
          //             (err, value, callback) => {
          //               let message;
          //               if (!value) {
          //                 message = new Error('磁盘数量不能为空');
          //               }
          //               callback(message);
          //             }
          //           ],
          //         })(
          //           <DiskNumber
          //             form={form}
          //             toltal={toltal}
          //             max={16}
          //             min={1}
          //           />
          //         )}
          //       </Form.Item>
          //     </div>
          //     {otherChild}
          //   </div>
          // }
          otherChild={otherChild}
        />
      </Form.Item>
    )
  }
}

// function DiskNumber({ value, form, toltal: oldTotal, onChange, ...args }) {
//   // 修改数量
//   const onChangeNum = val => {
//     if (!Number(val)) return;
//     const newTotal = oldTotal - value + val;
//     if (newTotal > 16) return;
//     onChange && onChange(val);
//   };
//   return (
//     <InputNumber value={value} {...args} onChange={onChangeNum} />
//   )
// }
export default DiskSelectItem
