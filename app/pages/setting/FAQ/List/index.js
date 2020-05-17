import React from 'react';
import { useHistory } from 'react-router-dom';

import { Container, BigTitle, ItemPanel } from 'components';

const FAQ = () => {
  const history = useHistory();

  const data = [
    {
      title: '자주 묻는 질문',
      onClick: () => {
        history.push('/setting/faq/board');
      },
    },
  ];

  return (
    <Container>
      <BigTitle>FAQ</BigTitle>
      <ItemPanel data={data} />
    </Container>
  );
};

export default FAQ;
