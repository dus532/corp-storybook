import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import C from 'config/constants';
import { FloatingDiv, ButtonBottom } from 'components';
import { actionDeleteSubscription } from 'stores';
import { useToast } from 'utils/hooks';

const Announcements = ({ onClickExit, data }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const toast = useToast();

  return (
    <FloatingDiv
      title={
        data.type === C.EXPIRES_TYPE.NEXT_MONTH
          ? '구독 익월해지'
          : '구독 중도해지'
      }
      body={
        data.type === C.EXPIRES_TYPE.NEXT_MONTH ? (
          <>
            구독을 익월해지하면 현재 이용중인 서비스가 정기 결제 만료일
            다음날부터 모두 해지됩니다.
            <br />
            <br />
            구독을 해지하시겠습니까?
          </>
        ) : (
          <>
            구독을 중도해지하면 현재 이용중인 서비스가 중도해지 즉시 모두
            중단됩니다.
            <br />
            <br />
            구독을 해지하시겠습니까?
          </>
        )
      }
      footer={
        <>
          <ButtonBottom
            left="아니오"
            onClickLeft={() => onClickExit()}
            right="네"
            onClickRight={() => {
              dispatch(
                actionDeleteSubscription(data, () => {
                  onClickExit();
                  history.push('/setting/subscription');
                  toast('구독 해지 설정이 완료되었습니다.', 'ok');
                }),
              );
            }}
          />
        </>
      }
      onClickExit={onClickExit}
    />
  );
};

Announcements.propTypes = {
  onClickExit: PropTypes.func,
  data: PropTypes.object,
};

export default Announcements;
