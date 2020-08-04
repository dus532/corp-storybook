import React from 'react';

import { action } from '@storybook/addon-actions';

import Input from 'components/01Atoms/Input';
import DropBox from 'components/01Atoms/DropBox';

import { Wrap, Container, Header, ExBox, Info } from './styled';

export default {
  title: 'Design System/Input',
  component: Input,
};

export const Text = () => (
  <div style={{ width: 400 }}>
    <Input onChange={e => action(e.target.value)} />
  </div>
);

export const Dropbox = () => (
  <Wrap>
    <Container>
      <br />
      <Header
        title="DropBox"
        subtitle="Input : 다양한 요소중 하나를 선택하게 합니다."
      />
      <br />
      <Info title="데이터 없음" subtitle="데이터가 없을 때" />
      <br />
      <ExBox>
        <DropBox />
      </ExBox>
      <br />
      <br />
      <Info title="데이터 있음" subtitle="데이터가 있을 때" />
      <br />
      <ExBox>
        <DropBox
          data={[{ value: 0, body: '남자' }, { value: 1, body: '여자' }]}
          initial={{ body: '선택하세요' }}
        />
      </ExBox>
    </Container>
  </Wrap>
);
