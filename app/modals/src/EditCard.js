import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { FloatingDiv, SubButton } from 'components';
import { actionDelCard } from 'stores';

const C_LOCAL = {
  CHOICE: 0,
  IS_DELETE: 1,
};

const EditCard = ({ onClickExit, data }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [page, setPage] = useState(0);

  const onDelete = () => {
    dispatch(actionDelCard(data.id, () => onClickExit()));
  };

  switch (page) {
    case C_LOCAL.CHOICE:
      return (
        <FloatingDiv
          title={`${data.main ? '대표' : '부서'} 결제카드 설정 옵션`}
          body={
            <>
              선택한 카드에 대한 옵션을 선택하세요.
              <br />
            </>
          }
          footer={
            <>
              <div style={{ width: `100%` }}>
                <SubButton
                  style={{ marginBottom: 12 }}
                  white
                  blue
                  size="small"
                  onClick={() => {
                    history.push(
                      `/setting/paymentcard/${data.id}?main=${
                        data.main ? 'true' : 'false'
                      }${
                        data.userGroupId
                          ? `&userGroupId=${data.userGroupId}`
                          : ''
                      }`,
                    );
                    onClickExit();
                  }}
                >
                  <span>결제카드 변경</span>
                </SubButton>
                <SubButton
                  style={{ marginBottom: 12 }}
                  white
                  size="small"
                  onClick={() => {
                    history.push(
                      `/setting/paymentcard/usage/${data.id}?main=${
                        data.main ? 'true' : 'false'
                      }${
                        data.userGroupId
                          ? `&userGroupId=${data.userGroupId}`
                          : ''
                      }`,
                    );
                    onClickExit();
                  }}
                >
                  <span>이용한도 설정</span>
                </SubButton>
                {!data.main && (
                  <SubButton
                    white
                    size="small"
                    onClick={() => {
                      setPage(C_LOCAL.IS_DELETE);
                    }}
                  >
                    <span>결제카드 삭제</span>
                  </SubButton>
                )}
              </div>
            </>
          }
          onClickExit={onClickExit}
        />
      );
    case C_LOCAL.IS_DELETE:
      return (
        <FloatingDiv
          title="부서 결제카드 삭제"
          body={
            <>
              부서 결제카드가 삭제된 이후에는 대표결제카드로 결제 처리됩니 다.
              부서 결제카드를 삭제하시겠습니까?
              <br />
              <br />
            </>
          }
          footer={
            <>
              <SubButton
                white
                blue
                size="small"
                type="submit"
                onClick={onDelete}
              >
                <span>네</span>
              </SubButton>
              <SubButton white size="small" onClick={onClickExit}>
                <span>아니오</span>
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

EditCard.propTypes = {
  onClickExit: PropTypes.func,
  data: PropTypes.any,
};

export default EditCard;
