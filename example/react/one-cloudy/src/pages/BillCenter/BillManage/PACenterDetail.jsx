/**
 * 大数据局 - 查看政法中心账单专用
 */
import React, { PureComponent } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Detail from './Detail';
import { ALL_DEPT_DETAIL_MAP } from '../breadcrumbConstant';
import styles from '../index.less';

class PACenterDetail extends PureComponent {

  render() {
    const { match } = this.props;
    const { department } = match.params;
    return (
      <div className={styles.detail}>
        <PageHeaderWrapper
          title={department}
          breadcrumbList={ALL_DEPT_DETAIL_MAP(match.params)}
        >
          <div className={styles.tabPage}>
            <Detail />
          </div>
        </PageHeaderWrapper>
      </div>
    );
  }
}

PACenterDetail.propTypes = {};

export default PACenterDetail;
