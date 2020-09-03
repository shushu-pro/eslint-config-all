/**
 * 通用的配置组件（ECS，堡垒机）
 */
import React from 'react'
import {
  Form, Button, Input, Modal,
} from 'antd'
import {
  RadioButtonItem,
  SelectItem,
} from '@/components/OperationCenter/Product/components'
import { ProjectName, Department } from '@/components/OperationCenter/ApplyFrom'
import { PRODUCT_FIELDS } from '@/pages/OperationCenter/ResourceApply/constant'
import { InputItem } from '@/components/OperationCenter/FormItem'
import { Number, ModelCard } from '@/components/OperationCenter/Product/base'
import { subscribeFormChange, unSubscribeFormChange } from '@/components/OperationCenter/Product'
import StackPanel from '@/components/Common/StackPanel'
import { connect } from 'dva'
import { FORM_ICON } from '../../base/_constant'
import styles from './style.less'
import {
  VERSION_LIST,
  APPLY_TYPES,
  INSTANCE_LIST,
  SKYNET_INSTANCE,
  DATA,
  COLUMNS,
  NAME_MAP,
} from './SkyNetConstant'
import DropItem from './DropItem'

let id = 1
@connect(({
  resourceApply,
}) => ({
  ocProjectList: resourceApply.ocProjectList,
}))
class ApplyInfo extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      [PRODUCT_FIELDS.SKYNET_INSTANCE]: 0,
      stateVisible: false,
      itemList: [],
      quantity: 1,
      selectProdcut: '',
    }
  }

  componentDidMount () {
    subscribeFormChange(this.onFormChange)
    const {
      initData, projectList = [], queryAllProjectList, form,
    } = this.props
    if (initData && initData.itemList) {
      this.setState({ itemList: initData.itemList })
    }
    // console.log('componentDidMount',initData)
    /** 编辑的时候如果开始没有选择项目，就无法获取项目列表 */
    if (initData && initData[PRODUCT_FIELDS.SKYNET_VERSION] && projectList.length < 1) {
      queryAllProjectList()
    }
    if (initData) {
      this.setInitApplyInfo(initData)
    }
    if (initData && initData[PRODUCT_FIELDS.SKYNET_APPLY_METHOD] === APPLY_TYPES[1].key) {
      form.setFieldsValue({
        [PRODUCT_FIELDS.PROJECT_ID]: initData[PRODUCT_FIELDS.SKYNET_PROJECT_ID] || initData[PRODUCT_FIELDS.PROJECT_ID],
        [PRODUCT_FIELDS.PROJECT_NAME]: initData[PRODUCT_FIELDS.SKYNET_PROJECT_NAME],

      })
    }
  }

  componentWillUnmount () {
    unSubscribeFormChange(this.onFormChange)
  }

  // 当申请信息发生改变的时候
  onFormChange = (changedValues, changeField, has) => {
    const value = changedValues[changeField]
    if (has(PRODUCT_FIELDS.SKYNET_VERSION) && value) {
      const isBaseVer = value === VERSION_LIST[0].key
      isBaseVer ? this.setInitApplyInfo() : this.modelInfo()
    } else if (has(PRODUCT_FIELDS.PROJECT_ID) && value) {
      // 选择项目之后查询实例个数
      this.setInstanceQuantity('project', value)
    } else if (has(PRODUCT_FIELDS.REGION_ID) && value) {
      // 区域选定之后默认选择
      this.setInitApplyInfo()
    } else if (has(PRODUCT_FIELDS.SKYNET_APPLY_METHOD) && value) {
      // console.log('onFormChange3', value)
      // 只要切换申请方式，实例个数就置为0
      if (value.includes('部门')) {
        this.setInstanceQuantity('department')
      } else if (
        this.props.form &&
        this.props.form.getFieldValue(PRODUCT_FIELDS.SKYNET_VERSION) === VERSION_LIST[0].key
      ) {
        value.includes('实例') ? this.setInstanceValue(this.state.itemList.length) : this.resetInstanceValue()
      }
    }
  };

  resetInstanceValue () {
    const { initData } = this.props
    // console.log('resetInstanceValue',initData);
    if (
      initData && initData[PRODUCT_FIELDS.SKYNET_PROJECT_ID]
    ) {
      this.setInstanceValue(initData[PRODUCT_FIELDS.SKYNET_INSTANCE])
    } else {
      this.setInstanceValue(0)
    }
  }

  setInitApplyInfo (initData = {}) {
    const { form } = this.props
    // console.log('setInitApplyInfo',initData);
    form.setFieldsValue({
      [PRODUCT_FIELDS.SKYNET_VERSION]: initData[PRODUCT_FIELDS.SKYNET_VERSION] || VERSION_LIST[0].key,

      [PRODUCT_FIELDS.SKYNET_APPLY_METHOD]: initData[PRODUCT_FIELDS.SKYNET_APPLY_METHOD] || APPLY_TYPES[0].key,
    })
    setTimeout(() => {
      form.setFieldsValue({
        [PRODUCT_FIELDS.SKYNET_APPLY_METHOD]: initData[PRODUCT_FIELDS.SKYNET_APPLY_METHOD] || APPLY_TYPES[0].key,
      })
    }, 100)
  }

  setInstanceQuantity (type, value) {
    const { userInfo, form } = this.props
    let params = {
      deptId: userInfo.deptId,
      regionId: form.getFieldValue(PRODUCT_FIELDS.REGION_ID),
    }
    if (type === 'department' || type === 'senior') {
      this.getInstanceNum(params)
    } else if (type === 'project') {
      params = {
        ...params,
        projectId: value,
      }
      this.getInstanceNum(params)
    }
  }

  getInstanceNum (params) {
    const { getSkyNetNum } = this.props
    getSkyNetNum(params).then((result) => {
      this.setInstanceValue(result)
    })
  }

  setInstanceValue (result) {
    // console.log('setInstanceValue',result);
    if (result === 0) {
      result = ''
    }
    const { form } = this.props
    form.setFieldsValue({
      [PRODUCT_FIELDS.SKYNET_INSTANCE]: result,
      itemList: this.state.itemList,
    })
  }

  modelInfo () {
    Modal.info({
      title: '开通高级版要求所有实例均已开通初级版',
      style: { top: '30%' },
      content: (
        <div>
          <p>若存在未开通初级版的实例，将默认先开通初级版，并且会产生相应的初级版费用，请知晓。</p>
        </div>
      ),
      okText: '我知道了',
      onOk: () => {
        this.setInstanceQuantity('senior')
      },
    })
  }

  changeNumber (val) {
    this.setState({ quantity: val })
  }

  changeSelectItem (val) {
    this.setState({ selectProdcut: val })
  }

  confirm () {
    this.addInstanceList(this.state.selectProdcut, this.state.quantity)
  }

  addInstanceList (name, num) {
    if (name && num > 0) {
      const list = this.handlerList(name, num)
      this.setState((pre) => {
        const itemList = [ ...pre.itemList, ...list ]
        this.setInstanceValue(itemList.length)
        return { ...pre, itemList }
      })
    }
  }

  deleteItem (uuid, _item) {
    this.setState((pre) => {
      const itemList = pre.itemList.filter((item) => item.id !== uuid)
      this.setInstanceValue(itemList.length)
      return { ...pre, itemList }
    })
  }

  handlerList (name, num) {
    const temp = []
    for (let i = 0; i < num; i++) {
      temp.push({
        productType: name,
        id: Math.random() + id++,
        productName: '',
        instanceItemId: '',
        instanceItemName: '',
        ipAddress: '',
      })
    }
    return temp
  }

  handleClose () {
    this.setState({ stateVisible: false })
  }

  updateChildState () {
    this.setState({ stateVisible: true })
  }

  /* 添加实例，选择类型和个数 */
  getChooseInstanceDom () {
    const { formItemLayout, formProps } = this.props
    return (
      <Form.Item>
        <Input.Group compact>
          <SelectItem
            placeholder="产品类别"
            optionData={INSTANCE_LIST}
            onChange={(val) => this.changeSelectItem(val)}
            initialValue={this.state.selectProdcut}
            {...this.props.restProps}
          />
          <Number
            placeholder="数量，单次最多20个"
            className="singleNumber"
            label=""
            onChange={(val) => this.changeNumber(val)}
            initialValue={this.state.quantity}
            {...formProps}
            formItemLayout={formItemLayout}
            min={1}
            max={20}
          />
        </Input.Group>
      </Form.Item>
    )
  }

  /* 添加完实例后，输入数据 */
  getInputListDoms (products, i) {
    products.productType = products.productType || NAME_MAP[products.productName]
    return SKYNET_INSTANCE[products.productType].map((product) => (
      <div key={`${product.key}_${products.id}`} className="ant-skynet-label">
        <InputItem
          id={`${PRODUCT_FIELDS.SKYNET_ITEM_LIST}[${i}][${product.key}]`}
          inputType={product.inputHideType}
          pattern={product.pattern}
          label={product.inputHideType ? product.value : ''}
          initialValue={products[product.key] || product.value}
          placeholder={product.label}
          form={this.props.form}
          required={!(product.noRequired || product.inputHideType)}
        />
      </div>
    ))
  }

  /* 添加实例展示信息 */
  getInstanceDom () {
    const { formItemLayout } = this.props
    const { itemList } = this.state
    return (
      <>
        <Form.Item required label="申请实例" {...formItemLayout}>
          <DropItem
            DomReact={this.getChooseInstanceDom()}
            icon=""
            overlayClassName={styles.skynetPopconfirm}
            onConfirm={(i) => this.confirm(i)}
          />
          {itemList.map((field, index) => {
            field.id = field.id || id++
            return (
              <StackPanel
                key={field.id}
                otherClass={styles.listStackPanel}
                style={{
                  'flex-wrap': 'nowrap',
                }}
              >
                {this.getInputListDoms(field, index)}
                <div>
                  <Button
                    onClick={() => this.deleteItem(field.id, field)}
                    className="ant-row ant-form-item"
                    style={{ color: '#1890ff' }}
                    type="link"
                    icon="minus-circle"
                  />
                </div>
              </StackPanel>
            )
          })}
        </Form.Item>
      </>
    )
  }

  /* 项目申请方式 */
  getProjectDom () {
    const { formProps, ocProjectList, initData } = this.props
    return (
      <>
        <ProjectName
          {...formProps}
          optionData={ocProjectList}
          initialValue={initData && initData[PRODUCT_FIELDS.SKYNET_PROJECT_ID]}
        />
      </>
    )
  }

  /* 部门申请方式 */
  getDepartDom () {
    const { formProps, userInfo, deptName } = this.props
    return (
      <>
        <Department
          {...formProps}
          disabled
          initialValue={(userInfo && userInfo.deptName) || deptName}
        />
      </>
    )
  }

  render () {
    const { form, formItemLayout } = this.props
    const VERSIONID = form.getFieldValue(PRODUCT_FIELDS.SKYNET_VERSION)
    const APPLY_METHOD = form.getFieldValue(PRODUCT_FIELDS.SKYNET_APPLY_METHOD)
    const HELP_DOM = (
      <a style={{ marginLeft: '20px' }} onClick={(e) => this.updateChildState(e)}>
        <i className={`icon iconfont ${FORM_ICON.VIEW_FORM}`} />
        查看版本与功能介绍
      </a>
    )
    return (
      <>
        <Form.Item required label="版本" {...formItemLayout}>
          <RadioButtonItem
            form={form}
            newDom={HELP_DOM}
            id={PRODUCT_FIELDS.SKYNET_VERSION}
            optionData={VERSION_LIST}
          />
        </Form.Item>
        {VERSIONID === '基础版' && (

          <Form.Item required label="申请方式" {...formItemLayout}>
            <RadioButtonItem
              form={form}
              id={PRODUCT_FIELDS.SKYNET_APPLY_METHOD}
              optionData={APPLY_TYPES}
            />
          </Form.Item>

        )}
        {APPLY_METHOD === '按实例申请' && VERSIONID === '基础版' && this.getInstanceDom()}
        {/* {(VERSIONID !== 'basis' || APPLY_METHOD === 'department') && this.getDepartDom()} */}
        {APPLY_METHOD === '按项目申请' && VERSIONID === '基础版' && this.getProjectDom()}
        {/* 版本与功能介绍弹窗 */}
        <ModelCard
          data={DATA}
          columns={COLUMNS}
          modalTitle="版本与功能介绍"
          stateVisible={this.state.stateVisible}
          onHandleCancel={() => this.handleClose()}
        />
      </>
    )
  }
}
export default ApplyInfo
