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

  @media screen and (max-width: 768px) {
    margin-bottom: 10px;
  }
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

  @media screen and (max-width: 768px) {
    height: auto;
    display: flex;
    padding: 20px;

    .medal {
      display: none;
    }

    .con {
      flex: 1;
      margin-left: 16px;
    }

    .title {
      margin-top: 0;
      font-size: 1.2rem;
    }

    .body {
      margin-top: 4px;
      font-size: 0.8rem;
    }

    .nextline {
      display: inline-block;
    }

    .nextline:after {
      content: ',';
      margin-right: 4px;
    }

    .mobile {
      display: block;
      width: 24px;
      height: 28px;
    }
    input[type='radio'] + label {
      width: 24px;
      height: 24px;
      border: 2px solid ${Color.LineGray};
    }

    input[type='radio']:checked + label {
      background: ${Color.DarkBlue} url(${CheckIMG}) center / 12px no-repeat;
    }
  }
`;

const Amount = styled.div`
  padding: 28px;
  box-sizing: border-box;
  text-align: right;

  h2 {
    font-weight: 700;
  }

  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    font-size: 0.8rem;
    padding: 12px 20px;
    h2 {
      margin-left: 4px;
      font-size: 1.2rem;
    }
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
    <Div className="box_overflow">
      <View>
        {type === C.ITEM_TYPE.PREMIUM.value && <div className="medal" />}
        <input
          id={type}
          name="sub"
          type="radio"
          onChange={() => handleChange('type', type)}
          checked={value === type}
        />
        <label htmlFor={type}> </label>
        <div className="con">
          <div
            style={{
              color: `${type === C.ITEM_TYPE.PREMIUM.value && Color.Blue}`,
            }}
            className="title"
          >
            {title}
          </div>
          <div className="body">
            <div className="nextline">동시 이용자 기본 {people}명</div>
            최대 {car}개의 지원 차종 보장
          </div>
          <div className="icon">
            {peopleIcon}
            {carIcon}
          </div>
        </div>
        {type === C.ITEM_TYPE.PREMIUM.value && <div className="medal mobile" />}
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
