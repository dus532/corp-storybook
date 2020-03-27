import styled from 'styled-components';

const SubButton = styled.button`
  width: 100%;
  height: 40px;
  background: #f6f6f6;
  outline: none;
  border: none;
  color: black;
  font-size: 1rem;
  font-weight: bold;
  transition: 0.25s;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: #ddd;
    transition: 0.25s;
  }
`;

export default SubButton;
