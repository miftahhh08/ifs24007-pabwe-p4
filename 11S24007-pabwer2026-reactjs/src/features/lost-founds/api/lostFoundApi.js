import {
  apiDelete,
  apiGet,
  apiPost,
  apiPut,
} from "../../../helpers/apiHelper";

export const getLostFounds = async (params = {}) => {
  return apiGet("/lost-founds", params);
};

export const getLostFound = async (id) => {
  return apiGet(`/lost-founds/${id}`);
};

export const addLostFound = async (data) => {
  return apiPost("/lost-founds", data);
};

export const updateLostFound = async (id, data) => {
  return apiPut(`/lost-founds/${id}`, data);
};

export const updateLostFoundCover = async (id, formData) => {
  return apiPost(`/lost-founds/${id}/cover`, formData);
};

export const deleteLostFound = async (id) => {
  return apiDelete(`/lost-founds/${id}`);
};

export const getLostFoundStatsDaily = async (params = {}) => {
  return apiGet("/lost-founds/stats/daily", params);
};

export const getLostFoundStatsMonthly = async (params = {}) => {
  return apiGet("/lost-founds/stats/monthly", params);
};