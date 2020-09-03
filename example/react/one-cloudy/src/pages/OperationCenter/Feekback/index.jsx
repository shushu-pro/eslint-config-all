import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Button, Card, Row, Col, Spin } from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import FooterComfire from '@/components/Common/FooterComfire'
import StackPanel from '@/components/Common/StackPanel'
import SearchList from './SearchList'
import ResSearchList from './ResSearchList'
import Region from './Region'
import ApplyCard from './ApplyCard'
import ResCard from './ResCard'
import styles from './index.less'

@connect(({ feedback, loading }) => ({
  deptProjectList: feedback.deptProjectList,
  dtProjectList: feedback.dtProjectList,
  applyListloading: !!loading.effects['feedback/queryApplyList'],
  resListloading: !!loading.effects['feedback/queryResList'],
}))
class Feekback extends PureComponent {
  state = {
    // dt-实例列表
    resList: [ 1, 2, 3 ],
    // 是否激活反馈
    activation: false,
    // 激活的key
    activeKey: '',
    // 申请的资源列表
    applyList: [],
    // 申请的资源区域
    applyRegion: '',
    // 资源
    resInfoList: [],
  };

  componentDidMount () {
    const { dispatch } = this.props
    dispatch({
      type: 'feedback/queryDeptProject',
    })
    dispatch({
      type: 'feedback/queryDtDeptProject',
    })
  }

  // 查询申请资源列表
  queryApplyList = (params) => {
    const { dispatch } = this.props
    dispatch({
      type: 'feedback/queryApplyList',
      payload: {
        ...params,
      },
    }).then((res) => {
      const { resData } = res
      if (resData && Array.isArray(resData)) {
        this.setState({
          applyList: resData,
          applyRegion: resData.length > 0 ? resData[0].regionId : '',
          resInfoList: resData.length > 0 ? resData[0].resInfoList : [],
        })
      } else {
        this.setState({
          applyList: [],
          applyRegion: '',
          resInfoList: [],
        })
      }
    })
  };

  // 查询资源实例列表
  queryResList = () => {
    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'feedback/queryResList',
    //   payload: {
    //     ...params,
    //     deptId: 999,
    //     projectId: 'pro-1721d17cc16041b3a',
    //   },
    // }).then(res => {
    //   const { resData } = res;
    //   this.setState({
    //     applyList: resData,
    //     applyRegion: resData.length > 0 ? resData[0].regionId : '',
    //     resInfoList: resData.length > 0 ? resData[0].resInfoList : [],
    //   });
    // });
  };

  onSelect = (item, index) => {
    const { activeKey, resList, activation, resInfoList } = this.state
    if (!activation) {
      return false
    }
    resInfoList[activeKey].feekbackData = {
      index,
      value: item,
    }
    this.setState({
      activation: false,
      resList: resList.filter((key) => key !== item),
    })
  };

  // 切换申请列表中的区域
  onApplyChange = (e) => {
    const { applyList } = this.state
    const selectValue = e.target.value
    const data = applyList.find((item) => item.regionId === selectValue)
    this.setState({
      applyRegion: e.target.value,
      resInfoList: data ? data.resInfoList : [],
      activation: false,
    })
  };

  // 选择某个申请的资源
  onApplyAction = (item, index) => {
    const { activation, resList } = this.state
    if (!item.feekbackData) {
      this.setState({
        activation: !activation,
        activeKey: index,
      })
    } else {
      // 将取消反馈的数据重新放会反馈的实例列表中
      resList.splice(item.feekbackData.index, 0, item.feekbackData.value)
      delete item.feekbackData
      this.setState({
        activation: !activation,
        resList,
      })
    }
  };

  render () {
    const { deptProjectList, applyListloading, dtProjectList, resListloading } = this.props
    if (!(deptProjectList && dtProjectList)) {
      return null
    }
    const { resList, applyList, activation, activeKey, applyRegion, resInfoList } = this.state
    return (
      <PageHeaderWrapper title="资源反馈">
        <Row gutter={24} className={styles.feekback}>
          <Col span={12}>
            <Card bordered={false}>
              <div className={styles.title}>
                <span className={styles.icon} />
                <h1>用户申请资源数据</h1>
              </div>
              <SearchList options={deptProjectList} queryList={this.queryApplyList} />
              <Spin spinning={applyListloading}>
                <Region
                  applyList={applyList}
                  applyRegion={applyRegion}
                  onApplyChange={this.onApplyChange}
                />
                <ApplyCard
                  resInfoList={resInfoList}
                  activeKey={activeKey}
                  activation={activation}
                  onAction={this.onApplyAction}
                />
              </Spin>
            </Card>
          </Col>
          <Col span={12}>
            <Card bordered={false}>
              <div className={styles.title}>
                <span className={styles.icon} />
                <h1>资源生产数据</h1>
              </div>
              <ResSearchList options={dtProjectList} queryList={this.queryResList} />
              <div className={styles.title}>
                <span className={styles.icon} />
                <h1>资源清单</h1>
              </div>
              {/* <Region applyList={applyList} applyRegion={applyRegion} /> */}
              <Spin spinning={resListloading}>
                <ResCard resList={resList} activation={activation} onSelect={this.onSelect} />
              </Spin>
            </Card>
          </Col>
        </Row>
        <FooterComfire>
          <StackPanel>
            <StackPanel.RightAlice>
              <Button>取消</Button>
              <Button type="primary">提交反馈</Button>
            </StackPanel.RightAlice>
          </StackPanel>
        </FooterComfire>
      </PageHeaderWrapper>
    )
  }
}

export default Feekback
