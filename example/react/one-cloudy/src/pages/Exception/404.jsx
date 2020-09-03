import React from 'react'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import img from '@/assets/404.svg'

const Exception404 = () => (
  <PageHeaderWrapper>
    <div style={{ textAlign: 'center', paddingTop: 80 }}>
      <img src={img} alt="404" width="500px" />
    </div>
  </PageHeaderWrapper>

)
export default Exception404
