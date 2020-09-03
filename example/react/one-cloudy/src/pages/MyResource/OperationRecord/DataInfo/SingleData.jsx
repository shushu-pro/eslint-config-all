import React from 'react';
import _ from 'lodash';
import { Icon } from 'antd';
import { FIELD_MAP, PRODUCT_FIELDS, optionData } from '@/components/OperationCenter/Product/base/_constant';
import styles from '@/components/OperationCenter/ResourceInfo/index.less';

export default class SingleData extends React.Component {
  static defaultProps = {
    data: {},
    noLabel: false,
  };

  lookDetail = () => {
    const { lookDetail } = this.props;
    lookDetail();
  };

  hideDetail = () => {
    const { hideDetail } = this.props;
    hideDetail();
  };

  render() {
    // prefix目前用于显示不同产品名称（传入productType产品类型，根据产品类型区分label）
    const {
      prefix = '', id, data, unit, noLabel, nothing, isShow, isBoolean, afterData
    } = this.props;
    let content = data[id];
    const { resourceInfo = {} } = data;
    if (resourceInfo && !data.productCode) {
      if (id === 'backupTimeInterval') {
        content = resourceInfo.backupTimeInterval;
      } else if (id === 'backupRetentionPeriod') {
        content = resourceInfo.backupRetentionPeriod;
      }
    }
    // 当content为字符串时去掉多余的空格
    content = content && typeof content === 'string' ? content.replace(/\s+/g, '') : content;
    let title = data[id];
    if (data.resourceType === 'WAF') {
      const applyType = data[PRODUCT_FIELDS.APPLY_TYPE];
      if (_.isEqual(applyType, 'form')) {
        if (_.isEqual(id, PRODUCT_FIELDS.WAF_FILE_NAME)) {
          if (data[PRODUCT_FIELDS.WAF_FORM_FILE]) {
            const result = Object.values(data[PRODUCT_FIELDS.WAF_FORM_FILE])[0];
            title = result.fileName;
            data[id] = title;
            content = (
              <a href={result.url} download={result.fileName}>
                <i className="icon iconfont">&#xe64c;</i>
                {data.fileName}
              </a>
            );
          } else {
            title = data.fileName;
            data[id] = title;
            content = (
              <a href={data.url} download={data.fileName}>
                <i className="icon iconfont">&#xe64c;</i>
                {data.fileName}
              </a>
            );
          }
        }
        if (_.isEqual(id, PRODUCT_FIELDS.APPLY_TYPE)) {
          content = data.applyTypeName || '表格申请';
          title = content;
        }
        if (_.isEqual(id, PRODUCT_FIELDS.WAF_CONFIG)) {
          return null;
        }
      } else if (applyType === 'page') {
        if (_.isEqual(id, PRODUCT_FIELDS.WAF_CONFIG)) {
          title = isShow ? '收起' : '查看';
          data[id] = title;
          content = isShow ? (
            <a onClick={this.hideDetail}>收起</a>
          ) : (<a onClick={this.lookDetail}>查看</a>);
        }
        if (_.isEqual(id, PRODUCT_FIELDS.APPLY_TYPE)) {
          content = data.applyTypeName || '页面申请';
          title = content;
        }
        if (_.isEqual(id, PRODUCT_FIELDS.WAF_FILE_NAME)) {
          return null;
        }
      }
    }
    if (_.isEqual(id, PRODUCT_FIELDS.PREFERRED_BACK_UP_PERIOD)) {
      if (!data[id]) {
        return null;
      }
      const timeData = optionData[PRODUCT_FIELDS.PREFERRED_BACK_UP_PERIOD];
      const periodData = Array.isArray(data[id]) ? data[id] : data[id].split(',');
      const transformData = timeData
        .map(item => periodData.indexOf(item.key) > -1 && item)
        .filter(item => item)
        .map(item => item.value);
      content = transformData.length > 0 ? transformData.join(',') : data[id];
    }
    if (isBoolean && data[id] !== undefined) {
      return (
        <div className={styles.operateRecordConfig}>
          <span className={styles.label}>
            {!noLabel && `${FIELD_MAP[prefix + id] || FIELD_MAP[id]}： `}
          </span>
          <span className={styles.configvalue} title={title}>
            {data[id] ? '是' : '否'}
            {unit}
          </span>
        </div>
      );
    }
    if ((!resourceInfo.backupTimeInterval && !resourceInfo.backupRetentionPeriod) && !data[id] && (data.resourceType === 'BackUp' || data.resourceType === 'OSS') || content === undefined) {
      return nothing ? (
        <div className={styles.operateRecordConfig}>
          <span className={styles.configvalue}>{nothing}</span>
        </div>
      ) : null;
    }
    if (id === 'bandwidth' && prefix === 'SLB' && (content < 0 || content == 0)) {
      return null;
    }

    return (
      <div className={styles.operateRecordConfig}>
        <span className={styles.label}>
          {!noLabel && `${FIELD_MAP[prefix + id] || FIELD_MAP[id]}： `}
        </span>
        <span className={styles.configvalue} title={title + (unit || '')}>
          {_.isEqual(id, PRODUCT_FIELDS.EIP_FLAG) ? '是' : (content || '-')}
          {content ? unit : ''}
        </span>
        {
          afterData[id] && (afterData[id] !== content) ? (
            <span>
              <Icon type="arrow-right" style={{ margin: '0 5px' }} />
              <span style={{ color: 'red' }} className={styles.configvalue}>
                {afterData[id]}{unit}
              </span>
            </span>
          ) : null
        }
      </div>
    );
  }
}
