import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import {
  Container,
  BigTitle,
  Container580,
  InfoBox,
  Input,
  ButtonBottom,
  AsyncDiv,
} from 'components';
import { actionGetMyPage, actionPutAdminInfo } from 'stores';
import { useToast } from 'utils/hooks';

const ChangeInfo = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const toast = useToast();
  const MyPageData = useSelector(state => state.myPage);
  const adminData = useSelector(state => state.myPage.data.admin);

  useEffect(() => {
    if (!adminData) {
      dispatch(actionGetMyPage());
    }
  }, []);

  const { handleSubmit, register } = useForm({
    defaultValues: adminData,
  });

  const onSubmit = data => {
    dispatch(
      actionPutAdminInfo({ adminId: adminData.adminLoginId, ...data }, () => {
        history.push('/mypage');
        toast('관리자 정보가 변경되었습니다', 'ok');
      }),
    );
  };

  return (
    <Container>
      <BigTitle>관리자 정보 변경</BigTitle>
      <AsyncDiv store={MyPageData}>
        {adminData ? (
          <Container className="box_overflow" white>
            <br />
            <br />
            <form onSubmit={handleSubmit(onSubmit)}>
              <Container580 maxWidth="372">
                <h4>아이디</h4>
                <Input value={adminData.adminLoginId} readOnly />
                <br />
                <h4>관리자 이름</h4>
                <Input name="name" ref={register} required />
                <br />
                <h4>관리자 전화번호</h4>
                <Input name="phoneNumber" ref={register} required />
                <br />
                <h4>이메일 주소</h4>
                <Input name="email" ref={register} required />
                <InfoBox>
                  영문,숫자,특수문자를 조합하여 8~12자로 입력해주세요.
                </InfoBox>
                <br />
                <ButtonBottom
                  left="취소"
                  onClickLeft={() => {
                    history.goBack();
                  }}
                  right="저장"
                  typeRight="submit"
                />
              </Container580>
            </form>
            <br />
            <br />
          </Container>
        ) : (
          '로딩중'
        )}
      </AsyncDiv>
    </Container>
  );
};

export default ChangeInfo;