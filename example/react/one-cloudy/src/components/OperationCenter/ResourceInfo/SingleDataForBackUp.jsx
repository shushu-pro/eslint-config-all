import React from 'react';
import _ from 'lodash';
import { FIELD_MAP, PRODUCT_FIELDS } from './constant';
import styles from './index.less';

export default class SingleDataForBackUp extends React.PureComponent {
  static defaultProps = {
    data: {},
    noLabel: false,
  };

  render() {
    // prefix目前用于显示不同产品名称（传入productType产品类型，根据产品类型区分label）
    const {
      prefix = '', id, data, noLabel, nothing, isShow, toggleState, isOSS
    } = this.props;
    if (_.isEqual(id, PRODUCT_FIELDS.INSTANCE_NAME)) {
      return null;
    }
    if (!data[id]) {
      return nothing ? (
        <div className={styles.config}>
          <span className={styles.configvalue}>{nothing}</span>
        </div>
      ) : null;
    }
    return (
      <div className={styles.config}>
        <span className={styles.label}>
          {!noLabel && `${FIELD_MAP[prefix + id] || FIELD_MAP[id]}： `}
        </span>
        <span className={styles.configvalue}>
          {!isOSS ? <span>{data[PRODUCT_FIELDS.RESOURCE_DETAIL_LIST].length || 1}个</span> : <span>是</span>}
          <a style={{ marginLeft: 10 }} onClick={toggleState}>
            {isShow ? '收起' : '查看'}
          </a>
        </span>
      </div>
    );
  }
}
