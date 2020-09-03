import React, { Component, Children } from 'react';
import './style.less';

class FloatList extends Component<any> {
  render() {
    const { className, children, ...args } = this.props;
    return (
      <div className={`float-list ${className || ''} clearfix`} {...args}>
        {Children.map(children, (thisArg) => (
          <div className="float-list-item">
            {thisArg}
          </div>
        ))
        }
      </div>
    )
  }
}

export default FloatList;