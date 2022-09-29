import base64 from './base64';

export const setToken = async (token) => {
  try {
    const _token = JSON.stringify(token);
    return window.localStorage.setItem('token', _token);
  } catch (errors) {
    return errors;
  }
};

/**
 *
 * @param {string} type TYPE : ALL (return object), ACCESS_TOKEN (return string), REFRESH_TOKEN (return string)
 * @returns String and object by Type.
 */
export const getToken = (_type = 'ALL') => {
  let _token = JSON.parse(window.localStorage.getItem('token'));
  switch (_type) {
    case 'ALL':
      return _token;
    case 'ACCESS_TOKEN':
      _token = _token?.accessToken;
      return _token;
    case 'REFRESH_TOKEN':
      _token = _token?.refreshToken;
      return _token;
    default:
      return _token;
  }
};

export const getRefreshToken = () => {
  let _token = JSON.parse(window.localStorage.getItem('token'));
  return _token?.refreshToken;
};

export const purgeToken = async () => {
  try {
    return window.localStorage.clear();
  } catch (errors) {
    return errors;
  }
};

export const getUserClient = async (type = 'role') => {
  const _data = await base64.decryptData(window.localStorage.getItem('@_ui_us'));
  if (_data) {
    return _data[type];
  } else {
    return null;
  }
};

export const token = {
  setToken,
  getToken,
  purgeToken,
  getUserClient,
};

export default token;
