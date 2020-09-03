import React from 'react'
import { Layout } from 'antd'
import DocumentTitle from 'react-document-title'
import { connect } from 'dva'
import { ContainerQuery } from 'react-container-query'
import classNames from 'classnames'
import pathToRegexp from 'path-to-regexp'
import Media from 'react-media'
import HeaderRight from '@/components/HeaderRight'
import ErrorPage from '@/pages/ErrorPage'
import PageLoading from '@/components/PageLoading'
import SiderMenu from '@/components/SiderMenu'
import { LOGOUT_URL } from '@/contants'
import { getPageQuery } from '@/utils/utils'
import getPageTitle from '@/utils/getPageTitle'
import Exception403 from '@/pages/Exception/403'
import Exception404 from '@/pages/Exception/404'
import Exception500 from '@/pages/Exception/500'
import { getPermissions } from './PermissionsContext'
import Context from './MenuContext'
import Footer from './Footer'
import logo from '../assets/logo.svg'
import styles from './BasicLayout.less'
import '../config/antd.config'

const { Content } = Layout
const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599,
  },
  'screen-xxl': {
    minWidth: 1600,
  },
}
class BasicLayout extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showErrorPage: false,
    }
    const {
      dispatch,
      route: { routes, path, authority },
    } = props
    const params = getPageQuery()
    let { code } = params
    code = Array.isArray(code) ? code[code.length - 1] : code
    const newCode = window.sessionStorage.getItem('code') || window.localStorage.getItem('code')
    if (code || (newCode && newCode !== 'undefined')) {
      let backurl = window.sessionStorage.getItem('backurl')
      if (backurl === (`${window.location.origin}/`)) {
        backurl = `${window.location.origin}/manage`
      }
      dispatch({
        type: 'user/queryUsers',
        payload: {
          code:
            code || window.sessionStorage.getItem('code') || window.localStorage.getItem('code'),
          redirectUri: `${window.location.origin}/manage`,
          routes,
          path,
          authority,
        },
      }).then(() => {
        // 控制登录完成后的页面回跳
        if (backurl) {
          window.sessionStorage.removeItem('backurl')
          this.props.history.replace(backurl.replace(window.location.origin, ''))
        }
      }).catch(() => {
        this.setState({
          showErrorPage: true,
        })
      })
      window.sessionStorage.setItem('code', code)
      window.localStorage.setItem('code', code)
    } else {
      // 跳转前记录当前地址
      window.sessionStorage.setItem('backurl', window.location.href)
      window.location.href = LOGOUT_URL
    }
  }

  getContext () {
    const { location, breadcrumbNameMap } = this.props
    return {
      location,
      breadcrumbNameMap,
    }
  }

  getLayoutStyle = () => {
    const {
      fixSiderbar, isMobile, collapsed, layout,
    } = this.props
    if (fixSiderbar && layout !== 'topmenu' && !isMobile) {
      return {
        paddingLeft: collapsed ? '80px' : '256px',
      }
    }
    return null
  };

  handleMenuCollapse = (collapsed) => {
    const { dispatch } = this.props
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    })
  };

  render () {
    const {
      navTheme,
      layout: PropsLayout,
      children,
      location: { pathname },
      isMobile,
      menuData,
      breadcrumbNameMap,
      fixedHeader,
      userInfo,
      loading,
      dispatch,
      deptId,
    } = this.props
    const { props } = children
    const { showErrorPage } = this.state
    // 如果是配额管理页，查询是否有子部门
    if (props.location.pathname === '/manage/operation-center/quotaManage/check') {
      dispatch({
        type: 'quotaManage/getSubDeptList',
        payload: {
          deptId,
        },
      })
    }
    if (loading) {
      return <PageLoading />
    }
    if (showErrorPage) {
      return <ErrorPage />
    }
    let dom = null
    const isError = pathToRegexp('/manage/exception(.*)').test(pathname)
    // 报错页显示的页面
    if (isError) {
      const template = pathname.split('/')[3]
      const File = {
        403: <Exception403 />,
        400: <Exception404 />,
        404: <Exception404 />,
        500: <Exception500 />,
        502: <Exception500 />,
      }
      dom = File[template]
    }
    if (!userInfo.userId) {
      return dom
    }
    if (userInfo.userId && !isError) {
      dom = children
    }
    const isTop = PropsLayout === 'topmenu'
    const contentStyle = !fixedHeader ? { paddingTop: 0 } : {}
    const layout = (
      <Layout className={styles.layout}>
        {isTop && !isMobile ? null : (
          <SiderMenu
            logo={logo}
            theme={navTheme}
            onCollapse={this.handleMenuCollapse}
            menuData={menuData}
            isMobile={isMobile}
            {...this.props}
          />
        )}
        <Layout
          style={{
            ...this.getLayoutStyle(),

            minHeight: '100vh',
          }}
        >
          {/* <Header
            menuData={menuData}
            handleMenuCollapse={this.handleMenuCollapse}
            logo={logo}
            isMobile={isMobile}
            {...this.props}
          /> */}
          <Content className={styles.content} style={contentStyle}>
            <HeaderRight />
            {getPermissions(userInfo.isReadProtocol, pathname)(dom)}
          </Content>
          <Footer />
        </Layout>
      </Layout>
    )
    return (
      <>
        <DocumentTitle title={getPageTitle(pathname, breadcrumbNameMap)}>
          <ContainerQuery query={query}>
            {(params) => (
              <Context.Provider value={this.getContext()}>
                <div className={classNames(params)}>{layout}</div>
              </Context.Provider>
            )}
          </ContainerQuery>
        </DocumentTitle>
      </>
    )
  }
}

export default connect(({
  global, setting, menu: menuModel, user, loading,
}) => ({
  userInfo: user.userInfo,
  deptId: user.deptId,
  collapsed: global.collapsed,
  layout: setting.layout,
  menuData: menuModel.menuData,
  breadcrumbNameMap: menuModel.breadcrumbNameMap,
  loading: !!loading.effects['user/queryUsers'],
  ...setting,
}))((props) => (
  <Media query="(max-width: 599px)">{() => <BasicLayout {...props} isMobile={false} />}</Media>
))
