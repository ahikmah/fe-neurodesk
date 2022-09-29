import AxiosInstance from '../axios';
import token from '../token';

class Auth {
  /**
   * LOGIN SERVICES.
   * @param {Object} Object { email: value, password: value }
   * @returns
   */
  async login(payload) {
    try {
      const response = await AxiosInstance.post('auth/login', payload);
      return response;
    } catch (errors) {
      return errors.response;
    }
  }

  /**
   * ACTIVATION SERVICES.
   * @param {Object} Object { otp: value, id_pendaftar: value }
   * @returns
   */
  async activation(payload) {
    try {
      const response = await AxiosInstance.post('auth/activation', payload);
      return response;
    } catch (errors) {
      return errors.response;
    }
  }

  /**
   * FORGOT PASSWORD SERVICES.
   * @param {Object} Object { otp: value, id_pendaftar: value }
   * @returns
   */
  async forgotPassword(payload) {
    try {
      const response = await AxiosInstance.post('auth/forgot-password', payload);
      return response;
    } catch (errors) {
      return errors.response;
    }
  }

  /**
   * (RE)SET PASSWORD SERVICES.
   * @param {Object} Object { otp: value, id_pendaftar: value }
   * @returns
   */
  async setPassword(payload) {
    try {
      const response = await AxiosInstance.post('auth/set-password', payload);
      return response;
    } catch (errors) {
      return errors.response;
    }
  }

  /**
   * SERVICES : REGISTER.
   * @param {Object} Object { full_name, email, password }
   * @returns
   */

  async register(payload, token) {
    try {
      const response = await AxiosInstance.post(`auth/register`, payload, { headers: { secret_key: token } });
      return response;
    } catch (errors) {
      return errors.response;
    }
  }

  async registerPublic(payload) {
    try {
      const response = await AxiosInstance.post(`auth/public-register`, payload);
      return response;
    } catch (errors) {
      return errors.response;
    }
  }

  /**
   * Revoke or Refresh Token.
   * The headers must be a refresh token.
   * @returns
   */
  async revoke(refreshToken) {
    try {
      window.localStorage.setItem('tokenHasBeenRefreshed', true);
      const response = await AxiosInstance.post('auth/revoke', null, { headers: { Authorization: `bearer ${refreshToken}` } });
      if (response.status === 200) {
        await token.setToken(response.data.data);
        response.config.headers.Authorization = `bearer {${response.data.data.accessToken}}`;
        await window.localStorage.removeItem('tokenHasBeenRefreshed');
      }
      return response;
    } catch (errors) {
      await token.purgeToken();
      window.location.href = '/login';
      return errors;
    }
  }

  /**
   * LOGOUT USER.
   * @returns
   */
  async logout() {
    try {
      const response = await AxiosInstance.post('auth/logout');
      if (response.status === 201) {
        await token.purgeToken();
        window.location.href = '/login';
      }
      return response;
    } catch (errors) {
      return errors;
    }
  }

  /**
   * SERVICE RESET PASSWORD.
   * @param {Object} Object { id_auth, otp, password }
   * @returns
   */
  async resetPassword(payload) {
    try {
      const response = await AxiosInstance.post(`auth/set-password`, payload);
      return response;
    } catch (errors) {
      return errors;
    }
  }

  /**
   * SERVICE : GET USER DATA/INFO.
   * @returns Object.
   */
  async userInfo(authToken) {
    try {
      let bodyData = undefined;
      if (authToken) bodyData = { headers: { Authorization: `bearer ${authToken}` } };
      const response = await AxiosInstance.get('/user', bodyData);
      return response;
    } catch (errors) {
      return errors.response;
    }
  }
}

export default new Auth();
