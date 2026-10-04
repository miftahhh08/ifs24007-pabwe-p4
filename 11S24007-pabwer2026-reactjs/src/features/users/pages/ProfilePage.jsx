import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiMail, FiSave, FiUser } from "react-icons/fi";

import {
  asyncUserGetCurrent,
  asyncUserUpdate,
} from "../states/userThunks";

import {
  showErrorDialog,
  showSuccessDialog,
} from "../../../helpers/toolsHelper";

const ProfilePage = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.users);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        await dispatch(asyncUserGetCurrent());
      } catch (error) {
        await showErrorDialog(
          error?.message || "Gagal mengambil data profile."
        );
      }
    };

    loadProfile();
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name.trim()) {
      await showErrorDialog("Nama wajib diisi.");
      return;
    }

    if (!email.trim()) {
      await showErrorDialog("Email wajib diisi.");
      return;
    }

    try {
      setIsLoading(true);

      await dispatch(
        asyncUserUpdate({
          name: name.trim(),
          email: email.trim(),
        })
      );

      await showSuccessDialog(
        "Profile berhasil diperbarui."
      );

      await dispatch(asyncUserGetCurrent());
    } catch (error) {
      await showErrorDialog(
        error?.message || "Gagal memperbarui profile."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const displayName = user?.name || name || "Pengguna";

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-3xl">

        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Delcom Lost & Found
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Profile
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Kelola informasi akun kamu.
          </p>
        </div>

        <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">

          <div className="flex flex-col items-center border-b border-slate-100 pb-8">

            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-3xl font-bold text-blue-600">
              {displayName.charAt(0).toUpperCase()}
            </div>

            <h2 className="mt-4 text-xl font-bold text-slate-900">
              {displayName}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Informasi akun
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Nama
              </label>

              <div className="relative">
                <FiUser
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  placeholder="Masukkan nama"
                  disabled={isLoading}
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                />
              </div>
            </div>

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
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="Masukkan email"
                  disabled={isLoading}
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FiSave aria-hidden="true" />

              {isLoading
                ? "Menyimpan..."
                : "Simpan Perubahan"}
            </button>

          </form>
        </section>
      </div>
    </main>
  );
};

export default ProfilePage;