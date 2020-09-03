import React, { PureComponent } from 'react';

class Details extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChange = key => {
    switch (key) {
      case '':
        break;
      default:
    }
  };

  render() {
    return <div>账单小结</div>;
  }
}

export default Details;
