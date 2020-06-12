import styled from 'styled-components';

import Button from 'components/01Atoms/Button';
import Color from 'config/color';

const SubButton = styled(Button)`
  background: ${props => (props.white ? '#fff' : '#fafafa')};
  border: 1px solid ${props => (props.blue ? Color.Blue : Color.LineGray)};
  color: ${props => (props.blue ? Color.Blue : Color.Black)};
  width: 100%;
  font-size: 0.8rem;
  line-height: 40px;
  vertical-align: middle;

  &:hover {
    background: #eee;
  }
`;

export default SubButton;
