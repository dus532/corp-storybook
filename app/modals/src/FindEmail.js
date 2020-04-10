import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';

import { FloatingDiv, SubButton, Input } from 'components';
import { actionPostResetPassword } from 'stores';

import { useToast } from '../../toast';

const FindEmail = ({ data, onClickExit }) => {
  const toast = useToast();
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);

  let email = '';

  const onSend = () => {
    if (email) {
      dispatch(
        actionPostResetPassword({ email }, () => {
          setPage(1);
        }),
      );
    } else {
      toast('이메일 주소가 입력되지 않았습니다.');
    }
  };

  console.log(data);

  if (page === 0) {
    return (
      <FloatingDiv
        title="이메일 주소로 계정 찾기"
        body={
          <>
            기업 고객 가입 신청 시 등록했던 담당자 이메일 주소를 입력하시고,
            버튼을 클릭해주세요.
            <br />
            <br />
            <Input
              placeholder="기업담당자의 이메일 주소"
              onChange={e => {
                email = e.target.value;
              }}
            />
            <br />
          </>
        }
        footer={
          <>
            <SubButton white onClick={onSend} size="small">
              <span>아이디/비밀번호 찾기</span>
            </SubButton>
          </>
        }
        onClickExit={onClickExit}
      />
    );
  }
  return (
    <FloatingDiv
      title="인증 완료"
      body={
        <>
          인증이 정상적으로 완료되어 임시 비밀번호로 변경 처리되었습니다.
          <br />
          반드시 인증 메일에 표시된 비밀번호를 이용하여 로그인하시고, 로그인
          이후에는 비밀번호를 변경하세요.
        </>
      }
      footer={
        <>
          <SubButton white onClick={onClickExit} size="small">
            <span>확인</span>
          </SubButton>
        </>
      }
      onClickExit={onClickExit}
    />
  );
};

FindEmail.propTypes = {
  data: PropTypes.object,
  onClickExit: PropTypes.func,
};

export default FindEmail;
