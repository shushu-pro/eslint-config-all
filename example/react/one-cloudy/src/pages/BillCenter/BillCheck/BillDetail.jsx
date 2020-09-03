/**
 * match的type：账单总览和按区域查看点击是dept，按产品查看点击是prod
 * location的type：账单总览overview，按区域查看area，按产品查看product
 */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Spin, Radio, Table, Icon, DatePicker, Input, Button, Modal
} from 'antd';
import moment from 'moment';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import StackPanel from '@/components/Common/StackPanel';
import AddTooltip from '@/components/Common/AddTooltip';
import { getFloatStr } from '@/utils/utils';
import InfoModal from '@/components/BillCenter/BillSend/InfoModal';
import AddFormModal from '@/components/BillCenter/BillSend/AddFormModal';
import MoveProjectModal from '@/components/BillCenter/BillSend/MoveProjectModal';
import EditFormModal from '@/components/BillCenter/BillSend/EditFormModal';
import DeleteFormModal from '@/components/BillCenter/BillSend/DeleteFormModal';
import Modals from '@/components/Common/Modals';
import {
  REGION_LIST_BILLCHECK,
  getDate,
} from '../constant';
import { ALL_DEPT_DETAIL_MAP_CHECK } from '../breadcrumbConstant';
import styles from '../index.less';
import styles1 from './index.less';


// const { confirm } = Modal;

const { RangePicker } = DatePicker;

@connect(({ billCheck, billStatistics, loading }) => ({
  ...billCheck,
  allProductNameList: billStatistics.allProductNameList,
  loading: !!loading.effects['billCheck/getDeptMonthProdList'],
  tableLoading: !!loading.effects['billCheck/getDeptMonthProdList'],
}))
class BillDetail extends PureComponent {
  constructor(props) {
    super(props);
    const { match, location: { query: { name } } } = props;
    const { billNo, type, id } = match.params;
    this.state = {
      ocRegion: 'all',
      tableData: {},
      recordData: {},
      visible: false,
      productNameList: [],
      sortedInfo: {
        columnKey: '',
        order: ''
      },
      filteredInfo: {
        productName: []
      },
      isBillCheck: true,
      departmentName: '',
    };

    this.billNo = billNo;
    this.type = type;
    this.id = id;
  }

  componentDidMount() {
    this.queryAllData();
    this.queryAllDept();
    this.getAllProductName();
  }

  queryAllData = () => {
    this.queryList();
  };

  // 获取所有的部门
  queryAllDept = async () => {
    const { dispatch } = this.props;
    return dispatch({
      type: 'billSend/queryAllDept',
    });
  }

  getAllProductName = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'billCheck/getAllProductName',
      payload: {},
      callback: e => {
        if (e.code === 200) {
          const { resData } = e;
          if (Array.isArray(resData)) {
            const list = [];
            resData.forEach(item => {
              list.push({
                value: item,
                text: item,
              });
            });
            this.setState({
              productNameList: list
            });
          }
        }
      }
    });
  }

  // 资源列表接口
  queryList = params => {
    const {
      ocRegion, instanceName, projectName, startTime, endTime, productNames, departmentName,
    } = this.state;
    const { dispatch } = this.props;
    const { match, location: { query: { name } } } = this.props;

    const payload = {
      ...params,
      billNo: this.billNo,
      departmentId: this.type === 'dept' ? this.id : '',
      productName: this.type === 'dept' ? '' : this.id,
      ocRegion,
      instanceName,
      projectName,
      startTime,
      endTime,
      departmentName,
      productNames,
    };
    this.setState({
      exportData: payload
    });

    dispatch({
      type: 'billCheck/getDeptMonthProdList',
      payload,
      callback: e => {
        if (e.code === 200) {
          this.setState({
            tableData: e.resData
          });
        }
      }
    });
  };


  onSearch = () => {
    this.queryList({});
  }

  // 切换区域
  onRegionChange = e => {
    this.onReset();
    this.setState({ ocRegion: e.target.value }, () => {
      this.queryAllData();
    });
  };

  // 重置排序和筛选框内容
  onReset = () => {
    this.clearFilters();
    this.setState({
      instanceName: '',
      projectName: '',
      sortedInfo: {
        columnKey: '',
        order: ''
      },
      filteredInfo: {
        productNameList: []
      },
      productNames: '',
      startTime: null,
      endTime: null,
      departmentName: '',
    });
  }

  onChangeTime = (value, dateString) => {
    this.setState({
      startTime: dateString[0],
      endTime: dateString[1]
    }, () => {
      this.queryList();
    });
  }

  getColumnTimeSearchProps = () => ({
    filterDropdown: () => {
      const { startTime, endTime } = this.state;
      return (
        <div style={{ padding: 8 }}>
          <RangePicker onChange={this.onChangeTime} value={[startTime && moment(startTime) || null, endTime && moment(endTime) || null]} />
        </div>
      );
    },
    filterIcon: () => {
      const { startTime, endTime } = this.state;
      return <Icon type="schedule" style={{ color: startTime && endTime ? '#1890ff' : undefined }} />;
    },
  });


  // 查看某条资源
  onShow = (e, record) => {
    this.setState({
      visible: true,
      recordData: record,
    });
  };

  onHide = () => {
    this.setState({
      visible: false,
      recordData: {},
    });
  };

  // table的操作
  onChange = (pagination, filters, sorter) => {
    // billNo （必填）
    // departmentId(必填)
    // regions(非必填, 多个以逗号隔开，可选值: cloud - industry - pub、cloud - private、cloud - public）
    //   sidx  排序字段, 可选值: open_time(开通时间) 、monthfee(费用) 非必填
    //   order 排序方式, 可选值: asc(升序) 、desc(降序)
    let params = {
      page: pagination.current,
      limit: pagination.pageSize,
      order: '',
      sidx: '',
    };
    if (filters && JSON.stringify(filters) !== '{}') {
      let productNames = filters.productName && filters.productName.join(',') || '';
      productNames = productNames === '' ? null : productNames + ',';
      params = {
        productNames,
        ...params
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
      sortedInfo: sorter,
      filteredInfo: filters,
      ...params,
    }, () => {
      this.queryList({
        ...params,
      });
    });
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, clearFilters }) => {
      let placeholder;
      if (dataIndex === 'instanceName') {
        placeholder = '搜索实例ID/名称';
      }
      if (dataIndex === 'projectName') {
        placeholder = '搜索项目名称';
      }
      if (dataIndex === 'department') {
        placeholder = '搜索部门名称';
      }
      this.clearFilters = clearFilters;
      return (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => {
              this.searchInput = node;
            }}
            placeholder={placeholder}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => this.handleSearch(selectedKeys, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, dataIndex)}
            icon="search"
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            搜索
            </Button>
          <Button onClick={() => this.handleReset(clearFilters, dataIndex)} size="small" style={{ width: 90 }}>
            重置
            </Button>
        </div>
      );
    },
    filterIcon: () => {
      const { instanceName, projectName, departmentName } = this.state;
      let color;
      if (dataIndex === 'instanceName') {
        if (instanceName) {
          color = '#1890ff';
        } else {
          color = 'rgba(0, 0, 0, 0.85)';
        }
      }
      if (dataIndex === 'projectName') {
        if (projectName) {
          color = '#1890ff';
        } else {
          color = 'rgba(0, 0, 0, 0.85)';
        }
      }
      if (dataIndex === 'departmentName') {
        if (departmentName) {
          color = '#1890ff';
        } else {
          color = 'rgba(0, 0, 0, 0.85)';
        }
      }
      return (
        <Icon type="search" style={{ color }} />
      );
    },
    onFilter: (value, record) => record[dataIndex]
      .toString()
      .toLowerCase()
      .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
  });

  handleSearch = (selectedKeys, dataIndex) => {
    this.setState({
      [dataIndex]: selectedKeys[0]
    }, () => {
      this.onSearch();
    });
  };

  handleReset = (clearFilters, dataIndex) => {
    clearFilters();

    this.setState({
      [dataIndex]: ''
    }, () => {
      this.onSearch();
    });
  };


  // 当前部门下 - 某区域 所有的项目
  queryDeptAllProject = params => {
    const { dispatch } = this.props;
    return dispatch({
      type: 'billSend/queryDeptAllProject',
      payload: {
        ...params,
      }
    });
  }

  // 编辑某条资源
  onEditShow = (e, record) => {
    this.queryDeptAllProject({
      departmentId: record.departmentId,
      ocRegion: record.ocRegion,
    }).then(() => {
      this.setState({
        editVisible: true,
        recordData: record,
      });
    });
  }

  onEditHide = () => {
    this.setState({
      editVisible: false,
    });
  }

  onDeleteShow = (e, record) => {
    this.setState({
      deleteVisible: true,
      recordData: record
    });
  }

  onDeleteHide = () => {
    this.setState({
      deleteVisible: false
    });
  }

  // 删除某条资源
  onDel = (e, record) => {
    const { dispatch, match } = this.props;
    const { billNo } = match.params;
    const that = this;

    return Modals({
      bodyStyle: {
        padding: 0,
      },
      key: 'addModals',
      width: 700,
      title: '新增资源',
      // confirmLoading: loading,
      content: (
        <div>xxx</div>
      ),
      visible: true,
      footer: [
        <Button key="cancel">取消</Button>,
        <Button key="save" type="primary" style={{ marginRight: 8 }} onClick={() => this.onSubmitResult(false)} loading>仅保存至本期账单</Button>,
        <Button key="allSave" type="primary" onClick={() => this.onSubmitResult(true)} loading>保存并影响后续账单</Button>,
      ],
    });

    // confirm({
    //   title: '确定删除这条资源？',
    //   okText: '确定',
    //   cancelText: '取消',
    //   onOk() {
    //     dispatch({
    //       type: 'billCheck/submitDelete',
    //       payload: {
    //         seqno: record.seqno,
    //         productRegionId: record.productRegionId,
    //         billNo,
    //         productName: record.productName,
    //         departmentId: record.departmentId,
    //       }
    //     }).then(() => {
    //       that.queryAllData();
    //     });
    //   },
    // });
  }

  // 获取全部资源类型
  queryAllProductName = () => {
    const { dispatch } = this.props;
    return dispatch({
      type: 'billSend/queryAllProductName',
    });
  }

  // 新增计费资源
  onAdd = () => {
    this.queryAllProductName().then(() => {
      this.setState({
        addVisible: true,
      });
    });
  }

  // 当前月度部门部门下 - 所有的项目
  queryDeptBillProject = () => {
    const { dispatch, } = this.props;
    return dispatch({
      type: 'billSend/queryDeptBillProject',
      payload: {
        departmentId: this.id,
        billNo: this.billNo,
      }
    });
  }

  // 移动项目
  onMove = () => {
    this.queryDeptBillProject().then(() => {
      this.setState({
        moveVisible: true,
      });
    });
  }


  onExport = () => {
    const { exportData } = this.state;

    const { dispatch } = this.props;
    dispatch({
      type: 'billSend/queryMonthProjectBillExport',
      payload: {
        ...exportData,
      }
    });
  }


  render() {
    const {
      ocRegion, tableData, recordData, visible, instanceName, projectName, departmentName, editVisible, deleteVisible, addVisible, moveVisible, isBillCheck, productNameList, sortedInfo, filteredInfo, startTime, endTime
    } = this.state;
    const {
      loading,
      location,
    } = this.props;
    const { name, type } = location.query;

    const {
      totalCount, pageSize, currPage, list
    } = tableData;

    const columns = [
      {
        title: instanceName || '实例ID/名称',
        dataIndex: 'instanceName',
        className: `${styles1.textNoBorder} ${instanceName ? styles1.haveSearchContent : ''}`,
        render: (_, record) => (
          <div>
            <AddTooltip text={record.instanceId || '-'}>
              {
                record.instanceId
                  ? <a style={{ display: 'block' }} onClick={e => this.onShow(e, record)}>
                    {record.instanceId || '-'}
                  </a>
                  : <div>
                    {record.instanceId || '-'}
                  </div>
              }
            </AddTooltip>
            <AddTooltip text={_ || '-'}>
              {
                record.instanceId
                  ? <div>
                    {record.instanceName || '-'}
                  </div>
                  : <a style={{ display: 'block' }} onClick={e => this.onShow(e, record)}>
                    {record.instanceName || '-'}
                  </a>
              }
            </AddTooltip>
          </div>
        ),
        ...this.getColumnSearchProps('instanceName'),
      },
      // {
      //   title: '资源',
      //   filters: productNameList,
      //   dataIndex: 'productName',
      // },
      {
        title: projectName || '项目',
        dataIndex: 'projectName',
        className: `${styles1.tdwrap} ${projectName ? styles1.haveSearchContent : ''}`,
        render: _ => <AddTooltip text={_}><span className={styles1.ellspan}>{_}</span></AddTooltip>,
        ...this.getColumnSearchProps('projectName'),
      },
      {
        title: '规格',
        dataIndex: 'productSepcs',
        className: `${styles1.tdwrap}`,
        render: _ => <AddTooltip text={_}><span className={styles1.ellspan}>{_}</span></AddTooltip> || '-',
      },
      {
        title: startTime && endTime ? startTime + '-' + endTime : '开通时间',
        dataIndex: 'openTime',
        width: 200,
        className: `${styles1.tdwrap} ${startTime && endTime ? styles1.haveSearchContent : ''}`,
        key: 'open_time',
        ...this.getColumnTimeSearchProps('name'),
        render: _ => getDate(_),
      },
      {
        title: '费用',
        dataIndex: 'monthfee',
        key: 'monthfee',
        sorter: true,
        sortOrder: sortedInfo.columnKey === 'monthfee' && sortedInfo.order,
        render: _ => getFloatStr(_),
      },
      {
        title: '操作',
        dataIndex: 'id',
        key: 'id',
        render: (_, record) => (
          <div>
            <a onClick={e => this.onEditShow(e, record)}>
              <Icon type="form" style={{ marginRight: 8 }} />编辑
            </a>
            <a style={{ marginLeft: 20 }} onClick={e => this.onDeleteShow(e, record)}>
              <Icon type="delete" style={{ marginRight: 8 }} />删除
            </a>
          </div>
        )
      }
    ];

    if (this.type === 'prod') {
      columns.splice(1, 0, {
        title: departmentName || '部门',
        dataIndex: 'department',
        className: `${styles1.textNoBorder} ${departmentName ? styles1.haveSearchContent : ''}`,
        render: _ => <AddTooltip text={_}>{_}</AddTooltip>,
        ...this.getColumnSearchProps('departmentName'),
      });
    } else {
      columns.splice(1, 0, {
        title: '资源',
        filters: productNameList,
        filteredValue: filteredInfo && filteredInfo.productName || null,
        dataIndex: 'productName',
      });
    }

    const urlPath = {
      billNo: this.billNo,
      type,
      id: this.id,
    };

    return (

      <PageHeaderWrapper
        title={name}
        breadcrumbList={ALL_DEPT_DETAIL_MAP_CHECK(urlPath)}
      >
        <div className={styles.tabPage} style={{ padding: '5px 30px 10px' }}>
          <Spin spinning={loading} className={styles.detail}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Radio.Group
                value={ocRegion}
                onChange={this.onRegionChange}
                style={{ margin: '20px 0 0', visibility: this.type === 'overview' ? 'hidden' : 'visible' }}
              >
                <Radio.Button value="all">全部区域</Radio.Button>
                {REGION_LIST_BILLCHECK.map(item => (
                  <Radio.Button value={item.key}>{item.value}</Radio.Button>
                ))}
              </Radio.Group>

              <div style={{ marginTop: '20px', }}>
                <StackPanel>
                  <StackPanel.RightAlice>
                    <a style={{ marginRight: '20px' }} onClick={this.onAdd}><Icon style={{ marginRight: 8 }} type="plus-square" />新增计费资源</a>
                    {this.type === 'prod' ? null : <a style={{ marginRight: '20px' }} onClick={this.onMove}><Icon style={{ marginRight: 8 }} type="login" />移动项目</a>}
                    <a
                      key="export"
                      onClick={this.onExport}
                    >
                      <Icon type="download" style={{ marginRight: 8 }} />
                      导出表格
                    </a>
                  </StackPanel.RightAlice>
                </StackPanel>
              </div>
            </div>

            <Table
              style={{ marginTop: '16px', background: '#fff', overflow: 'auto' }}
              rowKey={record => record.seqno}
              dataSource={list}
              columns={columns}
              onChange={this.onChange}
              className={styles1.tabPage3}
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
          </Spin>
          <InfoModal data={recordData} visible={visible} onCancel={this.onHide} />
          {editVisible
            ? <EditFormModal
              data={recordData}
              visible={editVisible}
              onCancel={this.onEditHide}
              billNo={this.billNo}
              isBillCheck={isBillCheck}
              queryAllData={this.queryAllData}
            />
            : null}
          {deleteVisible && <DeleteFormModal
            data={recordData}
            billNo={this.billNo}
            isBillCheck={isBillCheck}
            visible
            onCancel={this.onDeleteHide}
            queryAllData={this.queryAllData}
          />}
          {addVisible
            ? <AddFormModal
              data={recordData}
              visible={addVisible}
              department={this.type === 'dept' ? name : null}
              departmentId={this.type === 'dept' ? this.id : null}
              billNo={this.billNo}
              onCancel={() => {
                this.setState({
                  addVisible: false,
                });
              }}
              isBillCheck={isBillCheck}
              sendOrCheck="check"// 区分是发送/编辑还是核对
              queryAllData={this.queryAllData}
            />
            : null}

          <MoveProjectModal
            billNo={this.billNo}
            visible={moveVisible}
            departmentId={this.id}
            onCancel={() => {
              this.setState({
                moveVisible: false,
              });
            }}
            isBillCheck={isBillCheck}
            queryAllData={this.queryAllData}
          />

        </div>
      </PageHeaderWrapper>


    );
  }
}

export default BillDetail;
