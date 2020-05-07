import styled from 'styled-components';

const RegisterInformation = styled.div`
  margin-bottom: ${props => (props.type1 ? `40px` : '24px')};
  line-height: 28px;
  text-align: ${props => (props.type1 ? `center` : 'left')};
  font-size: ${props => (props.type1 ? `1.2rem` : '1rem')};

  h2 {
    display: block;
    margin-top: 48px;
    margin-bottom: ${props => (props.type1 ? `10px` : '32px')};
    font-weight: 700;
  }

  span {
    font-weight: 700;
  }

  .underline {
    text-decoration: underline;
    font-weight: 500;
  }
`;

export default RegisterInformation;
