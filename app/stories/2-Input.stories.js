/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import 'react-dates/initialize';
import '_datepicker.css';
import { DateRangePicker } from 'react-dates';

import moment from 'utils/moment';

import Label from '../components/01Atoms/Label';
import DataInput from '../components/02Molecules/DataInput';
import DropBox from '../components/01Atoms/DropBox';
import Icon from '../components/01Atoms/Icon';

import GlobalStyle from '../global-styles';

import { Wrap, Container, Header, ExBox, Info, Tag, Flex } from './styled';
import 'moment/locale/ko';

moment.locale('ko');

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

export const LabelList = () => (
  <Wrap>
    <Container>
      <br />
      <Header title="Label" subtitle="Label을 이용하여 리스트를 만듭니다" />
      <br />
      <Flex>
        <div className="box">
          <Info title="withBG 라벨 배경" subtitle="라벨에 배경색이 있을때" />
          <br />
          <ExBox width="500" bgColor="white">
            <br />
            <Tag>withBG + Input</Tag>
            <Label width={470} label="라벨" placeholder="텍스트" withBG>
              <DataInput width={280} placeholder="라벨 텍스트" />
            </Label>
            <br />
            <br />
            <Tag>withBG + Text</Tag>
            <Label
              labelWidth={140}
              width={470}
              label="조금긴 라벨"
              placeholder="텍스트"
              withBG
            >
              안녕하세요
            </Label>
            <br />
          </ExBox>
        </div>
        <div className="box">
          <Info title="라벨만 있을때" subtitle="라벨에 배경색이 없을때" />
          <br />
          <ExBox width="500">
            <br />
            <Tag>Input</Tag>
            <Label width={470} label="라벨" placeholder="텍스트">
              <DataInput width={280} placeholder="라벨 텍스트" />
            </Label>
            <br />
            <br />
            <Tag>Text</Tag>
            <Label
              labelWidth={140}
              width={470}
              label="조금긴 라벨"
              placeholder="텍스트"
            >
              안녕하세요
            </Label>
            <br />
          </ExBox>
        </div>
      </Flex>
      <br />
    </Container>
    <GlobalStyle />
  </Wrap>
);

export const Dropbox = () => {
  const [state, setState] = useState('0');
  console.log(state);
  return (
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
                initial={{ body: '선택하세요', value: '' }}
                onChange={e => setState(e.target.value)}
                value={state}
              />
            </ExBox>
          </div>
        </Flex>
      </Container>
      <GlobalStyle />
    </Wrap>
  );
};

export const DatePicker = () => {
  const [focused, setFocused] = useState(null);
  const [date, setDate] = useState({
    startDate: moment(),
    endDate: moment(),
  });

  const handleDateChange = ({ startDate, endDate }) => {
    setDate({ startDate, endDate });
  };

  return (
    <Wrap>
      <Container>
        <br />
        <Header
          title="DatePicker"
          subtitle="다양한 요소중 하나를 선택하게 합니다."
        />
        <br />
        <Flex>
          <div className="box">
            <Info title="데이터 없음" subtitle="데이터가 없을 때" />
            <br />
            <ExBox width="600">
              <DateRangePicker
                startDateId="startDateId"
                startDate={date.startDate}
                endDateId="endDateId"
                endDate={date.endDate}
                focusedInput={focused}
                onFocusChange={f => setFocused(f)}
                onDatesChange={handleDateChange}
                displayFormat="YYYY. MM. DD."
                monthFormat="YYYY년 MMMM"
                isOutsideRange={() => false}
                customArrowIcon={<></>}
                renderCalendarInfo={() => <>sdfds</>}
                hideKeyboardShortcutsPanel
                readOnly
              />
            </ExBox>
          </div>
        </Flex>
      </Container>
      <GlobalStyle />
    </Wrap>
  );
};
