/**
 * SkyNet开发
 * SkyNet产品可选区为：主中心-公有云区、专有云区、行业云区（政法）
 * SkyNet属于安全产品大类
 * 原型图：https://yuque.antfin-inc.com/toqer1/zz2gg3/moudmb#9nvaJ
 */
import React from 'react'
import LeftTitle from '@/components/OperationCenter/LeftTitle'
import { PRODUCT_FIELDS } from '@/pages/OperationCenter/ResourceApply/constant'
import { Region, BaseInfo, Number } from '@/components/OperationCenter/Product/base'
import { connect } from 'dva'
import { FORM_ICON } from '../../base/_constant'
import ApplyInfo from './ApplyInfo'
import FormComment from '../base/FormComment'

const mapStateToProps = ({ user, resourceApply }) => ({
  resourceUserList: user.userList,
  instanceQuantity: resourceApply.hostNum,
  userInfo: user.userInfo,
  productForm: resourceApply.form,
  projectList: resourceApply.projectList,
})
const mapDispatchToProps = (dispatch) => ({
  setSkyNetNum (payload) {
    return dispatch({
      type: 'resourceApply/setSkyNetNum',
      payload,
    })
  },
  getSkyNetNum (payload) {
    return dispatch({
      type: 'resourceApply/getSkyNetNum',
      payload,
    })
  },
  queryAllProjectList (payload) {
    return dispatch({
      type: 'resourceApply/queryAllProjectList',
      payload,
    })
  },
})
@connect(mapStateToProps, mapDispatchToProps)
class SkyNetForm extends React.Component {
  componentWillMount () {
    const {
      initData, formProps,
    } = this.props
    // console.log('componentWillMount',initData)
    if (initData) {
      formProps.form.setFieldsValue({
        [PRODUCT_FIELDS.SKYNET_INSTANCE]: initData[PRODUCT_FIELDS.SKYNET_INSTANCE],
      })
    }
  }

  render () {
    const {
      formProps, batch, resourceData = {},
      instanceQuantity, setSkyNetNum, getSkyNetNum, userInfo, queryAllProjectList, projectList, initData,
    } = this.props
    const infos = {
      ...resourceData, ...formProps, initData,
    }
    const skynetInfo = {
      userInfo, projectList, instanceQuantity, setSkyNetNum, getSkyNetNum, queryAllProjectList,
    }
    const SKYNET_INSTANCE = formProps.form.getFieldValue(PRODUCT_FIELDS.SKYNET_INSTANCE) || ''
    // console.log('renderrenderrender',SKYNET_INSTANCE)
    return (
      <>
        <LeftTitle title="区域" icon={FORM_ICON.REGION}>
          <Region {...formProps} />
        </LeftTitle>
        {!batch && (
          <LeftTitle title="基础信息" icon={FORM_ICON.BASE_INFO}>
            <BaseInfo {...infos} isWAF />
          </LeftTitle>
        )}
        <LeftTitle title="配置" icon={FORM_ICON.CONFIG}>
          <ApplyInfo {...infos} formProps={formProps} {...skynetInfo} />
          <div className="ant-row ant-form-item">
            <div className="ant-col ant-col-4" />

            <div className="ant-col ant-col-20">
              <p className="extra-tips">
                SkyNet目前仅支持ECS、RDS、SLB、OSS、Redis、EIP、NAT网关产品。
                <br />
                在您当前选择下共计有
                {' '}
                <a>{SKYNET_INSTANCE || 0}</a>
                {' '}
                个上述实例
                {!SKYNET_INSTANCE && (
                  <span>
                    ，
                    <span style={{ color: '#ff4b29' }}>实例为0时无法申请</span>
                  </span>
                )}
              </p>

            </div>
          </div>
        </LeftTitle>
        <LeftTitle title="数量" icon={FORM_ICON.QUANTITY}>
          <Number
            {...formProps}
            disabled
            resourceData={resourceData}
            min={1}
            required
            id={PRODUCT_FIELDS.SKYNET_INSTANCE}
            label="申请数量"
            tip="申请数量由配置中的实例信息自动得出，无需手动填写"
          />
        </LeftTitle>
        <FormComment {...formProps} />
      </>
    )
  }
}
export default SkyNetForm
