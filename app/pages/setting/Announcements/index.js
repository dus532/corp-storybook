import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';

import {
  Container,
  BigTitle,
  Filter,
  Pagination,
  Board,
  AsyncDiv,
} from 'components';
import { actionGetAnnouncements } from 'stores';
import { ANNOUNCEMENTS_DETAIL } from 'modals/constants';
import { useModal } from 'utils/hooks';

const useQuery = () => new URLSearchParams(useLocation().search);

const Announcements = () => {
  const dispatch = useDispatch();
  const AnnouncementsData = useSelector(state => state.announcements);

  const history = useHistory();
  const nowPage = useQuery().get('page');
  const modal = useModal();

  const [filter, setFilter] = useState({ search: '' });

  const handleChange = (data, name) => {
    setFilter({ ...filter, [name]: data });
  };

  const onSearch = () => {
    dispatch(
      actionGetAnnouncements(filter, () => {
        history.push(`${document.location.pathname}?page=1`);
      }),
    );
  };

  const onDetail = data => {
    modal(ANNOUNCEMENTS_DETAIL, data);
  };

  useEffect(() => {
    dispatch(
      actionGetAnnouncements({ page: !nowPage ? 1 : nowPage, ...filter }),
    );
  }, [nowPage]);

  return (
    <div>
      <Container>
        <BigTitle>공지사항</BigTitle>
        <Filter
          type="announcements"
          handleChange={handleChange}
          onClick={onSearch}
        />
        <AsyncDiv store={AnnouncementsData}>
          <Board
            data={AnnouncementsData.data.announcements}
            onClick={onDetail}
          />
          <Pagination
            now={!nowPage ? 1 : nowPage}
            total={AnnouncementsData.data.totalPage}
          />
        </AsyncDiv>
      </Container>
    </div>
  );
};

export default Announcements;
