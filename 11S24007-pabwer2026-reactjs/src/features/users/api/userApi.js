import {
  apiGet,
  apiPost,
  apiPut,
} from "../../../helpers/apiHelper";

export const getUsers = async (params = {}) => {
  return apiGet("/users", params);
};

export const getCurrentUser = async () => {
  return apiGet("/users/me");
};

export const updateProfile = async (data) => {
  return apiPut("/users/me", data);
};

export const updateProfilePhoto = async (formData) => {
  return apiPost("/users/me/photo", formData);
};

export const updatePassword = async (data) => {
  return apiPut("/users/me/password", data);
};