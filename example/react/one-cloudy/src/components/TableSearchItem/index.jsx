// titleKey:当前点击表头的标识符
// activeKey：当前激活的表头的标识符，和titleKey配合判断当前哪个表头是激活的
// noSearchIcon:表示没有表头没有搜索功能
import React from 'react';
import { Input, Icon } from 'antd';
import styles from './index.less';

const { Search } = Input;

class TableSearchItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    const {
      value,
      activeKey,
      onClick,
      onBlur,
      titleKey,
      onChange,
      title,
      isApplySearch,
      noSearchIcon,
      onSearch,
    } = this.props;
    // console.log('key', count, 'activeKey', activeKey)

    return (
      <span key={titleKey} className={styles.tableSearchItem}>
        {titleKey !== activeKey ? (
          <div
            className={styles.Detail}
            onClick={() => {
              if (noSearchIcon) {
                return;
              }
              onClick();
            }}
          >
            <div className={noSearchIcon ? '' : styles.DetailTitle}>
              <span className={styles.DetailValue}>{value || title}</span>
            </div>
            <Icon type="search" style={{ display: noSearchIcon ? 'none' : 'inline-block' }} />
          </div>
        ) : (
          <div>
            <Search
              ref={node => {
                this.nodeInput = node;
                this.nodeInput && this.nodeInput.focus();
              }}
              placeholder={`请输入${title}`}
              value={value}
              onSearch={() => {
                onBlur();
                onSearch();
              }}
              onChange={e => {
                onChange(e.target.value, titleKey);
              }}
              onBlur={e => {
                onBlur();
                onSearch();
                onChange(e.target.value, titleKey);

                // setTimeout(() => onClick(), 100);
              }}
            />
          </div>
        )}
      </span>
    );
  }
}
export default TableSearchItem;
