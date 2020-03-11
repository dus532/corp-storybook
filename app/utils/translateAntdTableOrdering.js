import { ANTD_TABLE_ORDER_OPTIONS } from 'services/ResourceController/constants';

/**
 * Antd.Table.onChange params 중 sorter를
 * ResourceController.listDataParams.ordering으로 변경
 *
 * https://ant.design/components/table/#components-table-demo-head
 * 코드 참고
 *
 */
export default function translateAntdTableOrdering(sorter) {
  return {
    ...(sorter.order && {
      [sorter.fieldName]: ANTD_TABLE_ORDER_OPTIONS[sorter.order],
    }),
  };
}
