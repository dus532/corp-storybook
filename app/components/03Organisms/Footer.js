import React from 'react';
import styled from 'styled-components';

import { H5 } from '../01Atoms/H';

const Wrap = styled.div`
  width: 100%;
  margin-top: 40px;
  height: 104px;
  background: white;
  display: flex;
  justify-content: center;
  border-top: 1px solid var(--grey100);
  box-sizing: border-box;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1172px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 900px) {
    flex-direction: column;
    justify-content: center;

    * {
      text-align: center;
    }

    .link {
      font-size: 12px;
    }

    .caption {
      margin-top: 10px;
      font-size: 11px;
      order: 2;
      color: var(--grey300);
    }
  }
`;

const Footer = () => (
  <Wrap>
    <Container>
      <H5 className="caption" color="var(--grey500)">
        CARPLAT BIZ | v1.2.2.0
        <br />
        Copyright 2020 HumaxMobility - All rights reserved.
      </H5>
      <H5 className="link" color="var(--grey500)">
        이용약관 | 개인정보 처리방침
      </H5>
    </Container>
  </Wrap>
);

export default Footer;
