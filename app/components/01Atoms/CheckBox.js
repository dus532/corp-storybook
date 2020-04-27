import styled from 'styled-components';

const CheckBox = styled.input.attrs({
  type: 'checkbox',
})`
  width: 20px;
  height: 20px;
  background: white;
  border: 1px solid black;
`;

export default CheckBox;
