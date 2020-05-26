import React from 'react';
import styled from 'styled-components';

import CarplatIMG from 'images/logo_carplat.png';

import { Container, BigTitle, Button } from 'components';

const Div = styled.div`
  .logo {
    padding: 106px 0 68px;
    width: 160px;
    height: 36px;
    background: url(${CarplatIMG}) center / contain no-repeat;
    display: inline-block;
  }

  h3 {
    font-size: 1.4rem;
    font-weight: 700;
    margin-bottom: 10px;
  }

  h5 {
    padding-bottom: 40px;
  }

  .margin {
    width: 100%;
    height: 40px;
  }

  .button {
    display: inline-block;
    max-width: 372px;
    width: 100%;
    padding-bottom: 60px;
  }
`;

const Service = () => {
  console.log('');
  return (
    <Container>
      <BigTitle>고객센터</BigTitle>
      <Container className="box_overflow" white style={{ textAlign: 'center' }}>
        <Div>
          <div className="logo" />
          <h3>카플랫 고객센터 입니다.</h3>
          <h5>
            고객님의 목소리에 귀 기울이기 위해 카플랫 전문 상담 인원이 항상
            대기중입니다.
            <br /> 서비스에 대해 궁금한 점이 생기면 언제든지 연락하시길
            바랍니다.
          </h5>
          <div className="margin" />
          <h3>고객센터 운영시간</h3>
          <h5>09:00 ~ 23:00 (365일)</h5>
          <h3>카플랫 고객센터 입니다.</h3>
          <h5>
            상담전화
            <br /> 1833-7164
          </h5>
          <div className="button">
            <Button>카카오톡 채널로 문의하기</Button>
          </div>
        </Div>
      </Container>
    </Container>
  );
};

export default Service;
