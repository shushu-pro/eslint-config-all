import React from 'react'
import Iframe from '@/components/Common/Iframe'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'

function Test () {
  return (
    <PageHeaderWrapper title="test">
      <Iframe
        title="dashboard-cost-months"
        messageOrigin="http://59.202.40.152"
        messageEnabled
        src="http://59.202.40.152:8080/auth/realms/master/account/?referrer=security-admin-console"
      />
    </PageHeaderWrapper>
  )
}

Test.propTypes = {
}
export default Test
