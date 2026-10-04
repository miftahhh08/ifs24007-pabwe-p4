import { useState } from "react";
import { FiX } from "react-icons/fi";
import { useDispatch } from "react-redux";

import { asyncLostFoundAdd } from "../states/lostFoundThunks";
import {
  showErrorDialog,
  showSuccessDialog,
} from "../../../helpers/toolsHelper";

const AddModal = ({ isOpen, onClose, onSuccess }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "lost",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.title.trim()) {
      await showErrorDialog("Judul laporan wajib diisi.");
      return;
    }

    if (!form.description.trim()) {
      await showErrorDialog(
        "Deskripsi laporan wajib diisi."
      );
      return;
    }

    try {
      setIsSubmitting(true);

      await dispatch(
        asyncLostFoundAdd({
          title: form.title.trim(),
          description: form.description.trim(),
          status: form.status,
        })
      );

      await showSuccessDialog(
        "Laporan berhasil ditambahkan."
      );

      setForm({
        title: "",
        description: "",
        status: "lost",
      });

      onClose();

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      await showErrorDialog(
        error?.message ||
          "Gagal menambahkan laporan."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Tambah Laporan
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Laporkan barang hilang atau ditemukan.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Tutup modal"
          >
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Judul Laporan
            </label>

            <input
              id="title"
              name="title"
              type="text"
              value={form.title}
              onChange={handleChange}
              placeholder="Contoh: Dompet hitam"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Deskripsi
            </label>

            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              placeholder="Jelaskan detail barang, ciri-ciri, atau informasi lainnya..."
              className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold text-slate-700">
              Jenis Laporan
            </p>

            <div className="grid grid-cols-2 gap-3">
              <label
                className={`cursor-pointer rounded-xl border p-4 transition ${
                  form.status === "lost"
                    ? "border-red-300 bg-red-50"
                    : "border-slate-200 hover:bg-slate-50"
                }`}
              >
                <input
                  type="radio"
                  name="status"
                  value="lost"
                  checked={form.status === "lost"}
                  onChange={handleChange}
                  className="sr-only"
                />

                <span className="block text-sm font-bold text-slate-800">
                  Barang Hilang
                </span>

                <span className="mt-1 block text-xs text-slate-500">
                  Saya kehilangan barang
                </span>
              </label>

              <label
                className={`cursor-pointer rounded-xl border p-4 transition ${
                  form.status === "found"
                    ? "border-green-300 bg-green-50"
                    : "border-slate-200 hover:bg-slate-50"
                }`}
              >
                <input
                  type="radio"
                  name="status"
                  value="found"
                  checked={form.status === "found"}
                  onChange={handleChange}
                  className="sr-only"
                />

                <span className="block text-sm font-bold text-slate-800">
                  Barang Ditemukan
                </span>

                <span className="mt-1 block text-xs text-slate-500">
                  Saya menemukan barang
                </span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
            >
              Batal
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? "Menyimpan..."
                : "Simpan Laporan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddModal;