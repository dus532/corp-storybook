import React from 'react';
import styled from 'styled-components';

import moment from 'utils/moment';
import F from 'config/filter';
import EditIMG from 'images/icon_edit.png';

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

const Reg = (type, value) => type.filter(t => t.value === value)[0].body;

const RegData = (name, value, onClick, t) => {
  if (!value[name] && !name.includes('edit')) {
    return '';
  }
  if (name.includes('amount')) {
    return `${(value[name] * 1).toLocaleString('en')} 원`;
  }
  if (name.includes('joinDate')) {
    return `${moment.unix(value[name]).format('YYYY. MM. DD')}`;
  }
  if (name.includes('date') || name.includes('Date')) {
    return `${moment.unix(value[name]).format('YYYY. MM. DD HH:mm:ss')}`;
  }
  if (name.includes('edit')) {
    return <Edit type="button" className="edit" onClick={() => onClick(t)} />;
  }
  if (name.includes('item')) {
    return Reg(F.PaymentItem, value[name]);
  }
  if (name.includes('status')) {
    return Reg(F.PaymentStatus, value[name]);
  }
  if (name.includes('type')) {
    return Reg(F.PaymentsType, value[name]);
  }
  if (name.includes('license')) {
    return Reg(F.Boolean, value[name]);
  }
  if (name.includes('cardNumber')) {
    return `${value.cardCorp.split('[')[1].split(']')[0]}(${value[name].slice(
      0,
      4,
    )})`;
  }
  if (name.includes('cardCorp')) {
    return `${value[name].split('[')[1].split(']')[0]}`;
  }
  return value[name];
};

const NormalizeData = (name, value) => {
  if (!value) {
    return '';
  }
  if (name.includes('hour')) {
    return `${String(value).slice(0, 2)}:${String(value).slice(2, 4)}`;
  }
  if (name.includes('cardNumber')) {
    return `${value.slice(0, 4)}-${value.slice(4, 8)}-XXXX-XXXX`;
  }
  if (name.includes('cardCorp')) {
    return `${value.split('[')[1].split(']')[0]}`;
  }
  if (name.includes('cardType')) {
    return Reg(F.cardType, value);
  }
  if (name.includes('productType')) {
    return Reg(F.ProductType, value);
  }
  return value;
};

export { Reg, RegData, NormalizeData };
