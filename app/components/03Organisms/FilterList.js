import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DateRangePicker } from 'react-dates';
import '_datepicker.css';
import { useLocation, useHistory } from 'react-router-dom';

import F from 'config/filter';
import moment from 'utils/moment';
import 'moment/locale/ko';
import { useQueryObject } from 'utils/hooks';

import DropBox from '../01Atoms/DropBox';

moment.locale('ko');

const FilterList = ({ data, date }) => {
  const query = useQueryObject();
  const [focused, setFocused] = useState(null);
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);

  const handleChange = e => {
    searchParams.set(e.target.name, e.target.value);
    history.push(`${location.pathname}?${searchParams.toString()}`);
  };

  const handleDateChange = ({ startDate, endDate }) => {
    searchParams.set('startDate', moment(startDate).format('X'));
    searchParams.set('endDate', moment(endDate).format('X'));
    history.push(`${location.pathname}?${searchParams.toString()}`);
  };

  return (
    <>
      {date && (
        <DateRangePicker
          startDateId="startDateId"
          startDate={query.startDate ? moment.unix(query.startDate) : moment()}
          endDateId="endDateId"
          endDate={query.endDate ? moment.unix(query.endDate) : moment()}
          focusedInput={focused}
          onFocusChange={f => setFocused(f)}
          onDatesChange={handleDateChange}
          displayFormat="YYYY. MM. DD."
          monthFormat="YYYY년 MMMM"
          isOutsideRange={() => false}
          customArrowIcon={<></>}
          readOnly
        />
      )}
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
  date: PropTypes.bool,
};

export default FilterList;
