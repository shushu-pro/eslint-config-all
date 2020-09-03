import React from 'react';
import Iframe from '@/components/Common/Iframe';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { loginOrgin } from '@/contants';


function Test() {
  return (
    <PageHeaderWrapper title="密码">
      <Iframe
        title="dashboard-cost-months"
        messageOrigin={loginOrgin}
        messageEnabled
        src={`${loginOrgin}/auth/realms/master/account/password?referrer=security-admin-console`}
      />
    </PageHeaderWrapper>
  );
}

Test.propTypes = {
};

export default Test;
