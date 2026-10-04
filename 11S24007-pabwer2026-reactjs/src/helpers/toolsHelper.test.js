import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  formatDate,
  showConfirmDialog,
  showErrorDialog,
  showSuccessDialog,
} from "./toolsHelper";

import Swal from "sweetalert2";

vi.mock("sweetalert2", () => ({
  default: {
    fire: vi.fn(),
  },
}));

describe("toolsHelper", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("showSuccessDialog", () => {
    it("should show success dialog", async () => {
      Swal.fire.mockResolvedValue({
        isConfirmed: true,
      });

      await showSuccessDialog("Data berhasil disimpan");

      expect(Swal.fire).toHaveBeenCalledWith({
        icon: "success",
        title: "Berhasil",
        text: "Data berhasil disimpan",
        confirmButtonText: "OK",
      });
    });

    it("should use custom title", async () => {
      Swal.fire.mockResolvedValue({
        isConfirmed: true,
      });

      await showSuccessDialog("Berhasil", "Sukses");

      expect(Swal.fire).toHaveBeenCalledWith({
        icon: "success",
        title: "Sukses",
        text: "Berhasil",
        confirmButtonText: "OK",
      });
    });
  });

  describe("showErrorDialog", () => {
    it("should show error dialog", async () => {
      Swal.fire.mockResolvedValue({
        isConfirmed: true,
      });

      await showErrorDialog("Terjadi kesalahan");

      expect(Swal.fire).toHaveBeenCalledWith({
        icon: "error",
        title: "Terjadi Kesalahan",
        text: "Terjadi kesalahan",
        confirmButtonText: "OK",
      });
    });

    it("should use custom title", async () => {
      Swal.fire.mockResolvedValue({
        isConfirmed: true,
      });

      await showErrorDialog("Gagal login", "Login Gagal");

      expect(Swal.fire).toHaveBeenCalledWith({
        icon: "error",
        title: "Login Gagal",
        text: "Gagal login",
        confirmButtonText: "OK",
      });
    });
  });

  describe("showConfirmDialog", () => {
    it("should return true when user confirms", async () => {
      Swal.fire.mockResolvedValue({
        isConfirmed: true,
      });

      const result = await showConfirmDialog("Hapus data ini?");

      expect(result).toBe(true);

      expect(Swal.fire).toHaveBeenCalledWith({
        icon: "warning",
        title: "Konfirmasi",
        text: "Hapus data ini?",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Batal",
        reverseButtons: true,
      });
    });

    it("should return false when user cancels", async () => {
      Swal.fire.mockResolvedValue({
        isConfirmed: false,
      });

      const result = await showConfirmDialog(
        "Apakah ingin menghapus data?"
      );

      expect(result).toBe(false);
    });

    it("should use custom title", async () => {
      Swal.fire.mockResolvedValue({
        isConfirmed: true,
      });

      await showConfirmDialog("Lanjutkan?", "Konfirmasi Logout");

      expect(Swal.fire).toHaveBeenCalledWith({
        icon: "warning",
        title: "Konfirmasi Logout",
        text: "Lanjutkan?",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Batal",
        reverseButtons: true,
      });
    });
  });

  describe("formatDate", () => {
    it("should format valid date", () => {
      expect(formatDate("2026-10-04T00:00:00")).toBe(
        "04 Oktober 2026"
      );
    });

    it("should return dash for empty date", () => {
      expect(formatDate("")).toBe("-");
      expect(formatDate(null)).toBe("-");
      expect(formatDate(undefined)).toBe("-");
    });

    it("should return dash for invalid date", () => {
      expect(formatDate("tanggal-tidak-valid")).toBe("-");
    });

    it("should support custom date options", () => {
      expect(
        formatDate("2026-10-04T00:00:00", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
      ).toBe("04/10/2026");
    });
  });
});