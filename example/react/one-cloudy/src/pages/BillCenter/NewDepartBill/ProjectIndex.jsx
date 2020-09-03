import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Spin,Radio} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Title from '@/components/Common/Title';
import ProjectInfo from './ProjectInfo';
import TableList from './TableList'
import { ALL_DEPT_DETAIL_MAP_NEWDEPARTBILL } from '../breadcrumbConstant';


@connect(({ billCenter, loading }) => ({
  ...billCenter,
  loading: !!loading.effects['newDepartBill/listRegions'] || !!loading.effects['newDepartBill/listInstance'] || !!loading.effects['newDepartBill/getAllProductName'],
}))
class ProjectIndex extends PureComponent {
  constructor(props) {
    super(props);
    const { location ,match} = props;
    const { projectName } = location.query;
    const { billNo } = match.params
    this.state = {
      projectName,
      billNo,
      regionList:[],
      region: 'all',
    };
    this.projectNameUrl = projectName
  }

  componentDidMount() {
    this.getRegionList();
  }


  queryProjectListExport = () => {
    const { dispatch, match } = this.props;
    const { departmentId, projectId, billNo } = match.params;
    dispatch({
      type: 'billCenter/queryProjectListExport',
      payload: {
        ...this.state,
        departmentId,
        projectId,
        billNo,
      },
    });
  };

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

    onRegionChange = (e) =>{

    this.tableList.onReset();
    this.setState({ region: e.target.value  }, () => {
      this.tableList.queryList();
      this.projectInfo.queryDetail();
    });

    }

  render() {
    const { loading}= this.props;
    const { projectName ,billNo,regionList, region} = this.state;


    const wantedList = ['instanceIdOrName','productName','productSepcs','openTime','monthfee']

    const urlPath = {
      billNo ,
    }

    return (
      <PageHeaderWrapper
        title={projectName}
        breadcrumbList={ALL_DEPT_DETAIL_MAP_NEWDEPARTBILL(urlPath)}
      >
        <Spin spinning={loading}>
          <div style={{background:'#fff',padding:'5px 30px 10px',minHeight:'751px'}}>
            <Radio.Group
              value={region}
              onChange={this.onRegionChange}
              style={{ margin: '20px 0 0' }}
            >
              <Radio.Button value="all">全部</Radio.Button>
              {regionList&& regionList.length>0 && regionList.map(item => (
                <Radio.Button value={item.cloudRegion}>{item.regionName}</Radio.Button>
              ))}
            </Radio.Group>
            <ProjectInfo 
              {...this.props} 
              onRef={ref => {this.projectInfo = ref}}
              region={region}
            />
            <Title level="h3">实例明细</Title>
            <div style={{marginTop:'-20px'}}>
              <TableList 
                projectNameUrl={this.projectNameUrl}
                billNo={billNo} 
                wantedList={wantedList} 
                url='newDepartBill/listInstance' 
                projectName={projectName} 
                onRef={ref => {this.tableList = ref}}
                region={region}
              />
            </div>
            
          </div>
        </Spin>
      </PageHeaderWrapper>
    );
  }
}

export default ProjectIndex;
