import styled from 'styled-components';

const Container580 = styled.div`
  max-width: 580px;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: content-box;

  .padding {
    padding-left: 20px;
    padding-right: 20px;
  }

  .input {
    height: 40px;
    margin-top: 10px;
    display: flex;
    align-items: center;
  }

  .radio {
    flex: 1;
  }

  .input > h4,
  .input > h5 {
    width: 140px;
    flex-shrink: 0;
  }

  .input > input[type='text'],
  .input > input[type='number'] {
    flex: 1;
  }

  @media screen and (max-width: 768px) {
    .input {
      margin-top: 20px;
      display: block;
      height: auto;
    }
    .radio {
      padding: 8px 0;
    }
  }
`;

export default Container580;
