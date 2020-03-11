import { OR, AND, NOT } from 'services/ResourceController/constants';

export default function translateFilterOption(filterOption) {
  switch (filterOption) {
    case AND:
      return '+';
    case NOT:
      return '-';
    case OR:
    default:
      return '';
  }
}
