import styled from 'styled-components';

const Container = styled.div`
  max-width: 1172px;
  margin: 0 auto;
  padding: ${props => (props.padding ? '0 20px' : '0')};
  box-sizing: border-box;

  .padding {
    padding-left: 20px;
    padding-right: 20px;
  }
`;

export default Container;
