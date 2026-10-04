import { describe, expect, it } from "vitest";

import {
  AUTH_LOGIN,
  AUTH_REGISTER,
  AUTH_LOGOUT,
} from "./authActionTypes";

describe("authActionTypes", () => {
  it("should have correct login action type", () => {
    expect(AUTH_LOGIN).toBe("auth/isAuthLogin");
  });

  it("should have correct register action type", () => {
    expect(AUTH_REGISTER).toBe("auth/isAuthRegister");
  });

  it("should have correct logout action type", () => {
    expect(AUTH_LOGOUT).toBe("auth/isAuthLogout");
  });
});