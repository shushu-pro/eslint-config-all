import React from 'react'
import { Row, Col } from 'antd'
import SingleDataDefault from './SingleData'
import { PRODUCT_FIELDS } from '../Product/base/_constant'
import styles from './index.less'

export default class BackUpDetailData extends React.PureComponent {
  render () {
    const {
      data, className, isSetUp,
    } = this.props
    let index = 0 // 用于设置Row中的key
    const layout = [ 3, 4, 3, 6, 2, 3, 2 ]
    const dataSource = data.map((item) => {
      class SingleData extends SingleDataDefault {}
      SingleData.defaultProps.data = item
      item[PRODUCT_FIELDS.POLICY_TYE] = '全量+增量'
      item[PRODUCT_FIELDS.PREFERRED_CYCLE_TYPE] = '按周执行'
      item[PRODUCT_FIELDS.PREFERRED_BACK_UP_TYPE] = '按最长天数'
      item.preferredBackupTime = item.preferredBackupTime && item.preferredBackupTime.replace(new RegExp('Z', 'g'), '') // 去除'Z'
      let content = null
      const OssData = item.cloudInstanceId
      switch (item.productCode) {
        case 'RDS':
          content = (
            <>
              <div>
                <span style={{ color: '#999' }}>CPU/内存:</span>
                {item.cpuMemory}
              </div>
              <div>
                <span style={{ color: '#999' }}>存储:</span>
                {' '}
                {item.storage}
              </div>
            </>
          )
          break
        case 'ECS':
          content = (
            <>
              <div>
                <span style={{ color: '#999' }}>CPU/内存:</span>
                {item.specification}
              </div>
              <div>
                <span style={{ color: '#999' }}>系统盘:</span>
                {item.systemDiskType}
                ,
                {item.systemDiskSize}
                GB
              </div>
              {item.dataDiskList
                .filter((dataItem) => dataItem.diskType === 'data')
                .map((items) => (
                  <div>
                    <span style={{ color: '#999' }}>数据盘:</span>
                    {items.typeName}
                    ,
                    {items.storageMax}
                    GB
                  </div>
                ))}
            </>
          )
          break
        case 'SLB':
          content = (
            <div>
              <span style={{ color: '#999' }}>网络类型:</span>
              {item.netWorkType}
            </div>
          )
          break
        case 'Redis':
          content = (
            <div>
              <span style={{ color: '#999' }}>实例类型:</span>
              {item.instanceType}
            </div>
          )
          break
        case 'OSS':
          content = (
            <div>
              <span style={{ color: '#999' }}>容量:</span>
              {item.storage}
            </div>
          )
          // OssData = '-';
          break
        default:
          break
      }
      return (
        <div className={`${styles.BackUpRow}`}>
          <Row
            className={`${styles.resCard} ${styles.title} ${styles.detailStyle}`}
            key={item.cloudInstanceId + 0}
            style={{ color: '#333', marginBottom: 0 }}
          >
            <Col span={layout[0]}>
              <div className={styles.config}>{item.productCode}</div>
            </Col>
            <Col span={layout[1]}>
              <>
                <div>
                  <a>{OssData}</a>
                </div>
                <div>{item.cloudInstanceName}</div>
              </>
            </Col>
            <Col span={layout[2]}>
              <div className={styles.config}>
                {item.areaName}
                -
                {item.regionName}
              </div>
            </Col>
            <Col span={layout[0]}>
              <div className={styles.config}>{item.projectName}</div>
            </Col>
            <Col span={layout[3]}>
              <div className={styles.config}>{content}</div>
            </Col>
            <Col span={layout[1]}>
              <div className={styles.config}>{item.createdDate}</div>
            </Col>
          </Row>
          {isSetUp && (
            <Row
              className={`${styles.resCard} ${styles.title} ${styles.detailStyle}`}
              style={{ backgroundColor: '#f5f5f599' }}
              key={item.cloudInstanceId + 1}
            >
              <Col span={layout[0]}>
                <div className={styles.config} style={{ fontWeight: 'bolder', color: '#333' }}>
                  备份设置
                </div>
              </Col>
              <Col span={layout[1]}>
                <SingleData id={PRODUCT_FIELDS.POLICY_TYE} />
                <SingleData id={PRODUCT_FIELDS.PREFERRED_CYCLE_TYPE} />
              </Col>
              <Col span={layout[3]}>
                <SingleData id={PRODUCT_FIELDS.BACKUP_TIME_INTERVAL} unit="天" />
                <SingleData id={PRODUCT_FIELDS.PREFERRED_BACK_UP_PERIOD} />
                <SingleData id={PRODUCT_FIELDS.PREFERRED_BACK_UP_TIME} />
              </Col>
              <Col span={layout[1]}>
                <SingleData id={PRODUCT_FIELDS.PREFERRED_BACK_UP_TYPE} />
                <SingleData id={PRODUCT_FIELDS.BACK_UP_RETENTION_PERIOD} unit="天" />
              </Col>
            </Row>
          )}
        </div>
      )
    })
    return (
      <div
        className={className}
        style={{ border: '1px solid rgba(0, 0, 0, 0.15)', borderRadius: 4 }}
      >
        <Row
          className={`${styles.resCard} ${styles.title}`}
          style={{
            paddingBottom: 0,
            color: '#333',
            fontWeight: 'bolder',
            backgroundColor: '#e8e8e880',
          }}
          key={`BackUpDetailData${index++}`}
        >
          <Col span={layout[0]}>
            <div className={styles.config}>资源</div>
          </Col>
          <Col span={layout[1]}>
            <div className={styles.config}>实例ID/名称</div>
          </Col>
          <Col span={layout[2]}>
            <div className={styles.config}>区域</div>
          </Col>
          <Col span={layout[0]}>
            <div className={styles.config}>项目</div>
          </Col>
          <Col span={layout[3]}>
            <div className={styles.config}>规格</div>
          </Col>
          <Col span={layout[1]}>
            <div className={styles.config}>开通时间</div>
          </Col>
        </Row>
        {/* {header} */}
        {dataSource}
      </div>
    )
  }
}
