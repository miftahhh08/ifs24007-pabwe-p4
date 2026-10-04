import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import {
  login,
  register,
  getCurrentUser,
} from "./authApi";

import {
  apiGet,
  apiPost,
  putAccessToken,
} from "../../../helpers/apiHelper";

vi.mock("../../../helpers/apiHelper", () => ({
  apiGet: vi.fn(),
  apiPost: vi.fn(),
  putAccessToken: vi.fn(),
}));

describe("authApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("login", () => {
    it("login berhasil dan menyimpan token", async () => {
      const response = {
        status: "success",
        data: {
          token: "token-123",
        },
      };

      apiPost.mockResolvedValue(response);

      const result = await login({
        email: "jannah@example.com",
        password: "password123",
      });

      expect(apiPost).toHaveBeenCalledWith(
        "/auth/login",
        {
          email: "jannah@example.com",
          password: "password123",
        }
      );

      expect(putAccessToken).toHaveBeenCalledWith(
        "token-123"
      );

      expect(result).toEqual(response);
    });

    it("mendukung data.access_token", async () => {
      apiPost.mockResolvedValue({
        data: {
          access_token: "access-token-123",
        },
      });

      await login({
        email: "jannah@example.com",
        password: "password123",
      });

      expect(putAccessToken).toHaveBeenCalledWith(
        "access-token-123"
      );
    });

    it("mendukung token di level response", async () => {
      apiPost.mockResolvedValue({
        token: "top-level-token",
      });

      await login({
        email: "jannah@example.com",
        password: "password123",
      });

      expect(putAccessToken).toHaveBeenCalledWith(
        "top-level-token"
      );
    });

    it("mendukung access_token di level response", async () => {
      apiPost.mockResolvedValue({
        access_token: "top-level-access-token",
      });

      await login({
        email: "jannah@example.com",
        password: "password123",
      });

      expect(putAccessToken).toHaveBeenCalledWith(
        "top-level-access-token"
      );
    });

    it("tidak menyimpan token jika token tidak tersedia", async () => {
      const response = {
        status: "success",
        data: {},
      };

      apiPost.mockResolvedValue(response);

      const result = await login({
        email: "jannah@example.com",
        password: "password123",
      });

      expect(
        putAccessToken
      ).not.toHaveBeenCalled();

      expect(result).toEqual(response);
    });

    it("meneruskan error login", async () => {
      apiPost.mockRejectedValue(
        new Error("Login gagal")
      );

      await expect(
        login({
          email: "jannah@example.com",
          password: "password123",
        })
      ).rejects.toThrow("Login gagal");
    });
  });

  describe("register", () => {
    it("register berhasil", async () => {
      const data = {
        name: "Miftahul Jannah Siregar",
        email: "jannah@example.com",
        password: "password123",
      };

      const response = {
        status: "success",
        data: {
          user: {
            name: data.name,
            email: data.email,
          },
        },
      };

      apiPost.mockResolvedValue(response);

      const result = await register(data);

      expect(apiPost).toHaveBeenCalledWith(
        "/auth/register",
        data
      );

      expect(result).toEqual(response);
    });

    it("meneruskan error register", async () => {
      apiPost.mockRejectedValue(
        new Error("Register gagal")
      );

      await expect(
        register({
          name: "Miftahul Jannah Siregar",
          email: "jannah@example.com",
          password: "password123",
        })
      ).rejects.toThrow("Register gagal");
    });
  });

  describe("getCurrentUser", () => {
    it("mengambil user yang sedang login", async () => {
      const response = {
        status: "success",
        data: {
          user: {
            id: 1,
            name: "Miftahul Jannah Siregar",
          },
        },
      };

      apiGet.mockResolvedValue(response);

      const result = await getCurrentUser();

      expect(apiGet).toHaveBeenCalledWith(
        "/users/me"
      );

      expect(result).toEqual(response);
    });

    it("meneruskan error current user", async () => {
      apiGet.mockRejectedValue(
        new Error("Unauthorized")
      );

      await expect(
        getCurrentUser()
      ).rejects.toThrow("Unauthorized");
    });
  });
});