import React from 'react'
import { Steps } from 'antd'
import FristStep from './FristStep'
import SecStep from './SecStep'
import ThreeStep from './ThreeStep'
import FourStep from './FourStep'
import styles from './index.less'

const { Step } = Steps
const STEP_STATUS = {
  0: FristStep,
  1: SecStep,
  2: ThreeStep,
  3: FourStep,
}
class BatchApply extends React.Component {
  state = {
    currentStep: 0,
  };

  getChildrenMsg = (result, msg) => {
    this.setState({
      applyId: msg,
    })
    console.log(this.state)
  }

  getCurrentStep () {
    const { currentStep } = this.state
    const File = STEP_STATUS[currentStep]
    const propsData = {
      onNextStep: this.onNextStep,
      onPrevStep: this.onPrevStep,

    }
    return <File {...propsData} location={this} />
  }

  // 上一步
  onPrevStep = () => {
    const { currentStep } = this.state
    this.setState({
      currentStep: currentStep - 1,
    })
  };

  // 下一步
  onNextStep = () => {
    const { currentStep } = this.state
    this.setState({
      currentStep: currentStep + 1,
    })
  };

  render () {
    const { currentStep } = this.state
    return (
      <div className={styles.apply}>
        <Steps current={currentStep} className={styles.steps}>
          <Step title="填写基础信息" />
          <Step title="填写资源清单" />
          <Step title="信息确认" />
          <Step title="完成" />
        </Steps>
        {this.getCurrentStep()}
      </div>
    )
  }
}

export default BatchApply
