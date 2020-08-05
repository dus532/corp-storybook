import styled from 'styled-components';

import ErrorIMG from 'images/icon_error.png';
import ShowIMG from 'images/icon_show.png';
import HideIMG from 'images/icon_hide.png';
import SearchIMG from 'images/icon_search.png';

const iconType = {
  error: ErrorIMG,
  show: ShowIMG,
  hide: HideIMG,
  search: SearchIMG,
};

const Icon = styled.div`
  display: inline-block;
  width: ${({ width }) => width || 24}px;
  height: ${({ height }) => height || 24}px;
  background: url(${({ type }) => iconType[type] || ''}) center / contain
    no-repeat;
`;

export default Icon;
