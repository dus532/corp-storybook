/* eslint-disable indent */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Container, BigTitle, AsyncDiv, BillPaper } from 'components';
import { actionGetCorpInfo } from 'stores';

import { useModal } from 'utils/hooks';
import { CHECK_PW } from 'modals/constants';

const Manage = () => {
  const dispatch = useDispatch();
  const modal = useModal();

  const corpInfoStore = useSelector(state => state.info);
  const corpInfo = useSelector(state => state.info.data.corpInfo);
  const userGroups = useSelector(state => state.info.data.userGroups);

  useEffect(() => {
    dispatch(actionGetCorpInfo());
  }, []);

  return (
    <Container>
      <BigTitle>기업 정보 관리</BigTitle>
      <AsyncDiv store={corpInfoStore}>
        {corpInfo && (
          <BillPaper
            className="box_overflow"
            title="기업 정보"
            data={[
              { title: '기업이름', body: corpInfo.name },
              { title: '사업자 등록번호', body: corpInfo.companyNumber },
              { title: '기업 주소 ', body: corpInfo.address },
              {
                title: '이메일 도메인',
                body: `${corpInfo.emailDomains[0]} / ${
                  corpInfo.emailDomains[1]
                }`,
              },
              {
                title: '사원 번호 사용 유무',
                body: corpInfo.employeeNumberUsage ? '사용' : '사용안함',
              },
              {
                title: '부서 정보 사용 유무',
                body: corpInfo.userGroupUsage ? '사용' : '사용안함',
              },
              {
                title: '등록된 부서 정보',
                table: userGroups,
              },
            ]}
            buttonSpecial="기업 정보 변경"
            buttonSpecialOnClick={() => {
              modal(CHECK_PW, '/setting/corp/update');
            }}
          />
        )}
      </AsyncDiv>
    </Container>
  );
};

export default Manage;
