import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthLogin: false,
  isAuthRegister: false,
  isAuthLogout: false,
  error: null,
};

const extractUser = (payload) => {
  return (
    payload?.data?.user ||
    payload?.user ||
    null
  );
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    isAuthLogin: (state, action) => {
      state.isAuthLogin = true;
      state.isAuthRegister = false;
      state.isAuthLogout = false;
      state.error = null;

      const user = extractUser(action.payload);

      if (user) {
        state.user = user;
      }
    },

    isAuthRegister: (state) => {
      state.isAuthRegister = true;
      state.isAuthLogin = false;
      state.isAuthLogout = false;
      state.error = null;
    },

    isAuthLogout: (state) => {
      state.user = null;
      state.isAuthLogin = false;
      state.isAuthRegister = false;
      state.isAuthLogout = true;
      state.error = null;
    },
  },
});

export const {
  isAuthLogin,
  isAuthRegister,
  isAuthLogout,
} = authSlice.actions;

export { initialState };

export default authSlice.reducer;