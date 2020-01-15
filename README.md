# CARPLAT-ADMIN

### 프로젝트 기반

이 프로젝트는 [react-boilerplate](https://github.com/react-boilerplate/react-boilerplate/)를 커스텀하고 [ant.design](https://ant.design/docs/react/introduce) 컴포넌트를 사용하여 만들어졌습니다.

### 주요 라이브러리

* [react](https://reactjs.org/) 16.8.6
* [react-intl](https://github.com/formatjs/react-intl) 2.8.0
* [redux](https://redux.js.org/api/api-reference) 4.0.1
* [redux-form](https://redux-form.com/8.2.2/docs/gettingstarted.md/) 8.2.2
* [styled-components](https://styled-components.com/docs) 4.2.0
* [reselect](https://github.com/reduxjs/reselect) 4.0.0
* [redux-saga](https://redux-saga.js.org/) 1.0.2
* [immer](https://immerjs.github.io/immer/docs/introduction) 3.0.0
* [ant.dedsign](https://ant.design/docs/react/introduce) 3.*

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

아래 참고:

```sh
carplat-admin/app
├── api/              # API 요청 wrapper.
├── components/       # 프로젝트 전체에서 공유되는 Component.
├── containers/       # 프로젝트 전체에서 공유되면서 store에서 데이터를 보고 있는 Component.
├── services/         # 재사용 가능한 sideEffect 컨트롤러.
├── HOCs/             # Higher-Order Component 집합.
├── utils/            # 프로젝트 전체에서 공유되는 util 함수.
└── pages/            # 페이지 정보와 라우팅 정보.
    ├── common/       # 어디에 종속되지 않는 페이지들 ex). 로그인, 404 페이지
    ├── carplat/      # 카플랫 마스터 & 카플랫 서비스 관리자 용 페이지 라우팅 정보
    ├── agency/       # 고객사 마스터 & 고객사 서비스 관리자 용 페이지 라우팅 정보
    └── features/     # 각 기능 별 페이지들
```

### TODOs
- [ ] styled-components v5 확인 후 
- [ ] API 데이터 통신 방식 정의
- [ ] antd 공용 컴포넌트 정의 + 개발
- [ ] 레퍼런스 페이지 개발
- [ ] staging 설정
- [ ] 배포 라인 설정
- [ ] 위지웍 에디터 추가
- [ ] 라우팅 utils 추가
- [ ] 모바일 뷰 
