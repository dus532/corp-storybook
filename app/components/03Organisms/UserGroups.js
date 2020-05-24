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

  th {
    padding: 0 28px;
  }

  tr,
  td {
    height: 40px;
    padding: 0 28px;
  }

  .th_name {
  }

  .th_people {
    width: 100px;
  }

  .th_card {
    width: 180px;
  }

  .edit {
    width: 28px;
  }

  .td_edit {
    padding: 0;
  }
  @media screen and (max-width: 768px) {
    font-size: 0.8rem;
    th,
    td {
      padding: 0 12px;
    }
    .th_name {
      width: auto;
    }

    .edit {
      width: 20px;
    }
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
          <th style={{ textAlign: 'left' }} className="th_name">
            부서명
          </th>
          <th style={{ textAlign: 'left' }} className="th_people">
            사원수
          </th>
          <th style={{ textAlign: 'right' }} className="th_card">
            부서 결제카드
          </th>
          {edit && <th className="edit" />}
        </tr>
      </thead>
      <tbody>
        {data.map(
          (t, index) =>
            t.changeType !== 3 && (
              <tr key={index}>
                <td style={{ textAlign: 'left' }}>{t.name}</td>
                <td style={{ textAlign: 'left' }}>{t.memberNumber} 명</td>
                <td style={{ textAlign: 'right' }}>
                  {t.isCardRegistered ? '등록 됨' : '등록 안됨'}
                </td>
                {edit && (
                  <td className="td_edit">
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
