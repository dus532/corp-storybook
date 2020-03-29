import styled from 'styled-components';

import Button from 'components/01Atoms/Button';

const SubButton = styled(Button)`
  background: #f6f6f6;
  color: black;

  &:hover {
    background: #ddd;
  }
`;

export default SubButton;
