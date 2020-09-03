import React from 'react'
import { Layout } from 'antd'
import GlobalFooter from '@/components/GlobalFooter'

const { Footer } = Layout
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[
        {
          key: '一朵云运营平台',
          title: '一朵云运营平台',
          href: 'https://www.cloud.zj.gov.cn/',
          blankTarget: true,
        },
      ]}
      // copyright={
      //   <Fragment>
      //     Copyright <Icon type="copyright" /> 2019 浙江数蜂科技出品
      //   </Fragment>
      // }
    />
  </Footer>
)
export default FooterView
