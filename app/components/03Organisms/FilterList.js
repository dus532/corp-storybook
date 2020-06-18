/* eslint-disable indent */
import React, { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import SearchIMG from 'images/icon_search.png';
import DelIMG from 'images/icon_delete.png';

import C from 'config/constants';
import F from 'config/filter';
import Color from 'config/color';
import {
  useCardList,
  useEmployeesList,
  useGroupList,
  useQuery,
} from 'utils/hooks';
import moment from 'utils/moment';

import DropBox from '../01Atoms/DropBox';
import Input from '../01Atoms/Input';
import DatePicker from '../01Atoms/DatePicker';

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

  @media screen and (max-width: 900px) {
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

const Filter = ({ list, date, placeholder = '예약번호 입력' }) => {
  const inp = useRef();
  const [data, setData] = useState({
    ...list.reduce((prev, cur) => Object.assign(prev, { [cur.value]: 0 }), {}),
    period: 0,
    startDate: moment()
      .startOf('year')
      .format('X'),
    endDate: moment().format('X'),
    search: '',
  });
  const [search, setSearch] = useState('');

  const newUrl = useQuery();
  const history = useHistory();

  const cardList = useCardList(data.cardId > -1);
  const employeesList = useEmployeesList(data.employeeId > -1);
  const groupList = useGroupList(data.userGroupId > -1);

  const handleChange = (e, name) => {
    if (name) {
      if (name === 'userGroupId') {
        setData({ ...data, employeeId: 0, [name]: e });
      } else {
        setData({ ...data, [name]: e });
      }
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  const handleDateChange = (sDate, eDate) => {
    setData({
      ...data,
      startDate: sDate,
      endDate: eDate,
    });
  };

  const onSearch = () => {
    handleChange(search, 'search');
  };

  useEffect(() => {
    Object.keys(data).forEach(d => {
      if (data[d]) {
        newUrl.set(d, data[d]);
      } else {
        newUrl.delete(d);
      }
    });
    history.push(`${window.location.pathname}?${newUrl.toString()}`);
  }, [data]);

  return (
    <StyledFilter>
      <>
        <form
          className="search search_mobile box_overflow"
          onSubmit={e => {
            e.preventDefault();
            inp.current.blur();
            onSearch();
          }}
        >
          <Input
            ref={inp}
            type="text"
            value={search || ''}
            onChange={e => setSearch(e.target.value)}
            className="search_input"
            placeholder={placeholder}
          />
          <button
            type="button"
            style={{ opacity: search ? 1 : 0.1 }}
            onClick={() => handleChange('', 'search', true)}
            className="searchclear"
          />
        </form>
        {date && (
          <>
            <div className="top">
              <div className="top_date">
                <DatePicker
                  className="datepicker"
                  value={new Date(moment.unix(data.startDate))}
                  onChange={d => {
                    handleChange(0, 'period');
                    handleChange(moment(d).unix(), 'startDate');
                  }}
                />
                <span className="middle">~</span>
                <DatePicker
                  className="datepicker"
                  value={new Date(moment.unix(data.endDate))}
                  onChange={d => {
                    handleChange(0, 'period');
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
                value={data.period}
                onChange={d => {
                  handleChange(d, 'period');
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
        {list.map(li => {
          switch (li.type) {
            case 'cardId':
              return (
                <DropBox
                  key={li.value}
                  className="dropbox dropbox_last"
                  title={li.title}
                  data={[
                    {
                      value: C.PAYMENT_STATUS.ALL,
                      body: '전체 결제카드',
                    },
                    ...cardList.map(l => ({
                      value: l.id,
                      body: `${l.cardCorp} / ${l.cardNumber.substr(
                        l.cardNumber.length - 4,
                        4,
                      )}`,
                    })),
                  ]}
                  onChange={d => {
                    handleChange(d === 0 ? null : d, li.value);
                  }}
                  value={data.cardId || 0}
                />
              );
            case 'userGroupId':
              return (
                <DropBox
                  key={li.value}
                  className="dropbox "
                  title="부서"
                  data={[
                    { value: 0, body: '전체 부서' },
                    ...groupList.map(l => ({
                      value: l.id,
                      body: l.name,
                    })),
                  ]}
                  onChange={d => {
                    handleChange(d === 0 ? null : d, 'userGroupId');
                  }}
                  value={data.userGroupId || 0}
                />
              );
            case 'employeeId':
              return (
                <DropBox
                  key={li.value}
                  className="dropbox dropbox_last"
                  title="사원"
                  data={[
                    { value: 0, body: '전체 사원' },
                    ...(employeesList.length > 0
                      ? employeesList.reduce((prev, now) => {
                          if (data.userGroupId) {
                            if (data.userGroupId === now.id) {
                              prev.push({
                                value: now.id,
                                body: now.name,
                              });
                              return prev;
                            }
                          } else {
                            prev.push({
                              value: now.id,
                              body: now.name,
                            });
                          }
                          return prev;
                        }, [])
                      : []),
                  ]}
                  onChange={d => {
                    handleChange(d === 0 ? null : d, 'employeeId');
                  }}
                  value={data.employeeId || 0}
                />
              );
            default:
              return (
                <DropBox
                  key={li.value}
                  className="dropbox "
                  title={li.title}
                  data={F[li.type]}
                  onChange={d => handleChange(d, li.value)}
                  value={data[li.value] || 0}
                />
              );
          }
        })}
        <form
          className="search search_pc "
          onSubmit={e => {
            e.preventDefault();
            onSearch();
          }}
        >
          <Input
            value={search || ''}
            onChange={e => setSearch(e.target.value)}
            className="search_input"
            placeholder={placeholder}
            type="text"
          />
          <button
            type="button"
            style={{ opacity: search ? 1 : 0.1 }}
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
  list: PropTypes.array,
  date: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default Filter;
