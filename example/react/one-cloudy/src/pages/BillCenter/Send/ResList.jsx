import React from 'react';
import { router } from 'umi';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import ResTable from '../../../components/BillCenter/BillSend/ResTable';

class ResList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { match } = this.props;
    const { department, billNo } = match.params;
    return (
      <PageHeaderWrapper
        title={department}
        goBack={() => router.push(`/manage/bill-center/send/${billNo}`)}
      >
        <ResTable edit />
      </PageHeaderWrapper>
    );
  }
}

export default ResList;