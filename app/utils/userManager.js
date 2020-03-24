const UserManager = () => {
  const KEY = 'UUINFO';

  const getUser = () => {
    const dataString = window.localStorage.getItem(String(KEY));
    if (dataString == null) {
      return null;
    }
    return JSON.parse(dataString);
  };

  const setUser = user => {
    const userString = JSON.stringify(user);
    window.localStorage.setItem(String(KEY), userString);
  };

  return { KEY, getUser, setUser };
};

export default UserManager;
