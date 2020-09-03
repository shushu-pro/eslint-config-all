import React from 'react';
import Iframe from '@/components/Common/Iframe';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { loginOrgin } from '@/contants';


function Test() {
  return (
    <PageHeaderWrapper title="认证方">
      <Iframe
        title="dashboard-cost-months"
        messageOrigin={loginOrgin}
        messageEnabled
        src={`${loginOrgin}/auth/realms/master/account/totp?referrer=security-admin-console`}
        style={{
          height: '750px'
        }}
      />
    </PageHeaderWrapper>
  );
}

Test.propTypes = {
};

export default Test;
