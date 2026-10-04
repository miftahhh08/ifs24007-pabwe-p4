import {
  LOST_FOUND_GET,
  LOST_FOUND_GET_DETAIL,
  LOST_FOUND_ADD,
  LOST_FOUND_CHANGE,
  LOST_FOUND_CHANGE_COVER,
  LOST_FOUND_DELETE,
  LOST_FOUND_STATS,
} from "./lostFoundActionTypes";

export const isLostFound = (payload) => ({
  type: LOST_FOUND_GET,
  payload,
});

export const isLostFoundDetail = (payload) => ({
  type: LOST_FOUND_GET_DETAIL,
  payload,
});

export const isLostFoundAdd = (payload) => ({
  type: LOST_FOUND_ADD,
  payload,
});

export const isLostFoundChange = (payload) => ({
  type: LOST_FOUND_CHANGE,
  payload,
});

export const isLostFoundChangeCover = (payload) => ({
  type: LOST_FOUND_CHANGE_COVER,
  payload,
});

export const isLostFoundDelete = (payload) => ({
  type: LOST_FOUND_DELETE,
  payload,
});

export const isLostFoundStats = (payload) => ({
  type: LOST_FOUND_STATS,
  payload,
});