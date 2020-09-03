import React from 'react';
import { Row, Col } from 'antd';

export default class ShowDetailNextLine extends React.PureComponent {
  static defaultProps = {
    data: {},
  };

  render() {
    const { data, id } = this.props;
    if (!data[id]) {
      return null;
    }
    return data[id].map((item, index) => (
      <div
        style={{
          border: '1px solid rgba(0, 0, 0, 0.15)',
          borderRadius: 4,
          padding: 14,
          marginBottom: 6,
        }}
      >
        <Row>
          <Col span={3}>交换机{index + 1}</Col>
          <Col span={7}>名称： {item.switchName}</Col>
          <Col span={14}>描述： {item.switchDesc}</Col>
        </Row>
      </div>
    ));
  }
}
