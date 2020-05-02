import Cookies from 'js-cookie';

const KEY = 'UUINFO';

const UserManager = () => {
  const getUser = () => Cookies.getJSON(KEY);

  const setUser = (user, isSaved) => {
    if (isSaved) {
      Cookies.set(KEY, user, { expires: 365, sameSite: 'lax' });
    } else {
      Cookies.set(KEY, user, { sameSite: 'lax' });
    }
  };

  return { KEY, getUser, setUser };
};

export default UserManager;
