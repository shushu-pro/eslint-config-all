import React, { Component } from 'react'
import { router } from 'umi'
import {
  Button, Modal, Form, Spin,
} from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import FooterComfire from '@/components/Common/FooterComfire'
import StackPanel from '@/components/Common/StackPanel'
import Upload from '@/components/OperationCenter/Upload'
import { queryDeptQuotaList, applyProductQuota } from '@/services/OperationCenter/quotaManage'
import { ProductEditList, RegionSelect } from './containers'
import { API_PARAMS } from './constant'

@Form.create({})
class Apply extends Component {
  state = {
    loading: true,
    quotaData: [],
    btnLoading: false,
    regionId: undefined,
    regionName: undefined,
  };

  selectRegion = (regionId, regionName) => {
    this.setState({
      regionId,
      regionName,
    }, this.getQuotaData)
  };

  getQuotaData = () => {
    const { regionId } = this.state
    const sendData = {
      regionId,
    }
    this.setState({ loading: true })
    queryDeptQuotaList(sendData)
      .then(({ resData }) => {
        const quotaData = resData.list
        this.setState({
          quotaData,
        })
      })
      .finally(() => {
        this.setState({ loading: false })
      })
  };

  onSubmit = () => {
    const { form } = this.props
    const { regionName, regionId } = this.state
    form.validateFieldsAndScroll((errors, values) => {
      if (errors) return
      this.setState({
        btnLoading: true,
      })
      const sendData = { productList: [] }
      Object.keys(values).forEach((pId) => {
        if (Number.isNaN(Number(pId))) return
        Object.keys(values[pId]).forEach((sId) => {
          sendData.productList.push({
            [API_PARAMS.PRODUCTID]: pId,
            [API_PARAMS.SPEC_TYPE_ID]: sId.slice(0, -1),
            [API_PARAMS.ADJUSTED_QUOTA]: values[pId][sId],
          })
        })
      })
      sendData[API_PARAMS.ATTACH_ID] = values[API_PARAMS.ATTACH_ID]
      sendData.regionName = regionName
      sendData.regionId = regionId
      applyProductQuota(sendData)
        .then(() => {
          router.push('./applyList')
        })
        .finally(() => {
          this.setState({
            btnLoading: false,
          })
        })
    })
  };

  onCancel = () => {
    Modal.confirm({
      title: '取消申请',
      content: '当前数据将被清除，是否确认取消！',
      cancelText: '取消',
      okText: '确定',
      onOk () {
        router.push('./applyList')
      },
    })
  };

  render () {
    const { loading, quotaData, btnLoading } = this.state
    const { form } = this.props
    return (
      <PageHeaderWrapper
        title="配额申请"
        breadcrumbList={[
          {
            href: '/manage/operation-center/quotaManage/applyList',
            title: '配额管理',
          },
        ]}
      >
        <div className="quota" style={{ backgroundColor: '#fff', padding: '0 20px 20px' }}>
          <Spin spinning={loading} size="large">
            <div className="quota-apply">
              <div className="top-line clearfix">
                <RegionSelect onChange={this.selectRegion} style={{ float: 'left' }} type="quotaApply" />
              </div>
              <ProductEditList form={form} data={quotaData} />
              <Upload
                id={API_PARAMS.ATTACH_ID}
                form={form}
                renderContent={(uploading, fileList, maxLen) => (
                  <Button disabled={uploading || fileList.length >= maxLen}>
                    如需添加附件请点击
                  </Button>
                )}
                maxLen={2}
                tip={null}
                required={false}
              />
              <FooterComfire>
                <StackPanel>
                  <StackPanel.RightAlice>
                    <Button onClick={this.onCancel}>取消</Button>
                    <Button onClick={this.onSubmit} type="primary" loading={btnLoading}>
                      提交申请
                    </Button>
                  </StackPanel.RightAlice>
                </StackPanel>
              </FooterComfire>
            </div>
          </Spin>
        </div>
      </PageHeaderWrapper>
    )
  }
}

export default Apply
