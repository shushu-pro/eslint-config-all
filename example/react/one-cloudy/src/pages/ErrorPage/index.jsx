import React from 'react'
import img from '@/assets/loginFailed.svg'

class ErrorPage extends React.Component {
  componentDidMount () {
    const content = document.getElementById('content')
    const height = document.body.scrollHeight
    if (height > 650) {
      content.style.height = `${height}px`
    } else {
      content.style.height = '650px'
    }
    window.addEventListener('resize', () => {
      content.style.height = `${document.body.scrollHeight}px`
    })
  }

  render () {
    return (
      <div id="content" style={{ textAlign: 'center', background: '#f0f2f5' }}>
        <img src={img} alt="error" width="50%" />
      </div>
    )
  }
}

export default ErrorPage
