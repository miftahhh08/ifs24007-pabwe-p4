import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiUser,
} from "react-icons/fi";

import useInput from "../../../hooks/useInput";
import { asyncAuthRegister } from "../states/authThunks";
import {
  showErrorDialog,
  showSuccessDialog,
} from "../../../helpers/toolsHelper";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const name = useInput("");
  const email = useInput("");
  const password = useInput("");
  const confirmPassword = useInput("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name.value.trim()) {
      await showErrorDialog("Nama wajib diisi.");
      return;
    }

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

    if (password.value.length < 6) {
      await showErrorDialog(
        "Password minimal terdiri dari 6 karakter."
      );
      return;
    }

    if (!confirmPassword.value) {
      await showErrorDialog("Konfirmasi password wajib diisi.");
      return;
    }

    if (password.value !== confirmPassword.value) {
      await showErrorDialog(
        "Password dan konfirmasi password tidak sama."
      );
      return;
    }

    try {
      setIsLoading(true);

      await dispatch(
        asyncAuthRegister({
          name: name.value.trim(),
          email: email.value.trim(),
          password: password.value,
        })
      );

      await showSuccessDialog(
        "Registrasi berhasil. Silakan masuk menggunakan akun kamu."
      );

      navigate("/auth/login");
    } catch (error) {
      await showErrorDialog(
        error?.message ||
          "Registrasi gagal. Silakan coba lagi."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">
          Delcom Lost & Found
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
          Buat akun baru
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          Daftarkan akun untuk mulai menggunakan Delcom Lost &
          Found.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Nama */}
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Nama
          </label>

          <div className="relative">
            <FiUser
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Masukkan nama lengkap"
              value={name.value}
              onChange={name.onChange}
              disabled={isLoading}
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Email
          </label>

          <div className="relative">
            <FiMail
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Masukkan email Delcom"
              value={email.value}
              onChange={email.onChange}
              disabled={isLoading}
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Password
          </label>

          <div className="relative">
            <FiLock
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Masukkan password"
              value={password.value}
              onChange={password.onChange}
              disabled={isLoading}
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
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
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 disabled:cursor-not-allowed"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        {/* Konfirmasi Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Konfirmasi Password
          </label>

          <div className="relative">
            <FiLock
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              id="confirmPassword"
              name="confirmPassword"
              type={
                showConfirmPassword ? "text" : "password"
              }
              autoComplete="new-password"
              placeholder="Ulangi password"
              value={confirmPassword.value}
              onChange={confirmPassword.onChange}
              disabled={isLoading}
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
            />

            <button
              type="button"
              aria-label={
                showConfirmPassword
                  ? "Sembunyikan konfirmasi password"
                  : "Tampilkan konfirmasi password"
              }
              onClick={() =>
                setShowConfirmPassword((current) => !current)
              }
              disabled={isLoading}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 disabled:cursor-not-allowed"
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Mendaftarkan..." : "Daftar"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        Sudah memiliki akun?{" "}
        <Link
          to="/auth/login"
          className="font-semibold text-blue-700 hover:text-blue-800"
        >
          Masuk sekarang
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;

