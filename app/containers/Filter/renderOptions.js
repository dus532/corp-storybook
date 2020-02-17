import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

export default function renderOptions(data) {
  return data.map(({ value, text, ...props }) => (
    <Option key={value} {...props}>
      {text}
    </Option>
  ));
}
