// Common 공통
export { default as SignIn } from 'pages/common/SignIn';

// DashBoard 대쉬보드
export { default as DashBoard } from 'pages/home/DashBoard';

// InitialSetting 초기설정
export { default as InitIntroduce } from 'pages/initialSetting/Introduce';
export { default as InitRegisterCard } from 'pages/initialSetting/RegisterCard';
export { default as InitPayment } from 'pages/initialSetting/Payment';
export { default as InitUsage } from 'pages/initialSetting/Usage';

// Payment 결제내역
export { default as Payment } from 'pages/payment';

// Employee 사원관리
export { default as Employee } from 'pages/employee';

// Employee 사원관리
export { default as Rental } from 'pages/rental';

// Setting 설정
export { default as SettingAnnouncements } from 'pages/setting/Announcements';
export {
  default as SettingSubscription,
} from 'pages/setting/Subscription/Manage';
export {
  default as SettingSubscriptionUpdate,
} from 'pages/setting/Subscription/Update';
export {
  default as SettingSubscriptionPayment,
} from 'pages/setting/Subscription/Payment';
export {
  default as SettingSubscriptionExpires,
} from 'pages/setting/Subscription/Expires';
// 기업 정보
export { default as SettingCorpInfo } from 'pages/setting/Corporation/Manage';
export {
  default as SettingCorpInfoUpdate,
} from 'pages/setting/Corporation/Update';
// 결제 카드 관리
export {
  default as SettingPaymentCard,
} from 'pages/setting/PaymentCard/Manage';
export {
  default as SettingPaymentCardCreate,
} from 'pages/setting/PaymentCard/Create';
// 기타
export { default as SettingFAQ } from 'pages/setting/FAQ';
export { default as SettingService } from 'pages/setting/Service';
export { default as SettingTerms } from 'pages/setting/Terms';

// 마이페이지
export { default as MyPage } from 'pages/mypage/Manage';
export { default as ChangePW } from 'pages/mypage/ChangePW';
export { default as ChangeInfo } from 'pages/mypage/ChangeInfo';
