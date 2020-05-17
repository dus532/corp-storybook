import React, { useState } from 'react';

import { Container, BigTitle, ItemPanel, Filter, Category } from 'components';

const tempData = [
  {
    title: 'Q. 질문 내용',
    body: '답변입니다.',
  },
];

const tempCatData = [{ id: 0, body: '전체' }, { id: 1, body: '서비스' }];

const FAQ = () => {
  const [filter, setFilter] = useState({ search: '' });

  const handleChange = (data, name) => {
    setFilter({ ...filter, [name]: data });
  };

  const onSearch = () => {
    // dispatch(
    //   actionGetAnnouncements({ keyword: filter.search }, () => {
    //     history.push(`${document.location.pathname}?page=1`);
    //   }),
    // );
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
      <Category data={tempCatData} />
      <ItemPanel data={tempData} board />
    </Container>
  );
};

export default FAQ;
