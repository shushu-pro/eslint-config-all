import React, { Component, RefObject } from 'react';
import './style.less';

interface ScrollShadowBoxState {
  scroll: boolean;
}

class ScrollShadowBox extends Component<any, ScrollShadowBoxState> {

  ref: RefObject<HTMLDivElement> = React.createRef();

  state = {
    scroll: false,
  }

  componentDidMount() {
    const dom = this.ref.current;
    dom.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    const dom = this.ref.current;
    dom.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll = () => {
    const dom = this.ref.current;
    if (dom.scrollTop === 0) {
      this.setState({
        scroll: false,
      })
    } else {
      this.setState({
        scroll: true,
      })
    }
  }

  render() {
    const { scroll } = this.state;
    const { children, className, style, ...args } = this.props;
    return (
      <div
        ref={this.ref}
        className={`scroll-shadow-box ${scroll ? 'scroll' : ''} ${className || ''}`}
        style={scroll ? { ...style } : {}}
        {...args}
      >
        {children}
      </div>
    )
  }
}

export default ScrollShadowBox;