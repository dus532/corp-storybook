/* eslint-disable indent */
import styled from 'styled-components';

import Color from 'config/color';

const StyledBitTitle = styled.div`
  margin-top: 40px;
  margin-bottom: ${props => (props.marginSmall ? `10px` : `20px`)};
  font-size: 2rem;
  font-weight: 700;

  @media screen and (max-width: 768px) {
    position: relative;
    margin: 0;
    left: -20px;
    width: 100vw;
    height: 40px;
    padding: 0 0 10px 20px;
    background: white;
    font-size: 1.3rem;
    border-bottom: ${props =>
      props.noBorder ? 'none' : `1px solid ${Color.LineGray}`};
  }
`;

export default StyledBitTitle;
