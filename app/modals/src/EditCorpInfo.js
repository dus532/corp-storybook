import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';

import { FloatingDiv, SubButton, Input } from 'components';
import { actionHandleChangeCorpInfo } from 'stores';

const C_LOCAL = {
  CHOICE: 0,
  CHANGE_NAME: 1,
  DELETE_ERROR: 2,
};

const EditCorpInfo = ({ onClickExit, data }) => {
  const dispatch = useDispatch();
  const userGroups = useSelector(state => state.info.data.userGroups);

  let edit = '';

  const [page, setPage] = useState(0);

  const onDelete = () => {
    const t = userGroups;
    t[data.index].changeType = 3;
    dispatch(actionHandleChangeCorpInfo(`userGroups`, t));
    onClickExit();
  };

  const onEdit = e => {
    e.preventDefault();
    const t = userGroups;
    t[data.index].changeType = 2;
    t[data.index].name = edit;
    dispatch(actionHandleChangeCorpInfo(`userGroups`, t));
    onClickExit();
  };

  switch (page) {
    case C_LOCAL.CHOICE:
      return (
        <FloatingDiv
          title="부서 설정 옵션"
          body={
            <>
              선택한 부서에 대한 옵션을 선택하세요.
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
                    setPage(C_LOCAL.CHANGE_NAME);
                  }}
                >
                  <span>부서 이름 변경</span>
                </SubButton>
                <SubButton
                  white
                  size="small"
                  onClick={() => {
                    if (data.data.memberNumber > 0) {
                      setPage(C_LOCAL.DELETE_ERROR);
                    } else {
                      onDelete();
                    }
                  }}
                >
                  <span>부서 삭제</span>
                </SubButton>
              </div>
            </>
          }
          onClickExit={onClickExit}
        />
      );
    case C_LOCAL.CHANGE_NAME:
      return (
        <form onSubmit={onEdit}>
          <FloatingDiv
            title="부서 이름 변경"
            body={
              <>
                변경할 부서 이름을 적어주세요.
                <br />
                <br />
                <h6>부서 이름</h6>
                <Input
                  maxLength={10}
                  placeholder={data.data.name}
                  onChange={e => {
                    edit = e.target.value;
                  }}
                  required
                />
              </>
            }
            footer={
              <>
                <SubButton white blue size="small" type="submit">
                  <span>확인</span>
                </SubButton>
                <SubButton white size="small" onClick={onClickExit}>
                  <span>닫기</span>
                </SubButton>
              </>
            }
            onClickExit={onClickExit}
          />
        </form>
      );
    case C_LOCAL.DELETE_ERROR:
      return (
        <FloatingDiv
          title="부서 삭제 불가"
          body={
            <>
              현재 부서 소속의 사원들이 존재하여 부서 삭제가 불가합니다. 부서를
              삭제 하시려면 해당 부서 소속의 사원들을 다른 부서로 변경 처리 하신
              후에 다시 시도 부탁드립니다.
              <br />
            </>
          }
          footer={
            <>
              <SubButton white onClick={onClickExit} size="small">
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

EditCorpInfo.propTypes = {
  onClickExit: PropTypes.func,
  data: PropTypes.any,
};

export default EditCorpInfo;
