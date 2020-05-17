import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Color from 'config/color';

const CategoryBody = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 16px;
  overflow: auto;
`;

const Panel = styled.div`
  padding: 10px 20px;
  background: ${props => (props.on ? Color.Blue : 'white')};
  color: ${props => (props.on ? `white` : 'black')};
  margin-right: 10px;
  border-radius: 20px;
  cursor: pointer;
`;

const Category = ({ data }) => {
  const [state, setState] = useState(0);

  return (
    <CategoryBody>
      {data.map(d => (
        <Panel onClick={() => setState(d.id)} on={d.id === state}>
          {d.body}
        </Panel>
      ))}
    </CategoryBody>
  );
};

Category.propTypes = {
  data: PropTypes.array,
};
export default Category;
