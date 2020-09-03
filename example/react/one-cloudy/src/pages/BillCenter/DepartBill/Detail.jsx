/**
 * 大数据局 - 部门月度账单详情
 */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Spin, Row, Col, Form, Radio } from 'antd';
import {
  DEPT_STATUS_MAP,
  DEPT_STATUS_TEXT_MAP,
  spiltTime,
  DEPT_DETAIL_FIELD_MAP,
  DEPT_DETAIL_FIELD_TEXT_MAP,
  REGION_LIST,
  SEAERCH_FILED_MAP,
  SEAERCH_FILED_MAP_TEXT,
} from '../constant';
import { billDetailLayout } from '../../../contants';
import Title from '@/components/Common/Title';
import InstanceTable from '../../../components/BillCenter/InstanceTable';
import { getFloatStr } from '@/utils/utils';
import styles from '../index.less';

const searchList = [
  {
    key: SEAERCH_FILED_MAP.INSTANCE_NAME,
    value: SEAERCH_FILED_MAP_TEXT[SEAERCH_FILED_MAP.INSTANCE_NAME],
  },
  {
    key: SEAERCH_FILED_MAP.INSTANCE_ID,
    value: SEAERCH_FILED_MAP_TEXT[SEAERCH_FILED_MAP.INSTANCE_ID],
  },
  {
    key: SEAERCH_FILED_MAP.PROJECT_NAME,
    value: SEAERCH_FILED_MAP_TEXT[SEAERCH_FILED_MAP.PROJECT_NAME],
  },
  {
    key: SEAERCH_FILED_MAP.PRODUCT_NAME,
    value: SEAERCH_FILED_MAP_TEXT[SEAERCH_FILED_MAP.PRODUCT_NAME],
  },
];

@connect(({ billCenter, loading }) => ({
  ...billCenter,
  loading: !!loading.effects['billCenter/queryDeptBillDetail'],
  tableLoading: !!loading.effects['billCenter/queryDeptProjProdList'],
}))
class Detail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ocRegion: 'all',
    };
  }

  componentDidMount() {
    this.queryAllData();
  }

  queryAllData = async () => {
    await Promise.all([
      this.queryDetail(),
      this.queryList(),
      // this.queryProjectListExport(),
    ]);
  };

  // 详情接口
  queryDetail = () => {
    const { ocRegion } = this.state;
    const { dispatch, match } = this.props;
    const { billNo, departmentId, unitId } = match.params;
    dispatch({
      type: 'billCenter/queryDeptBillDetail',
      payload: {
        billNo,
        departmentId,
        unitId,
        ocRegion,
      },
    });
  };

  // 资源列表接口
  queryList = params => {
    const { ocRegion } = this.state;
    const { dispatch, match } = this.props;
    const { billNo, departmentId } = match.params;
    return dispatch({
      type: 'billCenter/queryDeptProjProdList',
      payload: {
        billNo,
        departmentId,
        ocRegion,
        ...params,
      },
    });
  };

  // 资源导出接口
  queryProjectListExport = params => {
    const { ocRegion } = this.state;
    const { dispatch, match } = this.props;
    const { billNo, departmentId } = match.params;
    dispatch({
      type: 'billCenter/queryDeptProjProdListExport',
      payload: {
        billNo,
        departmentId,
        ocRegion,
        ...params,
      },
    });
  };

  // 切换区域
  onRegionChange = e => {
    this.setState({ ocRegion: e.target.value }, () => {
      this.queryAllData();
    });
  };

  render() {
    const { ocRegion } = this.state;
    const {
      loading,
      deptBillDetail = {},
      match,
      deptProjProdList = {},
      tableLoading,
      // deptProjProdListUrl={},
    } = this.props;
    const { billNo } = match.params;
    const { year, month } = spiltTime(billNo);
    return (
      <Spin spinning={loading} className={styles.detail}>
        <Radio.Group
          value={ocRegion}
          onChange={this.onRegionChange}
          style={{ margin: '20px 20px 0' }}
        >
          <Radio.Button value="all">全部</Radio.Button>
          {REGION_LIST.map(item => (
            <Radio.Button value={item.key}>{item.value}</Radio.Button>
          ))}
        </Radio.Group>
        <div className={styles.detailInfo}>
          <Title level="h3">本月账单统计</Title>
          {deptBillDetail && (
            <div className={styles.detail}>
              <Row>
                {Object.values(DEPT_DETAIL_FIELD_MAP).map(key => {
                  let value = deptBillDetail[key];
                  if (key === 'billStatus') {
                    value = (
                      <span className={styles[DEPT_STATUS_MAP[value]]}>
                        {DEPT_STATUS_TEXT_MAP[value]}
                      </span>
                    );
                  }
                  if (
                    (key === 'deptResfuseType' || key === 'deptResfuseInfo') &&
                    deptBillDetail.billStatus !== '3'
                  ) {
                    return null;
                  }
                  if (key === 'time') {
                    value = `${year}.${month}.1 - ${year}.${month}.${new Date(
                      year,
                      month,
                      0
                    ).getDate()}`;
                  }
                  if (key === 'deptProdFee') {
                    value = getFloatStr(value);
                  }
                  return (
                    <Col span={6} key={key}>
                      <Form.Item {...billDetailLayout} label={DEPT_DETAIL_FIELD_TEXT_MAP[key]}>
                        {value || '-'}
                      </Form.Item>
                    </Col>
                  );
                })}
              </Row>
            </div>
          )}
        </div>
        <div className={styles.detailDet}>
          <Title level="h3">本月资源金额详情</Title>
          {/* <StackPanel>
            <SelectSearch
              optionList={searchList}
              queryData={this.queryList}
            />
            <StackPanel.RightAlice>
              <a
                href={deptProjProdListUrl.url}
                download={deptProjProdListUrl.fileName}
              >
                <Icon type="download" style={{ marginRight: 8 }} />
                导出表格
              </a>
            </StackPanel.RightAlice>
          </StackPanel> */}
        </div>
        <InstanceTable
          optionList={searchList}
          queryList={this.queryList}
          loading={tableLoading}
          tableData={deptProjProdList}
          onExport={this.queryProjectListExport}
          needRegion={false}
        />
        {/* <ProjectResourceList
          pageData={deptProjProdList}
          queryList={this.queryList}
          loading={loading}
        /> */}
      </Spin>
    );
  }
}

export default Detail;
