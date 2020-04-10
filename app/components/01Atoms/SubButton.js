import styled from 'styled-components';

import Button from 'components/01Atoms/Button';

const SubButton = styled(Button)`
  background: ${props => (props.white ? '#fff' : '#fafafa')};
  border: 1px solid #d6d6d6;
  color: black;

  &:hover {
    background: #eee;
  }
`;

export default SubButton;
