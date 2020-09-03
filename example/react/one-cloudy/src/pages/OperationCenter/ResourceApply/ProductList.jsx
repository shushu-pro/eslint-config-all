/**
 * 产品列表 - 包含产品类型、搜索等
 */
import React from 'react'
import { connect } from 'dva'
import _ from 'lodash'
import {
  Card, Tabs, Input, Icon,
} from 'antd'
import StackPanel from '@/components/Common/StackPanel'
import PageLoading from '@/components/PageLoading'
import styles from './index.less'

const { TabPane } = Tabs
const { Meta } = Card
const mapDispatchToProps = (dispatch) => ({
  // 获取产品分类列表
  queryProductCategory: () => dispatch({
    type: 'resourceApply/queryProductCategory',
  }),
})
@connect(
  ({ resourceApply, loading }) => ({
    // 产品分类列表
    productList: resourceApply.productList,
    loading: !!loading.effects['resourceApply/queryProductCategory'],
  }),
  mapDispatchToProps,
)
class ProductList extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      selectKey: '0',
      searchValue: undefined,
      productSelectedIndex: undefined, // 选中的产品index
      productList: [], // 产品列表
      isVisible: false, // 浮层是否显示
    }
  }

  componentDidMount () {
    const { queryProductCategory } = this.props
    queryProductCategory()
  }

  // 切换产品类型
  onChangeTab = (key) => {
    this.setState({
      productList: [],
      selectKey: key,
      searchValue: undefined,
    })
  };

  // 搜索产品
  onSearch = (value) => {
    if (value || value === 0) {
      const { selectKey } = this.state
      const { productList: productListProps } = this.props
      const productList = _.cloneDeep(productListProps)
      const searchList = productList[selectKey].children
        .filter(
          (o) => o.name
            .toUpperCase()
            .includes(value.toUpperCase()),
        )
      productList[selectKey].children = searchList
      this.setState({
        productList,
      })
      return
    }
    this.setState({
      productList: [],
    })
  };

  onSearchChange = (e) => {
    this.setState({
      searchValue: e.target.value,
    })
  };

  onSelectProduct = (item, index) => {
    const { onChangeProduct } = this.props
    if (this.ifProductDisabled(item)) return
    this.setState({ productSelectedIndex: index })
    onChangeProduct && onChangeProduct(item)
  };

  // 判断产品是否禁用(true为禁用)
  // 现在不关联项目的产品都能选择，要放开
  // ifProductDisabled = () => false;

  // // 判断产品是否禁用(true为禁用)
  // ifProductDisabled = items => {
  //   const { batch, hasProject } = this.props;
  //   // 判断是否属于资源变更
  //   const isEdit = Reflect.has(this.props, 'hasProject');
  //   const canSelect = isEdit
  //     ? // 资源变更中hasProject表示是否已有项目
  //       XNOR(items.isDepdProject, hasProject)
  //     : // 单选或者产品关联项目都是可选的
  //       (!batch || items.isDepdProject);
  //   return !canSelect;
  // };

  ifProductDisabled = (item) => {
    const { batch } = this.props
    if (batch && item.isDepdProject.toString() === '0') {
      return true
    }
    return false
  };

  // 鼠标移入
  MouseEnter = (item, index) => {
    const { batch } = this.props
    if (batch && item.isDepdProject.toString() === '0') {
      this.setState({
        isVisible: true,
        productSelectedIndex: index,
      })
    }
  };

  MouseLeave = (item) => {
    const { batch } = this.props
    if (batch && item.isDepdProject.toString() === '0') {
      this.setState({ isVisible: false })
    }
  };

  render () {
    const { productList: productListState, searchValue, productSelectedIndex } = this.state
    const { productList, loading } = this.props
    const { isVisible } = this.state
    if (loading) {
      return <PageLoading />
    }
    if (!Array.isArray(productList) || !productList.length > 0) {
      return null
    }
    const finProductList = productListState.length > 0 ? productListState : productList
    return (
      <div className={styles.tabPage}>
        <Tabs
          defaultActiveKey="0"
          onChange={this.onChangeTab}
          renderTabBar={(props, DefaultTabBar) => (
            <>
              <DefaultTabBar {...props} />
              <Input.Search
                allowClear
                style={{ width: '200px', margin: '10px 24px 0' }}
                onSearch={this.onSearch}
                placeholder="搜索产品"
                value={searchValue}
                onChange={this.onSearchChange}
              />
            </>
          )}
        >
          {finProductList.map((item, index) => (
            <TabPane
              tab={(
                <span>
                  <i className={`icon iconfont ${item.icon}`} />
                  {item.label}
                </span>
              )}
              key={index.toString()}
            >
              <StackPanel>
                {item.children &&
                  item.children.map((items, i) => (
                    <a
                      className={styles.productCardBox}
                      key={items.id}
                      onClick={() => this.onSelectProduct(items, i)}
                    >
                      <Card
                        className={`${styles.productCard} ${
                          this.ifProductDisabled(items) ? styles.disabled : ''
                        }`}
                        onMouseEnter={() => this.MouseEnter(items, i)}
                        onMouseLeave={() => {
                          this.MouseLeave(items)
                        }}
                        onFocus={() => 0}
                      >
                        {/* 用于不可选时出现浮层 */}
                        {this.ifProductDisabled(items) && isVisible && productSelectedIndex === i && (
                          <Card
                            className={styles.productCardFloatLayer}
                            style={{ marginLeft: -25, marginTop: -25 }}
                          >
                            <Meta
                              style={{ textAlign: 'center', transform: 'translateY(25%)' }}
                              title={(
                                <div style={{ color: '#f2f2f2' }}>
                                  <Icon type="exclamation-circle" />
                                </div>
                              )}
                              description={(
                                <div style={{ color: '#f2f2f2' }}>
                                  <span>该产品暂不支持批量申请,</span>
                                  <br />
                                  <span>请通过单个资源申请通道进行申请</span>
                                </div>
                              )}
                            />
                          </Card>
                        )}
                        <Meta
                          avatar={<i className={`icon iconfont ${items.icon}`} />}
                          title={items.name}
                          description={items.comments || items.name}
                        />
                      </Card>
                      {/* 下面的card用于动画 */}
                      {productSelectedIndex === i && (
                        <Card
                          id="animateStart"
                          className={`${styles.productCard} ${
                            this.ifProductDisabled(items) ? styles.disabled : ''
                          }`}
                        >
                          <Meta
                            avatar={<i className={`icon iconfont ${items.icon}`} />}
                            title={items.name}
                            description={items.comments || items.name}
                          />
                        </Card>
                      )}
                    </a>
                  ))}
              </StackPanel>
            </TabPane>
          ))}
        </Tabs>
      </div>
    )
  }
}

export default ProductList
