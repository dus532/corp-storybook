/**
 * Antd.Table.onChange params 중 pagination을
 * ResourceController.listDataParams.pagination에 맞게끔 변경
 *
 * https://ant.design/components/table/#components-table-demo-head
 * 코드 참고
 *
 */
export default function translateAntdTablePagination(pagination = {}) {
  return {
    page: pagination.current,
    perPage: pagination.pageSize,
  };
}
