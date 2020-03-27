import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

import { FloatingDiv, Button, Input } from 'components';

const ModalFindEmail = ({ view, onClickExit }) =>
  createPortal(
    <FloatingDiv
      title="이메일 주소로 계정 찾기"
      body={
        <>
          <h5>
            기업 고객 가입 신청 시 등록했던 담당자 이메일 주소를 입력하시고,
            버튼을 클릭해주세요.
          </h5>
          <br />
          <Input placeholder="기업담당자의 이메일 주소" />
          <br />
        </>
      }
      footer={
        <>
          <Button>
            <span>아이디/비밀번호 찾기</span>
          </Button>
        </>
      }
      onClickExit={onClickExit}
      view={view}
    />,
    document.getElementById('modal'),
  );

ModalFindEmail.propTypes = {
  view: PropTypes.bool,
  onClickExit: PropTypes.func,
};

export default ModalFindEmail;
