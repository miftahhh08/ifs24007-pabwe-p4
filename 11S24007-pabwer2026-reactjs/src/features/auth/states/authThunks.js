import {
  login,
  register,
} from "../api/authApi";

import {
  removeAccessToken,
} from "../../../helpers/apiHelper";

import {
  isAuthLogin,
  isAuthRegister,
  isAuthLogout,
} from "./authActions";

export const asyncAuthLogin = (credentials) => {
  return async (dispatch) => {
    const response = await login(credentials);

    dispatch(isAuthLogin(response));

    return response;
  };
};

export const asyncAuthRegister = (userData) => {
  return async (dispatch) => {
    const response = await register(userData);

    dispatch(isAuthRegister(response));

    return response;
  };
};

export const asyncAuthLogout = () => {
  return async (dispatch) => {
    removeAccessToken();

    dispatch(isAuthLogout());

    return true;
  };
};