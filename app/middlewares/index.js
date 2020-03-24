import { KEY, LIFECYCLE } from './constants';
import middleware from './middleware';
import handle from './handle';

export { middleware, handle, KEY, LIFECYCLE };

// 환영합니다! redux-pack 미들웨어를 Localization 하게 사용합니다.
// redux-pack 미들웨어는 react-saga나 react-thunk와 같이 어렵고 복잡한 설계보다
// middleware 자체가 "promise"문을 감지하여 비동기식 처리를 지원해주는
// airbnb open-source 프로젝트의 일환입니다.

// redux-pack은 단 4개의 파일로만 이루어져 있습니다.
