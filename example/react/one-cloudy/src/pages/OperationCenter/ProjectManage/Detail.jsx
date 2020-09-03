/**
 * 项目单内容详情 - 用于展示：关联的资源列表
 * 用到的地方： 项目单详情）
 */
import React from 'react'
import { connect } from 'dva'
import { Form, Divider } from 'antd'
import FormItem from '@/components/Common/FormItem'
import StackPanel from '@/components/Common/StackPanel'
import OrderList from '../OperationOrder/List'

@connect(({ user }) => ({
  unitId: user.userInfo.unitId,
}))
@Form.create()
class ProjectDetail extends React.PureComponent {
  render () {
    const { detailInfo, projectId, isShowBid } = this.props
    const data = [
      {
        label: '项目名称',
        value: 'name',
      },
      {
        label: '部门',
        value: 'deptName',
      },
      {
        label: '项目描述',
        value: 'description',
      },
    ]
    const userData = [
      {
        label: '项目负责人',
        value: 'chargeUserInfoIds',
      },
      {
        label: '项目联系人',
        value: 'contactUserInfoIds',
      },
    ]
    const bidData = [
      {
        label: '中标公司',
        value: 'bidCompany',
      },
      {
        label: '中标价格(元)',
        value: 'bidPrice',
      },
    ]
    const nothing = '暂无'
    return (
      <div style={{ background: '#fff' }}>
        <div>
          <div style={{ margin: '20px 0px 24px', float: 'left', width: 200 }} className="ant-alert">
            <i className="icon iconfont" style={{ fontSize: 18 }}>&#xe646;</i>
            <span
              className="ant-alert-message"
              style={{ color: '#1890FF', fontSize: 14 }}
            >
              <a href="#" className="ant-dropdown-trigger">项目详情</a>

            </span>
          </div>
          <div style={{ paddingTop: 30, overflow: 'hidden' }}>
            {detailInfo &&
              data.map((item) => (
                <FormItem
                  key={item.value}
                  label={item.label}
                  value={detailInfo[item.value] || nothing}
                />
              ))}
            {detailInfo &&
              userData.map((items) => (
                <FormItem
                  style={{ marginBottom: 10 }}
                  label={items.label}
                  key={items.value}
                  value={
                    detailInfo[items.value] && detailInfo[items.value].length > 0
                      ? detailInfo[items.value].map((item) => (
                        <StackPanel>
                          <div style={{ width: 200 }}>
                            {item.deptName}
                            -
                            {item.fullName}
                          </div>
                          {item.mobile && (
                            <div>
                              <i className="icon iconfont">&#xe64b;</i>
                              {item.mobile}
                            </div>
                          )}
                          {item.email && (
                            <div>
                              <i className="icon iconfont">&#xe65f;</i>
                              {item.email}
                            </div>
                          )}
                        </StackPanel>
                      ))
                      : nothing
                  }
                />
              ))}
            {detailInfo &&
              isShowBid &&
              bidData.map((item) => (
                <FormItem
                  key={item.value}
                  label={item.label}
                  value={detailInfo[item.value] || nothing}
                />
              ))}
            {detailInfo && (
              <FormItem
                label="解决方案"
                value={
                  detailInfo.attachFileLinks && detailInfo.attachFileLinks.length > 0
                    ? detailInfo.attachFileLinks.map((item) => (
                      <a key={item.fileId} href={item.url} download={item.fileName}>
                        <i className="icon iconfont">&#xe64c;</i>
                        {item.fileName}
                      </a>
                    ))
                    : nothing
                }
              />
            )}
          </div>
        </div>
        <Divider />
        <div>
          <span style={{ margin: '0px 0px 24px', width: 200 }} className="ant-alert">
            <i className="icon iconfont" style={{ fontSize: 18 }}>&#xe694;</i>
            <span className="ant-alert-message" style={{ color: '#1890FF', fontSize: 14 }}><a href="#" className="ant-dropdown-trigger">申请单信息</a></span>
          </span>
          <div style={{ padding: '24px 50px' }}>
            <OrderList showFlow={false} projectId={projectId} />
          </div>
        </div>
      </div>
    )
  }
}

export default ProjectDetail
