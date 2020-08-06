import React from 'react';

import { action } from '@storybook/addon-actions';

import Button from '../components/01Atoms/Button';

export default {
  title: 'Design System/Button',
  component: Button,
};

export const Primary = () => (
  <div style={{ width: 400 }}>
    <Button onClick={action('클릭!')}>버튼</Button>
  </div>
);

export const Gray = () => (
  <div style={{ width: 400 }}>
    <Button onClick={action('클릭!')} color="gray">
      버튼
    </Button>
  </div>
);

export const Small = () => (
  <div style={{ width: 200 }}>
    <Button onClick={action('클릭!')} size="small" color="gray">
      버튼
    </Button>
  </div>
);
