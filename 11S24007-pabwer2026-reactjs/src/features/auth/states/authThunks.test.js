import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  asyncAuthLogin,
  asyncAuthRegister,
  asyncAuthLogout,
} from "./authThunks";

import {
  login,
  register,
} from "../api/authApi";

import {
  removeAccessToken,
} from "../../../helpers/apiHelper";

import {
  isAuthLogin,
  isAuthRegister,
  isAuthLogout,
} from "./authActions";

vi.mock("../api/authApi", () => ({
  login: vi.fn(),
  register: vi.fn(),
}));

vi.mock("../../../helpers/apiHelper", () => ({
  removeAccessToken: vi.fn(),
}));

vi.mock("./authActions", () => ({
  isAuthLogin: vi.fn(),
  isAuthRegister: vi.fn(),
  isAuthLogout: vi.fn(),
}));

describe("authThunks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("asyncAuthLogin", () => {
    it("should login and dispatch login action", async () => {
      const response = {
        success: true,
        data: {
          token: "token-123",
        },
      };

      const action = {
        type: "auth/isAuthLogin",
        payload: response,
      };

      login.mockResolvedValue(response);
      isAuthLogin.mockReturnValue(action);

      const dispatch = vi.fn();

      const result = await asyncAuthLogin({
        username: "jannah",
        password: "password123",
      })(dispatch);

      expect(login).toHaveBeenCalledWith({
        username: "jannah",
        password: "password123",
      });

      expect(isAuthLogin).toHaveBeenCalledWith(response);
      expect(dispatch).toHaveBeenCalledWith(action);
      expect(result).toEqual(response);
    });

    it("should propagate login error", async () => {
      const error = new Error("Login gagal");

      login.mockRejectedValue(error);

      const dispatch = vi.fn();

      await expect(
        asyncAuthLogin({
          username: "jannah",
          password: "wrong",
        })(dispatch)
      ).rejects.toThrow("Login gagal");

      expect(dispatch).not.toHaveBeenCalled();
    });
  });

  describe("asyncAuthRegister", () => {
    it("should register and dispatch register action", async () => {
      const response = {
        success: true,
        message: "Registrasi berhasil",
      };

      const action = {
        type: "auth/isAuthRegister",
        payload: response,
      };

      register.mockResolvedValue(response);
      isAuthRegister.mockReturnValue(action);

      const dispatch = vi.fn();

      const result = await asyncAuthRegister({
        username: "jannah",
        password: "password123",
        name: "Miftahul Jannah Siregar",
      })(dispatch);

      expect(register).toHaveBeenCalledWith({
        username: "jannah",
        password: "password123",
        name: "Miftahul Jannah Siregar",
      });

      expect(isAuthRegister).toHaveBeenCalledWith(response);
      expect(dispatch).toHaveBeenCalledWith(action);
      expect(result).toEqual(response);
    });

    it("should propagate register error", async () => {
      const error = new Error("Registrasi gagal");

      register.mockRejectedValue(error);

      const dispatch = vi.fn();

      await expect(
        asyncAuthRegister({
          username: "jannah",
          password: "password123",
          name: "Miftahul Jannah Siregar",
        })(dispatch)
      ).rejects.toThrow("Registrasi gagal");

      expect(dispatch).not.toHaveBeenCalled();
    });
  });

  describe("asyncAuthLogout", () => {
    it("should remove token and dispatch logout action", async () => {
      const action = {
        type: "auth/isAuthLogout",
      };

      isAuthLogout.mockReturnValue(action);

      const dispatch = vi.fn();

      const result = await asyncAuthLogout()(dispatch);

      expect(removeAccessToken).toHaveBeenCalledTimes(1);
      expect(isAuthLogout).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith(action);
      expect(result).toBe(true);
    });
  });
});