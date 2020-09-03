import React from 'react';
import { Row, Col } from 'antd';
import styles from './index.less';

const RESULT_DATA = [
  {
    name: '实例',
    key: 'id',
  },
  {
    name: '应用系统名称：',
    key: 'applicationProjectName',
  },
  {
    name: '应用域名：',
    key: 'applicationDomain',
  },
  {
    name: '回源IP地址：',
    key: 'returnSourceIp',
  },
  {
    name: '回源端口：',
    key: 'returnSourceHost',
  },
  {
    name: '对外协议：',
    key: 'protocol',
    value(item) {
      return typeof item.protocol === 'string' ? item.protocol : item.protocol.join(',');
    },
  },
];
export default class WAFDetailData extends React.PureComponent {
  render() {
    const { data, spanCol = 4, resList } = this.props;
    return (
      <div style={{ border: '1px solid rgba(0, 0, 0, 0.15)', borderRadius: 4 }}>
        {data
          && data.map((item, index) => {
            const resultData = resList || RESULT_DATA;
            return (
              <Row className={`${styles.WafRow}`} key={index}>
                {resultData.map((val, i) => (Object.prototype.hasOwnProperty.call(item, val.key)
                  ? <Col span={spanCol} key={i + index}>
                    <span>{val.label ? val.label(item) : val.name}</span>
                    <span className={styles.configvalue}>{val.value ? val.value(item) : item[val.key] || '-'}</span>
                  </Col>
                  : ''))}
              </Row>
            );
          })}
      </div>
    );
  }
}
