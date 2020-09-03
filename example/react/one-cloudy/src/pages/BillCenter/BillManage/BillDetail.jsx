/**
 * 省大数据/省委政法委详情页 - 本月账单统计
 */
import React, { PureComponent } from 'react';
import { Row, Col, Form } from 'antd';
import Title from '@/components/Common/Title';
import { billDetailLayout } from '../../../contants';
import {
  STATUS_MAP,
  STATUS_TEXT_MAP,
  BIG_DATA_BASE_DETAIL_FIELD_MAP,
  BIG_DATA_BASE_DETAIL_FIELD_TEXT_MAP,
  spiltTime,
  UNIT_DEPT_DETAIL_FIELD_MAP,
  UNIT_DEPT_DETAIL_FIELD_TEXT_MAP,
} from '../constant';
import { getFloatStr } from '@/utils/utils';
import styles from '../index.less';

class BillDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { detailData, billNo, unitId, monthDeptBillList  } = this.props;
    const { year, month } = spiltTime(billNo);
    const data = unitId ? UNIT_DEPT_DETAIL_FIELD_MAP : BIG_DATA_BASE_DETAIL_FIELD_MAP;
    const textData = unitId ? UNIT_DEPT_DETAIL_FIELD_TEXT_MAP : BIG_DATA_BASE_DETAIL_FIELD_TEXT_MAP;
    return (
      <div className={styles.detailInfo}>
        <Title level="h3">本月账单统计</Title>
        {detailData && (
          <div className={styles.detail}>
            <Row>
              {Object.values(data).map(key=> {
                let value = detailData[key];
                if (key === UNIT_DEPT_DETAIL_FIELD_MAP.DEPARTMENT_CNTS) {
                  value = detailData[key] || monthDeptBillList.list && monthDeptBillList.totalCount;
                }
                if (key === 'billDeptConfimCnts') {
                  const confirmNum =
                    value !== detailData.departmentCnts ? styles.confirmed : '';
                  value = (
                    <span>
                      <span className={confirmNum}>{value || 0}</span>/
                      {detailData.departmentCnts}
                    </span>
                  );
                }
                if (key === 'billStatus') {
                  value = (
                    <span className={styles[STATUS_MAP[value]]}>
                      {STATUS_TEXT_MAP[value]}
                    </span>
                  );
                }
                if (
                  (key === 'resfuseType' || key === 'resfuseInfo') &&
                  detailData.billStatus !== '2'
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
                if (key === 'billAmt') {
                  value = getFloatStr(value)
                }
                return (
                  <Col span={6} key={key}>
                    <Form.Item {...billDetailLayout} label={textData[key]}>
                      {value || '-'}
                    </Form.Item>
                  </Col>
                );
              })}
            </Row>
          </div>
        )}
      </div>
    );
  }
}

export default BillDetail;
