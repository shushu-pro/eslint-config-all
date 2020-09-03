/**
 * 项目管理中 - 点击项目详情 - 展示的浮层
 */
import React from 'react'
import { Modal, Form, Button } from 'antd'
import FormItem from '@/components/Common/FormItem'
import StackPanel from '@/components/Common/StackPanel'
import styles from './index.less'

@Form.create()
class ShowDetailModal extends React.PureComponent {
  render () {
    const { visible, onCancel, showData, isShowBid } = this.props
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
      <Modal
        className={styles.showData}
        width={700}
        title="项目详情"
        visible={visible}
        onCancel={onCancel}
        footer={[ <Button type="primary" onClick={onCancel}>确定</Button> ]}
      >
        {showData &&
          data.map((item) => (
            <FormItem
              key={item.value}
              label={item.label}
              value={showData[item.value] || nothing}
            />
          ))}
        {showData &&
          userData.map((items) => (
            <FormItem
              style={{ marginBottom: 10 }}
              label={items.label}
              key={items.value}
              value={
                showData[items.value] && showData[items.value].length > 0
                  ? showData[items.value].map((item) => (
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
        {showData &&
          isShowBid &&
          bidData.map((item) => (
            <FormItem
              key={item.value}
              label={item.label}
              value={showData[item.value] || nothing}
            />
          ))}
        {showData && (
          <FormItem
            label="项目附件"
            value={
              showData.attachFileLinks && showData.attachFileLinks.length > 0
                ? showData.attachFileLinks.map((item) => (
                  <a key={item.fileId} href={item.url} download={item.fileName}>
                    <i className="icon iconfont">&#xe64c;</i>
                    {item.fileName}
                  </a>
                ))
                : nothing
            }
          />
        )}
      </Modal>
    )
  }
}

export default ShowDetailModal
