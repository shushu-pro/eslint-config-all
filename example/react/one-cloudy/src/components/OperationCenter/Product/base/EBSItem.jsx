/**
 * 云盘的选择 - 通用组件
 */
import React from 'react'
import { Select, InputNumber, Form } from 'antd'
import { SelectItem } from '../components'
import styles from './DiskSelectItem.less'

const { Option } = Select
class EBSItem extends React.PureComponent {
  // 渲染选择组件
  renderSelect = () => {
    const { diskTypeList, disabled } = this.props
    return (
      <Select
        showSearch
        style={{ width: '200px' }}
        placeholder="请选择"
        optionFilterProp="children"
        disabled={disabled}
      >
        {diskTypeList.length > 0 &&
          diskTypeList.map((item) => (
            <Option key={item.key} value={item.key}>
              {item.value}
            </Option>
          ))}
      </Select>
    )
  };

  render () {
    const {
      form,
      id,
      otherChild,
      minStorage = 1,
      maxStorage,
      selectStorage,
      // selectType,
      // selectTypeId,
      disabled,
      diskTypeList,
    } = this.props
    return (
      <div className={styles.row}>
        <div className={styles.col}>
          {/* <Form.Item>
            {form.getFieldDecorator([id.diskTypeId, id.diskType], {
              // initialValue: [selectTypeId, selectType],
              rules: [
                (err, value, callback) => {
                  let message;
                  if (!value) {
                    message = new Error('磁盘类型不能为空');
                  }
                  callback(message);
                }
              ],
            })(this.renderSelect())}

          </Form.Item> */}
          <SelectItem
            id={[ id.diskTypeId, id.diskType ]}
            placeholder="磁盘类型"
            form={form}
            optionData={diskTypeList}
            disabled={disabled}
          />
        </div>
        <div className={styles.col}>
          <Form.Item>
            <div className={styles.col}>
              {form.getFieldDecorator(id.diskStorage, {
                initialValue: selectStorage,
                rules: [
                  (err, value, callback) => {
                    let message
                    if (!value) {
                      message = new Error('磁盘容量不能为空')
                    }
                    if (maxStorage && value > maxStorage) {
                      message = new Error(`磁盘容量不能大于${maxStorage}`)
                    }
                    callback(message)
                  },
                ],
              })(
                <InputNumber
                  min={minStorage}
                  max={maxStorage}
                  disabled={disabled}
                />,
              )}
            </div>
            GB
          </Form.Item>
        </div>
        {otherChild}
      </div>
    )
  }
}

export default EBSItem
