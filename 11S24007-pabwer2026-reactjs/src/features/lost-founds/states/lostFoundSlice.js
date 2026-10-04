import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lostFounds: [],
  lostFound: null,
  lostFoundStats: null,

  isLostFound: false,
  isLostFoundAdd: false,
  isLostFoundAdded: false,
  isLostFoundChange: false,
  isLostFoundChanged: false,
  isLostFoundChangeCover: false,
  isLostFoundChangedCover: false,
  isLostFoundDelete: false,
  isLostFoundDeleted: false,

  error: null,
};

const extractList = (payload) => {
  return (
    payload?.data?.lost_founds ||
    payload?.data?.lostFounds ||
    payload?.lost_founds ||
    payload?.lostFounds ||
    []
  );
};

const extractItem = (payload) => {
  return (
    payload?.data?.lost_found ||
    payload?.data?.lostFound ||
    payload?.lost_found ||
    payload?.lostFound ||
    null
  );
};

const lostFoundSlice = createSlice({
  name: "lostFounds",

  initialState,

  reducers: {
    isLostFound: (state, action) => {
      state.isLostFound = true;
      state.error = null;
      state.lostFounds = extractList(action.payload);
    },

    isLostFoundDetail: (state, action) => {
      state.error = null;

      const item = extractItem(action.payload);

      if (item) {
        state.lostFound = item;
      }
    },

    isLostFoundAdd: (state) => {
      state.isLostFoundAdd = true;
      state.isLostFoundAdded = true;
      state.error = null;
    },

    isLostFoundChange: (state, action) => {
      state.isLostFoundChange = true;
      state.isLostFoundChanged = true;
      state.error = null;

      const item = extractItem(action.payload);

      if (item) {
        state.lostFound = item;
      }
    },

    isLostFoundChangeCover: (state, action) => {
      state.isLostFoundChangeCover = true;
      state.isLostFoundChangedCover = true;
      state.error = null;

      const item = extractItem(action.payload);

      if (item) {
        state.lostFound = item;
      }
    },

    isLostFoundDelete: (state) => {
      state.isLostFoundDelete = true;
      state.isLostFoundDeleted = true;
      state.error = null;
    },

    isLostFoundStats: (state, action) => {
      state.lostFoundStats =
        action.payload?.data || action.payload || null;

      state.error = null;
    },
  },
});

export const {
  isLostFound,
  isLostFoundDetail,
  isLostFoundAdd,
  isLostFoundChange,
  isLostFoundChangeCover,
  isLostFoundDelete,
  isLostFoundStats,
} = lostFoundSlice.actions;

export { initialState };

export default lostFoundSlice.reducer;