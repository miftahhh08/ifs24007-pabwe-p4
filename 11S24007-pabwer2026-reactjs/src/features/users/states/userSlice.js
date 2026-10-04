import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  user: null,

  isUserGet: false,
  isUserGetCurrent: false,
  isUserUpdate: false,
  isUserUpdatePhoto: false,
  isUserUpdatePassword: false,

  error: null,
};

const extractUsers = (payload) => {
  return payload?.data?.users || payload?.users || [];
};

const extractUser = (payload) => {
  return payload?.data?.user || payload?.user || null;
};

const userSlice = createSlice({
  name: "users",

  initialState,

  reducers: {
    isUserGet: (state, action) => {
      state.isUserGet = true;
      state.error = null;
      state.users = extractUsers(action.payload);
    },

    isUserGetCurrent: (state, action) => {
      state.isUserGetCurrent = true;
      state.error = null;

      const user = extractUser(action.payload);

      if (user) {
        state.user = user;
      }
    },

    isUserUpdate: (state, action) => {
      state.isUserUpdate = true;
      state.error = null;

      const user = extractUser(action.payload);

      if (user) {
        state.user = user;
      }
    },

    isUserUpdatePhoto: (state, action) => {
      state.isUserUpdatePhoto = true;
      state.error = null;

      const user = extractUser(action.payload);

      if (user) {
        state.user = user;
      }
    },

    isUserUpdatePassword: (state) => {
      state.isUserUpdatePassword = true;
      state.error = null;
    },
  },
});

export const {
  isUserGet,
  isUserGetCurrent,
  isUserUpdate,
  isUserUpdatePhoto,
  isUserUpdatePassword,
} = userSlice.actions;

export { initialState };

export default userSlice.reducer;