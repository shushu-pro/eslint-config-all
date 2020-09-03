import React from 'react'
import pathToRegexp from 'path-to-regexp'
import Link from 'umi/link'
import { Menu, Breadcrumb, Icon, Tooltip } from 'antd'
import { formatMessage } from 'umi-plugin-react/locale'
import { urlToList } from '../_utils/pathTools'
import { menu } from '../../defaultSettings'
import styles from './index.less'

// 将中文替换成字符串，进行长度计算
const getStrLen = (str) => str.replace(/[^/\\x00-\xff]/g, '00').length

// 渲染Breadcrumb 子节点
const itemRender = (route) => {
  let name = route.breadcrumbName
  if (getStrLen(name) >= 14) {
    name = (
      <Tooltip title={name}>
        <span className={styles.text}>{name}</span>
      </Tooltip>
    )
  }
  if (!route.path) {
    return name
  }
  return (
    <Link to={route.path}>{name}</Link>
  )
}

// 根据通用配置 来判断使用哪里的值
const renderItemLocal = (item) => {
  if (item.locale) {
    const name = menu.disableLocal
      ? item.name
      : formatMessage({ id: item.locale, defaultMessage: item.name })
    return name
  }
  return item.name
}

// 获取路由对象
export const getBreadcrumb = (breadcrumbNameMap, url) => {
  let breadcrumb = breadcrumbNameMap[url]
  if (!breadcrumb) {
    Object.keys(breadcrumbNameMap).forEach((item) => {
      if (pathToRegexp(item).test(url)) {
        breadcrumb = breadcrumbNameMap[item]
      }
    })
  }
  return breadcrumb || {}
}

/**
 *数据生成
 * breadcrumbList结构 { title: 首页, href: '/manage/home' }
 */
const conversionFromProps = (breadcrumbList) => breadcrumbList.map((item) => {
  const { title, href } = item
  return {
    path: href,
    breadcrumbName: title,
  }
})

/**
 * 根据地址分割成路由地址列表
 * 输出： [{ breadcrumbName: '首页'，path: '/manage/home'  }]
 */
const conversionFromLocation = (routerLocation, breadcrumbNameMap) => {
  const pathSnippets = urlToList(routerLocation.pathname)
  // 循环数据
  const extraBreadcrumbItems = pathSnippets
    .map((url) => {
      const currentBreadcrumb = getBreadcrumb(breadcrumbNameMap, url)
      if (currentBreadcrumb.inherited) {
        return null
      }
      if (!currentBreadcrumb.icon) {
        return null
      }
      const name = renderItemLocal(currentBreadcrumb)
      const { hideInBreadcrumb } = currentBreadcrumb
      return name && !hideInBreadcrumb
        ? {
          breadcrumbName: name,
        }
        : null
    })
    .filter((item) => item !== null)
  return extraBreadcrumbItems
}

/**
 * 将参数转化为面包屑
 * 结构为： 二级菜单/page1/···/pageN
 */
export const conversionBreadcrumbList = (props) => {
  const { breadcrumbList } = props
  const { params, location, breadcrumbNameMap } = props
  let routes = []
  // 根据 location 生成 面包屑
  if (location && location.pathname) {
    routes = conversionFromLocation(location, breadcrumbNameMap, props)
  }
  // 如果有breadcrumbList
  if (breadcrumbList && breadcrumbList.length) {
    routes = routes.concat(conversionFromProps(breadcrumbList))
  }
  if (routes.length > 4) {
    return {
      routes: [ {
        breadcrumbName: <Icon type="menu" />,
      } ],
      itemRender: () => (
        <Breadcrumb>
          <Breadcrumb.Item
            overlay={(
              <Menu>
                {routes.map((item) => (
                  <Menu.Item key={item.breadcrumbName}>
                    {item.path ? (
                      <Link to={item.path}>
                        {item.breadcrumbName}
                      </Link>
                    ) : item.breadcrumbName}
                  </Menu.Item>
                ))}
              </Menu>
            )}
          >
            <Icon type="menu" />
          </Breadcrumb.Item>
        </Breadcrumb>
      ),
    }
  }
  return {
    routes,
    params,
    itemRender,
  }
}
