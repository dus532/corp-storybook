import { RENDER_TYPES } from 'containers/Filter/constants';

import { KEY as ROOT_KEY } from '../../constants';

export const KEY = `${ROOT_KEY}/Filter`;

const TEST_OPTIONS = [
  {
    value: 'a',
    text: '테스트1',
  },
  {
    value: 'c',
    text: '테스트12828e82e82eu82e82',
  },
  {
    value: 'b',
    text: '테스트2',
    disabled: true,
  },
];

export const filters = [
  {
    type: RENDER_TYPES.SELECT,
    name: 'type',
    placeholder: '타입을 선택',
    options: TEST_OPTIONS,
  },
  {
    type: RENDER_TYPES.MULTIPLE_SELECT,
    name: 'type2',
    placeholder: '불러오는 중',
    options: TEST_OPTIONS,
    loading: true,
    disabled: true,
  },
  {
    type: RENDER_TYPES.DATE_PICKER,
    name: 'date',
    placeholder: 'DATE 선택',
  },
  {
    type: RENDER_TYPES.TIME_PICKER,
    name: 'time',
    placeholder: '시간 선택',
  },
  {
    type: RENDER_TYPES.RANGE_PICKER,
    name: 'scope',
    placeholder: '시간 선택',
  },
];
