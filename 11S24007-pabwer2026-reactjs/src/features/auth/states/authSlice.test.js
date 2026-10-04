import { describe, expect, it } from "vitest";

import reducer, {
  initialState,
  isAuthLogin,
  isAuthRegister,
  isAuthLogout,
} from "./authSlice";

describe("authSlice", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  it("should handle isAuthLogin with user data", () => {
    const payload = {
      success: true,
      data: {
        user: {
          id: 1,
          username: "jannah",
          name: "Miftahul Jannah Siregar",
        },
      },
    };

    const state = reducer(
      initialState,
      isAuthLogin(payload)
    );

    expect(state).toEqual({
      user: {
        id: 1,
        username: "jannah",
        name: "Miftahul Jannah Siregar",
      },
      isAuthLogin: true,
      isAuthRegister: false,
      isAuthLogout: false,
      error: null,
    });
  });

  it("should handle isAuthLogin without user data", () => {
    const payload = {
      success: true,
      data: {
        token: "token-123",
      },
    };

    const state = reducer(
      initialState,
      isAuthLogin(payload)
    );

    expect(state.isAuthLogin).toBe(true);
    expect(state.user).toBeNull();
    expect(state.error).toBeNull();
  });

  it("should handle isAuthRegister", () => {
    const state = reducer(
      initialState,
      isAuthRegister({
        success: true,
        message: "Registrasi berhasil",
      })
    );

    expect(state).toEqual({
      user: null,
      isAuthLogin: false,
      isAuthRegister: true,
      isAuthLogout: false,
      error: null,
    });
  });

  it("should handle isAuthLogout", () => {
    const loggedInState = {
      user: {
        id: 1,
        username: "jannah",
      },
      isAuthLogin: true,
      isAuthRegister: false,
      isAuthLogout: false,
      error: null,
    };

    const state = reducer(
      loggedInState,
      isAuthLogout()
    );

    expect(state).toEqual({
      user: null,
      isAuthLogin: false,
      isAuthRegister: false,
      isAuthLogout: true,
      error: null,
    });
  });
});