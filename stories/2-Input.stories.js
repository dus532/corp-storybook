/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';

import GlobalStyle from '../app/global-styles';

import DataInput from '../app/components/02Molecules/DataInput';
import DropBox from '../app/components/01Atoms/DropBox';
import Icon from '../app/components/01Atoms/Icon';

import { Wrap, Container, Header, ExBox, Info, Tag, Flex } from './styled';

export default {
  title: 'Design System/Input',
  component: Input,
};

export const Input = () => (
  <Wrap>
    <Container>
      <br />
      <Header title="Input" subtitle="글자를 입력합니다." />
      <br />
      <Flex>
        <div className="box">
          <Info title="Normal" subtitle="기본 상태의 Input" />
          <br />
          <ExBox>
            <br />
            <Tag>기본</Tag>
            <DataInput width="200" placeholder="1 + 1 = ?" />
            <br />
            <br />
            <Tag>❌ 오류</Tag>
            <DataInput
              defaultValue="2"
              width="200"
              error={{ message: '정답은 창문입니다.' }}
              placeholder="1 + 1 = ?"
            />
            <br />
          </ExBox>
        </div>
        <div className="box">
          <Info title="Password" subtitle="비밀번호를 표시하는 Input" />
          <br />
          <ExBox>
            <br />
            <Tag>기본</Tag>
            <DataInput
              type="password"
              width="200"
              placeholder="비밀번호 입력"
            />
            <br />
            <br />
            <Tag>❌ 오류</Tag>
            <DataInput
              type="password"
              width="200"
              error={{ message: '비밀번호가 틀렸습니다!' }}
              placeholder="비밀번호 확인"
            />
            <br />
          </ExBox>
        </div>
        <div className="box">
          <Info title="Suffix" subtitle="접미사가 존재하는 Input" />
          <br />
          <ExBox>
            <br />
            <Tag>Suffix : 접미사</Tag>
            <DataInput suffix="원" width="200" placeholder="가격 입력" />
            <br />
            <br />
            <Tag>Suffix : ❌ 오류</Tag>
            <DataInput
              suffix="원"
              width="200"
              placeholder="가격 입력"
              error={{ message: '가격이 맞지 않습니다.' }}
            />
            <br />
          </ExBox>
        </div>
        <div className="box">
          <Info title="Prefix" subtitle="접두사가 존재하는 Input" />
          <br />
          <ExBox>
            <br />
            <Tag>Prefix : 접두사</Tag>
            <DataInput
              prefix={<Icon type="search" />}
              width="200"
              placeholder="접두사"
            />
            <br />
            <br />
            <Tag>Prefix : ❌ 오류</Tag>
            <DataInput
              prefix={<Icon type="search" />}
              width="200"
              placeholder="접두사"
              error={{ message: '검색어를 입력해주세요!' }}
            />
            <br />
          </ExBox>
        </div>
      </Flex>
      <br />
    </Container>
    <GlobalStyle />
  </Wrap>
);

export const Dropbox = () => (
  <Wrap>
    <Container>
      <br />
      <Header
        title="DropBox"
        subtitle="다양한 요소중 하나를 선택하게 합니다."
      />
      <br />
      <Flex>
        <div className="box">
          <Info title="데이터 없음" subtitle="데이터가 없을 때" />
          <br />
          <ExBox>
            <DropBox />
          </ExBox>
        </div>
        <div className="box">
          <Info title="데이터 있음" subtitle="데이터가 있을 때" />
          <br />
          <ExBox>
            <DropBox
              data={[{ value: 0, body: '남자' }, { value: 1, body: '여자' }]}
              initial={{ body: '선택하세요' }}
            />
          </ExBox>
        </div>
      </Flex>
    </Container>
    <GlobalStyle />
  </Wrap>
);
