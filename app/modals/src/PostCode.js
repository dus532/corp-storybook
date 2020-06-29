import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';

import PropTypes from 'prop-types';

import { FloatingDiv, SubButton, ModalLabel, Input } from 'components';

const PostCode = ({ data, onClickExit }) => {
  const [page, setPage] = useState(1);
  const [address, setAddress] = useState({ fullAddress: '', detail: '' });

  const handleComplete = v => {
    let fullAddress = v.address;
    let extraAddress = '';

    if (v.addressType === 'R') {
      if (v.bname !== '') {
        extraAddress += v.bname;
      }
      if (v.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${v.buildingName}` : v.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setAddress({ ...address, fullAddress });
    setPage(2);
  };

  // CS 어드민 부서와 협의로 기본 주소와 상세 주소를 나누는 키워드는 "|"를 사용합니다.
  const onFinish = () => {
    data.setData({
      ...data.data,
      address: `${address.fullAddress} | ${address.detail}`,
    });
    onClickExit();
  };

  switch (page) {
    case 1:
      return (
        <FloatingDiv
          fullScreen
          title="우편번호 검색"
          body={
            <>
              <DaumPostcode onComplete={handleComplete} />
            </>
          }
          footer={
            <>
              <SubButton white size="small" onClick={onClickExit}>
                <span>닫기</span>
              </SubButton>
            </>
          }
          onClickExit={onClickExit}
        />
      );
    case 2:
      return (
        <FloatingDiv
          fullScreen
          title="상세 주소 입력"
          body={
            <>
              상세 주소를 입력해주세요.
              <br />
              <br />
              <ModalLabel title="주소" body={address.fullAddress} />
              <br />
              <ModalLabel
                title="상세 주소"
                body={
                  <Input
                    onChange={e => {
                      setAddress({ ...address, detail: e.target.value });
                    }}
                    value={address.detail}
                  />
                }
              />
            </>
          }
          footer={
            <>
              <SubButton blue white size="small" onClick={onFinish}>
                <span>확인</span>
              </SubButton>
              <SubButton white size="small" onClick={onClickExit}>
                <span>닫기</span>
              </SubButton>
            </>
          }
          onClickExit={onClickExit}
        />
      );
    default:
      return <></>;
  }
};

PostCode.propTypes = {
  onClickExit: PropTypes.func,
  data: PropTypes.object,
};

export default PostCode;
