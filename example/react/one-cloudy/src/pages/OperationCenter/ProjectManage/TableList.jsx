import React, { PureComponent, Fragment } from 'react'
import { connect } from 'dva'
import Link from 'umi/link'
import { Modal, Icon } from 'antd'
import PagedTable, { withDva } from '@/components/Common/PagedTable'
import ShowDetailModal from '@/components/OperationCenter/ShowDetailModal'
import styles from './index.less'

@connect(({ projectManage, user }) => ({
  deptlist: projectManage.deptlist,
  unitId: user.unitId,
  deptId: user.deptId,
  roleList: user.roleList,
}))
class TableList extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {}
  }

  // 详情 - 浮层
  onShowDetail = (record) => {
    const { queryInfo } = this.props
    queryInfo(record.projectId).then((resData) => {
      this.setState({
        detailVisible: true,
        showData: resData,
      })
    })
  };

  onHideDetail = () => {
    this.setState({
      detailVisible: false,
    })
  };

  // 已经资源关联，可以删除
  onCanDetele = (record) => {
    Modal.confirm({
      icon: <Icon type="exclamation-circle" theme="filled" style={{ color: '#1890FF' }} />,
      title: '是否删除该项目？',
      okText: '删除',
      cancelText: '取消',
      onOk: () => {
        this.onSubmitDetele(record)
      },
    })
  };

  // 有资源关联，不可以删除
  onDetele = () => {
    Modal.info({
      icon: <Icon type="exclamation-circle" theme="filled" style={{ color: '#1890FF' }} />,
      title: '该项目下存在运行中的资源',
      content: '如果需要删除项目，请将项目下的全部资源撤销。',
      okText: '确定',
      okType: 'default',
    })
  };

  onSubmitDetele = (params) => {
    const { dispatch } = this.props
    dispatch({
      type: 'projectManage/submitDelete',
      payload: {
        projectId: params.projectId,
        canDel: params.canDel,
      },
    })
  };

  onChange = (pagination) => {
    const { queryList } = this.props
    const params = {
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
    }
    queryList(params)
  }

  render () {
    const Table = withDva('projectManage', 'queryList')(PagedTable)
    const { Column } = Table
    const { onShow, unitId, deptId, roleList } = this.props
    const { detailVisible, showData } = this.state
    const hasApply = roleList.indexOf('resourceApply') > -1
    return (
      <div>
        <Table rowKey={(record) => record.projectId} onChange={this.onChange}>
          <Column
            title="项目名称"
            dataIndex="name"
            width="20%"
            className={styles.resultColumns}
            textWrap="word-break"
            render={(name, record) => (
              <Link
                to={`/manage/operation-center/projectManage/details/${record.projectId}/detail?projectName=${name}`}
              >
                {name}
              </Link>
            )}
          />
          <Column title="部门" dataIndex="deptname" width={150} />
          <Column
            title="项目负责人"
            dataIndex="chargeusername"
            width="20%"
            className={styles.resultColumns}
            render={(_) => _ || '-'}
          />
          <Column
            title="项目联系人"
            dataIndex="contactusername"
            width="20%"
            className={styles.resultColumns}
            render={(_) => _ || '-'}
          />
          <Column
            title="创建时间"
            dataIndex="createdDate"
            className={styles.resultColumns}
            width="20%"
            render={(_) => _ || '-'}
          />
          <Column title="操作" width={120}>
            {(record) => deptId === record.deptId && hasApply && (
              <>
                <a onClick={() => onShow(record)}>编辑</a>
                {/* <Divider type="vertical" />
                  <span>删除</span> */}
              </>
            )}
          </Column>
        </Table>
        {detailVisible && (
          <ShowDetailModal
            isShowBid={(unitId === 2 || unitId === '2')}
            visible={detailVisible}
            onCancel={this.onHideDetail}
            showData={showData}
          />
        )}
      </div>
    )
  }
}

export default TableList
