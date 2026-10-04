import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
} from "react-icons/fi";

import useInput from "../../../hooks/useInput";
import { asyncAuthLogin } from "../states/authThunks";
import {
  showErrorDialog,
  showSuccessDialog,
} from "../../../helpers/toolsHelper";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = useInput("");
  const password = useInput("");

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.value.trim()) {
      await showErrorDialog("Email wajib diisi.");
      return;
    }

    if (!email.value.includes("@")) {
      await showErrorDialog("Format email tidak valid.");
      return;
    }

    if (!password.value) {
      await showErrorDialog("Password wajib diisi.");
      return;
    }

    try {
      setIsLoading(true);

      await dispatch(
        asyncAuthLogin({
          email: email.value.trim(),
          password: password.value,
        })
      );

      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error(
          "Login berhasil diproses, tetapi token akses tidak ditemukan."
        );
      }

      await showSuccessDialog("Login berhasil.");

      navigate("/");
    } catch (error) {
      await showErrorDialog(
        error?.message ||
          "Login gagal. Periksa email dan password kamu."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          Delcom Lost & Found
        </p>

        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
          Selamat datang kembali
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Masuk menggunakan email akun Delcom kamu untuk
          mengelola laporan barang hilang dan ditemukan.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Email
          </label>

          <div className="relative">
            <FiMail
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Masukkan email akun Delcom"
              value={email.value}
              onChange={email.onChange}
              disabled={isLoading}
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Password
          </label>

          <div className="relative">
            <FiLock
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Masukkan password"
              value={password.value}
              onChange={password.onChange}
              disabled={isLoading}
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
            />

            <button
              type="button"
              aria-label={
                showPassword
                  ? "Sembunyikan password"
                  : "Tampilkan password"
              }
              onClick={() =>
                setShowPassword((current) => !current)
              }
              disabled={isLoading}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Sedang masuk..." : "Masuk"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Belum memiliki akun?{" "}
        <Link
          to="/auth/register"
          className="font-semibold text-blue-600 hover:text-blue-700"
        >
          Daftar sekarang
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;