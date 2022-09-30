import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';

// reducer - state management
import { LOGIN, LOGOUT } from 'store/actions';
import accountReducer from 'store/accountReducer';

// project imports
import authServices from 'utils/services/auth.services';
import token from 'utils/token';
import base64 from 'utils/base64';

const initialState = {
  isLoggedIn: false,
  isInitialized: false,
};

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(accountReducer, initialState);

  useEffect(() => {
    async function checkingLogin() {
      const _token = await token.getToken('ACCESS_TOKEN');
      if (_token) {
        const data = base64.decryptData(window.localStorage.getItem('@_ui_us') ? window.localStorage.getItem('@_ui_us') : {});
        if (data) {
          const role = await token.getUserClient();
          const id = await token.getUserClient('id');
          const full_name = await token.getUserClient('full_name');
          const email = await token.getUserClient('email');
          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true,
              user: {
                id,
                full_name,
                role,
                email,
              },
            },
          });
        } else {
          dispatch({
            type: LOGOUT,
          });
        }
      }
    }
    checkingLogin();
  }, [dispatch]);

  const submitLogin = async (email, password) => {
    const res = await authServices.login({ email: email, password: password });
    if (res.status !== 201) {
      return res;
    } else {
      token.setToken(res.data.data);
      getUserInfo();
    }
  };

  const getUserInfo = async () => {
    const res = await authServices.userInfo(token);
    if (res.status === 200) {
      const data = base64.encodeData(res.data.data);
      window.localStorage.setItem('@_ui_us', data);
      const role = await token.getUserClient();
      const id = await token.getUserClient('id');
      const full_name = await token.getUserClient('full_name');
      const email = await token.getUserClient('email');
      dispatch({
        type: LOGIN,
        payload: {
          isLoggedIn: true,
          user: {
            id,
            full_name,
            role,
            email,
          },
        },
      });
    }
  };

  const submitRegister = async (full_name, email, password) => {
    const res = await authServices.registerPublic({ full_name: full_name, email: email, password: password });
    if (res.status !== 201) {
      return res;
    }
  };

  const submitRegisterSA = async (full_name, email, password, token) => {
    const res = await authServices.register({ full_name: full_name, email: email, password: password }, token);
    if (res.status !== 201) {
      return res;
    }
  };

  const submitActivation = async (otp, id) => {
    const res = await authServices.activation({ otp: otp, id: id });
    if (res.status === 200) {
      token.setToken(res.data.data);
      return res;
    } else {
      return res;
    }
  };

  const submitForgotPassword = async (email) => {
    const res = await authServices.forgotPassword({ email: email });
    if (res.status !== 200) {
      return res;
    }
  };

  const submitSetPassword = async (otp, id, password) => {
    const res = await authServices.setPassword({ otp: otp, id: id, password: password });
    if (res.status === 200) {
      token.setToken(res.data.data);
      return res;
    } else {
      return res;
    }
  };

  const logout = async () => {
    try {
      const response = await authServices.logout();
      dispatch({
        type: LOGOUT,
      });
      return response;
    } catch (errors) {
      return errors;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        submitLogin,
        getUserInfo,
        submitRegister,
        submitRegisterSA,
        submitActivation,
        submitForgotPassword,
        submitSetPassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthContext;
