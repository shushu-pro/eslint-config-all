// titleKey:当前点击表头的标识符
// activeKey：当前激活的表头的标识符，和titleKey配合判断当前哪个表头是激活的
// noSearchIcon:表示没有表头没有搜索功能
import React from 'react'
import { Input, Icon, Table } from 'antd'
import PagedTable, { withDva } from '@/components/Common/PagedTable'
import styles from './index.less'
import TableSearchItem from './index'

const { Search } = Input
class TableSearchHeader extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activeKey: '',
      filterInfo: {},
    }
  }

  onChange = (params, flag) => {
    console.log('onSearch', flag, params)
  };

  renderTitle (key, title) {
    const { activeKey, filterInfo } = this.state
    const { noSearchIcon } = this.props
    return (
      <TableSearchItem
        noSearchIcon={noSearchIcon}
        activeKey={activeKey}
        value={filterInfo[key]}
        titleKey={key}
        key={key}
        title={title}
        onClick={() => {
          this.setState({ activeKey: key })
        }}
        onBlur={() => {
          this.setState({ activeKey: '' })
        }}
        onChange={(inputValue, key1) => {
          filterInfo[key1] = inputValue
          this.setState({ filterInfo })
        }}
        onSearch={this.onSearch}
      />
    )
  }

  render () {
    const { cols, loading, sorter, rowKey, onChange, classNames } = this.props
     const Table = withDva('operationOrder', 'queryOrderList', false)(PagedTable);
    const columns = cols.map((item) => item.title = item.isSearch ? this.renderTitle(item.dataIndex, item.title) : item.title;
      ({ ...item }))
    console.log('render', columns)
    const dataSource = [ {
      applyId: '2020072765744000015',
      applyUserFullName: '王拥军',
      applyUserId: '50',
      applyUserName: 'fortest1',
      createdDate: '2020-07-27 16:01:13',
      deptId: '106',
      deptName: '省大数据局',
      projectName: '浙江省政府法人综合数据库项目',
    }, {
      applyId: '2020072303014000027',
      applyUserFullName: 'aaaa',
      applyUserId: '50',
      applyUserName: 'fortest1',
      createdDate: '2020-07-27 16:01:13',
      deptId: '106',
      deptName: '浙江省公安厅',
      projectName: '浙江省可信电子证照库',
    }, {
      applyId: '2020062867746000003',
      applyUserFullName: '郑书声',
      applyUserId: '50',
      applyUserName: 'fortest1',
      createdDate: '2020-07-27 16:01:13',
      deptId: '106',
      deptName: '省大数据局',
      projectName: '最多跑一次',
    }, {
      applyId: '2020071538574000014',
      applyUserFullName: 'yanghanyanghan',
      applyUserId: '50',
      applyUserName: 'fortest1',
      createdDate: '2020-07-27 16:01:13',
      deptId: '106',
      deptName: '浙江省公安厅',
      projectName: '浙江省政府法人综合数据库项目',
    } ]
    return (
      <Table
        className={classNames}
        rowKey={rowKey}
        columns={columns}
        sorter={sorter}
        dataSource={dataSource}
        onChange={onChange}
        loading={loading}
      />
    )
  }
}
export default TableSearchHeader
