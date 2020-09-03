import React, { PureComponent } from 'react';
import {
  Input, Menu, Dropdown, Tag, message
} from 'antd';

import styles from './List.less';

const { Search } = Input;
const { SubMenu } = Menu;

class MeauFilter extends PureComponent {
  state = { filterAssign: '' };

  changeSearch = value => {
    this.setState({ filterAssign: value });
  };

  warningInfo = () => {
    message.warning('“已结单”的申请单无法再更改指派');
  }

  render() {
    const {
      assignList, onChangeAssign, text, record, ACTION_STATUS
    } = this.props;

    const { filterAssign } = this.state;
    // 指派人fullname不一定唯一，字段做了拼接
    const assignor = text && text.indexOf(',') > -1 ? text.split(',')[0] : text;
    const isFinished = record.state === ACTION_STATUS.FINISHED;
    const renderTag = <Tag style={{ cursor: 'pointer' }} color={text ? 'blue' : ''}>{assignor || '未指派'}</Tag>;
    return (
      <>{isFinished ? <div onClick={e => this.warningInfo(e)}>{renderTag}</div> : <Dropdown
        trigger={['click']}
        overlay={
          <Menu className={`${styles.drowMeau} autoScroll`}>
            <SubMenu
              className={styles.searchMeau}
              title={
                <Search
                  placeholder=""
                  onSearch={value => this.setState({ filterAssign: value })}
                  onChange={e => this.changeSearch(e.target && e.target.value)}
                />
              }
            />
            {assignList.map(item => {
              let $item = '';
              if (!filterAssign || item.fullname.includes(filterAssign) || item.username.includes(filterAssign)) {
                $item = (
                  <Menu.Item key={item.username} onClick={val => onChangeAssign(item, val)}>
                    {item.fullname}
                    <span>（{item.username}）</span>
                  </Menu.Item>
                );
              }
              return $item;
            })}
          </Menu>
        }
      >
        {renderTag}
      </Dropdown>

      }
      </>
    );
  }
}

export default MeauFilter;
