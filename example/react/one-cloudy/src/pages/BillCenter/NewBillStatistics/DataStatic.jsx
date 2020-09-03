
import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Tabs,DatePicker ,Icon, message} from 'antd';
import { getTimeInterval} from './constant';
import Overview from './Overview';
import Project from './Project';
import Instance from './Instance';
import styles from './index.less';

const {  RangePicker, } = DatePicker;

const { TabPane } = Tabs;

@connect(({ newDepartBill, loading }) => ({
  ...newDepartBill,
  loading: !!loading.effects['newBillStatistics/getDepartmentBillStatistics'] || !!loading.effects['newBillStatistics/getBillStatistics'] || !!loading.effects['newBillStatistics/getProjectBillStatistics'] || !!loading.effects['newBillStatistics/getInstanceBillStatistics'],
}))
class ListIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectKey: 'overview',
      regionList:[],
      mode: ['month', 'month'],
      value: [],
      dateValue:null,
      isOpen:false,
    };
  }

  componentDidMount(){
    this.getRegionList();
    const { location } = this.props;
    const { type } = location.query;
    this.setState({
      selectKey:type || 'overview',
    })
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
          const regionValueList = [];
          e.resData && e.resData.map(item => {
            item.value = item.cloudRegion;
            item.label = item.regionName;
            regionValueList.push(item.value)
          })
          this.setState({
            regionList:e.resData,
            regionValueList
          })
        }
      }
    })
  }

  handlePanelChange = (value, mode) => {
    const { selectKey } = this.state;
    const dateValue = value && value.map(item=>moment(item).format('YYYYMM'));
    if(this.checkTimeInterval(dateValue)>12){
      message.error('最多选择12个月');
      return false;
    }
    this.setState({
      value,
      dateValue,
      isOpen:false,
      mode: [mode[0] === 'date' ? 'month' : mode[0], mode[1] === 'date' ? 'month' : mode[1]],
    },()=>{
      this.queryData(selectKey);
    });
  };

  handleChange = value => {
    const { selectKey } = this.state;
    const dateValue = value && value.map(item=>moment(item).format('YYYYMM'));
    if(this.checkTimeInterval(dateValue)>12){
      message.error('最多选择12个月');
      return false;
    }
    this.setState({ 
      value,
      dateValue,
      isOpen:false
    },()=>{
      this.queryData(selectKey);
    });
  };

  onChangeTabs = (key) =>{
    this.setState({
      selectKey: key,
    },()=>{
      if(key === 'overview'){
        this.overviewRef.onResetTableListRef();
      }
      if(key === 'project'){
        this.projectRef.onResetTableListRef();
      }
      if(key === 'instance'){
        this.instanceRef.onResetTableListRef();
      }
    });
  }

  // 检测2个月份之间的时间差
  checkTimeInterval = (dateValue) =>{
    const list = getTimeInterval(dateValue);
    return list.length;
  }


  // 根据key值，刷新对应tabs页面数据
  queryData = (key) =>{
    if(key === 'overview'){
      this.overviewRef.queryList();
      this.overviewRef.getBillStatistics();
    }
    if(key === 'project'){
      this.projectRef.queryList();
    }
    if(key === 'instance'){
      this.instanceRef.queryList();
    }
  }


  render() {
    const { selectKey ,value, mode,dateValue,regionList,isOpen,regionValueList} = this.state;
    const { loading } = this.props;

    return (
      <div className={styles.dataStatic}>
        <div className={styles.dataStaticRangePicker}>
          <span>时间:</span>
          <RangePicker 
            style={{width:'300px'}}
            placeholder={['开始月份', '结束月份']}
            format="YYYY-MM"
            value={value}
            mode={mode}
            onChange={this.handleChange} 
            onPanelChange={this.handlePanelChange}
            allowClear={false}
            open={isOpen}
            disabled={loading}
            onFocus={() => {!loading && this.setState({isOpen: true})}}
          />
        </div>
        {
          dateValue ? 
            <Tabs defaultActiveKey={selectKey} onChange={this.onChangeTabs}>
              <TabPane  
                tab={
                  <span>
                    <Icon type="container" />
                    账单统计
                  </span>
                } 
                key="overview" 
              >
                <Overview 
                  onRef={ref =>{ this.overviewRef = ref}}
                  dateValue={dateValue}
                  regionList={regionList}
                  regionValueList={regionValueList}
                />
              </TabPane>
              <TabPane 
                tab={
                  <span>
                    <Icon type="calendar" />
                    项目账单
                  </span>
                } 
                key="project" 
              >
                <Project 
                  onRef={ref =>{ this.projectRef = ref}}
                  dateValue={dateValue}
                  regionList={regionList}
                  regionValueList={regionValueList}
                />
              </TabPane>
              <TabPane 
                tab={
                  <span>
                    <Icon type="schedule" />
                    实例明细
                  </span>
                }
                key="instance" 
              >
                <Instance 
                  onRef={ref =>{ this.instanceRef = ref }}
                  dateValue={dateValue}
                  regionValueList={regionValueList}
                  regionList={regionList}
                />
              </TabPane>
            </Tabs> 
            : 
            <div style={{ padding: '240px 0', textAlign: 'center' }}>
              <Icon type="exclamation-circle" style={{ color: '#1890ff', marginRight: 8 }} />
              请选择时间进行查询
            </div>
          }

      </div>

    );
  }
}

export default ListIndex;