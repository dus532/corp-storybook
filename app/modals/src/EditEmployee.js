/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { FloatingDiv, SubButton, ModalLabel, Input, DropBox } from 'components';
import {
  actionGetUserGroupsList,
  actionDelEmployee,
  actionPutEmployee,
} from 'stores';
import { useToast } from 'utils/hooks';
import UserManger from 'utils/userManager';

const EditEmployee = ({ onClickExit, data }) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const USER = UserManger().getUser();

  const [list, setList] = useState([]);
  const [state, setState] = useState(data);
  const [page, setPage] = useState(0);

  useEffect(() => {
    // 부서 선택 리스트를 불러오기 위함
    dispatch(
      actionGetUserGroupsList(res => setList(res.data.payload.userGroups)),
    );
  }, []);

  const onEdit = () => {
    dispatch(
      actionPutEmployee(state.id, state, () => {
        toast('사원이 수정되었습니다.', 'ok');
        onClickExit();
      }),
    );
  };

  const onDelete = () => {
    dispatch(
      actionDelEmployee(state.id, state.userGroupId, () => {
        toast('사원이 삭제되었습니다.', 'ok');
        onClickExit();
      }),
    );
  };

  switch (page) {
    case 0: // 첫 화면
      return (
        <FloatingDiv
          fullScreen
          title="사원 정보 수정"
          body={
            <>
              사원 이름, 사원 번호, 소속 부서 정보를 수정할 수 있습니다.
              <br />
              <br />
              <ModalLabel title="회원ID" body={state.employeeLoginId} />
              <ModalLabel title="이메일" body={state.email} />
              <ModalLabel title="사원 이름" body={state.name} />
              <ModalLabel title="전화번호" body={state.phoneNumber} />
              {
                <ModalLabel
                  title="사원 번호"
                  body={
                    <Input
                      onChange={e =>
                        setState({ ...state, number: e.target.value })
                      }
                      value={state.number}
                    />
                  }
                />
              }
              {
                <ModalLabel
                  title="소속 부서"
                  body={
                    <DropBox
                      width="100%"
                      name="userGroupId"
                      className="dropbox"
                      title="부서 선택"
                      data={[
                        { value: 0, body: '선택하세요' },
                        ...list.map(l => ({ value: l.id, body: l.name })),
                      ]}
                      onChange={d => setState({ ...state, userGroupId: d })}
                      value={
                        list.filter(l => l.id === state.userGroupId).length > 0
                          ? state.userGroupId
                          : 0
                      }
                    />
                  }
                />
              }
              <br />
              <SubButton
                white
                size="small"
                onClick={() => {
                  setPage(1);
                }}
              >
                <span>탈퇴</span>
              </SubButton>
            </>
          }
          footer={
            <>
              <SubButton white size="small" onClick={onClickExit}>
                <span>취소</span>
              </SubButton>
              <SubButton blue white size="small" onClick={onEdit}>
                <span>저장</span>
              </SubButton>
            </>
          }
          onClickExit={onClickExit}
        />
      );
    case 1: // 탈퇴 확인
      return (
        <FloatingDiv
          title="탈퇴 확인"
          body={
            <>
              <span style={{ fontWeight: 700 }}>
                {state.name} ({state.number}
                {state.userGroupName && `, ${state.userGroupName}`})
              </span>
              님이{' '}
              {state.hasBooking ? (
                <>
                  현재 차량 <span style={{ fontWeight: 700 }}>예약(이용)</span>{' '}
                  중인 상태 입니다.
                </>
              ) : (
                ''
              )}{' '}
              탈퇴 처리되면 {USER.corpName} 사원으로 서 더 이상 카플랫 기업
              카셰어링 서비스를 이용할 수 없습니다. 탈퇴 처리하시겠습니까?
            </>
          }
          footer={
            <>
              <SubButton blue white size="small" onClick={onDelete}>
                <span>예</span>
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

EditEmployee.propTypes = {
  onClickExit: PropTypes.func,
  data: PropTypes.object,
};

export default EditEmployee;
