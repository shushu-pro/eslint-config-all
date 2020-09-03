/**
 * 项目名称
 */
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import {
  Form, Input, Select, Tooltip,
} from 'antd'
import { PRODUCT_FIELDS } from '@/components/OperationCenter/Product/base/_constant'
import { connect } from 'dva'

const FormItem = Form.Item
const { Option } = Select
const mapStateToProps = ({ user, resourceApply }) => ({
  deptId: user.deptId,
  ocDeptList: resourceApply.ocDeptList,
})
const mapDispatchToProps = (dispatch) => ({
  queryOcDeptList: (payload) => dispatch({
    type: 'resourceApply/queryOcDeptList',
    payload,
  }),
})
@connect(mapStateToProps, mapDispatchToProps)
class Department extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    this.props.queryOcDeptList({
      ocDeptId: this.props.deptId,
    })
  }

  render () {
    const {
      form, formItemLayout, required, ocDeptList, initialValue,
    } = this.props
    const decorator = form.getFieldDecorator(PRODUCT_FIELDS.DEPARTMENT_ID, {
      initialValue,
      rules: [
        {
          required,
          // type: 'number',
          // whitespace: true,
          message: '请填写申请部门',
        },
      ],
    })
    // const decorator1 = form.getFieldDecorator(PRODUCT_FIELDS.DEPARTMENT_NAME, {
    //   initialValue,
    //   rules: [
    //     {
    //       required,
    //       // type: 'number',
    //       whitespace: true,
    //       message: '请填写申请部门',
    //     },
    //   ],
    // });
    return (
      <FormItem key="formItem-departmentId" required {...formItemLayout} label="部门">
        <div className="ant-row ant-form-item">
          {decorator(
            <Select
              showSearch
              style={{ width: '230px' }}
              placeholder="请填写申请部门"
              optionFilterProp="children"
              onChange={this.posChange}
            >
              {ocDeptList.length > 0 &&
                ocDeptList.map((item) => (
                  <Option key={item.key} value={item.key}>
                    {item.value}
                  </Option>
                ))}
            </Select>,
          )}
          {/* {form.getFieldDecorator(PRODUCT_FIELDS.DEPARTMENT_NAME, {
            initialValue,
          })(
            <Input
              placeholder="请填写申请部门"
              disabled={disabled}
              style={style || { width: '230px' }}
            />
          )} */}
        </div>
        {/* <div style={{ display: 'none' }}>
          {decorator(<Input type="hidden" disabled={disabled} />)}
        </div> */}
      </FormItem>
    )
  }
}

export default Department
Department.defaultProps = {
  required: true,
  disabled: false,
}
Department.propTypes = {
  form: PropTypes.object.isRequired,
  formItemLayout: PropTypes.object.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
}
