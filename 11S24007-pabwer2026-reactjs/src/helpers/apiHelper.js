const ACCESS_TOKEN_KEY = "accessToken";

const getBaseUrl = () => {
  if (typeof DELCOM_BASEURL !== "undefined") {
    return DELCOM_BASEURL;
  }

  return "https://open-api.delcom.org/api/v1";
};

export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const putAccessToken = (token) => {
  if (!token) {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    return;
  }

  localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

export const removeAccessToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};

export const apiFetch = async (
  endpoint,
  {
    method = "GET",
    params = {},
    body = null,
    headers = {},
  } = {}
) => {
  const baseUrl = getBaseUrl();

  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      queryParams.append(key, String(value));
    }
  });

  const queryString = queryParams.toString();

  const url = `${baseUrl}${endpoint}${
    queryString ? `?${queryString}` : ""
  }`;

  const token = getAccessToken();

  const requestHeaders = {
    Accept: "application/json",
    ...headers,
  };

  if (token) {
    requestHeaders.Authorization = `Bearer ${token}`;
  }

  let requestBody = body;

  if (
    body !== null &&
    typeof body === "object" &&
    !(body instanceof FormData)
  ) {
    requestHeaders["Content-Type"] = "application/json";
    requestBody = JSON.stringify(body);
  }

  const response = await fetch(url, {
    method,
    headers: requestHeaders,
    body: requestBody,
  });

  const contentType =
    response.headers.get("content-type") || "";

  let result;

  if (contentType.includes("application/json")) {
    result = await response.json();
  } else {
    result = await response.text();
  }

  if (!response.ok) {
    const message =
      result?.message ||
      result?.data?.message ||
      result?.error ||
      result?.data?.error ||
      `Request gagal dengan status ${response.status}`;

    const error = new Error(message);

    error.status = response.status;
    error.data = result;

    throw error;
  }

  return result;
};

export const apiGet = (endpoint, params = {}) => {
  return apiFetch(endpoint, {
    method: "GET",
    params,
  });
};

export const apiPost = (
  endpoint,
  body = null,
  params = {}
) => {
  return apiFetch(endpoint, {
    method: "POST",
    params,
    body,
  });
};

export const apiPut = (
  endpoint,
  body = null,
  params = {}
) => {
  return apiFetch(endpoint, {
    method: "PUT",
    params,
    body,
  });
};

export const apiDelete = (endpoint, params = {}) => {
  return apiFetch(endpoint, {
    method: "DELETE",
    params,
  });
};