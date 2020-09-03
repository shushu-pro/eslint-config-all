/**
 * 数量组件
 */
import React from 'react';
import { InputNumber } from 'antd';
import Item from './Item';

function NumberInput({
  form,
  formItemLayout,
  label,
  id,
  initialValue,
  min = 0,
  max = Infinity,
  step,
  precision = 0,
  required = false,
  placeholder,
  ...arg
}) {
  return (
    <Item
      dataIndex={id}
      required={required}
      label={label}
      form={form}
      initialValue={initialValue}
      {...formItemLayout}
      rules={[
        (rule, value, callback) => {
          if (!value) return callback();
          if (value < min) {
            return callback(new Error(`${label}不能小于${min}`));
          }
          if (value > max) {
            return callback(new Error(`${label}不能大于${max}`));
          }
          return callback();
        },
      ]}
      decorator={
        <InputNumber
          min={min}
          max={max}
          precision={precision}
          placeholder={placeholder}
          step={step || 1}
          {...arg}
        />
      }
    />
  );
}

export default NumberInput;
