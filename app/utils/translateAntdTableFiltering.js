import { AND } from 'services/ResourceController/constants';

/**
 * Antd.Table.onChange params 중 filters를
 * ResourceController.listDataParams.filtering으로 변경
 *
 * https://ant.design/components/table/#components-table-demo-head
 * 코드 참고
 *
 *
 * extraFiltering 예시
 * -
 *  extraFiltering: {
 *    type: {
 *      normal: NOT,
 *    },
 *    brand: {
 *      benz: OR,
 *    },
 *  },
 *
 *
 *  위에 생성된 extraFiltering과 processing된 filtering 객체가 합쳐짐.
 *  newFiltering = Object.assign({}, extraFiltering, filtering),
 *
 *  specificFilteringOptions 예시
 *    specificFilteringOptions: {
 *      type: OR,
 *      brand: OR,
 *    },
 *
 *  filters 객체로 만들어지는 filtering 객체는 기본적으로 AND 연산으로
 *  생성됨. 따로 명시할 때 specificFilteringOptions 사용.
 */
export default function translateAntdTableFiltering(
  filters,
  extraFiltering = {},
  specificFilteringOptions = {},
) {
  return Object.keys(filters).reduce((acc, fieldName) => {
    const filter = filters[fieldName];

    if (filter) {
      const filterOption = specificFilteringOptions[fieldName] || AND;

      acc[fieldName] = filter.reduce(
        (filterAcc, filterName) => ({
          ...filterAcc,
          [filterName]: filterOption,
        }),
        extraFiltering,
      );
    }

    return acc;
  }, {});
}
