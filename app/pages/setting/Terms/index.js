import React from 'react';

import { Container, BigTitle, ItemPanel } from 'components';

const data = [
  { title: '개인정보 처리방침' },
  { title: '고유식별정보 수집 / 이용 및 제공' },
  { title: '온라인고지확인및동의' },
  { title: '위치기반 서비스 이용 약관' },
  { title: '카플랫 카셰어링 대여 약관' },
  { title: '회원이용약관' },
  { title: '기업구독상품이용약관' },
];

const Terms = () => {
  console.log(data);
  return (
    <Container>
      <BigTitle>약관 및 정책</BigTitle>
      <ItemPanel data={data} />
    </Container>
  );
};

export default Terms;
