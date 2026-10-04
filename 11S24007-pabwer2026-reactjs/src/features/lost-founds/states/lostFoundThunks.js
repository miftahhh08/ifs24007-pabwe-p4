import {
  getLostFounds,
  getLostFound,
  addLostFound,
  updateLostFound,
  updateLostFoundCover,
  deleteLostFound,
  getLostFoundStatsDaily,
  getLostFoundStatsMonthly,
} from "../api/lostFoundApi";

import {
  isLostFound,
  isLostFoundDetail,
  isLostFoundAdd,
  isLostFoundChange,
  isLostFoundChangeCover,
  isLostFoundDelete,
  isLostFoundStats,
} from "./lostFoundActions";

export const asyncLostFoundGet = (params = {}) => {
  return async (dispatch) => {
    const response = await getLostFounds(params);

    dispatch(isLostFound(response));

    return response;
  };
};

export const asyncLostFoundGetDetail = (id) => {
  return async (dispatch) => {
    const response = await getLostFound(id);

    dispatch(isLostFoundDetail(response));

    return response;
  };
};

export const asyncLostFoundAdd = (data) => {
  return async (dispatch) => {
    const response = await addLostFound(data);

    dispatch(isLostFoundAdd(response));

    return response;
  };
};

export const asyncLostFoundChange = (id, data) => {
  return async (dispatch) => {
    const response = await updateLostFound(id, data);

    dispatch(isLostFoundChange(response));

    return response;
  };
};

export const asyncLostFoundChangeCover = (id, formData) => {
  return async (dispatch) => {
    const response = await updateLostFoundCover(
      id,
      formData
    );

    dispatch(isLostFoundChangeCover(response));

    return response;
  };
};

export const asyncLostFoundDelete = (id) => {
  return async (dispatch) => {
    const response = await deleteLostFound(id);

    dispatch(isLostFoundDelete(response));

    return response;
  };
};

export const asyncLostFoundStatsDaily = (params = {}) => {
  return async (dispatch) => {
    const response =
      await getLostFoundStatsDaily(params);

    dispatch(isLostFoundStats(response));

    return response;
  };
};

export const asyncLostFoundStatsMonthly = (params = {}) => {
  return async (dispatch) => {
    const response =
      await getLostFoundStatsMonthly(params);

    dispatch(isLostFoundStats(response));

    return response;
  };
};