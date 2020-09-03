
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Spin, Radio,Icon, message } from 'antd';
import StackPanel from '@/components/Common/StackPanel';
import {
  getBill,fetchTypeExport
} from '../constant';

import TableList from './TableList'
import styles from '../index.less';



@connect(({ newDepartBill,billStatistics, loading }) => ({
  ...newDepartBill,
  allProductNameList: billStatistics.allProductNameList,
  loading: !!loading.effects['newDepartBill/listInstance'],
  tableLoading: !!loading.effects['newDepartBill/listInstance'],
}))
class BillDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      region: 'all',
      regionList:[],
    };
    this.billNo = getBill(props);
  }

  componentDidMount() {
    this.getRegionList();
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
            this.setState({
              regionList:e.resData
            })
          }
        }
      })
    
    }



  onSearch = () => {
    this.queryList({});
  }

  // 切换区域
  onRegionChange = e => {
    this.tableList.onReset();
    this.setState({ region: e.target.value }, () => {
      this.tableList.queryList();
    });
  };



// 获取全部资源类型
queryAllProductName = () => {
  const { dispatch } = this.props;
  return dispatch({
    type: 'billSend/queryAllProductName',
  });
}


  // 当前月度部门部门下 - 所有的项目
  queryDeptBillProject = () => {
    const { dispatch,  } = this.props;
    return dispatch({
      type: 'billSend/queryDeptBillProject',
      payload: {
        departmentId:this.id,
        billNo:this.billNo,
      }
    });
  }

  onExport = (params={})=>{
    message.info('正在导出中，请稍等');
    const { payload } = this.tableList.state;
    params={
      ...payload
    }
    fetchTypeExport({
      type:'GET',
      url:'oc/bill/deptBillInfo/listInstance/export',
      param:params,
      name:'zhangdan'
    });
  }


  render() {
    const { region ,regionList,} = this.state;
    const {
      loading,
    } = this.props;
    // const { name,type } = location.query;


    // const { resData } = this.state;


    return (
      <div className={styles.tabPage} style={{padding:'0 30px 10px'}}>
        <Spin spinning={loading} className={styles.detail}>
          <div style={{display:'flex',justifyContent: 'space-between'}}>
            <Radio.Group
              value={region}
              onChange={this.onRegionChange}
              style={{ margin: '20px 0 0' }}
            >
              <Radio.Button value="all">全部区域</Radio.Button>
              {regionList.map(item => (
                <Radio.Button value={item.cloudRegion} key={item.cloudRegion}>{item.regionName}</Radio.Button>
              ))}
            </Radio.Group>
            <div style={{marginTop:'20px',}}>
              <StackPanel>
                <StackPanel.RightAlice>
                  <a
                    key="export"
                    onClick={this.onExport}
                    style={{minWidth:'100px'}}
                  >
                    <Icon type="download" style={{ marginRight: 8 }} />
                    导出表格
                  </a>
                </StackPanel.RightAlice>
              </StackPanel>
            </div>
          </div>
          
          <TableList 
            billNo={this.billNo} 
            wantedList={['all']} 
            url='newDepartBill/listInstance' 
            onRef={(ref) => {this.tableList = ref}}
            region={region}
          />
        </Spin>
      </div>
    );
  }
}

export default BillDetail;
