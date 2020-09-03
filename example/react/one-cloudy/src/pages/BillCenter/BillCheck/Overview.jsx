import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Link } from 'umi';
import { Icon, Spin,Input,Table,Button } from 'antd';
import StackPanel from '@/components/Common/StackPanel';
import AddTooltip from '@/components/Common/AddTooltip';
import { getFloatStr } from '@/utils/utils';
import {   LINKRATIO_AND_YAERONYEAR ,transformMomAndYoyBillCheck ,transformData} from '../constant';

import styles from './index.less';

@connect(({ billCheck, loading }) => ({
  ...billCheck,
  loading: !!loading.effects['billCheck/getDeptSummaryBillPageList'],
}))
class Overview extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // department: ''
      searchText:null
    };
  }


  async componentDidMount() {
    await this.getDeptSummaryBillPageList();
  }

  getDeptSummaryBillPageList = (params={}) => {
    const { dispatch, location } = this.props;
    const { billNo} = location.query;
    params.page =params&& params.page || 1;
    params.limit = params&&params.limit || 10;
    const payload ={
        billNo,
        ...params,
    }
    this.setState({
      exportData:payload
    })
    dispatch({
      type: 'billCheck/getDeptSummaryBillPageList',
      payload,
    });
  };

  onSearch = (value) => {
    this.getDeptSummaryBillPageList({
      department: value,
    });
  }

  getData = (record, key, showKey) => {
    const { deptRegionBillInfos } = record;
    if (!Array.isArray(deptRegionBillInfos)) {
      return '-';
    }
    const data = deptRegionBillInfos.find(item => item.region === key);
    if (data) {
      if(showKey==='yearOnYear'||showKey==='linkRatio'){
        if(data[showKey] === LINKRATIO_AND_YAERONYEAR){
          return '-'
        }
        return data[showKey]+'%';
      }
      return data[showKey];
    }
    return '-';
  }

  onChange=  (pagination,filters,sorter) => {
    // sidx  排序字段, 可选值: (bill_no(账单号) 、department_cnts(部门数) 、product_cnts(资源数) 、bill_amt(金额) 非必填
    // order 排序方式, 可选值: asc(升序) 、desc(降序)
    // this.getDeptSummaryBillPageList({ page: pageIndex.toString(), limit: '10' });
    const {searchText} = this.state;
    let params = {};
    if (sorter && JSON.stringify(sorter) !== '{}') {
      params = {
        order: sorter.order === 'ascend' ? 'asc' : 'desc',
        // orderRegion: sorter.columnKey&&sorter.columnKey.split('.')[0],
        // sidx: sorter.columnKey&&sorter.columnKey.split('.')[1],
        sidx:sorter.columnKey,
      };
      this.setState({
        ...params,
      });
    }
    this.getDeptSummaryBillPageList({
      page: pagination.current,
      limit: pagination.pageSize,
      order: '',
      sidx: '',
      department:searchText,
      ...params,
    });
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder='搜索部门名称'
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          搜索
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          重置
        </Button>
      </div>
    ),
    filterIcon: () => {
      const { searchText } = this.state;
      return(
        <Icon type="search" style={{ color:searchText?'#1890ff':'rgba(0, 0, 0, 0.85)' }} />
      )
    },
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
  });

  handleSearch = (selectedKeys) => {

    this.setState({
      searchText: selectedKeys[0],
    },()=>{
      this.onSearch(selectedKeys[0])
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' },()=>{
      this.onSearch();
    });
  };

  onExport = ()=>{
      const { exportData } = this.state;
      const { dispatch } = this.props;
      dispatch({
        type: 'billCheck/getDeptBillListExport',
        payload: {
          ...exportData,
        }
      })
  }

  render() {
    const { loading , deptSummaryBillPageList={} } = this.props;
    const { searchText } = this.state;

    const { size, total, current, records } = deptSummaryBillPageList;

    const columns = [
      {
        title: searchText || '部门',
        dataIndex: 'department',
        key: 'department',
        fixed: 'left',
        width:200,
        className: `${styles.text} ${searchText?styles.haveSearchContent:''}`,
        render: (projectName, record) => {
          const { departmentId, billNo , department} = record;
          const url = `/manage/bill-center/billCheck/billdetails/dept/${billNo}/${departmentId}?name=${ department ||'-'}&type=overview`;
          return (
            <AddTooltip text={projectName}>
              <Link to={url} style={{color:'#1890ff !important'}}>{projectName || '-'}</Link>
            </AddTooltip>
          );
        },
        ...this.getColumnSearchProps('department'),
      },
      {
        title: '所有区域总计',
        dataIndex: 'projProdtypeCnts',
        className: styles.borderRigh,
        children: [
          {
            title: '项目数',
            key: 'deptProjCnt',
            dataIndex: 'deptProjCnt',
            sorter: true,
            // render: (_, record) => this.getData(record, 'all', 'deptProjCnt'),
            render:_=>transformData(_),
          },
          {
            title: '资源数',
            key: 'deptProdCnts',
            dataIndex: 'deptProdCnts',
            sorter: true,
            // render: (_, record) => this.getData(record, 'all', 'deptProdCnts'),
            render:_=>transformData(_),
          },
          {
            title: '费用',
            key: 'deptProdFee',
            dataIndex: 'deptProdFee',
            sorter: true,
            // render: (_, record) => this.getData(record, 'all', 'deptProdFee'),
            render:_=>getFloatStr(_),
          },
          {
            title: '环比',
            key: 'linkRatio',
            dataIndex: 'linkRatio',
            sorter: true,
            // render: (_, record) => this.getData(record, 'all', 'linkRatio'),
            render:_=>transformMomAndYoyBillCheck(_),
          },
          {
            title: '同比',
            key: 'yearOnYear',
            dataIndex: 'yearOnYear',
            className: styles.borderRigh,
            sorter: true,
            // render: (_, record) => this.getData(record, 'all', 'yearOnYear'),
            render:_=>transformMomAndYoyBillCheck(_),
          }, 
        ]
      },
      {
        title: '互联网区',
        dataIndex: 'projProdCnts',
        className: styles.borderRigh,
        children: [
          {
            title: '项目数',
            key: 'publicDeptProjCnt',
            dataIndex: 'publicDeptProjCnt',
            sorter: true,
            // render: (_, record) => this.getData(record, 'cloud-public', 'deptProjCnt'),
            render:_=>transformData(_),
          },
          {
            title: '资源数',
            key: 'publicDeptProdCnts',
            dataIndex: 'publicDeptProdCnts',
            sorter: true,
            // render: (_, record) => this.getData(record, 'cloud-public', 'deptProdCnts'),
            render:_=>transformData(_),
          },
          {
            title: '费用',
            key: 'publicDeptProdFee',
            dataIndex: 'publicDeptProdFee',
            sorter: true,
            // render: (_, record) => this.getData(record, 'cloud-public', 'deptProdFee'),
            render:_=>getFloatStr(_),
          },
          {
            title: '环比',
            key: 'publicLinkRatio',
            dataIndex: 'publicLinkRatio',
            sorter: true,
            // render: (_, record) => this.getData(record, 'cloud-public', 'linkRatio'),
            render:_=>transformMomAndYoyBillCheck(_),
          },
          {
            title: '同比',
            key: 'publicYearOnYear',
            dataIndex: 'publicYearOnYear',
            className: styles.borderRigh,
            sorter: true,
            // render: (_, record) => this.getData(record, 'cloud-public', 'yearOnYear'),
            render:_=>transformMomAndYoyBillCheck(_),
          },
        ]
      },
      {
        title: '专有云区',
        dataIndex: 'projProdFee1',
        className: styles.borderRigh,
        children: [
          {
            title: '项目数',
            key: 'privateDeptProjCnt',
            dataIndex: 'privateDeptProjCnt',
            sorter: true,
            // render: (_, record) => this.getData(record, 'cloud-private', 'deptProjCnt'),
            render:_=>transformData(_),
          },
          {
            title: '资源数',
            key: 'privateDeptProdCnts',
            dataIndex: 'privateDeptProdCnts',
            sorter: true,
            // render: (_, record) => this.getData(record, 'cloud-private', 'deptProdCnts'),
            render:_=>transformData(_),
          },
          {
            title: '费用',
            key: 'privateDeptProdFee',
            dataIndex: 'privateDeptProdFee',
            sorter: true,
            // render: (_, record) => this.getData(record, 'cloud-private', 'deptProdFee'),
            render:_=>getFloatStr(_),
          },
          {
            title: '环比',
            key: 'privateLinkRatio',
            dataIndex: 'privateLinkRatio',
            sorter: true,
            // render: (_, record) => this.getData(record, 'cloud-private', 'linkRatio'),
            render:_=>transformMomAndYoyBillCheck(_),
          },
          {
            title: '同比',
            key: 'privateYearOnYear',
            dataIndex: 'privateYearOnYear',
            className: styles.borderRigh,
            sorter: true,
            // render: (_, record) => this.getData(record, 'cloud-private', 'yearOnYear'),
            render:_=>transformMomAndYoyBillCheck(_),
          },
        ]
      },
      {
        title: '政法行业云区',
        dataIndex: 'projProdFee2',
        className: styles.borderRigh,
        children: [
          {
            title: '项目数',
            key: 'indpubDeptProjCnt',
            dataIndex: 'indpubDeptProjCnt',
            sorter: true,
            // render: (_, record) => this.getData(record, 'cloud-industry-pub', 'deptProjCnt'),
            render:_=>transformData(_),
          },
          {
            title: '资源数',
            key: 'indpubDeptProdCnts',
            dataIndex: 'indpubDeptProdCnts',
            sorter: true,
            // render: (_, record) => this.getData(record, 'cloud-industry-pub', 'deptProdCnts'),
            render:_=>transformData(_),
          },
          {
            title: '费用',
            key: 'indpubDeptProdFee',
            dataIndex: 'indpubDeptProdFee',
            sorter: true,
            // render: (_, record) => this.getData(record, 'cloud-industry-pub', 'deptProdFee'),
            render:_=>getFloatStr(_),
          },
          {
            title: '环比',
            key: 'indpubLinkRatio',
            dataIndex: 'indpubLinkRatio',
            sorter: true,
            // render: (_, record) => this.getData(record, 'cloud-industry-pub', 'linkRatio'),
            render:_=>transformMomAndYoyBillCheck(_),
          },
          {
            title: '同比',
            key: 'indpubYearOnYear',
            dataIndex: 'indpubYearOnYear',
            className: styles.borderRigh,
            sorter: true,
            // render: (_, record) => this.getData(record, 'cloud-industry-pub', 'yearOnYear'),
            render:_=>transformMomAndYoyBillCheck(_),
          },
        ]
      },
      {
        title: '公安行业云区',
        dataIndex: 'projProdFee',
        className: styles.borderRigh,
        children: [
          {
            title: '项目数',
            key: 'indsecuDeptProjCnt',
            dataIndex: 'indsecuDeptProjCnt',
            sorter: true,
            render:_=>transformData(_),
          },
          {
            title: '资源数',
            key: 'indsecuDeptProdCnts',
            dataIndex: 'indsecuDeptProdCnts',
            sorter: true,
            render:_=>transformData(_),
          },
          {
            title: '费用',
            key: 'indsecuDeptProdFee',
            dataIndex: 'indsecuDeptProdFee',
            sorter: true,
            render:_=>getFloatStr(_),
          },
          {
            title: '环比',
            key: 'indsecuLinkRatio',
            dataIndex: 'indsecuLinkRatio',
            sorter: true,
            render:_=>transformMomAndYoyBillCheck(_),
          },
          {
            title: '同比',
            key: 'indsecuYearOnYear',
            dataIndex: 'indsecuYearOnYear',
            className: styles.borderRigh,
            sorter: true,
            render:_=>transformMomAndYoyBillCheck(_),
          },
        ]
      },
    ];

    return (
      <div style={{padding:'0 30px 10px'}} className={styles.overview}>
        <Spin spinning={loading}>
          <StackPanel>
            <StackPanel.RightAlice>
              <a
                key="export"
                onClick={this.onExport}
                style={{marginTop:'20px',marginRight:'24px'}}
              >
                <Icon type="download" style={{ marginRight: 8 }} />
                导出表格
              </a>
            </StackPanel.RightAlice>
          </StackPanel>
          <Table
            rowKey={record => record.projectInfoId}
            dataSource={records}
            columns={columns}
            className={styles.overviewtable}
            scroll={{ x:3000 }}
            onChange={this.onChange}
            pagination={
              total <= size
                ? false
                : {
                    pageSize: size || 10,
                    total,
                    current: current || 1,
                    showSizeChanger: true,
                    pageSizeOptions: [10, 20, 50],
                    onShowSizeChange: (pageIndex, pageSize) => {
                      this.getDeptSummaryBillPageList({
                        page: pageIndex,
                        limit: pageSize,
                      });
                    },
                  }
            }
          />
        </Spin>
      </div>
    );
  }
}

export default Overview;
