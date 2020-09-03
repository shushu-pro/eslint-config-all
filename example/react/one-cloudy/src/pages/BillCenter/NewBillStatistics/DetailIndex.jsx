import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {  router } from 'umi';
import { Tabs , Icon } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '../index.less';
import style from './index.less';
import Instance from './Instance';

import { BILL_STATIC_DETAIL_INDEX } from '../breadcrumbConstant';


const { TabPane } = Tabs;

@connect(({ billCenter, loading }) => ({
  ...billCenter,
  loading: !!loading.effects['newDepartBill/listRegions'] || !!loading.effects['newDepartBill/listInstance'] || !!loading.effects['newDepartBill/getAllProductName'],
}))
class ProjectIndex extends PureComponent {
  constructor(props) {
    super(props);
    const { location ,} = props;
    const { projectName , chosenTime} = location.query;
    
    this.state = {
      selectKey:'datastatic',
      dateValue: chosenTime && chosenTime.split('-'),
      regionList:[],
      projectName,
    };
  }

  componentDidMount() {
    this.getRegionList();
    this.instanceRef && this.instanceRef.queryList();
  }

  // 获取区域列表
  getRegionList = () =>{
    const { dispatch } = this.props;
    return dispatch({
      type:'newDepartBill/listRegions',
      payload:{
      },
      callback: e =>{
        if(e.code===200){
          e.resData && e.resData.map(item => {
            item.value = item.cloudRegion;
            item.label = item.regionName;
          })
          this.setState({
            regionList:e.resData
          })
        }
      }
    })
  }

  onChange = key => {
    const {selectKey} =  this.state;
    if(selectKey!==key){

        router.push(`./${key}`);

      this.setState({
        selectKey: key,
      });
    }
  };

  render() {

    const { selectKey ,dateValue , regionList ,projectName} = this.state;
    
    const wantedList = ['instanceIdOrName','productName','department','productSepcs','openTime','fee',];

    return (
      <PageHeaderWrapper
        title={projectName}
        breadcrumbList={[BILL_STATIC_DETAIL_INDEX]}
      >
        <div className={`${styles.tabPage} ${style.tabStyle}`}>
          <Tabs defaultActiveKey={selectKey} onChange={this.onChange} activeKey={selectKey}>
            <TabPane  
              tab={
                <span>
                  <Icon type="container" />
                  数据统计
                </span>
              } 
              key="datastatic" 
            />
            <TabPane 
              tab={
                <span>
                  <Icon type="calendar" />
                  报表下载
                </span>
              } 
              key="download" 
            />
          </Tabs>
          <Instance 
            onRef={ref =>{ this.instanceRef = ref }}
            dateValue={dateValue}
            regionList={regionList}
            wantedList={wantedList}
            projectName={projectName}
          />
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default ProjectIndex;
