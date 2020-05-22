import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  AsyncDiv,
  Container,
  BigTitle,
  ItemPanel,
  Filter,
  // Category,
} from 'components';
import { actionGetFAQs } from 'stores';

// const tempCatData = [{ id: 0, body: '전체' }, { id: 1, body: '서비스' }];

const FAQ = () => {
  const [filter, setFilter] = useState({ search: '' });
  const [search, setSearch] = useState('');

  const dispatch = useDispatch();
  const FAQstore = useSelector(state => state.faqs);
  const FAQdata = useSelector(state => {
    const { data } = state.faqs;
    if (search) {
      return data.faqs.filter(d => d.title.indexOf(search) !== -1);
    }

    return data.faqs;
  });

  const handleChange = (data, name) => {
    setFilter({ ...filter, [name]: data });
  };

  useEffect(() => {
    dispatch(actionGetFAQs());
  }, []);

  const onSearch = () => {
    setSearch(filter.search);
  };

  return (
    <Container>
      <BigTitle noBorder>자주 묻는 질문</BigTitle>
      <Filter
        type="announcements"
        filter={filter}
        handleChange={handleChange}
        placeholder="검색어 입력"
        onClick={onSearch}
      />
      <AsyncDiv store={FAQstore}>
        {/* <Category data={tempCatData} /> */}
        <ItemPanel data={FAQdata} board />
      </AsyncDiv>
    </Container>
  );
};

export default FAQ;
