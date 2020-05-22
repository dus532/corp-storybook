/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import moment from 'utils/moment';
import EditIMG from 'images/icon_edit.png';
import F from 'config/filter';
import IconReorder from 'images/icon_reorder.png';

const StyledTable = styled.div``;

const Th = styled.div`
  padding: 0 20px;
  height: 60px;
  background: white;
  line-height: 60px;
  text-align: left;
  font-weight: 700;
  width: 100%;
  display: flex;
  justify-content: space-around;
  white-space: nowrap;
  cursor: pointer;

  .thead {
    display: flex;
    align-items: center;
    line-height: 24px;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  margin: 0 20px;
  background: #eee;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Tr = styled.div`
  width: 100%;
  display: flex;
  background: white;
  line-height: 60px;
  height: 60px;
  padding: 0 20px;

  .mobile_header {
    display: none;
  }

  @media screen and (max-width: 768px) {
    padding: 16px 20px;
    font-size: 0.9rem;
    line-height: 30px;
    border-bottom: 1px solid #eee;
    display: block;
    height: auto;
  }
`;

const Edit = styled.button`
  cursor: pointer;
  width: 24px;
  height: 24px;
  background: url(${EditIMG}) center / cover no-repeat;

  @media screen and (max-width: 768px) {
    position: absolute;
    top: 24px;
    right: 24px;
  }
`;

const Td = styled.div`
  width: 100%;
  flex: ${props => (props.size ? props.size : 1)};

  .flex {
    height: 100%;
    display: flex;
    align-items: center;
  }

  @media screen and (max-width: 768px) {
    display: flex;
    height: auto;

    .mobile_header {
      font-weight: 700;
      width: 100px;
      display: block;
    }
  }
`;

const IMGReorder = styled.div`
  width: 24px;
  height: 24px;
  display: inline-block;
  background: url(${IconReorder}) center / cover no-repeat;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Reg = (type, value) => type.filter(t => t.value === value)[0].body;

const RegData = (name, value, onClick, t) => {
  if (name.indexOf('amount') !== -1) {
    return `${value[name].toLocaleString('en')} 원`;
  }
  if (name.indexOf('date') !== -1 || name.indexOf('Date') !== -1) {
    return `${moment.unix(value[name]).format('YYYY. MM. DD')}`;
  }
  if (name.indexOf('edit') !== -1) {
    return <Edit type="button" className="edit" onClick={() => onClick(t)} />;
  }
  if (name.indexOf('item') !== -1) {
    return Reg(F.PaymentItem, value[name]);
  }
  if (name.indexOf('status') !== -1) {
    return Reg(F.PaymentStatus, value[name]);
  }
  if (name.indexOf('type') !== -1) {
    return Reg(F.PaymentsType, value[name]);
  }
  if (name.indexOf('license') !== -1) {
    return Reg(F.Boolean, value[name]);
  }
  return value[name];
};

const Table = ({ now = '1', data = [], title = [], nodata }) => {
  const [list, setList] = useState(data);
  const [sort, isSort] = useState(
    title.map(t => ({
      key: t[1],
      isSort: false,
    })),
  );

  useEffect(() => {
    setList(data);
    isSort(
      title.map(t => ({
        key: t[1],
        isSort: false,
      })),
    );
  }, [data]);

  const onSort = value => {
    setList([
      ...list.sort((a, b) => {
        if (a[value] > b[value]) {
          return sort.filter(f => f.key === value)[0].isSort ? 1 : -1;
        }
        if (a[value] < b[value]) {
          return sort.filter(f => f.key === value)[0].isSort ? -1 : 1;
        }
        return 0;
      }),
    ]);
    isSort(sort.map(f => (f.key === value ? { ...f, isSort: !f.isSort } : f)));
  };

  return data.length > 0 ? (
    <>
      <StyledTable>
        <Th>
          {title.map(d => (
            <div
              className="thead"
              style={{ flex: d[2] ? d[2] : 1 }}
              key={d[0]}
              onClick={() => d[0] && onSort(d[1])}
              role="button"
              tabIndex={0}
            >
              {d[0]} {d[0] && <IMGReorder />}
            </div>
          ))}
        </Th>
        <Line />
        {list.map((d, index) => {
          if (index >= (now * 1 - 1) * 10 && index < now * 10) {
            return (
              <Tr key={index} className="box_overflow">
                {title.map(t => (
                  <Td size={t[2]} key={t[1]}>
                    <div className="mobile_header">{t[0]}</div>
                    <div className="flex">{RegData(t[1], d, t[3], d)}</div>
                  </Td>
                ))}
              </Tr>
            );
          }
          return null;
        })}
      </StyledTable>
    </>
  ) : (
    nodata
  );
};

Table.propTypes = {
  now: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  data: PropTypes.array,
  title: PropTypes.array,
  nodata: PropTypes.element,
};

export default Table;
