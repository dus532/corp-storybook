/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Color from 'config/color';
import EditIMG from 'images/icon_edit.png';
import { useModal } from 'utils/hooks';
import { EDIT_CORP_INFO } from 'modals/constants';

const Table = styled.table`
  margin: 0 auto;
  max-width: ${props => (props.type ? '572px' : '100%')};
  width: 100%;
  border: 1px solid ${Color.LineGray};
  box-sizing: border-box;
  border-collapse: collapse;
  text-align: center;

  .thead_tr {
    height: 40px;
    background: rgba(0, 0, 0, 0.04);
  }

  tr,
  td {
    height: 40px;
    padding: 0 28px;
  }

  .edit {
    width: 28px;
  }
`;

const Edit = styled.div`
  cursor: pointer;
  width: 24px;
  height: 24px;
  background: url(${EditIMG}) center / cover no-repeat;
`;

const UserGroups = ({ type, edit, data }) => {
  const modal = useModal();

  return (
    <Table type={type}>
      <thead>
        <tr className="thead_tr">
          <th>부서명</th>
          <th>사원수</th>
          <th>부서 결제카드</th>
          {edit && <th className="edit" />}
        </tr>
      </thead>
      <tbody>
        {data.map(
          (t, index) =>
            t.changeType !== 3 && (
              <tr key={index}>
                <td>{t.name}</td>
                <td>{t.memberNumber} 명</td>
                <td>{t.isCardRegistered ? '등록 됨' : '등록 안됨'}</td>
                {edit && (
                  <td>
                    <Edit
                      onClick={() => {
                        modal(EDIT_CORP_INFO, { data: t, index });
                      }}
                    />
                  </td>
                )}
              </tr>
            ),
        )}
      </tbody>
    </Table>
  );
};

UserGroups.propTypes = {
  type: PropTypes.any,
  edit: PropTypes.any,
  data: PropTypes.array,
};

export default UserGroups;
