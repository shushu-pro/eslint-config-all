import React from 'react'


class Index extends React.Component {
  constructor (props) {
    super(props)
    const { name, pp } = this.props
    this.state = {
      name, pp,
    }
  }

  getName () {
    return 'xxx'
  }

  render () {
    const { name, pp } = this.state
    return (
      <div
        className="xxx"
        asa="xxx"
        asjakj="sasa"
      >
        xxx
        {name}
        {pp}
        {this.props.pp}
        {this.getName()}
      </div>
    )
  }
}
