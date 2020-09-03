import React from 'react'
import { connect } from 'dva'
import { Form } from 'antd'
import { subscribeFormChange, unSubscribeFormChange } from '@/components/OperationCenter/Product/index'
import { PRODUCT_FIELDS_NAME } from '@/components/OperationCenter/Product/base/_constant'
import ICONS from '../constants/icons'
import FIELDS from '../constants/fields'
import Fieldset from '../../parts/Fieldset'
import PartSelect from '../../parts/PartSelect'
import styles from './index.less'

const TIPS_STYLE = {
  under: 0, // 在容器下方
}
const mapStateToProps = ({ resourceApply }) => ({
  regionData: resourceApply.regionData,
})
const mapDispatchToProps = (dispatch) => ({
  queryRegionList: ({ ...payload }) => dispatch({
    type: 'resourceApply/queryRegion',
    payload,
  }),
})
@connect(mapStateToProps, mapDispatchToProps)

class Region extends React.PureComponent {
    static tipsStyle = TIPS_STYLE

    componentDidMount () {
      const { queryRegionList, productType } = this.props
      queryRegionList({ productType })
      subscribeFormChange(this.onAreaChange)
    }

    componentWillUnmount () {
      unSubscribeFormChange(this.onAreaChange)
    }

    onAreaChange = (changedValues, changeField) => {
      const { form } = this.props
      // console.log(changeField,changedValues)
      // 手动选择主区域的时候把副区域清空
      if (changeField === FIELDS.AREA_ID) {
        form.setFieldsValue({ [FIELDS.REGION_ID]: undefined })
      }
      // 手动选择副区域时清空表单数据
      if (changeField === FIELDS.REGION_ID) {
        const formData = form.getFieldsValue()
        const noResetFields = Object.values(PRODUCT_FIELDS_NAME)
        const resetDataList = Object.keys(formData).filter((o) => !noResetFields.includes(o))
        const resetData = {}
        resetDataList.forEach((o) => {
          resetData[o] = undefined
        })
        form.setFieldsValue(resetData)
      }
    };

    getAreaOptions () {
      const { regionData } = this.props
      return this.adaptKeys(regionData)
    }

    getRegionOptions () {
      const { regionData, form } = this.props
      const areaValue = form.getFieldValue(FIELDS.AREA_ID)
      const data = regionData.find((item) => item.id === areaValue) || { regions: [] }
      const unitsList = data.regions && this.adaptKeys(data.regions)
      return unitsList
    }

    adaptKeys = (dataList) => dataList.map((item) => {
      const { name, id } = item
      return {
        key: id,
        value: name,
        ...item,
      }
    });


    render () {
      const {
        form, formItemLayout, tips, tipsStyle,
      } = this.props
      return (
        <Fieldset title="区域" icon={ICONS.REGION}>
          <Form.Item className="productIndex" label="区域" {...formItemLayout} required>
            <PartSelect
              id={FIELDS.AREA_ID}
              placeholder="区域"
              form={form}
              optionData={this.getAreaOptions()}
            />
            <PartSelect
              id={FIELDS.REGION_ID}
              placeholder="单位"
              form={form}
              optionData={this.getRegionOptions()}
              style={{ width: 280 }}
            />
            {tips && (
              <>
                {tipsStyle === TIPS_STYLE.under ? (
                  <div className={styles.underTips}>{tips}</div>
                ) : (
                  <span className={styles.normalTips}>{tips}</span>
                )}
              </>
            )}
          </Form.Item>
        </Fieldset>
      )
    }
}


export default Region
