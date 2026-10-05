import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  apiDelete,
  apiFetch,
  apiGet,
  apiPost,
  apiPut,
  getAccessToken,
  putAccessToken,
  removeAccessToken,
} from "./apiHelper";

describe("apiHelper", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();

    global.fetch = vi.fn();
  });

  describe("access token", () => {
    it("mengambil access token dari localStorage", () => {
      localStorage.setItem("accessToken", "token-test");

      expect(getAccessToken()).toBe("token-test");
    });

    it("mengembalikan null jika token tidak tersedia", () => {
      expect(getAccessToken()).toBeNull();
    });

    it("menyimpan access token", () => {
      putAccessToken("token-baru");

      expect(localStorage.getItem("accessToken")).toBe("token-baru");
    });

    it("menghapus token jika putAccessToken menerima nilai kosong", () => {
      localStorage.setItem("accessToken", "token-lama");

      putAccessToken("");

      expect(localStorage.getItem("accessToken")).toBeNull();
    });

    it("menghapus access token", () => {
      localStorage.setItem("accessToken", "token-test");

      removeAccessToken();

      expect(localStorage.getItem("accessToken")).toBeNull();
    });
  });

  describe("apiFetch", () => {
    it("menggunakan base URL dari DELCOM_BASEURL", async () => {
      global.fetch.mockResolvedValue({
        ok: true,
        headers: {
          get: () => "application/json",
        },
        json: async () => ({
          status: "success",
          data: {},
        }),
      });

      await apiFetch("/test");

      expect(global.fetch).toHaveBeenCalledWith(
        "https://open-api.delcom.org/api/v1/test",
        expect.objectContaining({
          method: "GET",
        })
      );
    });

    it("menggunakan fallback base URL ketika DELCOM_BASEURL tidak tersedia", async () => {
      const originalValue = global.DELCOM_BASEURL;

      try {
        delete global.DELCOM_BASEURL;

        global.fetch.mockResolvedValue({
          ok: true,
          headers: {
            get: () => "application/json",
          },
          json: async () => ({
            status: "success",
            data: {},
          }),
        });

        await apiFetch("/fallback-test");

        expect(global.fetch).toHaveBeenCalledWith(
          "https://open-api.delcom.org/api/v1/fallback-test",
          expect.objectContaining({
            method: "GET",
          })
        );
      } finally {
        if (originalValue === undefined) {
          delete global.DELCOM_BASEURL;
        } else {
          global.DELCOM_BASEURL = originalValue;
        }
      }
    });

    it("menambahkan query parameter yang valid", async () => {
      global.fetch.mockResolvedValue({
        ok: true,
        headers: {
          get: () => "application/json",
        },
        json: async () => ({
          status: "success",
          data: {},
        }),
      });

      await apiFetch("/test", {
        params: {
          page: 1,
          keyword: "lost item",
          empty: "",
          emptyNull: null,
          emptyUndefined: undefined,
        },
      });

      expect(global.fetch).toHaveBeenCalledWith(
        "https://open-api.delcom.org/api/v1/test?page=1&keyword=lost+item",
        expect.anything()
      );
    });

    it("mengirim Authorization jika token tersedia", async () => {
      localStorage.setItem("accessToken", "token-rahasia");

      global.fetch.mockResolvedValue({
        ok: true,
        headers: {
          get: () => "application/json",
        },
        json: async () => ({
          status: "success",
        }),
      });

      await apiFetch("/protected");

      expect(global.fetch).toHaveBeenCalledWith(
        "https://open-api.delcom.org/api/v1/protected",
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: "Bearer token-rahasia",
          }),
        })
      );
    });

    it("mengirim body object sebagai JSON", async () => {
      global.fetch.mockResolvedValue({
        ok: true,
        headers: {
          get: () => "application/json",
        },
        json: async () => ({
          status: "success",
        }),
      });

      await apiFetch("/test", {
        method: "POST",
        body: {
          name: "Jannah",
          status: "lost",
        },
      });

      expect(global.fetch).toHaveBeenCalledWith(
        "https://open-api.delcom.org/api/v1/test",
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            "Content-Type": "application/json",
          }),
          body: JSON.stringify({
            name: "Jannah",
            status: "lost",
          }),
        })
      );
    });

    it("mengirim FormData tanpa mengubah body menjadi JSON", async () => {
      const formData = new FormData();
      formData.append("cover", "file-test");

      global.fetch.mockResolvedValue({
        ok: true,
        headers: {
          get: () => "application/json",
        },
        json: async () => ({
          status: "success",
        }),
      });

      await apiFetch("/upload", {
        method: "POST",
        body: formData,
      });

      expect(global.fetch).toHaveBeenCalledWith(
        "https://open-api.delcom.org/api/v1/upload",
        expect.objectContaining({
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        })
      );
    });

    it("menggunakan content type kosong jika header content-type tidak tersedia", async () => {
      global.fetch.mockResolvedValue({
        ok: true,
        headers: {
          get: () => null,
        },
        text: async () => "OK",
      });

      await expect(
        apiFetch("/no-content-type")
      ).resolves.toBe("OK");

      expect(global.fetch).toHaveBeenCalledWith(
        "https://open-api.delcom.org/api/v1/no-content-type",
        expect.objectContaining({
          method: "GET",
        })
      );
    });

    it("membaca response JSON", async () => {
      const result = {
        status: "success",
        data: {
          id: 1,
        },
      };

      global.fetch.mockResolvedValue({
        ok: true,
        headers: {
          get: () => "application/json",
        },
        json: async () => result,
      });

      await expect(apiFetch("/test")).resolves.toEqual(result);
    });

    it("membaca response text jika bukan JSON", async () => {
      global.fetch.mockResolvedValue({
        ok: true,
        headers: {
          get: () => "text/plain",
        },
        text: async () => "OK",
      });

      await expect(apiFetch("/test")).resolves.toBe("OK");
    });

    it("melempar error dari message response", async () => {
      global.fetch.mockResolvedValue({
        ok: false,
        status: 400,
        headers: {
          get: () => "application/json",
        },
        json: async () => ({
          message: "Data tidak valid",
        }),
      });

      await expect(apiFetch("/test")).rejects.toMatchObject({
        message: "Data tidak valid",
        status: 400,
      });
    });

    it("mengambil error dari data.message", async () => {
      global.fetch.mockResolvedValue({
        ok: false,
        status: 422,
        headers: {
          get: () => "application/json",
        },
        json: async () => ({
          data: {
            message: "Validasi gagal",
          },
        }),
      });

      await expect(apiFetch("/test")).rejects.toMatchObject({
        message: "Validasi gagal",
        status: 422,
      });
    });

    it("mengambil error dari error", async () => {
      global.fetch.mockResolvedValue({
        ok: false,
        status: 500,
        headers: {
          get: () => "application/json",
        },
        json: async () => ({
          error: "Server error",
        }),
      });

      await expect(apiFetch("/test")).rejects.toMatchObject({
        message: "Server error",
        status: 500,
      });
    });

    it("mengambil error dari data.error", async () => {
      global.fetch.mockResolvedValue({
        ok: false,
        status: 500,
        headers: {
          get: () => "application/json",
        },
        json: async () => ({
          data: {
            error: "Database error",
          },
        }),
      });

      await expect(apiFetch("/test")).rejects.toMatchObject({
        message: "Database error",
        status: 500,
      });
    });

    it("menggunakan pesan default jika response tidak memiliki pesan error", async () => {
      global.fetch.mockResolvedValue({
        ok: false,
        status: 404,
        headers: {
          get: () => "application/json",
        },
        json: async () => ({}),
      });

      await expect(apiFetch("/test")).rejects.toMatchObject({
        message: "Request gagal dengan status 404",
        status: 404,
      });
    });
  });

  describe("wrapper API", () => {
    it("apiGet memanggil apiFetch dengan GET", async () => {
      global.fetch.mockResolvedValue({
        ok: true,
        headers: {
          get: () => "application/json",
        },
        json: async () => ({
          status: "success",
        }),
      });

      await apiGet("/users", {
        page: 1,
      });

      expect(global.fetch).toHaveBeenCalledWith(
        "https://open-api.delcom.org/api/v1/users?page=1",
        expect.objectContaining({
          method: "GET",
        })
      );
    });

    it("apiPost memanggil apiFetch dengan POST", async () => {
      global.fetch.mockResolvedValue({
        ok: true,
        headers: {
          get: () => "application/json",
        },
        json: async () => ({
          status: "success",
        }),
      });

      await apiPost("/users", {
        name: "Jannah",
      });

      expect(global.fetch).toHaveBeenCalledWith(
        "https://open-api.delcom.org/api/v1/users",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({
            name: "Jannah",
          }),
        })
      );
    });

    it("apiPut memanggil apiFetch dengan PUT", async () => {
      global.fetch.mockResolvedValue({
        ok: true,
        headers: {
          get: () => "application/json",
        },
        json: async () => ({
          status: "success",
        }),
      });

      await apiPut("/users/1", {
        name: "Updated",
      });

      expect(global.fetch).toHaveBeenCalledWith(
        "https://open-api.delcom.org/api/v1/users/1",
        expect.objectContaining({
          method: "PUT",
          body: JSON.stringify({
            name: "Updated",
          }),
        })
      );
    });

    it("apiDelete memanggil apiFetch dengan DELETE", async () => {
      global.fetch.mockResolvedValue({
        ok: true,
        headers: {
          get: () => "application/json",
        },
        json: async () => ({
          status: "success",
        }),
      });

      await apiDelete("/users/1");

      expect(global.fetch).toHaveBeenCalledWith(
        "https://open-api.delcom.org/api/v1/users/1",
        expect.objectContaining({
          method: "DELETE",
        })
      );
    });
  });
});