import React from 'react';
import { Form } from 'antd';
import { FormItemProps } from 'antd/lib/form';
import { ConnectedComponentClass } from 'antd/lib/form/interface';

interface ItemProps extends FormItemProps {
  form?: ConnectedComponentClass<any, any>; // form是必须的,，但是直接嵌套在BindForm里面的可以不写，BindForm会自动写入
  dataIndex: string;
  decorator: React.ReactNode;
  rules?: any[];
  initialValue?: any;
}

class Item extends React.Component<ItemProps, any> {

  shouldSetRequired = (required, ruleList) => {
    if (!required) return false; // required不存在直接不合并
    if (ruleList.length > 0) {
      const hasRequired = ruleList.findIndex(o => o.hasOwnProperty('required'));
      if (hasRequired > -1) return false; // rules数组中有required的相关配置了，不合并
      return true;
    }
    return true;
  }

  render() {
    const { form, label, dataIndex, decorator, rules: ruleList, required, initialValue, children, ...args } = this.props;
    if (!form) throw new Error(`Item must have a 'form' attribute.`);
    let rules = ruleList || [];
    rules = this.shouldSetRequired(required, rules) ? [
      {
        required,
        message: `${label}必填`,
      },
      ...rules,
    ] : rules;
    const child = form.getFieldDecorator(dataIndex, {
      initialValue,
      rules,
    })(decorator);
    return (
      <Form.Item
        label={label}
        {...args}
      >
        {child}
        {children}
      </Form.Item>
    )
  }
}

export default Item;