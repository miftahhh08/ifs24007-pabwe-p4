import { describe, expect, it } from "vitest";

import store from "./store";

describe("store", () => {
  it("should create the Redux store with auth state", () => {
    const state = store.getState();

    expect(state).toHaveProperty("auth");

    expect(state.auth).toEqual({
      user: null,
      isAuthLogin: false,
      isAuthRegister: false,
      isAuthLogout: false,
      error: null,
    });
  });

  it("should dispatch auth logout action", () => {
    store.dispatch({
      type: "auth/isAuthLogout",
    });

    expect(store.getState().auth.isAuthLogout).toBe(true);
    expect(store.getState().auth.user).toBeNull();
  });
});