import React from 'react';

import { action } from '@storybook/addon-actions';

import Input from 'components/01Atoms/Input';
import DropBox from 'components/01Atoms/DropBox';

export default {
  title: 'Input',
  component: Input,
};

export const Text = () => (
  <div style={{ width: 400 }}>
    <Input onChange={e => action(e.target.value)} />
  </div>
);

export const Dropbox = () => (
  <div style={{ width: 400 }}>
    <DropBox data={[{}]} />
  </div>
);
