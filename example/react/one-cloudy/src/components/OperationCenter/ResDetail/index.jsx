/**
 * 申请单内容详情 - 用于展示：关联的项目、资源使用人、申请单附件、资源清单
 * 用到的地方： 申请单详情、批量申请确认页）
 */
import React from 'react'
import { Row, Col, Icon } from 'antd'
import LeftTitle from '@/components/OperationCenter/LeftTitle'
import StackPanel from '@/components/Common/StackPanel'
import { PRODUCT_FIELDS } from '@/components/OperationCenter/Product/base/_constant'
import { File } from '@/components/OperationCenter/ProjectInfo'
import ResUserInfo from '../ResUserInfo'
import ResourceInfo from '../ResourceInfo'

class ResDetail extends React.PureComponent {
  render () {
    const { data, match } = this.props
    const {
      resourceUsers, resourceItems, attachFileLinks, ossUrl, projectDetail = {},
    } = data
    const threeFormItemLayout = {
      labelCol: {
        span: 5,
      },
      wrapperCol: {
        span: 19,
      },
    }
    let downloadUrl
    if (match) {
      const { orderId } = match.params
      downloadUrl = `/oc/resmng/download/${orderId}`
    } else {
      downloadUrl = ossUrl
    }
    return (
      <div>
        {resourceUsers && resourceUsers.length > 0 && (
          <>
            <LeftTitle title="资源使用人" noDivider />
            <div style={{ padding: '0 60px' }}>
              <ResUserInfo userList={resourceUsers} />
            </div>
          </>
        )}
        {attachFileLinks && attachFileLinks.length > 0 && (
          <>
            <LeftTitle title="申请单附件" noDivider />
            <div style={{ padding: '0 45px' }}>
              <Row>
                <Col span={12}>
                  <File
                    label={undefined}
                    data={{ attachFileLinks }}
                    formItemLayout={threeFormItemLayout}
                    id={PRODUCT_FIELDS.ATTACHMENT}
                  />
                </Col>
              </Row>
            </div>
          </>
        )}

        {downloadUrl && (
          <>
            <LeftTitle title="资源清单" noDivider />
            <StackPanel>
              <StackPanel.RightAlice>
                <a href={downloadUrl} style={{ marginRight: 25 }}>
                  <Icon type="download" style={{ marginRight: 8 }} />
                  导出表格
                </a>
              </StackPanel.RightAlice>
            </StackPanel>
          </>
        )}
        <div style={{ padding: '0 45px' }}>
          <ResourceInfo data={resourceItems} projectDetailName={projectDetail && projectDetail.name} />
        </div>
      </div>
    )
  }
}

export default ResDetail
