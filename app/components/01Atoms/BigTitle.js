import styled from 'styled-components';

const StyledBitTitle = styled.div`
  margin-top: 40px;
  margin-bottom: ${props => (props.marginSmall ? `10px` : `20px`)};
  font-size: 2rem;
  font-weight: 700;
`;

export default StyledBitTitle;
