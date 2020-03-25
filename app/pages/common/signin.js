import React from 'react';
import styled from 'styled-components';

import LogoImg from 'images/logo.png';
import Input from 'components/01Atoms/Input';
import CheckBox from 'components/01Atoms/CheckBox';
import Button from 'components/01Atoms/Button';

import BGImg from 'images/bg.jpg';

const Logo = styled.div`
  width: 260px;
  height: 70px;
  background: url(${LogoImg}) center / contain no-repeat;
`;

const Wrap = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: url(${BGImg}) center / cover;

  h5 {
    font-weight: 700;
  }

  .container {
    width: 540px;
    padding: 48px;
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid #f2f2f2;
    border-radius: 6px;
  }

  .flex {
    margin-top: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 24px;
    box-sizing: border-box;
  }

  .save_checkbox {
    display: flex;
    align-items: center;

    h5 {
      margin-left: 8px;
    }
  }
`;

const SignIn = () => {
  console.log(1);

  return (
    <Wrap>
      <div className="container">
        <Logo />
        <br />
        <h5>
          프리미엄 기업 카셰어링 서비스, 카플랫 비즈니스에 오신 것을 환영합니다.
        </h5>
        <Input placeholder="아이디" />
        <Input type="password" placeholder="비밀번호" />
        <div className="flex">
          <div className="save_checkbox">
            <CheckBox id="isSaved" />
            <label htmlFor="isSaved">
              <h5>로그인 상태 유지</h5>
            </label>
          </div>
          <h5>아이디/비밀번호 찾기</h5>
        </div>
        <br />
        <Button>로그인</Button>
      </div>
    </Wrap>
  );
};

export default SignIn;
