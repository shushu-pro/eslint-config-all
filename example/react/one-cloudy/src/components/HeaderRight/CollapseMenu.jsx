import React, { PureComponent } from 'react'
import { Icon } from 'antd'
import Debounce from 'lodash-decorators/debounce'
import styles from './index.less'

export default class CollapseMenu extends PureComponent {
  componentWillUnmount () {
    this.triggerResizeEvent.cancel()
  }
  /* eslint-disable*/
  @Debounce(600)
  triggerResizeEvent() {
    // eslint-disable-line
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }
  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
    this.triggerResizeEvent();
  };
  render() {
    const { collapsed } = this.props;
    return (
      <div className={!collapsed ? styles.trigger : styles.triggerColl} onClick={this.toggle}>
        <Icon style={{ color: '#1890ff' }} type={collapsed ? 'menu-unfold' : 'menu-fold'} />
      </div>
    );
  }
}
