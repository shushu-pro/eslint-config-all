import React, { PureComponent } from 'react';
import StackPanel from '@/components/Common/StackPanel';
import styles from './index.less';

export default class MultipleData extends PureComponent {
  static defaultProps = {
    data: {},
  };

  render() {
    const { data, id, render, label } = this.props;
    if (!data[id]) return null;
    if (!render) return new Error(`paramter 'render' is required but not found!`);
    const list = data[id];
    if (!Array.isArray(list)) {
      return new Error('data[id] must be array');
    }
    return (
      <div className={styles.config}>
        <StackPanel>
          <div>{label && `${label}： `}</div>
          <div className={styles.configvalue}>
            {list.map((keys, index) => (
              <div key={index}>
                {render(keys, index)}
              </div>
            ))}
          </div>
        </StackPanel>
      </div>
    );
  }
}
