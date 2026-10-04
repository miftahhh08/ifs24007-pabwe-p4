import {
  USER_GET,
  USER_GET_CURRENT,
  USER_UPDATE,
  USER_UPDATE_PHOTO,
  USER_UPDATE_PASSWORD,
} from "./userActionTypes";

export const isUserGet = (payload) => ({
  type: USER_GET,
  payload,
});

export const isUserGetCurrent = (payload) => ({
  type: USER_GET_CURRENT,
  payload,
});

export const isUserUpdate = (payload) => ({
  type: USER_UPDATE,
  payload,
});

export const isUserUpdatePhoto = (payload) => ({
  type: USER_UPDATE_PHOTO,
  payload,
});

export const isUserUpdatePassword = (payload) => ({
  type: USER_UPDATE_PASSWORD,
  payload,
});