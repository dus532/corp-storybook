import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledTable = styled.div``;

const Table = ({ data = [], title = [] }) => {
  console.log(data);
  return (
    <StyledTable>
      <div className="">
        {title.map(d => (
          <div>{d}</div>
        ))}
      </div>
      {data.map(d => (
        <div>{d.date}</div>
      ))}
    </StyledTable>
  );
};

Table.propTypes = {
  data: PropTypes.array,
  title: PropTypes.array,
};

export default Table;
