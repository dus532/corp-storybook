import styled from 'styled-components';

import LogoImg from 'images/logo_header.png';

const LogoHeader = styled.div`
  width: 180px;
  height: 60px;
  background: url(${LogoImg}) center / contain no-repeat;
  display: inline-block;
`;

export default LogoHeader;
