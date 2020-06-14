import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form/dist/react-hook-form.ie11';

import { useDispatch } from 'react-redux';

import { FloatingDiv, SubButton, Input } from 'components';
import { actionPostResetPassword } from 'stores';

const FindEmail = ({ onClickExit }) => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);

  const { handleSubmit, register, errors } = useForm();

  const onSend = data => {
    dispatch(
      actionPostResetPassword(data, () => {
        setPage(1);
      }),
    );
  };

  if (page === 0) {
    return (
      <form onSubmit={handleSubmit(onSend)}>
        <FloatingDiv
          fullScreen
          title="이메일 주소로 계정 찾기"
          body={
            <>
              기업 고객 가입 신청 시 등록했던 담당자 이메일 주소를 입력하시고,
              버튼을 클릭해주세요.
              <br />
              <br />
              <Input
                name="email"
                ref={register({
                  pattern: {
                    value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                    message: '이메일 형식에 맞지 않습니다.',
                  },
                })}
                required
              />
              {errors.email && (
                <h5 className="error">{errors.email.message}</h5>
              )}
              <br />
            </>
          }
          footer={
            <>
              <SubButton type="submit" white size="small">
                <span>아이디/비밀번호 찾기</span>
              </SubButton>
            </>
          }
          onClickExit={onClickExit}
        />
      </form>
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
  onClickExit: PropTypes.func,
};

export default FindEmail;
