import styled from 'styled-components';

const Button = styled.button`
  width: 100%;
  height: 60px;
  background: black;
  outline: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  transition: 0.25s;
  border-radius: 6px;
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
