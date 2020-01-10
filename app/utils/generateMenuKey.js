/**
 * generateMenuKey
 *
 * @param {string} path 라우팅 패스
 * @param {string} menuTitle 메뉴 타이틀
 * @returns {string} 메뉴에 사용 될 키 값 반환
 */
export default function generateMenuKey(path, menuTitle) {
  return `${path}/${menuTitle}`;
}
