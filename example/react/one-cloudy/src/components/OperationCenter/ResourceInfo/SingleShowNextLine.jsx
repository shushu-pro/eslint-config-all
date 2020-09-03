// 用于可以进行操作的详情
import React from 'react';
import { FIELD_MAP } from './constant';
import styles from './index.less';

export default class SingleShowNextLine extends React.PureComponent {
  static defaultProps = {
    data: {},
  };

  render() {
    // prefix目前用于显示不同产品名称（传入productType产品类型，根据产品类型区分label）
    const { prefix = '', id, data, isShow, toggleShow } = this.props;
    const title = data[id];
    if (!title) {
      return null;
    }
    return (
      <div className={styles.config}>
        <span className={styles.label}>{`${FIELD_MAP[prefix + id] || FIELD_MAP[id]}： `}</span>
        <span className={styles.configvalue} title={title}>
          <a onClick={toggleShow}>{isShow ? '收起' : '查看'}</a>
        </span>
      </div>
    );
  }
}
