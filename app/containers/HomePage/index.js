import React from 'react';
import { Helmet } from 'react-helmet';

export const index = () => (
  <>
    <Helmet>
      <title>Home Page</title>
      <meta name="description" content="테스트용 페이지" />
    </Helmet>
    <div />
  </>
);

// 1. IE11 을 위한 polyfill, axios 등의 추가 라이브러리
// 2. 추가 라이브러리 사용 및 버전업
// 3. redux-saga 가 아닌 자체 middlewares 이용
