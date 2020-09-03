import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Steps } from 'antd';
import cx from 'classnames';
import StackPanel from '@/components/Common/StackPanel';
import { STATUS_MAP_TEXT, STATUS_MAP, FLOW_MAP_TEXT, NEXT_FLOW_MAP_TEXT, FLOW_MAP_REFUSE } from './contant';
import styles from './DetailIndex.less';

const { Step } = Steps;

@connect(({ operationOrder }) => ({
  flowList: operationOrder.flowList,
}))
class DetailsIndex extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { flowList } = this.props; 
    const { currentFlow,nextFlow } = flowList;
    // 资源反馈功能未上，过滤生产中
    const newList = Array.isArray(nextFlow) ? nextFlow.filter((item) => item.state !== 'in_product') : [];
    return (
      <div className={styles.flowList}>
        <Steps progressDot current={(currentFlow.length)-1} direction="vertical">
          {currentFlow && currentFlow.map((item, index) => {
            const isRefuse = currentFlow.some(key => FLOW_MAP_REFUSE[item.state] === key.state);
            return (
              <Step
                key={`${item.state}-${index}`}
                title={FLOW_MAP_TEXT[item.state]}
                className={isRefuse ? styles.refuseColor : styles.passColor}
                description={
                  (
                    <div style={{ marginTop: 5 }}>
                      <StackPanel>
                        <span>{item.createdDate}</span>
                        <span>{item.fullName}</span>
                        <span className={cx(styles.status, styles[item.state])}>
                          {item.state !== STATUS_MAP.CANCELING && STATUS_MAP_TEXT[item.state]}
                        </span>
                      </StackPanel>
                      <div className={styles.remark}>说明: {item.remark || '-'}</div> 
                    </div>
                  )
                }
              />
            );
          },       
          )}
          {newList.map((item, index) => {
            return (
              <Step
                key={`${item.state}-${index}`}
                title={NEXT_FLOW_MAP_TEXT[item.state]}
              />
            );
          },       
          )}
        </Steps>
      </div>
    );
  }
}

export default DetailsIndex;
