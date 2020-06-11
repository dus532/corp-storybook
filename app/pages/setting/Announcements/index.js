import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

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
import { useModal, useFetchData, useQuery } from 'utils/hooks';

const initialState = { search: '' };

const Announcements = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const nowPage = useQuery().get('page');
  const modal = useModal();

  const [filter, setFilter] = useState(initialState);
  const [announcementsStore, announcementsData] = useFetchData(
    'announcements',
    filter,
  );

  const handleChange = (data, name, reset) => {
    setFilter({ ...filter, [name]: data });

    if (reset) {
      dispatch(
        actionGetAnnouncements({ keyword: initialState.search }, () => {
          history.push(`${document.location.pathname}?page=1`);
        }),
      );
    }
  };

  const onSearch = () => {
    dispatch(
      actionGetAnnouncements({ keyword: filter.search }, () => {
        history.push(`${document.location.pathname}?page=1`);
      }),
    );
  };

  const onDetail = data => modal(ANNOUNCEMENTS_DETAIL, data);

  return (
    <div>
      <Container>
        <BigTitle noBorder>공지사항</BigTitle>
        <Filter
          type="announcements"
          filter={filter}
          handleChange={handleChange}
          placeholder="검색어 입력"
          onClick={onSearch}
        />
        <AsyncDiv store={announcementsStore}>
          <Board
            now={nowPage || 1}
            data={announcementsData.announcements}
            onClick={onDetail}
          />
          <Pagination
            now={nowPage || 1}
            total={
              announcementsData && announcementsData.announcements.length > 0
                ? Math.ceil(announcementsData.announcements.length / 10)
                : 1
            }
          />
        </AsyncDiv>
      </Container>
    </div>
  );
};

export default Announcements;
