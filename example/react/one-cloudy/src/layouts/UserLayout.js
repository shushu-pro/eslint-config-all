import React, { Component, Fragment } from 'react'
import { formatMessage } from 'umi-plugin-react/locale'
import { connect } from 'dva'
import Link from 'umi/link'
import GlobalFooter from '@/components/GlobalFooter'
import DocumentTitle from 'react-document-title'
// import SelectLang from '@/components/SelectLang';
import getPageTitle from '@/utils/getPageTitle'
import styles from './UserLayout.less'
import logo from '../assets/logo.svg'

const links = [
  {
    key: 'help',
    title: formatMessage({ id: 'layout.user.link.help' }),
    href: '',
  },
  {
    key: 'privacy',
    title: formatMessage({ id: 'layout.user.link.privacy' }),
    href: '',
  },
  {
    key: 'terms',
    title: formatMessage({ id: 'layout.user.link.terms' }),
    href: '',
  },
]
const copyright = (
  <>{/* Copyright <Icon type="copyright" /> 2019 浙江数蜂科技出品 */}</>
)
class UserLayout extends Component {
  componentDidMount () {
    const {
      dispatch,
      route: { routes, authority },
    } = this.props
    dispatch({
      type: 'menu/getMenuData',
      payload: { routes, authority },
    })
  }

  render () {
    const {
      children,
      location: { pathname },
      breadcrumbNameMap,
    } = this.props
    return (
      <DocumentTitle title={getPageTitle(pathname, breadcrumbNameMap)}>
        <div className={styles.container}>
          {/* <div className={styles.lang}>
            <SelectLang />
          </div> */}
          <div className={styles.content}>
            <div className={styles.top}>
              <div className={styles.header}>
                <Link to="/">
                  <img alt="logo" className={styles.logo} src={logo} />
                  <span className={styles.title}>浙江省政务一朵云平台</span>
                </Link>
              </div>
              <div className={styles.desc}>极具大型多云运营能力的统一平台</div>
            </div>
            {children}
          </div>
          <GlobalFooter links={links} copyright={copyright} />
        </div>
      </DocumentTitle>
    )
  }
}

export default connect(({ menu: menuModel }) => ({
  menuData: menuModel.menuData,
  breadcrumbNameMap: menuModel.breadcrumbNameMap,
}))(UserLayout)
