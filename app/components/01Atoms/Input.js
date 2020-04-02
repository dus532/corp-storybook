import styled from 'styled-components';

const Input = styled.input`
  font-size: 0.9em;
  transition: 0.35s;
  border: 0;
  display: block;
  width: 100%;
  height: 36px;
  margin: 4px 0;
  padding: 4px 12px;
  border: 1px solid #eeeeee;
  background: white;

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
