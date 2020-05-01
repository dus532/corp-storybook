import styled from 'styled-components';

const Container = styled.div`
  max-width: 1172px;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
  background: ${props => props.white && 'white'};

  .padding {
    padding-left: 20px;
    padding-right: 20px;
  }
`;

export default Container;
