import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DateRangePicker } from 'react-dates';
import '_datepicker.css';
import { useLocation, useHistory } from 'react-router-dom';

import F from 'config/filter';
import moment from 'utils/moment';
import 'moment/locale/ko';

import DropBox from '../01Atoms/DropBox';

moment.locale('ko');

const FilterList = ({ data }) => {
  const [query, setQuery] = useState({});
  const [focused, setFocused] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    const q = {};
    searchParams.forEach((v, k) => {
      q[k] = v;
    });
    setQuery(q);
  }, [location.search]);

  const handleChange = e => {
    searchParams.set(e.target.name, e.target.value);
    history.push(`${location.pathname}?${searchParams.toString()}`);
  };

  return (
    <>
      <DateRangePicker
        startDate={moment('2020-01-01T00:00:00')}
        endDate={moment()}
        focusedInput={focused}
        onFocusChange={f => setFocused(f)}
        displayFormat="YYYY. MM. DD."
        monthFormat="YYYY년 MMMM"
        isOutsideRange={() => false}
        customArrowIcon={<></>}
      />
      {data.map(d => (
        <DropBox
          name={d.key}
          initial={d.initial}
          key={d.type}
          margin="0 8px 0 0"
          data={d.data || F[d.type]}
          value={query[d.key] || ''}
          onChange={handleChange}
        />
      ))}
    </>
  );
};

FilterList.propTypes = {
  data: PropTypes.array,
};

export default FilterList;
