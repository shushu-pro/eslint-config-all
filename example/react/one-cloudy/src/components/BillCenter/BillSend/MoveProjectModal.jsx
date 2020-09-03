import React from 'react'
import { connect } from 'dva'
import {
  Alert, Form, Radio, Tooltip, Row, Col,
} from 'antd'
import Modals from '@/components/Common/Modals'
import { SelectItem } from '@/components/OperationCenter/FormItem'
import {
  Name, User, Other, File,
} from '@/components/OperationCenter/ProjectInfo'
import {
  RES_INFO,
} from '@/pages/BillCenter/constant'
import { validate } from '@/utils/formx'
import styles from './index.less'

const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 14,
  },
}
@connect(({ billSend, loading }) => ({
  deptBillProjectList: billSend.deptBillProjectList,
  allDeptList: billSend.allDeptList,
  loading: !!loading.effects['billCheck/submitUpdateDeptProject'] ||
  !!loading.effects['billSend/submitUpdateDeptProject'],
}))
@Form.create()

class EditFormModal extends React.Component {
  state = {
    projectData: '',
    projectId: '',
    isValidFutureBill: false,
    regionList: [],
    regionId: undefined, // 选中的区域id
    resources: undefined, // 某个云区下的实例资源数
  }

  // 查询项目详情的接口
  componentDidUpdate (nextProps) {
    const { projectId, regionId, regionList } = this.state
    const { dispatch } = this.props
    const newProjectId = nextProps.form.getFieldValue(RES_INFO.PROJECT_INFO_ID)
    if (newProjectId && newProjectId !== projectId) {
      this.setState({
        projectId: newProjectId,
        regionId: undefined,
        resources: undefined,
        regionList: [],
      })
      nextProps.form.setFieldsValue({
        ocRegion: undefined,
      })
      // const findData = deptBillProjectList.find(item => item.projectId === newProjectId);
      // 不在查询项目详情
      // dispatch({
      //   type: 'billCenter/queryInfo',
      //   payload: {
      //     projectId: newProjectId,
      //     regionId: findData.regionId,
      //   }
      // }).then(res => {
      //   this.setState({
      //     projectData: res,
      //     projectId: newProjectId,
      //   });
      // });
      const { billNo, departmentId } = this.props
      dispatch({
        type: 'billCheck/queryProjcetInfo',
        payload: {
          projectInfoId: newProjectId,
          billNo,
          departmentId,
        },
      }).then((regionList) => {
        this.setState({
          regionList,
        })
      })
    }

    const nextRegionId = nextProps.form.getFieldValue('ocRegion')
    if (nextRegionId !== regionId) {
      if (!nextRegionId) {
        this.setState({
          regionId: nextRegionId,
          resources: undefined,
        })
      } else {
        const nextRegion = regionList.find((item) => item.regionId === nextRegionId)
        this.setState({
          regionId: nextRegionId,
          resources: nextRegion && nextRegion.resources,
        })
      }
    }
  }


  onCancel = () => {
    const { onCancel } = this.props
    this.setState({
      projectData: '',
      projectId: '',
    })
    onCancel()
  }

  onSubmitResult = async () => {
    const {
      form, dispatch, departmentId, allDeptList, billNo, isBillCheck, queryAllData, deptBillProjectList = [],
    } = this.props
    const [ err, values ] = await validate(form)
    if (err) return false
    const findData = allDeptList.find((item) => item.key === values.departmentId)
    // const findRegionId = deptBillProjectList.find(item => item.projectId === values.projectInfoId);

    const { isValidFutureBill, regionId } = this.state
    const { projectInfoId } = values
    const { projectName } = deptBillProjectList.find((item) => item.projectId === projectInfoId)
    dispatch({
      type: isBillCheck ? 'billCheck/submitUpdateDeptProject' : 'billSend/submitUpdateDeptProject',
      payload: {
        ...values,
        billNo,
        departmentName: findData.value,
        isValidFutureBill: String(Number(isValidFutureBill)),
        oldDepartmentId: departmentId, // 旧部门id,必填
        // projectRegionId: findRegionId && findRegionId.regionId, // 新的部门的区域Id
        projectRegionId: regionId,
        deptId: values.departmentId,
        projectName,
        // projectInfoId      项目Id,必填
        // departmentId       新部门id,必填
        // departmentName     新部门名称,必填
        // isValidFutureBill  是否对以后账单生效,,默认为false,true：是，false:否
      },
    }).then(() => {
      isBillCheck && queryAllData()
      this.onCancel()
    })
  }

  onChangeCheck = (e) => {
    this.setState({
      isValidFutureBill: e.target.value,
    })
  }

  render () {
    const {
      visible, form, allDeptList = [], deptBillProjectList = [], departmentId, loading,
    } = this.props
    const {
      projectData, isValidFutureBill, regionList, resources, regionId,
    } = this.state
    if (!visible) {
      return null
    }

    const propsForm = {
      form,
      formItemLayout,
    }
    const propsData = {
      data: projectData,
      formItemLayout,
      unitId: '1',
    }
    // 过滤除当前部门的所有部门
    const deptList = allDeptList.filter((item) => item.key !== departmentId)
    const list = deptBillProjectList.map((item) => ({
      key: item.projectId,
      value: item.projectName,
    }))
    return Modals({
      bodyStyle: {
        padding: 0,
      },
      key: 'move',
      width: 720,
      title: '移动资源',
      content: (
        <div className={styles.editForm}>
          <Alert message="移动项目会将项目下的所有资源实例一起移动到对应部门。（仅在账单中移动，并不会进行实际的资源迁移）" type="info" />
          <Form key="move">
            <SelectItem
              id={RES_INFO.PROJECT_INFO_ID}
              label="需要移动的项目"
              optionData={list}
              // onChange={this.onProjectChange}
              // form={Form}
              {...propsForm}
            />
            {projectData && (
              <div>
                <Name {...propsData} />
                <User {...propsData} />
                <Other {...propsData} />
                <File {...propsData} id="attachFileLinks" label="项目附件" />
              </div>
            )}


            <SelectItem
              allowClear
              label="该项目下的资源区域"
              id="ocRegion"
              optionData={regionList.map((item) => ({ key: item.regionId, value: item.regionName || item.regionId }))}
              {...propsForm}
            />
            {regionId && (
              <Row>
                <Col span={8}>&nbsp;</Col>
                <Col span={16}>
                  <div style={{ paddingLeft: '20px', color: '#999', marginBottom: '20px' }}>
                    该项目在该区域中存在
                    <span style={{ color: '#40a9ff', padding: '0 4px' }}>{resources}</span>
                    条资源实例
                  </div>
                </Col>
              </Row>
            )}

            <SelectItem
              allowClear
              label="移动至"
              id={RES_INFO.DEPART_MENT_ID}
              optionData={deptList}
              {...propsForm}
            />

            <Radio.Group onChange={this.onChangeCheck} value={isValidFutureBill}>
              <Radio value={false}>只对本期账单生效</Radio>
              <Radio value>
                <Tooltip placement="top">
                  对今后账单都生效
                </Tooltip>
              </Radio>
            </Radio.Group>
          </Form>
        </div>
      ),
      visible,
      onCancel: this.onCancel,
      okText: '移动账单',
      onOk: this.onSubmitResult,
      okButtonProps: {
        loading,
      },

    })
  }
}

export default EditFormModal
