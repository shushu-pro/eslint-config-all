/**
 * 级联处理的高阶组件
 */
import React from 'react'
import _ from 'lodash'
import { getChildList, getProcesData } from '../base/_constant'
import { subscribeFormChange, unSubscribeFormChange } from '../index'

/**
 *
 * @param { String[] } cascadeData 级联的表单字段
 * @param { String[] } needInitList 需要赋予默认值的表单字段
 */
export default function casecade (cascadeData, needInitList = []) {
  return function A (Component) {
    return class Cascade extends React.PureComponent {
      state = {
        selectedValueList: [], // 级联选中的值
        cascadeList: [], // 级联列表
        oldCascadeList: [],
      };

      componentDidMount () {
        subscribeFormChange(this.onFormChange)
      }


      UNSAFE_componentWillReceiveProps (nextProps) {
        if (nextProps && nextProps.optionList) this.getCascadeData(nextProps, this.setInitValue)
      }

      onFormChange = (changedValues, changeField) => {
        const { form } = this.props
        // 级联选择清空后面的级联数据
        const datalength = cascadeData.length
        const index = cascadeData.indexOf(changeField)
        if (index === -1) return
        for (let i = index + 1; i < datalength; i++) {
          form.setFieldsValue({ [cascadeData[i]]: undefined })
        }
      };

      // 级联列表生成函数
      getCascadeData = (props, callback) => {
        const { cascadeList: oldCascadeList } = this.state
        const { form, optionList } = props
        const datalength = cascadeData.length
        const selectedValueList = []
        const cascadeList = [ getProcesData(optionList) ]
        cascadeData.forEach((item, index) => {
          const selectedValue = form.getFieldValue(item)
          selectedValueList.push(selectedValue)
          if (index < datalength - 1) {
            const childList = getChildList(cascadeList[index], selectedValue)
            cascadeList.push(childList)
          }
        })
        this.setState(
          {
            selectedValueList, // 级联选中的值
            cascadeList, // 级联列表
            oldCascadeList,
          },
          callback,
        )
      };

      // 设置默认值，如果是资源变更则跳过
      setInitValue = () => {
        const { form } = this.props
        const { cascadeList, oldCascadeList } = this.state
        needInitList.forEach((item, index) => {
          if (!_.isEqual(cascadeList[index], oldCascadeList[index])) {
            // optionList改变时如果item有值，说明是资源变更，item是表单赋予的默认值，不予处理，否则就重置默认值
            if (!form.getFieldValue(item)) {
              const value = cascadeList[index] && cascadeList[index][0] ? cascadeList[index][0].key : undefined
              form.setFieldsValue({
                [item]: value,
              })
            }
          }
        })
      };

      UNSAFE_componentWillUnmount () {
        unSubscribeFormChange(this.onFormChange)
      }

      render () {
        const { selectedValueList, cascadeList } = this.state
        return (
          <Component
            selectedValueList={selectedValueList}
            cascadeList={cascadeList}
            {...this.props}
          />
        )
      }
    }
  }
}
