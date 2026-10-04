import { describe, expect, it } from "vitest";

import {
  isAuthLogin,
  isAuthRegister,
  isAuthLogout,
} from "./authActions";

describe("authActions", () => {
  it("should create login action", () => {
    const payload = {
      success: true,
      data: {
        token: "token-123",
      },
    };

    expect(isAuthLogin(payload)).toEqual({
      type: "auth/isAuthLogin",
      payload,
    });
  });

  it("should create register action", () => {
    const payload = {
      success: true,
      message: "Registrasi berhasil",
    };

    expect(isAuthRegister(payload)).toEqual({
      type: "auth/isAuthRegister",
      payload,
    });
  });

  it("should create logout action without payload", () => {
    expect(isAuthLogout()).toEqual({
      type: "auth/isAuthLogout",
      payload: undefined,
    });
  });
});