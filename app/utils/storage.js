export function setAccessTokenInSessionStorage(accessToken) {
  sessionStorage.setItem('accessToken', accessToken);
}

export function setAccessTokenInLocalStorage(accessToken) {
  localStorage.setItem('accessToken', accessToken);
}

export function setAccessToken(accessToken, doesRememberThis) {
  if (doesRememberThis) {
    setAccessTokenInLocalStorage(accessToken);
  } else {
    setAccessTokenInSessionStorage(accessToken);
  }
}

export function setAccountTypeInSessionStorage(accountType) {
  sessionStorage.setItem('accountType', accountType);
}

export function setAccountTypeInLocalStorage(accountType) {
  localStorage.setItem('accountType', accountType);
}

export function setAccountType(accountType, doesRememberThis) {
  if (doesRememberThis) {
    setAccountTypeInLocalStorage(accountType);
  } else {
    setAccountTypeInSessionStorage(accountType);
  }
}

export function setIsAdminInSessionStorage(isAdmin) {
  sessionStorage.setItem('isAdmin', isAdmin);
}

export function setIsAdminInLocalStorage(isAdmin) {
  localStorage.setItem('isAdmin', isAdmin);
}

export function setIsAdmin(isAdmin, doesRememberThis) {
  if (doesRememberThis) {
    setIsAdminInLocalStorage(isAdmin);
  } else {
    setIsAdminInSessionStorage(isAdmin);
  }
}

function getAccessTokenInSessionStorage() {
  return sessionStorage.getItem('accessToken');
}

function getAccessTokenInLocalStorage() {
  return localStorage.getItem('accessToken');
}

export function getAccessToken() {
  return getAccessTokenInSessionStorage() || getAccessTokenInLocalStorage();
}

function getAccountTypeInSessionStorage() {
  return sessionStorage.getItem('accountType');
}

function getAccountTypeInLocalStorage() {
  return localStorage.getItem('accountType');
}

export function getAccountType() {
  return getAccountTypeInSessionStorage() || getAccountTypeInLocalStorage();
}

function getIsAdminInSessionStorage() {
  return sessionStorage.getItem('isAdmin');
}

function getIsAdminInLocalStorage() {
  return localStorage.getItem('isAdmin');
}

export function getIsAdmin() {
  return (
    (getIsAdminInSessionStorage() || getIsAdminInLocalStorage()) === 'true'
  );
}

export function clearStorage() {
  sessionStorage.clear();
  localStorage.clear();
}
