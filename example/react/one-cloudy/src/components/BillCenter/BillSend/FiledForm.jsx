import React from 'react'
import { connect } from 'dva'
import { Form } from 'antd'
import moment from 'moment'
import {
  InputNumItem,
  SelectItem,
  TextAreaItem,
  DatePickerItem,
} from '@/components/OperationCenter/FormItem'
import { RES_INFO, RES_INFO_TEXT, REGION_LIST, REGION_LIST_BILLCHECK } from '@/pages/BillCenter/constant'

@connect(({ billSend }) => ({
  deptAllProjectList: billSend.deptAllProjectList,
  allDeptList: billSend.allDeptList,
}))
/* eslint-disable*/
class FiledForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      deptId: props.data.departmentId,
      ocRegion: props.data.ocRegion,
      department: props.data.department,
    };
  }

  componentDidMount(){
    const { onRef } = this.props;
    onRef && onRef(this);
  }

  componentDidUpdate(nextProps) {
    // console.log(nextProps, 'nextProps');
    const { form } = nextProps;
    const { deptId, ocRegion } = this.state;
    const { allDeptList = [] } = this.props;
    const newDeptId = form.getFieldValue(RES_INFO.DEPART_MENT_ID);
    const newOcRegion = form.getFieldValue(RES_INFO.OC_REGION);

    const list = allDeptList.find(item => item.key === newDeptId)

    if (newDeptId && newOcRegion && (newDeptId !== deptId || newOcRegion !== ocRegion) ) {
      this.setData(newDeptId, newOcRegion, list&&list.value);
      form.setFieldsValue({
        [RES_INFO.PROJECT_INFO_ID]: undefined,
      });
      this.queryDeptAllProject({
        departmentId: newDeptId,
        ocRegion: newOcRegion,
      });
    }
  }

  setData = (deptId, ocRegion, department) => {
    this.setState({
      deptId,
      ocRegion,
      department,
    });
  }

  queryDeptAllProject = (params) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'billSend/queryDeptAllProject',
      payload: {
        ...params,
      }
    });
  }

  render() {
    const { 
      data,
      form,
      children,
      formItemLayout,
      // deptdisabled = false,
      allDeptList=[],
      deptAllProjectList = [],
      proRequired,
      sendOrCheck
    } = this.props;
    const restProps = {
      form,
      formItemLayout,
    };

    return (
      <Form key="filed">
        {children}
        <SelectItem
          id={RES_INFO.DEPART_MENT_ID}
          label={RES_INFO_TEXT[RES_INFO.DEPART_MENT]}
          initialValue={data[RES_INFO.DEPART_MENT_ID]}
          optionData={allDeptList}
          // disabled={deptdisabled}
          {...restProps}
        />
        {
          sendOrCheck !== 'check' ? <SelectItem
            id={RES_INFO.OC_REGION}
            label={RES_INFO_TEXT[RES_INFO.OC_REGION]}
            initialValue={data[RES_INFO.OC_REGION]}
            optionData={REGION_LIST}
            {...restProps}
          /> :  <SelectItem
            id={RES_INFO.OC_REGION}
            label={RES_INFO_TEXT[RES_INFO.OC_REGION]}
            initialValue={data[RES_INFO.OC_REGION]}
            optionData={REGION_LIST_BILLCHECK}
            {...restProps}
          />
        }
       
        <SelectItem
          id={RES_INFO.PROJECT_INFO_ID}
          label={RES_INFO_TEXT[RES_INFO.PROJECT_INFO_ID]}
          initialValue={data[RES_INFO.PROJECT_INFO_ID]}
          optionData={deptAllProjectList}
          required={proRequired}
          {...restProps}
        />
        <TextAreaItem
          id={RES_INFO.PRODUCT_SEPCS}
          label={RES_INFO_TEXT[RES_INFO.PRODUCT_SEPCS]}
          initialValue={data[RES_INFO.PRODUCT_SEPCS]}
          {...restProps}
        />
        <DatePickerItem
          id={RES_INFO.OPEN_TIME}
          label={RES_INFO_TEXT[RES_INFO.OPEN_TIME]}
          initialValue={data[RES_INFO.OPEN_TIME]}
          disabledDate={current => current && current >= moment().endOf('day')}
          {...restProps}
        />
        <InputNumItem
          type="number"
          step={0.01}
          id={RES_INFO.MONTH_FEE}
          label={RES_INFO_TEXT[RES_INFO.MONTH_FEE]}
          initialValue={data[RES_INFO.MONTH_FEE]}
          {...restProps}
        />
      </Form>
    )
  }
}

export default FiledForm;
