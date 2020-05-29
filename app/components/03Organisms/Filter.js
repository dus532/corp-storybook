/* eslint-disable indent */
import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import SearchIMG from 'images/icon_search.png';
import DelIMG from 'images/icon_delete.png';

import C from 'config/constants';
import F from 'config/filter';
import Color from 'config/color';
import moment from 'utils/moment';

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
    margin-bottom: 8px;
  }
  .top_date {
    display: inline-block;
  }
  .bottom_box {
    display: inline-block;
    margin-bottom: 8px;
  }
  .search {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }
  .search_pc {
    display: flex;
  }
  .search_mobile {
    display: none;
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
    margin-left: 8px;
    border-radius: 4px;
    transition: 0.25s;
    font-size: 0.8rem;
  }
  .searchclear {
    width: 24px;
    height: 24px;
    position: relative;
    margin-left: -16px;
    left: -16px;
    background: url(${DelIMG}) center / contain no-repeat;
    flex-shrink: 0;
    cursor: pointer;
  }
  .search_button:hover {
    background: ${Color.BlueHover};
    transition: 0.25s;
  }

  @media screen and (max-width: 768px) {
    margin-top: 0;

    .top {
      margin-bottom: 16px;
    }

    .datepicker {
      margin-right: 0;
    }

    .middle {
      margin: 0 5px;
    }

    .searchclear {
      position: absolute;
      left: auto;
      right: 36px;
    }

    .search_mobile {
      display: flex;
      box-sizing: border-box;
      background: white;
      padding: 0px 20px 10px;
      border-bottom: 1px solid ${Color.LineGray};
    }

    .search_pc {
      display: none;
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
      justify-content: space-between;
      margin-bottom: 16px;
    }

    .period {
      margin-right: 0;
      width: 100%;
    }
  }
`;

const Filter = ({
  filter,
  handleChange,
  handleDateChange,
  onClick,
  type,
  list,
  placeholder = '예약번호 입력',
}) => {
  const [date, setDate] = useState(0);
  const inp = useRef();

  const Bottom = () => {
    switch (type) {
      case 'employee':
        // 사원관리
        // (3) Dropdown: 부서 필터 설정 – 전체 부서(default) / 각 부서 목록 (부서 이름)
        // (4) Dropdown: 면허증 필터 설정 – 전체 면허증(default) / 등록 완료 / 미인증
        return (
          <div className="bottom">
            <div className="bottom_box">
              <DropBox
                className="dropbox "
                title="면허증"
                data={F.licenseType}
                onChange={d => handleChange(d, 'license')}
                value={filter.license ? filter.license : 0}
              />
              <DropBox
                className="dropbox dropbox_last"
                title="부서"
                data={[
                  { value: 0, body: '전체 부서' },
                  ...list.userGroups.map(l => ({ value: l.id, body: l.name })),
                ]}
                onChange={d => {
                  handleChange(d === 0 ? null : d, 'userGroupId');
                }}
                value={filter.userGroupId ? filter.userGroupId : 0}
              />
            </div>
          </div>
        );

      case 'rental':
        // 예약관리
        // (3) Dropdown: 부서 필터 설정 – 전체 부서(default) / 각 부서 목록 (부서 이름)
        // (4) Dropdown: 설정된 부서 하위의 사원 필터 설정 – 전체 사원(default) / 각 사원 목록 (사원 이름)
        // (5) Dropdown: 예약 상태 필터 설정 – 전체 예약(default) / 차량 예약 / 차량 대여 / 예약 취소 / 반납 지연 / 이용 완료
        // (6) Dropdown: 예약 목적 필터 설정 – 전체 목적(default) / 외근 / 출장 / 사내 행사
        return (
          <div className="bottom">
            <div className="bottom_box">
              <DropBox
                className="dropbox "
                title="부서"
                data={[
                  { value: 0, body: '전체 부서' },
                  ...list.userGroups.map(l => ({
                    value: l.id,
                    body: l.name,
                  })),
                ]}
                onChange={d => {
                  handleChange(d === 0 ? null : d, 'userGroupId');
                }}
                value={filter.userGroupId ? filter.userGroupId : 0}
              />
              <DropBox
                className="dropbox dropbox_last"
                title="사원"
                data={[
                  { value: 0, body: '전체 사원' },
                  ...(list.employees.length > 0
                    ? list.employees.reduce((prev, now) => {
                        if (filter.userGroupId) {
                          if (filter.userGroupId === now.id) {
                            prev.push({
                              value: now.id,
                              body: now.name,
                            });
                            return prev;
                          }
                        } else {
                          prev.push({ value: now.id, body: now.name });
                        }
                        return prev;
                      }, [])
                    : []),
                ]}
                onChange={d => {
                  handleChange(d === 0 ? null : d, 'employeeId');
                }}
                value={filter.employeeId ? filter.employeeId : 0}
              />
            </div>
            <div className="bottom_box">
              <DropBox
                className="dropbox "
                title="예약 상태"
                data={F.rentalStatus}
                onChange={d => {
                  handleChange(d, 'status');
                }}
                value={filter.status ? filter.status : 0}
              />
              <DropBox
                className="dropbox dropbox_last"
                title="목적"
                data={F.rentalPuropose}
                onChange={d => {
                  handleChange(d, 'purpose');
                }}
                value={filter.purpose ? filter.purpose : 0}
              />
            </div>
          </div>
        );

      case 'payment':
        // 결제내역
        // (3) Dropdown: 결제 상태 필터 설정 – 전체 결제 상태(default) / 결제 완료 / 결제 취소
        // (4) Dropdown: 결제카드 필터 설정 – 전체 결제카드(default) / 등록된 결제카드 목록
        // (5) Dropdown: 결제 항목 필터 서정 – 전체 항목(default) / 대여료 / 취소수수료 / 반납지연 / 하이패스 / 정기구독
        return (
          <div className="bottom">
            <div className="bottom_box">
              <DropBox
                className="dropbox "
                title="결제상태"
                data={F.PaymentStatus}
                onChange={d => {
                  handleChange(d, 'status');
                }}
                value={filter.status ? filter.status : 0}
              />
              <DropBox
                className="dropbox dropbox_last"
                title="결제카드"
                data={[
                  {
                    value: C.PAYMENT_STATUS.ALL,
                    body: '전체 결제카드',
                  },
                  ...list.cards.map(l => ({
                    value: l.id,
                    body: `${l.cardCorp} / ${l.cardNumber.substr(
                      l.cardNumber.length - 4,
                      4,
                    )}`,
                  })),
                ]}
                onChange={d => {
                  handleChange(d === 0 ? null : d, 'cardId');
                }}
                value={filter.cardId ? filter.cardId : 0}
              />
            </div>
            <div className="bottom_box">
              <DropBox
                className="dropbox "
                title="결제항목"
                data={F.PaymentItem}
                onChange={d => handleChange(d, 'item')}
                value={filter.item ? filter.item : 0}
              />
            </div>
          </div>
        );

      case 'announcements':
        // 공지사항
        return <></>;

      default:
        return <></>;
    }
  };
  return (
    <StyledFilter>
      <>
        <form
          className="search search_mobile box_overflow"
          onSubmit={e => {
            e.preventDefault();
            inp.current.blur();
            onClick();
          }}
        >
          <Input
            ref={inp}
            type="text"
            value={filter.search || ''}
            onChange={e => handleChange(e.target.value, 'search')}
            className="search_input"
            placeholder={placeholder}
          />
          <button
            type="button"
            style={{ opacity: filter.search ? 1 : 0.1 }}
            onClick={() => handleChange('', 'search', true)}
            className="searchclear"
          />
        </form>
        {type !== 'announcements' && (
          <>
            <div className="top">
              <div className="top_date">
                <DatePicker
                  className="datepicker"
                  value={new Date(moment.unix(filter.startDate))}
                  onChange={d => {
                    setDate(0);
                    handleChange(moment(d).unix(), 'startDate');
                  }}
                />
                <span className="middle">~</span>
                <DatePicker
                  className="datepicker"
                  value={new Date(moment.unix(filter.endDate))}
                  onChange={d => {
                    setDate(0);
                    handleChange(moment(d).unix(), 'endDate');
                  }}
                />
              </div>
              <DropBox
                className="dropbox period"
                name="ex"
                title="기간 직접 설정"
                data={[
                  { value: 0, body: '기간 직접 설정' },
                  { value: 1, body: '최근 1개월' },
                  { value: 2, body: '최근 3개월' },
                  { value: 3, body: '최근 6개월' },
                ]}
                value={date}
                onChange={d => {
                  setDate(d);
                  switch (d * 1) {
                    case 1:
                      handleDateChange(
                        moment()
                          .subtract(1, 'month')
                          .unix(),
                        moment().unix(),
                      );
                      break;
                    case 2:
                      handleDateChange(
                        moment()
                          .subtract(3, 'month')
                          .unix(),
                        moment().unix(),
                      );
                      break;
                    case 3:
                      handleDateChange(
                        moment()
                          .subtract(6, 'month')
                          .unix(),
                        moment().unix(),
                      );
                      break;
                    default:
                      handleDateChange(
                        moment()
                          .startOf('month')
                          .unix(),
                        moment()
                          .endOf('month')
                          .unix(),
                      );
                      break;
                  }
                }}
              />
            </div>
          </>
        )}
        {Bottom()}
        <form
          className="search search_pc "
          onSubmit={e => {
            e.preventDefault();
            onClick();
          }}
        >
          <Input
            value={filter.search || ''}
            onChange={e => handleChange(e.target.value, 'search')}
            className="search_input"
            placeholder={placeholder}
            type="text"
          />
          <button
            type="button"
            style={{ opacity: filter.search ? 1 : 0.1 }}
            onClick={() => handleChange('', 'search', true)}
            className="searchclear"
          />
          <button type="submit" className="search_button">
            조회하기
          </button>
        </form>
      </>
    </StyledFilter>
  );
};

Filter.propTypes = {
  type: PropTypes.string,
  filter: PropTypes.object,
  handleChange: PropTypes.func,
  handleDateChange: PropTypes.func,
  onClick: PropTypes.func,
  list: PropTypes.object,
  placeholder: PropTypes.string,
};

export default Filter;
