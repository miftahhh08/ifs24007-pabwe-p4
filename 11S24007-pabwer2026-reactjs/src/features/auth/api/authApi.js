import {
  apiGet,
  apiPost,
  putAccessToken,
} from "../../../helpers/apiHelper";

export const login = async ({ email, password }) => {
  const response = await apiPost("/auth/login", {
    email,
    password,
  });

  const token =
    response?.data?.token ||
    response?.data?.access_token ||
    response?.token ||
    response?.access_token;

  if (token) {
    putAccessToken(token);
  }

  return response;
};

export const register = async ({
  name,
  email,
  password,
}) => {
  return apiPost("/auth/register", {
    name,
    email,
    password,
  });
};

export const getCurrentUser = async () => {
  return apiGet("/users/me");
};