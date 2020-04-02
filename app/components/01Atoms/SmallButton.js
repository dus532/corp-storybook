import styled from 'styled-components';

import Button from 'components/01Atoms/Button';

const SmallButton = styled(Button)`
  background: #ededed;
  color: black;
  width: 100px;
  height: auto;
  padding: 8px 0;
  margin-right: 8px;
  font-size: 0.8em;
  font-weight: 700;

  &:hover {
    background: rgb(200, 200, 200);
  }
`;

export default SmallButton;
