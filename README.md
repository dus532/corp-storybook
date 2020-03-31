# CARPLAT-ADMIN

### 프로젝트 기반

이 프로젝트는 [react-boilerplate](https://github.com/react-boilerplate/react-boilerplate/)를 커스텀하고 [ant.design](https://ant.design/docs/react/introduce) 컴포넌트를 사용하여 만들어졌습니다.

### 주요 라이브러리

- [react](https://reactjs.org/) 16.8.6
- [react-intl](https://github.com/formatjs/react-intl) 2.8.0
- [redux](https://redux.js.org/api/api-reference) 4.0.1
- [redux-form](https://redux-form.com/8.2.2/docs/gettingstarted.md/) 8.2.2
- [styled-components](https://styled-components.com/docs) 4.2.0
- [reselect](https://github.com/reduxjs/reselect) 4.0.0
- [redux-saga](https://redux-saga.js.org/) 1.0.2
- [immer](https://immerjs.github.io/immer/docs/introduction) 3.0.0
- [ant.dedsign](https://ant.design/docs/react/introduce) 3.\*

### 추가 라이브러리

- [axios](https://github.com/axios/axios) 0.19.2 - 통신 요청 라이브러리

### 시작하기

```sh
# Download the repo
git clone https://github.com/plat-dev/carplat-admin
# Enter the repo
cd carplat-admin
# Install the dependencies
yarn
# Start local development
yarn start
# 브라우저에서 확인
open http://localhost:3000
```

### 프로젝트 구조

아래 참고

```sh
carplat-admin/app
├── api/              # API 요청 wrapper.
├── components/       # 프로젝트 전체에서 공유되는 Component, atomic 패턴으로 제작
├── containers/       # 프로젝트 전체에서 공유되면서 store에서 데이터를 보고 있는 Component.
├── services/         # 재사용 가능한 sideEffect 컨트롤러.
├── modals/           # 페이지에서 사용되는 modals, portal로 순간이동하여 #modal에 그려짐.
├── utils/            # 프로젝트 전체에서 공유되는 util 함수.
├── middlewares/      # redux의 비동기 처리를 가능하게 해주는 middlewares ( redux-pack pork )
└── pages/            # 페이지 정보와 라우팅 정보.
    ├── common/       # ( 01 ) 어디에 종속되지 않는 페이지들 ex). 로그인, 404 페이지
    ├── dashboard/    # ( 03.1 ) 대쉬보드
    ├── employee/     # ( 03.4 ) 사원관리
    ├── firstSetting/ # ( 02 ) 초기설정
    ├── mypage/       # ( 05 ) 마이페이지
    ├── payment/      # ( 03.3 ) 결제 내역
    ├── reservation/  # ( 03.2 ) 예약 조회
    └── setting/      # ( 04 ) 설정
```

### TODOs

- [x] styled-components v5 확인 후
- [ ] API 데이터 통신 방식 정의
- [ ] antd 공용 컴포넌트 정의 + 개발
- [ ] 레퍼런스 페이지 개발
- [ ] staging 설정
- [ ] 배포 라인 설정
- [ ] 위지웍 에디터 추가
- [ ] 라우팅 utils 추가
- [ ] 모바일 뷰
