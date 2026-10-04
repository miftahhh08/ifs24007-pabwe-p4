import {
  getUsers,
  getCurrentUser,
  updateProfile,
  updateProfilePhoto,
  updatePassword,
} from "../api/userApi";

import {
  isUserGet,
  isUserGetCurrent,
  isUserUpdate,
  isUserUpdatePhoto,
  isUserUpdatePassword,
} from "./userActions";

export const asyncUserGet = (params = {}) => {
  return async (dispatch) => {
    const response = await getUsers(params);

    dispatch(isUserGet(response));

    return response;
  };
};

export const asyncUserGetCurrent = () => {
  return async (dispatch) => {
    const response = await getCurrentUser();

    dispatch(isUserGetCurrent(response));

    return response;
  };
};

export const asyncUserUpdate = (data) => {
  return async (dispatch) => {
    const response = await updateProfile(data);

    dispatch(isUserUpdate(response));

    return response;
  };
};

export const asyncUserUpdatePhoto = (formData) => {
  return async (dispatch) => {
    const response = await updateProfilePhoto(formData);

    dispatch(isUserUpdatePhoto(response));

    return response;
  };
};

export const asyncUserUpdatePassword = (data) => {
  return async (dispatch) => {
    const response = await updatePassword(data);

    dispatch(isUserUpdatePassword(response));

    return response;
  };
};