import React from 'react';
import { router } from 'umi';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { getTitle } from '../constant';
import SendAndEdit from './SendAndEdit';


class ListIndex extends React.Component {

  render() {
    const { match } = this.props;
    const { billNo } = match.params;
    return (
      <PageHeaderWrapper title={getTitle(billNo)} goBack={() => router.push('/manage/bill-center/send')}>
        <SendAndEdit />
      </PageHeaderWrapper>
    );
  }
}

export default ListIndex;