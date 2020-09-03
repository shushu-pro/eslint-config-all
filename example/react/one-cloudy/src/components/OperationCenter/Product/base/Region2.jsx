import React from 'react'
import { connect } from 'dva'
import { Form, Icon } from 'antd'
import { SelectItem } from '../components'
import { PRODUCT_FIELDS, PRODUCT_FIELDS_NAME } from './_constant'
import { subscribeFormChange, unSubscribeFormChange } from '../index'
import styles from '../style.less'

const mapDispatchToProps = (dispatch) => ({
  queryRegion: ({ ...payload }) => dispatch({
    type: 'resourceApply/queryRegion',
    payload,
  }),
})
@connect(
  ({ resourceApply }) => ({
    regionData: resourceApply.regionData,
    dtDeptList: resourceApply.dtDeptList,
  }),
  mapDispatchToProps,
)
class Region2 extends React.PureComponent {
  componentDidMount () {
    const {
      queryRegion, productType, deptId, isEdit,
    } = this.props
    if (!isEdit) {
      queryRegion({
        productType,
        deptId,
      })
    }

    subscribeFormChange(this.onAreaChange)
  }

  componentWillUnmount () {
    unSubscribeFormChange(this.onAreaChange)
  }

  onAreaChange = (changedValues, changeField) => {
    const { form } = this.props
    // console.log(changeField,changedValues)
    // 手动选择主区域的时候把副区域清空
    if (changeField === PRODUCT_FIELDS.AREA_ID) {
      form.setFieldsValue({ [PRODUCT_FIELDS.REGION_ID]: undefined })
    }
    // 手动选择副区域时清空表单数据
    if (changeField === PRODUCT_FIELDS.REGION_ID) {
      const formData = form.getFieldsValue()
      const noResetFields = Object.values(PRODUCT_FIELDS_NAME)
      const resetDataList = Object.keys(formData).filter((o) => !noResetFields.includes(o))
      const resetData = {}
      resetDataList.forEach((o) => {
        resetData[o] = undefined
      })
      form.setFieldsValue(resetData)
      // this.setDtDeptList();
    }
  };

  setOptionData = (regionData) => {
    // 对区域数据进行一次数据转换
    const optionData = this.generateList(regionData)
    return optionData
  };

  setUnitData = () => {
    const { form, regionData } = this.props
    const areaValue = form.getFieldValue(PRODUCT_FIELDS.AREA_ID)
    const data = regionData.find((item) => item.id === areaValue) || {}
    const unitsList = data.regions && this.generateList(data.regions)
    return unitsList
  };

  setDtDeptList = () => {
    // const { queryDtDeptList, form } = this.props;
    // const regionValue = form.getFieldValue(PRODUCT_FIELDS.REGION_ID);
    // const deptValue = form.getFieldValue(PRODUCT_FIELDS.DEPARTMENT_ID)
    // queryDtDeptList({
    //   ocDeptId: deptValue,
    //   cloudRegion: regionValue,
    // })
  }

  generateList = (dataList) => dataList.map((item) => {
    const { name, id } = item
    return {
      key: id,
      value: name,
      ...item,
    }
  });

  renderHelp = () => (
    <Icon type="question-circle" theme="filled" style={{ marginRight: '8px', color: '#1890ff' }} />
  );

  render () {
    const {
      form, formItemLayout, regionData, tip, isNewLine,
    } = this.props
    return (
      <>
        <Form.Item className="productIndex" label="区域" {...formItemLayout} required>
          {/* <Col span={24}> */}
          <SelectItem
            id={[ PRODUCT_FIELDS.AREA_ID, PRODUCT_FIELDS.AREA_NAME ]}
            placeholder="区域"
            form={form}
            optionData={this.setOptionData(regionData)}
            style={{ width: 224 }}
          />
          <SelectItem
            id={[ PRODUCT_FIELDS.REGION_ID, PRODUCT_FIELDS.REGION_NAME ]}
            placeholder="单位"
            form={form}
            optionData={this.setUnitData()}
            style={{ width: 224, marginLeft: 20 }}
          />

          {tip && (
            <>
              {isNewLine ? (
                <div style={{ paddingTop: '5px' }} className={styles.extraTip}>
                  {tip}
                </div>
              ) : (
                <span style={{ paddingLeft: '80px' }} className={styles.tip}>
                  {tip}
                </span>
              )}
            </>
          )}
        </Form.Item>
      </>
    )
  }
}


export default Region2
