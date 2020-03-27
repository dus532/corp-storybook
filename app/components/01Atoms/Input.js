import styled from 'styled-components';

const Input = styled.input`
  font-size: 0.9em;
  transition: 0.35s;
  border: 0;
  display: block;
  width: 100%;
  height: 36px;
  border-radius: 4px;
  margin: 4px 0;
  padding: 4px 12px;
  background: #eeeeee;

  &:hover {
    background: #dddddd;
    transition: 0.35s;
  }

  &:focus {
    background: #ccc;
    transition: 0.35s;
  }
`;

export default Input;
