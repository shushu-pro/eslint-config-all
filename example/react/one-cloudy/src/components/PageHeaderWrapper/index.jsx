import React from 'react'
import Link from 'umi/link'
import { withRouter } from 'umi'
import {
  PageHeader, Tabs, Typography, Icon,
} from 'antd'
import { connect } from 'dva'
import classNames from 'classnames'
import MenuContext from '@/layouts/MenuContext'
import { conversionBreadcrumbList } from '@/components/Breadcrumb'
import GridContent from './GridContent'
import styles from './index.less'

const { Title } = Typography

/**
 * render Footer tabList
 * In order to be compatible with the old version of the PageHeader
 * basically all the functions are implemented.
 */
const renderFooter = ({
  tabList, tabActiveKey, onTabChange, tabBarExtraContent,
}) => (tabList && tabList.length ? (
  <Tabs
    className={styles.tabs}
    activeKey={tabActiveKey}
    onChange={(key) => {
      if (onTabChange) {
        onTabChange(key)
      }
    }}
    tabBarExtraContent={tabBarExtraContent}
  >
    {tabList.map((item) => (
      <Tabs.TabPane tab={item.tab} key={item.key} />
    ))}
  </Tabs>
) : null)
let LOCAL_BACKSTATE
const PageHeaderWrapper = ({
  children,
  contentWidth,
  wrapperClassName,
  top,
  title,
  content,
  logo,
  extraContent,
  hiddenBreadcrumb,
  breadcrumbList,
  ...restProps
}) => {
  let len
  let breadData = ''
  if (breadcrumbList) {
    len = breadcrumbList && breadcrumbList.length - 1
    breadData = breadcrumbList[len]
  }

  // 保存上页的状态
  let backUrl = breadData && breadData.href

  // 资源申请单列表页面状态回填数据
  const { APPLY_FORM_LIST_STATE } = restProps.location.query
  if (APPLY_FORM_LIST_STATE) {
    LOCAL_BACKSTATE = APPLY_FORM_LIST_STATE
  }
  const { path } = restProps.match
  if (
    path === '/manage/operation-center/operation-order/details/:orderId/:selectPanel?' || // 申请单详情
    path === '/manage/operation-center/operation-order/update/:orderId' // 申请单修改
  ) {
    if (LOCAL_BACKSTATE) {
      backUrl += `${/\?/.test(backUrl) ? '&' : '?'}APPLY_FORM_LIST_STATE=${LOCAL_BACKSTATE}`
    }
  } else {
    LOCAL_BACKSTATE = null
  }

  return (
    <div style={{ margin: '-24px -24px 0' }} className={classNames(wrapperClassName, styles.main)}>
      {top}
      <MenuContext.Consumer>
        {(value) => (
          <PageHeader
            wide={contentWidth === 'Fixed'}
            title={
              (
                <>
                  {breadData && (
                    <Link
                      to={backUrl}
                      style={{
                        marginRight: 15,
                        display: 'inline-block',
                        fontSize: '14px',
                        fontWeight: 'normal',
                      }}
                    >
                      <Icon type="left" />
                      返回
                    </Link>
                  )}
                  {title && (
                    <Title
                      level={4}
                      style={{
                        marginBottom: 0,
                        display: 'inline-block',
                      }}
                    >
                      {title}
                    </Title>
                  )}
                </>
              )
            }
            key="pageheader1"
            {...restProps}
            breadcrumb={
              !hiddenBreadcrumb &&
              conversionBreadcrumbList({
                ...value,
                breadcrumbList,
                ...restProps,
              })
            }
            className={styles.pageHeader}
            linkElement={Link}
            footer={renderFooter(restProps)}
          >
            <div className={styles.detail}>
              {logo && <div className={styles.logo}>{logo}</div>}
              <div className={styles.main}>
                <div className={styles.row}>
                  {content && <div className={styles.content}>{content}</div>}
                  {extraContent && <div className={styles.extraContent}>{extraContent}</div>}
                </div>
              </div>
            </div>
          </PageHeader>
        )}
      </MenuContext.Consumer>
      {children ? (
        <div className={styles['children-content']}>
          <GridContent>{children}</GridContent>
        </div>
      ) : null}
    </div>
  )
}
export default withRouter(connect(({ setting }) => ({
  contentWidth: setting.contentWidth,
}))(PageHeaderWrapper))
