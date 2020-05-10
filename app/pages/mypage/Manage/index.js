/* eslint-disable indent */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  Container,
  BigTitle,
  AsyncDiv,
  BillPaper,
  ButtonBottom,
} from 'components';
import { actionGetMyPage } from 'stores';

import moment from 'utils/moment';

const MyPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const MyPageData = useSelector(state => state.myPage);

  const adminData = useSelector(state => state.myPage.data.admin);

  useEffect(() => {
    dispatch(actionGetMyPage());
  }, []);

  return (
    <div>
      <Container>
        <BigTitle>마이 페이지</BigTitle>
        <AsyncDiv store={MyPageData}>
          {adminData && (
            <BillPaper
              className="box_overflow"
              title="기업 관리자 정보"
              data={[
                {
                  title: '아이디',
                  body: adminData.adminLoginId,
                },
                {
                  title: '관리자 이름',
                  body: adminData.name,
                },
                {
                  title: '관리자 전화번호',
                  body: adminData.phoneNumber,
                },
                {
                  title: '관리자 이메일 주소',
                  body: adminData.email,
                },
                {
                  title: '최근 로그인',
                  body: moment
                    .unix(adminData.recentLogin)
                    .format('YYYY년 MM월 DD일 a hh:mm:ss'),
                },
              ]}
              bottom={
                <>
                  <ButtonBottom
                    type="big"
                    left="비밀번호 변경"
                    onClickLeft={() => {
                      history.push('/mypage/changepw');
                    }}
                    right="관리자 정보 변경"
                    onClickRight={() => {
                      history.push('/mypage/changeinfo');
                    }}
                  />
                </>
              }
            />
          )}
        </AsyncDiv>
      </Container>
    </div>
  );
};

export default MyPage;
