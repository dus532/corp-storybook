import styled from 'styled-components';

import LogoImg from 'images/logo_carplat.png';

const Logo = styled.div`
  width: 268px;
  height: 95px;
  margin: 8px 0;
  background: url(${LogoImg}) center / contain no-repeat;

  @media screen and (max-width: 768px) {
    width: 170px;
    height: 37px;
    margin: 48px 0;
  }
`;

export default Logo;
