import React from 'react';
import { Row, Col } from 'antd';
import SingleDataDefault from './SingleData';
import { PRODUCT_FIELDS } from '../Product/base/_constant';

import styles from './index.less';

export default class OSSDetailData extends React.PureComponent {
  render() {
    const {
      data, isSetUp
    } = this.props;
    const layout = [3, 4, 3, 6, 2, 3, 2];
    const dataSource = (Array.isArray(data) ? data : [data]).map((item) => {
      if (!item.resourceInfo.backupFlag) {
        return null;
      }
      class SingleData extends SingleDataDefault {}
      SingleData.defaultProps.data = item;
      item[PRODUCT_FIELDS.POLICY_TYE] = '全量+增量';
      item[PRODUCT_FIELDS.PREFERRED_CYCLE_TYPE] = '按周执行';
      item[PRODUCT_FIELDS.PREFERRED_BACK_UP_TYPE] = '按最长天数';
      const { resourceInfo } = item;
      item.preferredBackupTime = resourceInfo && resourceInfo.preferredBackupTime && resourceInfo.preferredBackupTime.replace(new RegExp('Z', 'g'), ''); // 去除'Z'
      return (
        <div className={`${styles.BackUpRow}`}>
          {isSetUp && (
            <Row
              className={`${styles.resCard} ${styles.title} ${styles.detailStyle}`}
              style={{ backgroundColor: '#f5f5f599' }}
              // key={item.cloudInstanceId + 1}
            >
              <Col span={layout[0]}>
                <div className={styles.config} style={{ fontWeight: 'bolder', color: '#333' }}>
                  备份设置
                </div>
              </Col>
              <Col span={layout[1]}>
                <SingleData id={PRODUCT_FIELDS.POLICY_TYE} />
                <SingleData id={PRODUCT_FIELDS.PREFERRED_CYCLE_TYPE} />
              </Col>
              <Col span={layout[3]}>
                <SingleData id={PRODUCT_FIELDS.BACKUP_TIME_INTERVAL} unit="天" />
                <SingleData id={PRODUCT_FIELDS.PREFERRED_BACK_UP_PERIOD} />
                <SingleData id={PRODUCT_FIELDS.PREFERRED_BACK_UP_TIME} />
              </Col>
              <Col span={layout[1]}>
                <SingleData id={PRODUCT_FIELDS.PREFERRED_BACK_UP_TYPE} />
                <SingleData id={PRODUCT_FIELDS.BACK_UP_RETENTION_PERIOD} unit="天" />
              </Col>
            </Row>
          )}
        </div>
      );
    });

    return (
      <div
        className={styles.OSSDetailData}
        style={{ border: '1px solid rgba(0, 0, 0, 0.15)', borderRadius: 4 }}
      >
        {dataSource}
      </div>
    );
  }
}
