import styled from 'styled-components';

import LeftIMG from 'images/icon_left.png';
import RightIMG from 'images/icon_right.png';

const IconArrow = styled.div`
  display: inline-block;
  width: 28px;
  height: 28px;
  background: url(${props => (props.arrow === 'left' ? LeftIMG : RightIMG)})
    center / contain no-repeat;
`;

export default IconArrow;
