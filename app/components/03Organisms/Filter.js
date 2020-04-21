import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import SearchIMG from 'images/icon_search.png';

import C from 'config/constants';
import Color from 'config/color';

import DatePicker from '../01Atoms/DatePicker';
import DropBox from '../01Atoms/DropBox';
import Input from '../01Atoms/Input';

const StyledFilter = styled.div`
  margin-top: 30px;
  .dropbox {
    margin-right: 8px;
  }
  .datepicker {
    margin-right: 8px;
  }
  .middle {
    margin-right: 10px;
  }
  .top {
    margin-bottom: 16px;
  }
  .top_date {
    display: inline-block;
  }
  .bottom_box {
    display: inline-block;
    margin-bottom: 14px;
  }
  .search {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }
  .search_input {
    background: white url(${SearchIMG}) 12px center / 24px 24px no-repeat;
    text-indent: 32px;
  }
  .search_button {
    flex-shrink: 0;
    width: 172px;
    height: 40px;
    color: white;
    background: ${Color.Blue};
    margin-left: 20px;
    border-radius: 4px;
    transition: 0.25s;
  }
  .search_button:hover {
    background: ${Color.BlueHover};
    transition: 0.25s;
  }

  @media screen and (max-width: 768px) {
    .datepicker {
      margin-right: 0;
    }

    .middle {
      margin: 0 5px;
    }

    .top_date {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
    }

    .dropbox {
      margin-right: 20px;
    }

    .dropbox_last {
      margin-right: 0;
    }

    .bottom_box {
      display: flex;
      margin-bottom: 16px;
    }

    .period {
      margin-right: 0;
      width: 100%;
    }
  }
`;

const Filter = ({ filter, handleChange, onClick, type }) => {
  const Bottom = () => {
    switch (type) {
      case 'employee':
        // 사원관리
        return (
          <div className="bottom">
            <div className="bottom_box">
              <DropBox
                className="dropbox "
                title="면허증"
                data={[
                  { value: C.LICENSE_TYPE.ALL, body: '전체 면허증' },
                  { value: C.LICENSE_TYPE.REGISTERD, body: '등록완료' },
                  { value: C.LICENSE_TYPE.NOT_REGISTERD, body: '미인증' },
                ]}
                onChange={d => handleChange(d, 'license')}
                value={filter.license}
              />
            </div>
            <div className="search">
              <Input className="search_input" placeholder="사원번호 입력" />
              <button type="button" className="search_button" onClick={onClick}>
                조회하기
              </button>
            </div>
          </div>
        );

      case 'reservation':
        // 예약관리
        return (
          <div className="bottom">
            <div className="bottom_box">
              <DropBox
                className="dropbox "
                name="ex"
                title="📡 전체 부서"
                data={[{ value: 1, body: '일번' }, { value: 2, body: '이번' }]}
              />
              <DropBox
                className="dropbox dropbox_last"
                name="ex"
                title="📡 전체 사원"
                data={[{ value: 1, body: '일번' }, { value: 2, body: '이번' }]}
              />
            </div>
            <div className="bottom_box">
              <DropBox
                className="dropbox "
                title="예약 상태"
                data={[
                  { value: C.PAYMENT_STATUS.ALL, body: '전체 예약상태' },
                  { value: C.PAYMENT_STATUS.FINISH, body: '결제 완료' },
                  { value: C.PAYMENT_STATUS.CANCEL, body: '결제 취소' },
                ]}
                onChange={d => handleChange(d, 'status')}
                value={filter.status}
              />
              <DropBox
                className="dropbox dropbox_last"
                title="항목"
                data={[
                  { value: C.PAYMENT_ITEM.ALL, body: '전체 항목' },
                  { value: C.PAYMENT_ITEM.RENTAL_FEE, body: '대여료' },
                  {
                    value: C.PAYMENT_ITEM.CANCELLATION_FEE,
                    body: '취소 수수료',
                  },
                  { value: C.PAYMENT_ITEM.RETURN_DELAY, body: '반납 지연' },
                  { value: C.PAYMENT_ITEM.HI_PASS, body: '하이패스' },
                  { value: C.PAYMENT_ITEM.SUBSCRIBE, body: '정기 구독' },
                ]}
                onChange={d => handleChange(d, 'item')}
                value={filter.item}
              />
            </div>
            <div className="search">
              <Input className="search_input" placeholder="예약번호 입력" />
              <button type="button" className="search_button" onClick={onClick}>
                조회하기
              </button>
            </div>
          </div>
        );

      default:
        // 결제내역
        return (
          <div className="bottom">
            <div className="bottom_box">
              <DropBox
                className="dropbox "
                name="ex"
                title="📡 전체 부서"
                data={[{ value: 1, body: '일번' }, { value: 2, body: '이번' }]}
              />
              <DropBox
                className="dropbox dropbox_last"
                name="ex"
                title="📡 전체 사원"
                data={[{ value: 1, body: '일번' }, { value: 2, body: '이번' }]}
              />
            </div>
            <div className="bottom_box">
              <DropBox
                className="dropbox "
                title="예약 상태"
                data={[
                  { value: C.PAYMENT_STATUS.ALL, body: '전체 예약상태' },
                  { value: C.PAYMENT_STATUS.FINISH, body: '결제 완료' },
                  { value: C.PAYMENT_STATUS.CANCEL, body: '결제 취소' },
                ]}
                onChange={d => handleChange(d, 'status')}
                value={filter.status}
              />
              <DropBox
                className="dropbox dropbox_last"
                title="항목"
                data={[
                  { value: C.PAYMENT_ITEM.ALL, body: '전체 항목' },
                  { value: C.PAYMENT_ITEM.RENTAL_FEE, body: '대여료' },
                  {
                    value: C.PAYMENT_ITEM.CANCELLATION_FEE,
                    body: '취소 수수료',
                  },
                  { value: C.PAYMENT_ITEM.RETURN_DELAY, body: '반납 지연' },
                  { value: C.PAYMENT_ITEM.HI_PASS, body: '하이패스' },
                  { value: C.PAYMENT_ITEM.SUBSCRIBE, body: '정기 구독' },
                ]}
                onChange={d => handleChange(d, 'item')}
                value={filter.item}
              />
            </div>
            <div className="search">
              <Input className="search_input" placeholder="예약번호 입력" />
              <button type="button" className="search_button" onClick={onClick}>
                조회하기
              </button>
            </div>
          </div>
        );
    }
  };
  return (
    <StyledFilter>
      <div className="top">
        <div className="top_date">
          <DatePicker
            className="datepicker"
            value={new Date(filter.startDate)}
            onChange={d => handleChange(d, 'startDate')}
          />
          <span className="middle">~</span>
          <DatePicker
            className="datepicker"
            value={new Date(filter.endDate)}
            onChange={d => handleChange(d, 'endDate')}
          />
        </div>
        <DropBox
          className="dropbox period"
          name="ex"
          title="기간 선택"
          data={[{ value: 1, body: '기간 선택' }, { value: 2, body: '이번' }]}
        />
      </div>
      {Bottom()}
    </StyledFilter>
  );
};

Filter.propTypes = {
  type: PropTypes.string,
  filter: PropTypes.object,
  handleChange: PropTypes.func,
  onClick: PropTypes.func,
};

export default Filter;
