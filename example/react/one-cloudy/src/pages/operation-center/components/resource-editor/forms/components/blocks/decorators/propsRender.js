import React from 'react'

export default function (Component) {
  class PropsRenderComponent extends React.Component {
    render () {
      const { props } = this
      if (props.render === false) {
        return null
      }

      return <Component {...props} />
    }
  }
  return PropsRenderComponent
}
