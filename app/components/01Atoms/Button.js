import styled from 'styled-components';

const Button = styled.button`
  width: 100%;
  height: 40px;
  background: black;
  outline: none;
  border: none;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  transition: 0.25s;
  cursor: pointer;

  &:hover {
    background: rgb(50, 50, 50);
    transition: 0.25s;
  }

  &:active {
    outline: none;
  }
`;

export default Button;
