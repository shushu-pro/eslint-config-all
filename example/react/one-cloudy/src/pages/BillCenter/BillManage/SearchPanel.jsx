/**
 * 省大数据/省委政法委详情页 - 搜索功能和导出功能
 */
import React, { PureComponent } from 'react';
import { Icon, Input } from 'antd';
import Title from '@/components/Common/Title';
import StackPanel from '@/components/Common/StackPanel';
import styles from '../index.less';

const { Search } = Input;

class SearchPanel extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { monthDeptBillUrl, onSearch } = this.props;
    return (
      <div className={styles.detailDet}>
        <Title level="h3">本月部门信息</Title>
        <StackPanel>
          <Search
            placeholder="请输入部门名称查询"
            onSearch={onSearch}
            style={{ width: 200 }}
            className={styles.search}
          />
          <StackPanel.RightAlice>
            <a
              href={monthDeptBillUrl && monthDeptBillUrl.url}
              download={monthDeptBillUrl && monthDeptBillUrl.fileName}
            >
              <Icon type="download" style={{ marginRight: 8 }} />
              导出表格
            </a>
          </StackPanel.RightAlice>
        </StackPanel>
      </div>
    );
  }
}

SearchPanel.propTypes = {};

export default SearchPanel;
