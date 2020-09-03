import React, { PureComponent } from 'react';
import { Spin, Row, Col, } from 'antd';
import { connect } from 'dva';
import Title from '@/components/Common/Title';
import { getFloatStr } from '@/utils/utils';
import { getTime ,transformMomAndYoy ,transformData} from '../constant'

import styles from '../index.less';



@connect(({ newDepartBill, loading }) => ({
  ...newDepartBill,
  loading: !!loading.effects['newDepartBill/queryDeptBillDetail'],
  tableLoading: !!loading.effects['newDepartBill/queryDeptProjProdList'],
}))

class ProjectInfo extends PureComponent {
  constructor(props) {
    super(props);
    const { match , location} =this.props;
    const { billNo } = match.params;
    const { projectName } = location.query;
    this.state = {
      
      billStatic:{
        billNo:'' , 
        productNum:'' , 
        fee:'' , 
        mom:'' , 
        yoy:''
      },
    };
    this.billNo = billNo;
    this.projectName = projectName;
  }

  componentDidMount() {
    const { onRef }= this.props;
    if(onRef){
      onRef(this);
    }
    this.queryDetail();
  }

  // 详情接口
  queryDetail = () => {
    const { dispatch,  region} = this.props;
    dispatch({
      type: 'newDepartBill/billSumInfo',
      payload: {
        region:region==='all' ? undefined : region,
        billNo:this.billNo,
        projectName:this.projectName,
      },
      callback:e =>{
       this.setState({
        billStatic:e.resData
       })
      }
    });
  };

  
  render() {
    const {   billStatic} = this.state;
    const { loading } = this.props;
    const {productNum , fee , mom , yoy } = billStatic;


    return (
      <Spin spinning={loading} className={styles.detail}>
        <div className={styles.detailInfo}>
          <Title level="h3">账单统计</Title>
          <Row>
            <Col span={6}>
              资源数量：{ transformData(productNum)  }
            </Col>
            <Col span={6}>
              费用总计：{ getFloatStr(fee) }
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              计费周期：{ getTime(this.billNo)}
            </Col>
            <Col span={6}>
              环比：{ transformMomAndYoy(mom)  }
            </Col>
            <Col span={6}>
              同比：{ transformMomAndYoy(yoy)  }
            </Col>
          </Row>
        </div>
      </Spin>
    );
  }
}

export default ProjectInfo;
