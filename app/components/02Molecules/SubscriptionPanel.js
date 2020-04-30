/* eslint-disable indent */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import C from 'config/constants';
import Color from 'config/color';
import CheckIMG from 'images/icon_check_white.png';
import CarIMG from 'images/icon_car.png';
import PeopleIMG from 'images/icon_people.png';
import MedalIMG from 'images/icon_medal.png';

const Div = styled.div`
  width: 100%;
  background: white;
  margin-right: 28px;
  flex: 1;
`;

const View = styled.div`
  height: 328px;
  padding: 28px;
  box-sizing: border-box;
  border-bottom: 1px solid ${Color.LineGray};

  input[type='radio'] {
    display: none;
    cursor: pointer;
  }

  input[type='radio'] + label {
    width: 40px;
    height: 40px;
    border-radius: 40px;
    display: block;
    border: 3px solid ${Color.LineGray};
    transition: 0.25s;
    cursor: pointer;
  }

  input[type='radio']:checked + label {
    background: ${Color.DarkBlue} url(${CheckIMG}) center / 20px no-repeat;
    border: 3px solid ${Color.DarkBlue};
    transition: 0.25s;
    cursor: pointer;
  }

  .title {
    margin-top: 16px;
    font-weight: 700;
    font-size: 1.6rem;
  }

  .body {
    margin-top: 20px;
  }

  .icon {
    display: flex;
  }

  .medal {
    display: inline-block;
    float: right;
    width: 52px;
    height: 61px;
    background: url(${MedalIMG}) center / cover no-repeat;
  }
`;

const Amount = styled.div`
  padding: 28px;
  box-sizing: border-box;
  text-align: right;

  h2 {
    font-weight: 700;
  }
`;

const Icon = styled.div`
  width: 32px;
  height: 32px;
  background: ${props =>
      props.type === 'car' ? `url(${CarIMG})` : `url(${PeopleIMG})`}
    center / 32px no-repeat;
`;

const SubscriptionPanel = ({
  handleChange,
  value,
  type,
  amount,
  title,
  people,
  car,
}) => {
  const peopleIcon = [];
  const carIcon = [];

  for (let i = 1; i <= people; i += 1) {
    peopleIcon.push(<Icon key={i} />);
  }

  for (let i = 1; i <= car; i += 1) {
    carIcon.push(<Icon type="car" key={i} />);
  }

  return (
    <Div>
      <View>
        {type === C.ITEM_TYPE.PREMIUM && <div className="medal" />}
        <input
          id={type}
          name="sub"
          type="radio"
          onChange={() => handleChange('type', type)}
          checked={value === type}
        />
        <label htmlFor={type}> </label>
        <div
          style={{ color: `${type === C.ITEM_TYPE.PREMIUM && Color.Blue}` }}
          className="title"
        >
          {title}
        </div>
        <div className="body">
          동시 이용자 기본 {people}명
          <br />
          최대 {car}개의 지원 차종 보장
        </div>
        <div className="icon">
          {peopleIcon}
          {carIcon}
        </div>
      </View>
      <Amount>
        기본 정기 구독료
        <h2>월 {amount}원</h2>
      </Amount>
    </Div>
  );
};

SubscriptionPanel.propTypes = {
  value: PropTypes.number,
  type: PropTypes.number,
  amount: PropTypes.string,
  title: PropTypes.string,
  people: PropTypes.number,
  car: PropTypes.number,
  handleChange: PropTypes.func,
};

export default SubscriptionPanel;
