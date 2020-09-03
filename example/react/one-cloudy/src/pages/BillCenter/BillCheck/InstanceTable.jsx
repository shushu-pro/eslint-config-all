import React from 'react';
import { withRouter } from 'dva/router';
import PropTypes from 'prop-types';
import { Link } from 'umi';
import { connect } from 'dva';
import { Table,Checkbox ,Row, Col,Input } from 'antd';
import StackPanel from '@/components/Common/StackPanel';
import AddTooltip from '@/components/Common/AddTooltip';

import styles from './index.less';
import {REGION_LIST_BILLCHECK} from '../constant';

const { Search } = Input;

@connect(({ billCheck, loading }) => ({
  ...billCheck,
  loading: !!loading.effects['billCheck/getDeptSummaryBillPageList'],
}))
class InstanceTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ocRegions: '',
      selectModalVisible:false,
      checkedList:[
        {
          id:1,
          bool:true,
          name:'all'
        },
        {
          id:2,
          bool:false,
          name:'gongong'
        },
        {
          id:3,
          bool:false,
          name:'zhuanyou'
        },
        {
          id:4,
          bool:true,
          name:'gongan'
        },
      ],
      checkedListFlag:false,
    };
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  componentDidMount(){
    this.mouseUpEvent();
    const {checkedList} = this.state;
    const flag = checkedList.every(item=>item.bool);
    this.setState({
      checkedListFlag:flag
    })
  }

  componentWillUnmount() {
    window.removeEventListener("mouseup", this.onMouseUp);
  }

  mouseUpEvent(){
    window.addEventListener("mouseup", this.onMouseUp);
  }

  onMouseUp = (e)=>{
    const con = document.getElementById('selectModal');
    if(con) {
      if(!con.contains(e.target)) {
        this.setState({
          selectModalVisible:false
        })
      }
    }
  }

  getParams = params => {
    const { match } = this.props;
    const { billNo, departmentId } = match.params;
    const { selectKey, value, ocRegions, order, sidx } = this.state;
    return {
      billNo,
      departmentId,
      [selectKey]: value,
      ocRegions,
      order,
      sidx,
      ...params,
    };
  };

  queryList = params => {
    const { queryList } = this.props;
    queryList(this.getParams(params));
  };

  onExport = params => {
    const { onExport } = this.props;
    onExport(this.getParams(params));
  };

  // table的操作
  onChange = (pagination, filters, sorter) => {
    // billNo （必填）
    // departmentId(必填)
    // ocRegions(非必填, 多个以逗号隔开，可选值: cloud - industry - pub、cloud - private、cloud - public）
    //   sidx  排序字段, 可选值: open_time(开通时间) 、monthfee(费用) 非必填
    //   order 排序方式, 可选值: asc(升序) 、desc(降序)
    let params = {
      page: pagination.current,
      limit: pagination.pageSize,
      order: '',
      sidx: '',
    };
    if (filters && JSON.stringify(filters) !== '{}') {
      params = {
        ocRegions: filters.ocRegion.join(','),
      };
    }
    if (sorter && JSON.stringify(sorter) !== '{}') {
      params = {
        ...params,
        order: sorter.order === 'ascend' ? 'asc' : 'desc',
        sidx: sorter.columnKey,
      };
    }
    this.setState({
      ...params,
    });
    this.queryList({
      ...params,
    });
  };

  // 搜索
  queryData = ({ selectKey, value }) => {
    this.setState(
      {
        selectKey,
        value,
      },
      () => {
        this.queryList({
          [selectKey]: value,
        });
      }
    );
  };


  // 账单按区域确认或取消核对
  onChangeCheckState = ()=>{
    const {checkedListFlag,checkedList}= this.state;
    const { dispatch,match } = this.props;
    const { billNo } = match.params;
    const nameList = [];

    checkedListFlag ? checkedList.forEach(item=>nameList.push(item.name)) : checkedList.forEach(item=>{
      if(!item.bool){
        nameList.push(item.name)
      }
    })

    dispatch({
      type:checkedListFlag?'billCheck/unCheckRegionBill':'billCheck/checkRegionBill',
      payload:{
        billNo,
        ocRegion:nameList.join(',')
      }
    })
  }

  onChangeCheck = ()=>{
    // console.log('checked = ', checkedValues);
  }

  onChangeSelectModalVisible=()=>{
    const {selectModalVisible} = this.state;
    this.setState({
      selectModalVisible:!selectModalVisible
    })
  }

  onSearch = ()=>{

  }

  render() {
    const { tableData = {}, loading ,type,match} = this.props;
    const {selectModalVisible,checkedListFlag } = this.state;
    const { billNo } = match.params;

    const { totalCount, list, pageSize, currPage } = tableData;


    const columns = type==='area'?[
      {
        title: '部门',
        dataIndex: 'department',
        render:(department,record)=>{
          const { departmentId,seqno } = record;
          const url = `/manage/bill-center/billCheck/billdetails/area/${billNo}/${seqno}/${departmentId}`;
          return(
            <AddTooltip text={department}>
              <Link to={url}>{department || '-'}</Link> 
            </AddTooltip>
          )
        }
      },
      {
        title: '项目数',
        width: 80,
        dataIndex: 'deptProjCnt',
        sorter:true
      },
      {
        title: '资源数',
        dataIndex: 'projectName1',
        sorter:true
      },
      {
        title: '费用',
        dataIndex: 'deptProdFee',
        sorter:true
      },
      {
        title: '环比',
        dataIndex: 'linkRatio',
        sorter:true
      },
      {
        title: '同比',
        dataIndex: 'yearOnYear',
        sorter:true
      },

    ]:
    [
      {
        title: '产品名称',
        dataIndex: 'productLabel',
        render:(productLabel,record)=>{
          const { departmentId,seqno } = record;
          const url = `/manage/bill-center/billCheck/billdetails/product/${billNo}/${seqno}/${departmentId}`;
          return(
            <AddTooltip text={productLabel}>
              <Link to={url}>{productLabel || '-'}</Link> 
            </AddTooltip>
          )
        }
      },
      {
        title: '产品大类',
        width: 80,
        dataIndex: 'productGroupName',
      },
      {
        title: '资源数',
        dataIndex: 'projectName1',
        sorter:true
      },
      {
        title: '费用',
        dataIndex: 'deptProdFee',
        sorter:true
      },
      {
        title: '环比',
        dataIndex: 'linkRatio',
        sorter:true
      },
      {
        title: '同比',
        dataIndex: 'yearOnYear',
        sorter:true
      },
    ]
    ;

    return (
      <div className="billcheck_InstanceTable" style={{ padding: 24, background: '#fff' }}>
        <div style={{display:'flex',justifyContent: 'space-between'}}>

          <StackPanel>
            <Search
              placeholder="请输入部门名称查询"
              onSearch={this.onSearch}
              style={{ width: 200 }}
              className={styles.search}
            />

          </StackPanel>
          <div className={styles.billcheck_rightBtnArea} style={{display:type==='area'?'block':'none'}}>
            <span className={`${styles.billcheck_rightBtn} ${checkedListFlag?styles.isChecked:styles.unChecked}`} onClick={this.onChangeCheckState}>该区域数据已核对</span>
            <span className={`${styles.billcheck_rightBtn} `} onClick={this.onChangeSelectModalVisible}>发送账单</span>
            <div className={styles.selectModal} style={{display:selectModalVisible?'block':'none'}} id='selectModal'>
              <div className={styles.selectLists}> 
                <div className={styles.selectListsRow}>
                  <Checkbox.Group style={{ width: '100%' }} onChange={this.onChangeCheck}>
                    {
                      REGION_LIST_BILLCHECK.map(item=>(
                        <Row style={{marginBottom:'10px'}} key={item.key}>
                          <Col span={16} style={{textAlign:'left'}}>
                            {item.value}
                          </Col>
                          <Col span={8}>
                            <Checkbox value={item.key} />
                          </Col>
                        </Row>
                        ))
                    }
                  </Checkbox.Group>
                </div>
              </div>
              <div className={styles.selectBtn}>
                <span onClick={this.onChangeSelectModalVisible}>取消</span>
                <span>发送</span>
              </div>
            </div>
          </div>
        </div>
        <Table
          style={{ marginTop: '24px', background: '#fff', overflow: 'auto' }}
          rowKey={record => record.seqno}
          dataSource={list}
          columns={columns}
          onChange={this.onChange}
          loading={loading}
          pagination={
            totalCount <= pageSize
              ? false
              : {
                  pageSize: pageSize || 10,
                  total: totalCount,
                  current: currPage || 1,
                  showSizeChanger: true,
                  pageSizeOptions: ['10', '20', '50'],
                  onShowSizeChange: (pageIndex, size) => {
                    this.onChange({
                      current: pageIndex,
                      pageSize: size,
                    });
                  },
                }
          }
        />
      </div>
    );
  }
}

InstanceTable.defaultProps = {

};

InstanceTable.propTypes = {
  loading: PropTypes.bool.isRequired,
  tableData: PropTypes.object.isRequired,
  queryList: PropTypes.func.isRequired,
  onExport: PropTypes.func.isRequired,
};

export default withRouter(InstanceTable);
