// 帮助提示组件
import React, { SFC } from 'react';
import { Popover, Icon } from 'antd';
import styles from './index.less';

interface HelpProps {
  title: React.ReactNode;
}

const Help: SFC<HelpProps> = ({ title }) => {

  return (
    <Popover
      content={
        <span className={styles.title}>
          <Icon type="exclamation-circle" className={styles.icon} />
          <span>{title}</span>
        </span>
      }
    >
      <Icon
        type="question-circle"
        theme="filled"
        style={{ marginRight: '8px', color: '#1890ff' }}
      />
    </Popover>
  );
}

export default Help;