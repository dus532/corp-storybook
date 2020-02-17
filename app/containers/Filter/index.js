import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import styled from 'styled-components';
import { Field, reduxForm } from 'redux-form';
import {
  Card,
  /*
  Input,
  Icon,
  */
  Select,
  // TreeSelect,
  // Cascader,
  DatePicker,
  TimePicker,
  Button,
} from 'antd';
import moment from 'moment';

import rem from 'utils/rem';

import renderOptions from './renderOptions';
import { RENDER_TYPES } from './constants';

const { /* MonthPicker, */ RangePicker /* WeekPicker */ } = DatePicker;

const FilterSection = styled.section`
  flex: 1;

  > div,
  span {
    margin-right: ${rem(16)};
  }
`;

const ButtonSection = styled.section`
  position: relative;
  width: ${rem(200)};
`;

/*
const renderInput = ({ input }) => (
  <Input
    style={{ width: rem(200) }}
    addonAfter={<Icon type="search" />}
    allowClear
    {...input}
  />
);
*/

const renderSelect = ({ input, options, ...props }) => (
  <Select style={{ minWidth: rem(100) }} {...input} {...props}>
    {renderOptions(options)}
  </Select>
);

renderSelect.propTypes = {
  input: PropTypes.object.isRequired,
  options: PropTypes.object,
  props: PropTypes.object,
};

/*
const renderTreeSelect = ({ input, ...props }) => (
  <TreeSelect {...input} {...props} />
);
*/

const renderDatePicker = ({ input, ...props }) => (
  <DatePicker
    value={input.value}
    onChange={value => input.onChange(value.clone())}
    {...props}
  />
);

renderDatePicker.propTypes = {
  input: PropTypes.object.isRequired,
  props: PropTypes.object,
};

const renderTimePicker = ({ input, ...props }) => (
  <TimePicker {...input} {...props} />
);

renderTimePicker.propTypes = {
  input: PropTypes.object.isRequired,
  props: PropTypes.object,
};

const renderRangePicker = ({ input, ...props }) => (
  <RangePicker {...input} {...props} />
);

renderRangePicker.propTypes = {
  input: PropTypes.object.isRequired,
  props: PropTypes.object,
};

const renderFilter = ({ type, name, ...props }) => {
  switch (type) {
    case RENDER_TYPES.SELECT:
    case RENDER_TYPES.MULTIPLE_SELECT:
      return (
        <Field
          name={name}
          mode={type === RENDER_TYPES.MULTIPLE_SELECT ? 'multiple' : 'default'}
          {...props}
          component={renderSelect}
        />
      );
    /*
    case RENDER_TYPES.TREE_SELECT:
      return <Field name={name} {...props} component={renderTreeSelect} />;
      */
    case RENDER_TYPES.DATE_PICKER:
      return <Field name={name} {...props} component={renderDatePicker} />;
    case RENDER_TYPES.TIME_PICKER:
      return <Field name={name} {...props} component={renderTimePicker} />;
    case RENDER_TYPES.RANGE_PICKER:
      return <Field name={name} {...props} component={renderRangePicker} />;
    default:
      return <span>알 수 없음</span>;
  }
};

renderFilter.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  props: PropTypes.object,
};

const normalizeValues = values =>
  Object.keys(values).reduce((acc, key) => {
    const value = values[key];
    console.log(value);

    if (value instanceof moment) {
      acc[key] = value.format();
    } else if (value instanceof Object) {
      acc[key] = JSON.stringify(value);
    } else {
      acc[key] = value;
    }

    return acc;
  }, {});

function Filter({
  filters,
  handleSubmit,
  updateListDataParams,
  initializeFunctions = [],
  preprocessValues = values => values,
}) {
  /*
   * TODO
   *  * PageComponent/Filters
   *  * mounting될 때 data with filter 불러오는 작업 돌리기.
   *  * props.initializeFunctions -> []
   *  props.initializeFunctions.forEach(initialize => initialize());
   *
   */

  useEffect(() => {
    initializeFunctions.forEach(initialize => initialize());
  }, []);

  console.log('Filter Render');

  return (
    <form
      onSubmit={handleSubmit(values => {
        const processedValues = preprocessValues(values) || values;
        const normalizedValues = normalizeValues(processedValues);

        updateListDataParams(normalizedValues);
      })}
    >
      <Card
        style={{ width: '100%' }}
        bodyStyle={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <FilterSection>{filters.map(renderFilter)}</FilterSection>
        {/*
        <Field name="q" component={renderInput} />
        <FilterSection>
          <Select style={{ minWidth: rem(100) }}>
            {renderOptions(TEST_OPTIONS)}
          </Select>
          <TreeSelect
            style={{ minWidth: rem(100) }}
            treeData={TEST_TREE_DATA}
          />
          <Cascader
            style={{ minWidth: rem(100) }}
            options={TEST_CASCADER_OPTIONS}
          />
          <DatePicker />
          <DatePicker
            showTime={{ format: 'HH:mm' }}
            placeholder="DatePicker with time"
          />
          <MonthPicker />
          <RangePicker />
          <RangePicker
            format="YYYY-MM-DD HH:mm"
            showTime={{ format: 'HH:mm' }}
            placeholder="RangePicker with time"
          />
        </FilterSection>
        */}
        <ButtonSection>
          <Button
            size="large"
            style={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              width: rem(100),
            }}
            type="primary"
            htmlType="submit"
          >
            검색
          </Button>
        </ButtonSection>
      </Card>
    </form>
  );
}

Filter.propTypes = {
  filters: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  updateListDataParams: PropTypes.func.isRequired,
  initializeFunctions: PropTypes.arrayOf(PropTypes.func),
  preprocessValues: PropTypes.func,
};

const withReduxForm = reduxForm({
  form: 'Filter',
});

export default compose(
  withReduxForm,
  memo,
)(Filter);
